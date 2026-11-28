import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import cover from "../../assets/services/studio-cover.webp";
import ServiceIllustration from "./serviceIllustration";
import hero from "../heroSection.module.css";
import styles from "./serviceDetailgrid.module.css";

export default function ServicesSection() {
  return (
    <section className={hero.hero} aria-labelledby="services-heading">
      <img className={hero.photo} src={cover} width="1774" height="887" alt="" fetchPriority="high" />
      <div className={`${hero.inner} ${styles.heroInner}`}>
        <div className={hero.copy}>
          <h1 className={hero.heading} id="services-heading">
            Build what your<br />business needs next.
          </h1>
          <p className={hero.description}>Launch a website, shape your brand, or plan a campaign. Work with us on one project or bring it all together.</p>
          <div className={hero.actions }>
            <a className={hero.primary} href="#service-list">Browse services</a>
            <Link className={hero.secondary} to="/pricing">View packages <ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <div className={styles.heroLaptop}><ServiceIllustration service="web-development" /></div>
      </div>
    </section>
  );
}
