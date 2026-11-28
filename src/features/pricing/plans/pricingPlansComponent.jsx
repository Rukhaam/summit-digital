import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { plans, priceFormatter } from "../pricingData";
import styles from "../pricingPage.module.css";

export function TierSwitch({ tier, onChange, label = "Package level" }) {
  return (
    <div className={styles.switch} role="group" aria-label={label}>
      {["standard", "premium"].map((value) => (
        <button type="button" key={value} aria-pressed={tier === value} onClick={() => onChange(value)}>
          {value === "standard" ? "Standard" : "Premium"}
        </button>
      ))}
    </div>
  );
}

export function PlanCard({ plan, tier, recommended = false }) {
  return (
    <article className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}>
      <h3>{plan.name}</h3>
      <p className={styles.description}>{plan.description}</p>
      <p className={styles.price}>{priceFormatter.format(plan.prices[tier])}</p>
      <span className={styles.level}>{tier === "standard" ? "Standard" : "Premium"} package</span>
      <div className={styles.scope}><strong>{recommended ? "Your recommended plan" : plan.name}</strong><span>{typeof plan.features[0] === "string" ? plan.features[0] : plan.features[0][tier]}</span></div>
      <Link to="/contact" className={styles.planCta} aria-label={`Discuss ${plan.name} ${tier}`}>
        Get started <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
      <ul>
        {plan.features.map((feature) => {
          const label = typeof feature === "string" ? feature : feature[tier];
          return <li key={label}><Check size={15} aria-hidden="true" /><span>{label}</span></li>;
        })}
      </ul>
    </article>
  );
}

export default function PricingPlans({ tier, onTierChange }) {
  const track = useRef(null);
  const [position, setPosition] = useState({ back: false, forward: false });
  useLayoutEffect(() => {
    const node = track.current;
    const measure = () => setPosition({ back: node.scrollLeft > 4, forward: node.scrollLeft + node.clientWidth < node.scrollWidth - 4 });
    measure();
    node.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => { node.removeEventListener("scroll", measure); observer.disconnect(); };
  }, []);
  const move = (direction) => track.current.scrollBy({
    left: direction * (track.current.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track.current).columnGap)),
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });

  return (
    <section className={styles.packages} id="packages" aria-labelledby="pricing-heading">
      <div className={styles.intro}>
        <h1 id="pricing-heading">Plans that scale when you do</h1>
        <TierSwitch tier={tier} onChange={onTierChange} />
        <p><b>{tier === "standard" ? "Standard" : "Premium"}</b> project packages</p>
      </div>
      <div className={styles.planTrack} ref={track} tabIndex={0} role="region" aria-label="Project packages">
        {plans.map((plan) => <PlanCard plan={plan} tier={tier} key={plan.name} />)}
      </div>
      <div className={styles.carouselControls}>
        <button type="button" aria-label="Previous package" disabled={!position.back} onClick={() => move(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label="Next package" disabled={!position.forward} onClick={() => move(1)}><ArrowRight size={18} /></button>
      </div>
      <a className={styles.outlineLink} href="#comparison">Compare plans <ArrowDown size={15} /></a>
      <p className={styles.terms}>Choose a package to discuss the scope and deliverables for your project.</p>
    </section>
  );
}
