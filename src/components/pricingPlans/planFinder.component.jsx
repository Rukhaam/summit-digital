import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { plans } from "./pricingData";
import { PlanCard, TierSwitch } from "./pricingPlansComponent";
import styles from "./pricingPage.module.css";

const questions = [
  {
    title: "What would you like to work on?", hint: "Choose the goal that matters most to your business.",
    options: ["Improve our social content", "Build a website", "Refresh the whole brand"]
  },
  {
    title: "How much support do you need?", hint: "We can keep the scope focused or make room for more.",
    options: ["A focused set of essentials", "A broader package with more included"]
  },
  {
    title: "Who's in this with you?", hint: "How many people on your team will be involved in the project?",
    options: ["Exploring the possibilities", "Ready to discuss a project"]
  },
];
import creator from "../../assets/pricing-creator.jpg";
import team from "../../assets/pricing-team.jpg";
import studio from "../../assets/hero-studio.webp";
const illustrations = [studio, creator, team];

export default function PlanFinder({ tier, onTierChange }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const heading = useRef(null);
  const complete = step === questions.length;
  const question = questions[step];
  const result = plans[answers[0] ?? 0];

  function navigate(nextStep) {
    setStep(nextStep);
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  }

  return (
    <section className={styles.finderSection} id="plan-finder" aria-labelledby="finder-heading">
      <div className={styles.sectionHeading}>
        <Sparkles size={27} aria-hidden="true" />
        <h2 id="finder-heading">Not sure which<br />plan is for you?<br />We got you</h2>
        <p>Three quick questions to help you choose a package.</p>
      </div>
      <div className={styles.finder} data-result={complete}>
        <div className={styles.finderCopy}>
          <div className={styles.stepTrack} aria-label={complete ? "Recommendation ready" : `Question ${step + 1} of 3`}>
            {questions.map((item, index) => <span key={item.title} data-done={step >= index} />)}
          </div>
          {complete ? (
            <div className={styles.questionBody} key="result">
              <p className={styles.eyebrow}>A package for your next step</p>
              <h3 ref={heading} tabIndex={-1}>Let’s bring<br />it to life.</h3>
              <p>{result.name} fits your focus on {["social content", "a business website", "a coordinated brand refresh"][answers[0] ?? 0]}.</p>
              <p>{answers[2] === 1 ? "Bring your brief and we’ll work through the scope together." : "Use this as a starting point while you explore your options."}</p>
              <ul className={styles.resultNotes}>
                <li><Check size={16} /> A scope built around your goal</li>
                <li><Check size={16} /> Room to review and refine</li>
                <li><Check size={16} /> A clear handover when it’s ready</li>
              </ul>
              <button className={styles.outlineLink} type="button" onClick={() => { setAnswers([]); navigate(0); }}>Start again <ArrowLeft size={14} /></button>
            </div>
          ) : (
            <div className={styles.questionBody} key={step}>
              <p className={styles.eyebrow}>Question {step + 1} of 3</p>
              <h3 ref={heading} tabIndex={-1}>{question.title}</h3>
              <p>{question.hint}</p>
              {step === 2 ? (
                <label className={styles.teamSize}>
                  People on your team
                  <output>{(answers[2] ?? 1) === 10 ? "10+" : answers[2] ?? 1}</output>
                  <input type="range" min="1" max="10" value={answers[2] ?? 1}
                    onChange={(event) => setAnswers([answers[0], answers[1], Number(event.target.value)])} />
                </label>
              ) : <div className={styles.options} role="group" aria-label={question.title}>
                {question.options.map((label, index) => (
                  <button type="button" aria-pressed={answers[step] === index} key={label}
                    onClick={() => setAnswers((current) => { const next = [...current]; next[step] = index; return next; })}>
                    <span>{label}</span><span className={styles.optionCheck}>{answers[step] === index && <Check size={13} />}</span>
                  </button>
                ))}
              </div>}
              <div className={styles.finderActions}>
                <button type="button" className={styles.back} disabled={step === 0} onClick={() => navigate(step - 1)} aria-label="Previous question"><ArrowLeft size={17} /></button>
                <button className={styles.next} type="button" disabled={step < 2 && answers[step] === undefined}
                  onClick={() => {
                    if (step === questions.length - 1) onTierChange(answers[1] === 1 ? "premium" : "standard");
                    navigate(step + 1);
                  }}>{step === questions.length - 1 ? "See my package" : "Next step"}<ArrowRight size={16} /></button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.finderVisual}>
          {complete ? (
            <div className={styles.resultPlan}>
              <TierSwitch tier={tier} onChange={onTierChange} label="Recommended package level" />
              <PlanCard plan={result} tier={tier} recommended />
            </div>
          ) : (
            <img key={step} className={styles.finderArt} src={illustrations[step]} alt="" />
          )}
        </div>
      </div>
    </section>
  );
}
