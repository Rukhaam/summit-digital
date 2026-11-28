import CreatorStrip from "../../components/testimonials/creatorStrip.component";
import PricingPlans from "./plans/pricingPlansComponent";
import PricingComparison from "./comparison/pricing.component";
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import PlanFinder from "./finder/planFinder.component";
import styles from "./pricingPage.module.css";

function Pricing() {
  const [tier, setTier] = useState("standard");
  return (
    <div className={styles.page}>
      <PricingPlans tier={tier} onTierChange={setTier} />
      <CreatorStrip />
      <PlanFinder tier={tier} onTierChange={setTier} />
      <PricingComparison tier={tier} onTierChange={setTier} />
      <a className={styles.finderShortcut} href="#plan-finder">Pick your plan in 30 seconds <ArrowDown size={15} /></a>
    </div>
  );
}

export default Pricing;
