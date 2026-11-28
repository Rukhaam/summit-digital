import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion as Motion, motionValue, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import LandingCard from "../../../components/cards/landingCard.component";
import { ChatPreview } from "../messaging/messagingHome.component";
import styles from "./featuresGrid.module.css";

const capabilities = [
  { title: "Marketing that reaches the right people", description: "Plan campaigns and brand promotions around your audience, offer, and business goals." },
  { title: "Give your business room to grow", description: "Turn campaign interest into enquiries and make the next step clear for potential customers." },
  { title: "Software built for your business", description: "Develop websites, applications, and tools that support your customers and your team." },
  { title: "Keep your media working together", description: "Plan content, manage publishing, and maintain a consistent brand across your media channels." },
];

function FeaturesGrid({ scroll }) {
  const track = useRef(null);
  const [current, setCurrent] = useState(0);
  const [playback] = useState(() => capabilities.map(() => motionValue(0)));
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const reduced = useReducedMotion();
  const rail = useRef(null);

  function goToChapter(index) {
    const article = rail.current.querySelectorAll("article")[index];
    if (scroll.current) {
      scroll.current.scrollTo(article, { offset: (article.offsetHeight - window.innerHeight) / 2 });
      return;
    }
    article.scrollIntoView({ block: "center", behavior: reduced ? "instant" : "smooth" });
  }

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setCurrent(Math.round(progress * (capabilities.length - 1)));
  });

  const chapterNav = (active) => (
    <nav className={styles.progress} aria-label="Phone chat chapters">
              {capabilities.map(({ title }, i) => <button key={title} type="button"
                aria-label={`Chat ${i + 1} of ${capabilities.length}: ${title}`}
                aria-current={i === active ? "step" : undefined}
                data-complete={i <= active}
                onClick={() => goToChapter(i)}
              ><span /></button>)}
            </nav>
  );

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading">
      <header className={styles.intro}>
        <MessageCircle size={34} color="#ff5800" aria-hidden="true"/>
        <h2 className="site-section-title" id="capabilities-heading">Marketing, growth, software &amp; media</h2>
        <p>Four connected services to help you reach customers and run your business.</p>
      </header>
      <div className={styles.band}>
        <div ref={track} className={styles.track}>
          <div className={styles.pinned}>
            <div className={styles.captionGroup}>
              {chapterNav(current)}
              <div className={styles.captionStack} aria-hidden="true">
                {capabilities.map(({ title, description }, index) => (
                  <div key={title} className={styles.caption} data-active={index === current}>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
            <a className={styles.servicesLink} href="/contact">
              Get started <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div ref={rail} className={styles.rail}>
            {capabilities.map((capability, index) => (
              <article className={styles.step} key={capability.title}>
                <header className={styles.mobileCopy}>
                  {chapterNav(index)}
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </header>
                <div className={styles.deviceGround}><LandingCard reverse={index % 2 === 1}>
                  <div className={styles.device} aria-hidden="true">
                    <ChatPreview index={index} replay playbackProgress={playback[index]} />
                    <span className={styles.strip}>
                      {capability.title}
                      {!reduced && <Motion.span className={styles.replayLine} style={{ scaleX: playback[index] }} />}
                    </span>
                  </div>
                </LandingCard></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
