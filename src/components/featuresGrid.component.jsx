import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion as Motion, useScroll, useMotionValueEvent, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import LandingCard from "./landingCard.component";
import { ChatPreview } from "./messagingHome.component";
import styles from "./featuresGrid.module.css";

const capabilities = [
  { title: "Marketing that reaches the right people", description: "Plan campaigns and brand promotions around your audience, offer, and business goals." },
  { title: "Give your business room to grow", description: "Turn campaign interest into enquiries and make the next step clear for potential customers." },
  { title: "Software built for your business", description: "Develop websites, applications, and tools that support your customers and your team." },
  { title: "Keep your media working together", description: "Plan content, manage publishing, and maintain a consistent brand across your media channels." },
];

function FeaturesGrid() {
  const track = useRef(null);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const reduced = useReducedMotion();
  const eased = useSpring(scrollYProgress, { stiffness: 170, damping: 28, restDelta: .0001 });
  const railOffset = useTransform([scrollYProgress, eased], ([raw, smooth]) => {
    if (raw <= 0 || raw >= 1 || !track.current) return 0;
    return Math.max(-150, Math.min(150, (raw - smooth) * (track.current.offsetHeight - window.innerHeight)));
  });
  useMotionValueEvent(eased, "change", (progress) => {
    setCurrent(Math.round(progress * (capabilities.length - 1)));
  });

  const chapterNav = (active) => (
    <nav className={styles.progress} aria-label="Phone chat chapters">
              {capabilities.map(({ title }, i) => <button key={title} type="button"
                aria-label={`Chat ${i + 1} of ${capabilities.length}: ${title}`}
                aria-current={i === active ? "step" : undefined}
                data-complete={i <= active}
                onClick={() => track.current.querySelectorAll("article")[i].scrollIntoView({ block: "center", behavior: reduced ? "instant" : "smooth" })}
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
          <Motion.div className={styles.rail} style={{ y: reduced ? 0 : railOffset }}>
            {capabilities.map((capability, index) => (
              <article className={styles.step} key={capability.title}>
                <header className={styles.mobileCopy}>{chapterNav(index)}<h3>{capability.title}</h3><p>{capability.description}</p></header>
                <div className={styles.deviceGround}><LandingCard reverse={index % 2 === 1}>
                  <div className={styles.device} aria-hidden="true">
                    <ChatPreview index={index} replay/>
                    <span className={styles.strip}>{capability.title}</span>
                  </div>
                </LandingCard></div>
              </article>
            ))}
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
