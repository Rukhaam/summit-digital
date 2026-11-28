import { Check, FileText, ImageIcon, Mail, MessageSquare } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import LandingCard from "../../../components/cards/landingCard.component";
import { Badge } from "../../../components/stageshow/controls/Badge";
import { Collapse } from "../../../components/stageshow/motion/Collapse";
import { Roll } from "../../../components/stageshow/motion/Roll";
import { Stage } from "../../../components/stageshow/stage";
import { Window } from "../../../components/stageshow/window";
import styles from "./serviceCards.module.css";

const previewStart = { complete: false };
const previewFinish = { complete: true };
const inboxTokens = {
  "--ss-canvas": "#fafbf7",
  "--ss-chrome": "#f2f5ee",
  "--ss-line": "#dce4d8",
  "--ss-text-strong": "#2a392d",
  "--ss-success-soft": "#dcebd7",
  "--ss-success-text": "#315433",
  "--ss-radius-window": "13px",
};

async function approveProof(act) {
  await act.wait(700);
  act.mark("approved");
  await act.set(previewFinish);
}

async function receiveEnquiry(act) {
  await act.wait(875);
  act.mark("enquiry-arrives");
  await act.set(previewFinish);
}

function TeamPreview({ script, children }) {
  const art = useRef(null);
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const frame = art.current;
    const measure = () => {
      const { clientWidth: width, clientHeight: height } = frame;
      setSize((current) => current?.width === width && current.height === height ? current : { width, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.preview} ref={art} aria-hidden="true">
      {size?.width > 0 && (
        <Stage
          width={size.width}
          height={size.height}
          className={styles.stage}
          tokens={inboxTokens}
          fidelity="realistic"
          initial={previewStart}
          poster={previewFinish}
          script={script}
          play="once"
        >
          {children}
        </Stage>
      )}
    </div>
  );
}

function CampaignProof() {
  return (
    <TeamPreview script={approveProof}>
      {({ complete }) => (
        <div className={styles.proof} data-proof-approved={complete}>
          <div className={styles.proofBar}>
            <span><ImageIcon size={15} /> Campaign proof</span>
            <Badge
              className={styles.proofStatus}
              tone={complete ? "success" : "neutral"}
              icon={<Check className={styles.proofCheck} size={12} />}
            >
              <Roll variant="fade">{complete ? "Approved" : "In review"}</Roll>
            </Badge>
          </div>
          <div className={styles.poster}>
            <span>Open studio.</span>
          </div>
        </div>
      )}
    </TeamPreview>
  );
}

function EnquiryInbox() {
  return (
    <TeamPreview script={receiveEnquiry}>
      {({ complete }) => (
        <Window
          className={styles.inbox}
          title="Website enquiries"
          lights="grey"
          toolbar={<Mail className={styles.inboxIcon} size={15} />}
          data-enquiry-arrived={complete}
        >
          <div className={styles.messages}>
            <Collapse open={complete} reveal="drop">
              <div className={`${styles.message} ${styles.newMessage}`}>
                <span className={styles.messageIcon}><FileText size={15} strokeWidth={1.65} /></span>
                <span>Quote request</span>
                <Badge tone="success">New</Badge>
              </div>
            </Collapse>
            <div className={styles.message}>
              <span className={styles.messageIcon}><MessageSquare size={15} strokeWidth={1.65} /></span>
              <span>Service question</span>
              <span className={styles.messageTime}>Yesterday</span>
            </div>
            <div className={styles.message}>
              <span className={styles.messageIcon}><Mail size={15} strokeWidth={1.65} /></span>
              <span>Project enquiry</span>
              <span className={styles.messageTime}>Monday</span>
            </div>
          </div>
        </Window>
      )}
    </TeamPreview>
  );
}

const founders = [
  {
    name: "Shah Areeb",
    role: "Founder · Creative",
    quote: "From high-converting ad creatives to engaging social media assets, we craft visuals that capture attention and drive action.",
    style: styles.creative,
    Preview: CampaignProof,
  },
  {
    name: "Rukhaam",
    role: "Founder · Web development",
    quote: "I build websites that make it easy for customers to understand what a business offers, get in touch, or buy online.",
    style: styles.development,
    Preview: EnquiryInbox,
  },
];

function ServicesCard() {
  return (
    <section className="site-container site-section" aria-labelledby="team-heading">
      <div className="site-section-head">
        <div>
          <p className="site-kicker">The team</p>
          <h2 className={`site-section-title ${styles.heading}`} id="team-heading">Creative and development, together.</h2>
        </div>
      </div>
      <div className={styles.grid}>
        {founders.map((founder, index) => {
          const { name, role, quote, style, Preview } = founder;
          return (
            <LandingCard key={name} reverse={index % 2 === 1}>
              <figure className={`${styles.card} ${style}`}>
                <figcaption className={styles.identity}>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </figcaption>
                <blockquote className={styles.quote}><p>“{quote}”</p></blockquote>
                <Preview />
              </figure>
            </LandingCard>
          );
        })}
      </div>
    </section>
  );
}

export default ServicesCard;
