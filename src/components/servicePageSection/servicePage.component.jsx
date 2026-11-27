import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import coffee from "../../assets/services-coffee.webp";
import { ServicesPreview } from "../pagePreviews.component";
import styles from "./serviceDetailgrid.module.css";

export default function ServicesSection() {
  return (
    <section className={styles.hero} aria-labelledby="services-heading">
      <div className={styles.heroCopy}>
        <h1 id="services-heading">Build what your business needs next.</h1>
        <p>Launch a website, shape your brand, or plan a campaign. Work with us on one project or bring it all together.</p>
        <div className={styles.actions}>
          <a href="#service-list">Browse services <ArrowDown size={18} /></a>
          <Link to="/pricing">View packages <ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className={styles.heroArt}>
        <img className={styles.heroPhoto} src={coffee} alt="" fetchPriority="high" />
        <div className={styles.heroDemo}><ServicesPreview /></div>
      </div>
    </section>
  );
}
