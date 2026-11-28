import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { KickoffPreview, PlanPreview, LaunchPreview } from "./processPreviews.component";
import LandingCard from "../../../components/cards/landingCard.component";
import { SplitCard } from "../../../components/cards/splitCard.component";
import styles from "./processSteps.module.css";

const steps = [
  {
    phase: "Discover",
    title: "Share your goals",
    description: "Tell us what you offer, who you want to reach, and what success looks like.",
    preview: <KickoffPreview />,
  },
  {
    phase: "Plan",
    title: "Agree on a plan",
    description: "Get a clear scope, timeline, and price before work begins.",
    preview: <PlanPreview />,
  },
  {
    phase: "Deliver",
    title: "Build, review, and launch",
    description: "Review the work as it takes shape. At launch, we’ll hand over your assets and access.",
    preview: <LaunchPreview />,
  },
];

const ProcessSteps = () => (
  <section className="site-container site-section" aria-labelledby="process-heading">
    <div className={styles.heading}>
      <div>
        <p className="site-kicker">How we work</p>
        <h2 className={styles.title} id="process-heading">From first call to launch.</h2>
      </div>
      <Link className="site-inline-link" to="/pricing">
        See packages <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
    <div className={styles.cards} role="list">
      {steps.map(({ phase, title, description, preview }, index) => (
        <LandingCard key={phase} role="listitem" reverse={index % 2 === 1}>
          <SplitCard copyClassName={styles.copy} preview={preview}>
            <div className={styles.phase}>
              <span aria-hidden="true">0{index + 1}</span> {phase}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </SplitCard>
        </LandingCard>
      ))}
    </div>
  </section>
);

export default ProcessSteps;
