import cover from "../../../assets/contact/studio-phone.webp";
import mobileCover from "../../../assets/contact/studio-phone-mobile.webp";
import { ContactPreview } from "../../../components/previews/pagePreviews.component";
import hero from "../../home/hero/heroSection.module.css";
import styles from "./contactHero.module.css";

export default function ContactHero() {
  return (
    <section className={`${hero.hero} ${styles.cover}`} aria-labelledby="contact-heading">
      <picture className={hero.coverSources}>
        <source media="(max-width: 48rem)" srcSet={mobileCover} width="780" height="850" />
        <img className={hero.photo} src={cover} width="1774" height="887" alt="" fetchPriority="high" />
      </picture>
      <div className={`${hero.inner} ${styles.inner} mt-15`}>
        <div className={hero.copy}>
          <h1 className={hero.heading} id="contact-heading">Tell us about<br />your project.</h1>
          <p className={hero.description}>Share what you're planning and when you'd like to launch. We'll help you find a starting point.</p>
          <div className={hero.actions}>
            <a className={hero.primary} href="#project-enquiry">Send an enquiry</a>
            <a className={hero.secondary} href="mailto:SummitDigital.in@gmail.com">Email us directly</a>
          </div>
        </div>
        <div className={styles.preview} aria-hidden="true" inert><ContactPreview /></div>
      </div>
    </section>
  );
}
