import { SplitCard } from "../cards/splitCard.component";
import styles from "./pageIntro.module.css";

export default function PageIntro({ id, label, title, description, preview, children }) {
  return (
    <section className={`site-container page-masthead ${styles.masthead}`} aria-labelledby={id}>
      <SplitCard intro preview={preview}>
        <p className="site-kicker">{label}</p>
        <h1 className={`site-page-title ${styles.title}`} id={id}>{title}</h1>
        <p className="site-lede">{description}</p>
        {children && <div className="site-actions">{children}</div>}
      </SplitCard>
    </section>
  );
}
