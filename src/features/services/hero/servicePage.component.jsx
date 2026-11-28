import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import mobileCover from "../../../assets/services/studio-cover-mobile.webp";
import cover from "../../../assets/services/studio-cover.webp";
import ServiceIllustration from "../illustrations/serviceIllustration";
import hero from "../../home/hero/heroSection.module.css";
import styles from "./serviceHero.module.css";

export default function ServicesSection() {
  return (
    <section className={hero.hero} aria-labelledby="services-heading">
      <picture className={hero.coverSources}>
        <source media="(max-width: 37.5rem)" srcSet={mobileCover} width="840" height="887" />
        <img className={hero.photo} src={cover} width="1774" height="887" alt="" fetchPriority="high" />
      </picture>
      <div className={`${hero.inner} ${styles.heroInner} mt-15`}>
        <div className={hero.copy}>
          <h1 className={hero.heading} id="services-heading">
            Build what your<br />business needs next.
          </h1>
          <p className={hero.description}>Launch a website, shape your brand, or plan a campaign. Work with us on one project or bring it all together.</p>
          <div classNmae ='flex flex-col gap-2'>
          <div className={hero.actions} >
            <a className={hero.primary} href="#service-list">Browse services</a>
            <Link className={hero.secondary} to="/pricing">View packages <ArrowUpRight size={16} /></Link>
          </div>
          </div>

        </div>
        <div className={styles.heroLaptop}><ServiceIllustration service="web-development" /></div>
      </div>
    </section>
  );
}
