import { Aperture, Clapperboard, PanelsTopLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LandingCard from "./landingCard.component";
import { IdentityPreview, StoryboardPreview, WebsitePreview } from "./servicePageSection/servicePreviews.component";
import styles from "./projectShowcase.module.css";

const examples = [
  {
    id: "website",
    label: "Website",
    title: "Make the next step easy to find.",
    before: "Customers have to search for your services, hours, and how to get in touch.",
    after: "A responsive website puts those answers up front and gives visitors a clear way to enquire.",
    href: "/services#web-development",
    link: "Explore web development",
    icon: PanelsTopLeft,
    Preview: WebsitePreview,
  },
  {
    id: "identity",
    label: "Brand identity",
    title: "Give your brand a consistent look.",
    before: "Every new post or page starts from scratch, so the design changes from one channel to another.",
    after: "A shared logo, palette, and type system give your website, social posts, and printed materials a recognizable look.",
    href: "/services#brand-identity",
    link: "Explore brand identity",
    icon: Aperture,
    Preview: IdentityPreview,
  },
  {
    id: "campaign",
    label: "Social campaign",
    title: "Turn one idea into a campaign.",
    before: "You have a launch date and a message, but no plan for what to publish or when.",
    after: "A storyboard, a set of campaign graphics, and a short-form video give the launch a clear creative direction.",
    href: "/services#social-video",
    link: "Explore social content",
    icon: Clapperboard,
    Preview: StoryboardPreview,
  },
];

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const { id, title, before, after, href, link, Preview } = examples[active];

  return (
    <section className="site-container site-section" id="project-examples" aria-labelledby="examples-heading">
      <div className="site-section-head">
        <div>
          <p className="site-kicker">Project examples</p>
          <h2 className="site-section-title" id="examples-heading">See the work take shape.</h2>
        </div>
      </div>
      <LandingCard reverse>
        <div className={styles.panel} data-example={id}>
          <div className={styles.switcher} role="group" aria-label="Choose a project example">
            {examples.map((example, index) => (
              <button key={example.id} type="button" aria-pressed={active === index}
                aria-controls="example-panel" onClick={() => setActive(index)}>
                <example.icon size={18} aria-hidden="true" />
                {example.label}
              </button>
            ))}
          </div>
          <div className={styles.content} id="example-panel">
            <div className={styles.copy}>
              <h3 aria-live="polite">{title}</h3>
              <dl>
                <div><dt>Starting point</dt><dd>{before}</dd></div>
                <div><dt>What we’d build</dt><dd>{after}</dd></div>
              </dl>
              <Link className="site-inline-link" to={href}>{link}</Link>
            </div>
            <div className={styles.art}>
              <div className={styles.scene} key={id}><Preview /></div>
            </div>
          </div>
        </div>
      </LandingCard>
    </section>
  );
}
