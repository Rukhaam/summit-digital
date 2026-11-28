import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AuditPreview, HealthPreview, IdentityPreview, RolloutPreview, StoryboardPreview, WebsitePreview } from "../previews/servicePreviews.component";
import ServiceIllustration from "../illustrations/serviceIllustration";
import styles from "./serviceDetailgrid.module.css";

const services = [
  {
    id: "web-development",
    title: "Web development",
    description: "Launch a fast, mobile-friendly site, from a focused landing page to a React and Firebase build with a content management panel.",
    deliverables: ["Responsive design", "React development", "Deployment"],
    style: styles.web,
    shortTitle: "Web",
    Preview: WebsitePreview,
  },
  {
    id: "brand-identity",
    title: "Brand identity",
    description: "Give your business a visual identity you can use consistently on your website, social channels, and print materials.",
    deliverables: ["Logo design", "Typography and color", "Brand assets"],
    style: styles.brand,
    shortTitle: "Identity",
    Preview: IdentityPreview,
  },
  {
    id: "social-video",
    title: "Social media and video",
    description: "Get campaign graphics and short-form videos ready for the channels where your audience spends time.",
    deliverables: ["Social creatives", "Video editing", "Content planning"],
    style: styles.social,
    shortTitle: "Social & video",
    Preview: StoryboardPreview,
  },
  {
    id: "digital-strategy",
    title: "Digital audit and strategy",
    description: "Find what’s missing from your website or Instagram presence and leave with a practical list of improvements.",
    deliverables: ["Website review", "Instagram audit", "Growth roadmap"],
    style: styles.audit,
    shortTitle: "Strategy",
    Preview: AuditPreview,
  },
  {
    id: "brand-launches",
    title: "Brand launches",
    description: "Coordinate a new identity, website, and content rollout, or find partners for cross-promotion and influencer campaigns.",
    deliverables: ["Identity and website", "Launch content", "Partnerships"],
    style: styles.launch,
    shortTitle: "Launches",
    Preview: RolloutPreview,
  },
  {
    id: "maintenance",
    title: "Maintenance and support",
    description: "Keep the site useful after launch with content and link updates, deployment help, and Firebase maintenance.",
    deliverables: ["Site updates", "Firebase maintenance", "Deployment support"],
    style: styles.maintenance,
    shortTitle: "Support",
    Preview: HealthPreview,
  },
];

function ServiceFeature({ service }) {
  const section = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -22]);
  const { id, title, description, deliverables, style, Preview } = service;

  return (
    <section ref={section} className={`${styles.feature} ${style}`} id={id} aria-labelledby={`${id}-heading`}>
      <Motion.header className={styles.copy} style={reduced ? undefined : { y: textY }}>
        <div className={styles.mark}><ServiceIllustration service={id} /></div>
        <Motion.h3 id={`${id}-heading`} aria-label={title}
          initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          {title.split(" ").map((word, i) => (
            <span key={word} className={styles.wordMask} aria-hidden="true">
              <Motion.span variants={{ hidden: { y: "105%" }, visible: { y: 0 } }}
                transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : i * 0.075, ease: [0.16, 1, 0.3, 1] }}>
                {word}
              </Motion.span>
            </span>
          ))}
        </Motion.h3>
        <p>{description}</p>
        <ul>{deliverables.map(item => <li key={item}>{item}</li>)}</ul>
      </Motion.header>
      <div className={styles.media}>
        <div className={styles.art}><Preview /></div>
      </div>
    </section>
  );
}

function ServicePicker({ active }) {
  const picker = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const current = services.find(service => service.id === active);
  useEffect(() => {
    if (!open) return;
    const dismissOutside = event => {
      if (!picker.current.contains(event.target)) setOpen(false);
    };
    const layout = window.matchMedia("(max-width: 52rem)");
    const close = () => setOpen(false);
    layout.addEventListener("change", close);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      layout.removeEventListener("change", close);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, [open]);
  return (
    <div className={styles.picker} ref={picker}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={event => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          trigger.current.focus();
        }
      }}>
      <button ref={trigger} type="button" aria-label={`Choose service, current service: ${current.title}`}
        aria-expanded={open} aria-controls="service-options" onClick={() => setOpen(!open)}>
        {current.title}<ChevronDown size={18} aria-hidden="true" />
      </button>
      <ul id="service-options" hidden={!open}>
        {services.map(service => (
          <li key={service.id}>
            <a href={`#${service.id}`} aria-current={active === service.id ? "location" : undefined}
              onClick={() => { setOpen(false); trigger.current.focus({ preventScroll: true }); }}>
              {service.title}{active === service.id && <Check size={16} aria-hidden="true" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesDetailedGrid() {
  const reduced = useReducedMotion();
  const catalog = useRef(null);
  const features = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [active, setActive] = useState(services[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    catalog.current.querySelectorAll("section[id]").forEach(section => observer.observe(section));
    const visibility = new IntersectionObserver(([entry]) => setShowPicker(entry.isIntersecting), {
      rootMargin: "-25% 0px -25% 0px",
    });
    visibility.observe(features.current);
    return () => {
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);
  return (
  <section ref={catalog} className={styles.catalog} id="service-list" aria-labelledby="service-list-heading">
    <div className={styles.sectionHead}>
      <h2 id="service-list-heading">Find the right starting point.</h2>
    </div>
    <nav className={styles.index} aria-label="Service index" data-visible={showPicker}>
      {services.map(service => (
        <a key={service.id} href={`#${service.id}`} aria-current={active === service.id ? "location" : undefined}>
          {active === service.id && <Motion.span layoutId="service-index-active" className={styles.activePill}
            transition={{ duration: reduced ? 0 : .28 }} />}
          <span>{service.shortTitle}</span>
        </a>
      ))}
      {showPicker && <ServicePicker active={active} />}
    </nav>
    <div ref={features}>
      {services.map(service => <ServiceFeature key={service.id} service={service} />)}
    </div>
  </section>
  );
}

export default ServicesDetailedGrid;
