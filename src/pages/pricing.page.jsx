import CreatorStrip from "../components/creatorStrip.component";
import PricingPlans from "../components/pricingPlans/pricingPlansComponent";
import PricingComparison from "../components/pricingPlans/pricing.component";
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import PlanFinder from "../components/pricingPlans/planFinder.component";
import styles from "../components/pricingPlans/pricingPage.module.css";

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
