import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { plans, priceFormatter } from "../pricingData";
import { TierSwitch } from "../plans/pricingPlansComponent";
import styles from "../pricingPage.module.css";

const groups = [
  {
    name: "Scope",
    rows: [
      ["Social media posts", "12 or 24 posts", "—", "15 posts with Standard"],
      ["Primary goal", "Social visuals", "A new website", "Full brand launch"],
      ["Delivery schedule", "Weekly or monthly", "Project-based", "Priority timeline"],
    ],
  },
  {
    name: "Website",
    rows: [
      ["Website build", "—", "Static or dynamic React", "Dynamic React + Firebase"],
      ["Admin panel", "—", "Premium", "Included"],
      ["Responsive design", "—", "Included", "Included"],
      ["Deployment", "—", "Vercel or Netlify", "Complete setup"],
    ],
  },
  {
    name: "Brand assets",
    rows: [
      ["Logo design", "Existing identity setup", "—", "Included"],
      ["Fonts and colors", "Brand setup", "Client-provided", "Custom selection"],
      ["Graphic and print assets", "Included", "—", "Included"],
    ],
  },
];

const PricingComparison = ({ tier, onTierChange }) => (
  <section className={styles.comparison} id="comparison" aria-labelledby="comparison-heading">
    <div className={styles.sectionHeading}>
      <span className={styles.compareMark} aria-hidden="true">&#10022;</span>
      <h2 id="comparison-heading">Compare plans and<br />included features</h2>
      <p>Compare the work included in each package.</p>
      <TierSwitch tier={tier} onChange={onTierChange} label="Comparison package level" />
    </div>
    <p className={styles.tableHint}>Swipe across to compare packages.</p>
    <div className={styles.tableScroll} role="region" aria-labelledby="comparison-heading" tabIndex={0}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Deliverable</th>
            {plans.map((plan) => (
              <th scope="col" key={plan.name}>
                <span>{plan.name}</span>
                <strong>{priceFormatter.format(plan.prices[tier])}</strong>
                <Link to="/contact" aria-label={`Discuss ${plan.name} from comparison`}>Get started <ArrowUpRight size={13} /></Link>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map(({ name, rows }) => (
          <tbody key={name}>
            <tr className={styles.tableGroup}><th scope="rowgroup" colSpan={4}>{name}</th></tr>
            {rows.map(([label, social, web, brand]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{social}</td>
                <td>{web}</td>
                <td>{brand}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  </section>
);

export default PricingComparison;
