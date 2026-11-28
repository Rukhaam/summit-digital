import { ChevronDown, MessageSquareText } from "lucide-react";
import { useId, useState } from "react";
import styles from "./homeFaq.module.css";

const questions = [
  { question: "What services does SummitDigital offer?", answer: "We provide marketing and brand promotion, business growth strategy, software development, and media management. You can start with one service or plan a project that brings several together." },
  { question: "How do you plan for business growth?", answer: "We start with your goals, audience, and current channels, then agree on campaign priorities and the measures we will use to review progress." },
  { question: "Can you build software for our business?", answer: "We develop websites, applications, and custom tools. We agree on requirements, share working versions for feedback, and plan the launch with your team." },
  { question: "What does media management include?", answer: "We can help with content planning, campaign creative, publishing schedules, and channel management. The scope depends on the channels and content your business needs." },
];
export default function HomeFaq({ items = questions }) {
  const [expanded, setExpanded] = useState(null);
  const id = useId();
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className={styles.panel}>
        <div>
          <MessageSquareText className="msg-faq-icon" aria-hidden="true"/>
          <h2 className="site-section-title" id="faq-heading">Frequently asked questions</h2>

        </div>
        <div className={styles.questions}>
          {items.map(({ question, answer }, index) => (
            <div key={question} className={styles.question} data-open={expanded === index}>
              <h3>
                <button type="button" id={`${id}-question-${index}`}
                  aria-expanded={expanded === index} aria-controls={`${id}-answer-${index}`}
                  onClick={() => setExpanded((current) => current === index ? null : index)}>
                  {question}<ChevronDown size={19} aria-hidden="true" />
                </button>
              </h3>
              <div className={styles.answer} id={`${id}-answer-${index}`}
                role="region" aria-labelledby={`${id}-question-${index}`} inert={expanded !== index}>
                <div className={styles.answerInner}><p>{answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
