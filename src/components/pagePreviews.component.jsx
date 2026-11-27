import { Aperture, ArrowUpRight, Check, Circle, FileText, Globe2, Mail, Megaphone } from "lucide-react";
import { PreviewStage } from "./splitCard.component";

import { Button } from "./stageshow/controls/Button";

import { Window } from "./stageshow/window";
import coffee from "../assets/services-coffee.webp";
import styles from "./pagePreviews.module.css";

const deliverables = [
  { label: "Website", icon: Globe2 },
  { label: "Brand identity", icon: Aperture },
  { label: "Campaign assets", icon: Megaphone },
];

const start = { step: 0 };
const ready = { step: deliverables.length + 1 };
const releaseCursor = { at: "release-entry", ripple: true };
const complete = { step: 2 };
const enquiryCursor = { at: "enquiry-cursor-entry", style: "arrow", ripple: true };

async function prepareDelivery(act) {
  await act.wait(850);
  for (const [index] of deliverables.entries()) {
    act.mark(`deliverable-${index + 1}`);
    await act.set({ step: index + 1 });
    await act.wait(640);
  }
  await act.move("release-review", { duration: 720 });
  await act.click();
  await act.set(ready);
  await act.move("release-entry", { duration: 480 });
}

async function comparePackages(act) {
  await act.wait(720);
  act.mark("standard");
  await act.set({ step: 1 });
  await act.wait(500);
  act.mark("premium");
  await act.set(complete);
}

async function sendExample(act) {
  await act.wait(800);
  await act.move({ at: "send-example", x: .87, y: .66 }, { duration: 690 });
  act.mark("sending");
  await act.click();
  await act.set({ step: 1 });
  await act.wait(680);
  act.mark("received");
  await act.set(complete);
  await act.move("enquiry-cursor-entry", { duration: 500 });
}

export function ServicesPreview() {
  return (
    <PreviewStage tone="launch" initial={start} poster={ready} script={prepareDelivery} cursor={releaseCursor}>
      {({ step }) => (
        <Window className={styles.workspace} chrome="hairline" url="Juniper Coffee / Release review">
          <div className={styles.delivery} data-delivery-step={step}>
            <div className={styles.deliveryCopy}>
              <div className={styles.deliveryTitle}>Launch assets</div>
              <p className={styles.assetCount}>{Math.min(step, deliverables.length)} of {deliverables.length} checks passed</p>
              <ul className={styles.deliverables}>
                {deliverables.map((item, index) => (
                  <li key={item.label} data-ready={step > index}>
                    <item.icon size={14} />
                    <span>{item.label}</span>
                    <span className={styles.deliverableState}>
                      <Circle size={12} className={styles.deliverablePending} />
                      <Check size={14} className={styles.deliverableCheck} />
                    </span>
                  </li>
                ))}
              </ul>
              <Button data-target="release-review" variant="primary" size="small" icon={step === ready.step ? <Check size={12} /> : undefined}>
                {step === ready.step ? "Review requested" : "Request review"}
              </Button>
              <span data-target="release-entry" className={styles.releaseEntry} />
            </div>
            <div className={styles.artwork}>
              <img src={coffee} alt="" />
              <span>Juniper Coffee <ArrowUpRight size={14} /></span>
            </div>
          </div>
        </Window>
      )}
    </PreviewStage>
  );
}

export function PricingPreview({ postCounts }) {
  return (
    <PreviewStage tone="clay" initial={start} poster={complete} script={comparePackages}>
      {({ step }) => (
        <div className={styles.comparison} data-comparison-step={step}>
          <div className={styles.comparisonHeader}>
            <strong>Social Creative</strong>
            <span>Package preview</span>
          </div>
          <div className={styles.optionGrid}>
            {Object.entries(postCounts).map(([tier, count], index) => (
              <div className={styles.option} key={tier} data-reveal={step > index}>
                <strong>{tier}</strong>
                <div className={styles.optionAmount}>
                  <span>{count}</span>
                  <span>posts</span>
                </div>
                <div className={styles.optionTrack}>
                  <span style={{ width: `${100 * count / postCounts.premium}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.comparisonFooter}><Check size={14} /> <span>Ready-to-post files with both tiers</span></div>
        </div>
      )}
    </PreviewStage>
  );
}

export function ContactPreview() {
  return (
    <PreviewStage tone="inbox" initial={start} poster={complete} script={sendExample} cursor={enquiryCursor}>
      {({ step }) => (
        <Window className={styles.inbox} chrome="hairline" url="Studio inbox / Example enquiry">
          <div className={styles.mail} data-enquiry-step={step}>
            <div className={styles.sender}><span>JC</span><div><strong>Juniper Coffee</strong><small>Project enquiry</small></div><Mail size={17} /></div>
            <h3>Website for our new café</h3>
            <p>We open in March. We need a menu, opening hours, and a way to book a table.</p>
            <div className={styles.mailAction}>
              <span><FileText size={14} /> Website brief</span>
              <Button size="medium" variant="primary" data-target="send-example" trailingIcon={step === 2 ? <Check size={14} /> : undefined}>
                {["Create brief", "Creating…", "Brief created"][step]}
              </Button>
            </div>
            <span className={styles.inboxEntry} data-target="enquiry-cursor-entry" />
          </div>
        </Window>
      )}
    </PreviewStage>
  );
}
