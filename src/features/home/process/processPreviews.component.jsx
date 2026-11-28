import { ArrowUpRight, CalendarDays, Check, Globe2, Video } from "lucide-react";
import { Badge } from "../../../components/stageshow/controls/Badge";
import { Button } from "../../../components/stageshow/controls/Button";
import { Roll } from "../../../components/stageshow/motion/Roll";
import { Window } from "../../../components/stageshow/window";
import { PreviewStage } from "../../../components/cards/splitCard.component";
import styles from "./processSteps.module.css";

const milestones = [
  { name: "Scope", start: 1, span: 2 },
  { name: "Design", start: 2, span: 3 },
  { name: "Build", start: 4, span: 3 },
];

const empty = { step: 0 };
const confirmed = { step: 1 };
const planned = { step: milestones.length };
const published = { step: 2 };
const launchCursor = { at: "preview-cursor-start", style: "arrow", ripple: true };

async function bookKickoff(act) {
  await act.wait(450);
  act.mark("kickoff-confirmed");
  await act.set(confirmed);
}

async function drawPlan(act) {
  await act.wait(650);
  for (const [index, { name }] of milestones.entries()) {
    act.mark(name.toLowerCase());
    await act.set({ step: index + 1 });
    await act.wait(220);
  }
}

async function publishSite(act) {
  await act.wait(950);
  await act.move({ at: "preview-publish", x: .86, y: .65 }, { duration: 680 });
  act.mark("publish-click");
  await act.click();
  await act.set({ step: 1 });
  await act.wait(1050);
  act.mark("site-live");
  await act.set(published);
  await act.move("preview-cursor-start", { duration: 500 });
}

export function KickoffPreview() {
  return (
    <PreviewStage tone="sage" initial={empty} script={bookKickoff} poster={confirmed}>
      {({ step }) => (
        <div className={styles.appointment}>
          <div className={styles.appointmentHeader}>
            <span><CalendarDays size={16} /> Calendar</span>
            <Badge tone={step === 1 ? "success" : "neutral"} className={styles.booking}
              icon={<Check size={12} />} data-confirmation={step === 1}>
              <Roll variant="fade">{step === 1 ? "Confirmed" : "Pending"}</Roll>
            </Badge>
          </div>
          <div className={styles.event}>
            <div className={styles.date}><span>May</span><strong>14</strong></div>
            <div className={styles.agenda}>
              <strong>Kickoff call</strong>
              <span>Thu, 10–10:30 AM</span>
              <span className={styles.callDetails}><Video size={14} /> Video call</span>
            </div>
          </div>
          <div className={styles.callAgenda}>
            <strong>Agenda</strong>
            <span>Goals, audience, and next steps</span>
          </div>
        </div>
      )}
    </PreviewStage>
  );
}

export function PlanPreview() {
  return (
    <PreviewStage tone="clay" initial={empty} script={drawPlan} poster={planned}>
      {({ step }) => (
        <div className={styles.timeline} data-milestones={step}>
          <div className={styles.timelineHeader}>
            <strong>Project timeline</strong>
            <span>May–Jun</span>
          </div>
          <div className={styles.schedule}>
            <div className={styles.weeks}><span>May 18</span><span>May 25</span><span>Jun 1</span></div>
            {milestones.map(({ name, start, span }, index) => (
              <div className={styles.milestone} key={name}>
                <span>{name}</span>
                <div className={styles.track}>
                  <div className={styles.bar} data-filled={step > index}
                    style={{ gridColumn: `${start} / span ${span}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PreviewStage>
  );
}

export function LaunchPreview() {
  return (
    <PreviewStage tone="blue" initial={empty} script={publishSite} poster={published} cursor={launchCursor}>
      {({ step }) => (
        <div data-release={step}>
          <Window className={styles.browser} chrome="hairline" url="fieldstudio.example">
            <div className={styles.releaseBar}>
              <span><Globe2 size={14} /> <Roll variant="fade">{step === 2 ? "Production" : "Staging"}</Roll></span>
              <Button className={styles.publish} variant="primary" size="large" data-target="preview-publish">
                {["Publish", "Publishing", "Published"][step]}
              </Button>
            </div>
            <div className={styles.sampleSite}>
              <div className={styles.sampleCopy}>
                <span>Field Studio</span>
                <div>Make room<br /> for good work.</div>
                <span className={styles.sampleLink}>Our work <ArrowUpRight size={12} /></span>
              </div>
              <div className={styles.sampleArtwork}>
                <div /><div /><div /><div />
              </div>
            </div>
          </Window>
          <div className={styles.live} data-visible={step === 2}>
            <span className={styles.liveIcon}><Check size={16} /></span>
            <div><strong>Site is live</strong><span>Production deploy complete</span></div>
          </div>
          <div className={styles.cursorStart} data-target="preview-cursor-start" />
        </div>
      )}
    </PreviewStage>
  );
}
