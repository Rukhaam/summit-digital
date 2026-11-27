import { AuditPreview, HealthPreview, IdentityPreview, RolloutPreview, StoryboardPreview, WebsitePreview } from "./servicePreviews.component";
import styles from "./serviceDetailgrid.module.css";

const services = [
  {
    id: "web-development",
    title: "Web development",
    description: "Launch a fast, mobile-friendly site, from a focused landing page to a React and Firebase build with a content management panel.",
    deliverables: ["Responsive design", "React development", "Deployment"],
    style: styles.web,
    Preview: WebsitePreview,
  },
  {
    id: "brand-identity",
    title: "Brand identity",
    description: "Give your business a visual identity you can use consistently on your website, social channels, and print materials.",
    deliverables: ["Logo design", "Typography and color", "Brand assets"],
    style: styles.brand,
    Preview: IdentityPreview,
  },
  {
    id: "social-video",
    title: "Social media and video",
    description: "Get campaign graphics and short-form videos ready for the channels where your audience spends time.",
    deliverables: ["Social creatives", "Video editing", "Content planning"],
    style: styles.social,
    Preview: StoryboardPreview,
  },
  {
    id: "digital-strategy",
    title: "Digital audit and strategy",
    description: "Find what’s missing from your website or Instagram presence and leave with a practical list of improvements.",
    deliverables: ["Website review", "Instagram audit", "Growth roadmap"],
    style: styles.audit,
    Preview: AuditPreview,
  },
  {
    id: "brand-launches",
    title: "Brand launches",
    description: "Coordinate a new identity, website, and content rollout, or find partners for cross-promotion and influencer campaigns.",
    deliverables: ["Identity and website", "Launch content", "Partnerships"],
    style: styles.launch,
    Preview: RolloutPreview,
  },
  {
    id: "maintenance",
    title: "Maintenance and support",
    description: "Keep the site useful after launch with content and link updates, deployment help, and Firebase maintenance.",
    deliverables: ["Site updates", "Firebase maintenance", "Deployment support"],
    style: styles.maintenance,
    Preview: HealthPreview,
  },
];

const ServicesDetailedGrid = () => (
  <section className={styles.catalog} id="service-list" aria-labelledby="service-list-heading">
    <div className={styles.sectionHead}>
      <h2 id="service-list-heading">Find the right starting point.</h2>
    </div>
    <div className={styles.grid}>
      {services.map((service) => {
        const { id, title, description, deliverables, style, Preview } = service;
        return (
          <article className={`${styles.card} ${style}`} id={id} key={id}>
            <header className={styles.copy}>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>
                {deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </header>
            <div className={styles.art}><Preview /></div>
          </article>
        );
      })}
    </div>
  </section>
);

export default ServicesDetailedGrid;
