import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Activity, ArrowDownWideNarrow, CalendarDays, Check, Globe2, ImageIcon,
  LayoutTemplate, Link2, Mail, Pause, Play, Type,
} from "lucide-react";
import coffee from "../../../assets/services-coffee.webp";
import studio from "../../../assets/hero-studio.webp";
import courtyard from "../../../assets/capabilities-courtyard.webp";
import { Button } from "../../../components/stageshow/controls/Button";
import { Badge } from "../../../components/stageshow/controls/Badge";
import { Segmented } from "../../../components/stageshow/controls/Segmented";
import { Roll } from "../../../components/stageshow/motion/Roll";
import { Stage } from "../../../components/stageshow/stage";
import { Window } from "../../../components/stageshow/window";
import styles from "./servicePreviews.module.css";

const firstFrame = { step: 0 };
const webTokens = {
  "--ss-canvas": "#eee6d7",
  "--ss-chrome": "#fbf6ea",
  "--ss-line": "#e2d7c4",
  "--ss-ink-2": "#eae2d2",
  "--ss-text-strong": "#312c23",
  "--ss-row": "22px",
};
const webCursor = { at: "service-web-entry", ripple: true, idle: 480 };

async function changeViewport(act) {
  await act.wait(520);
  await act.move("service-desktop", { duration: 650 });
  await act.click();
  act.mark("desktop-preview");
  await act.set({ step: 1 });
  await act.wait(680);
  await act.move(act.center("service-web-exit"), { duration: 500 });
}

function sequence(beats) {
  return async (act) => {
    for (const [index, [wait, marker]] of beats.entries()) {
      await act.wait(wait);
      act.mark(marker);
      await act.set({ step: index + 1 });
    }
  };
}

const revealPalette = sequence([[610, "palette-revealed"]]);
const editCursor = { at: "edit-entry", ripple: true };
const sortCursor = { at: "sort-entry", ripple: true };

async function playStoryboard(act) {
  await act.wait(900);
  await act.move("play-cut", { duration: 650 });
  await act.click();
  for (let step = 1; step <= 3; step++) {
    await act.set({ step });
    await act.wait(1500);
  }
  await act.set({ step: 4 });
}

async function rankFindings(act) {
  await act.wait(950);
  await act.move("sort-findings", { duration: 670 });
  await act.click();
  await act.set({ step: 1 });
  await act.move("sort-entry", { duration: 500 });
}
const scheduleLaunch = sequence([[690, "website-ready"], [800, "social-ready"], [800, "email-ready"]]);
const finishHealthCheck = sequence([[700, "pages-checked"], [520, "links-checked"]]);

function ServicePreview({ height, script, lastStep = 1, cursor, tokens, children }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  const replay = useCallback(async (act) => {
    await script(act);
    await act.wait(1900);
    if (cursor) await act.move(cursor.at, { duration: 550 });
    await act.set(firstFrame);
    await act.wait(950);
  }, [script, cursor]);

  useLayoutEffect(() => {
    const frame = ref.current;
    const measure = () => setWidth(frame.clientWidth);
    const observer = new ResizeObserver(measure);
    measure();
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.preview} aria-hidden="true" inert style={{ minHeight: height }}>
      {width > 0 && (
        <Stage
          width={width}
          height={height}
          initial={firstFrame}
          poster={{ step: lastStep }}
          script={replay}
          cursor={cursor}
          tokens={tokens}
          className={styles.stage}
          fidelity="realistic"
          play="loop"
        >
          {({ step }) => children(step, width)}
        </Stage>
      )}
    </div>
  );
}

export function WebsitePreview() {
  return (
    <ServicePreview height={316} script={changeViewport} cursor={webCursor} tokens={webTokens}>
      {(step, width) => (
        <>
          <Window
            className={styles.website}
            title={width >= 415 ? "Website preview" : undefined}
            lights="grey"
            toolbar={
              <Segmented
                items={["Mobile", "Desktop"]}
                value={step}
                targets={[undefined, "service-desktop"]}
                cursor="button"
              />
            }
          >
            <div className={styles.sampleSite} data-viewport={step ? "desktop" : "mobile"}>
              <img src={coffee} width={1050} height={700} alt="" loading="lazy" decoding="async" />
              <div className={styles.sampleCopy}>
                <span>Juniper Coffee</span>
                <strong>Make time<br />for good coffee.</strong>
              </div>
            </div>
          </Window>
          <span className={styles.webEntry} data-target="service-web-entry" data-decorative="" />
          <span className={styles.webExit} data-target="service-web-exit" data-decorative="" />
        </>
      )}
    </ServicePreview>
  );
}

const palette = ["#27232C", "#CCB4E2", "#FF926D", "#FFF102"];
export function IdentityPreview() {
  return (
    <ServicePreview height={292} script={revealPalette}>
      {(step) => (
        <div className={styles.identity} data-palette-ready={Boolean(step)}>
          <div className={styles.wordmark}><small>Primary mark</small>Form <i /> Field</div>
          <div className={styles.swatches}>
            {palette.map((color, index) => (
              <span key={color} style={{ "--swatch": color, "--swatch-order": index }}><code>{color.toUpperCase()}</code></span>
            ))}
          </div>
        </div>
      )}
    </ServicePreview>
  );
}

const clips = [
  { photo: courtyard, label: "Exterior" },
  { photo: studio, label: "Portrait" },
  { photo: coffee, label: "Coffee" },
];

export function StoryboardPreview() {
  return (
    <ServicePreview height={348} script={playStoryboard} lastStep={4} cursor={editCursor}>
      {(step) => {
        const active = Math.max(0, Math.min(step - 1, clips.length - 1));
        const playing = step > 0 && step < 4;
        return <div className={styles.editor} data-active-scene={active}>
          <div className={styles.editorHead}><strong>Juniper launch reel</strong><span>Rough cut</span></div>
          <div className={styles.monitor}>
            {clips.map(({ photo, label }, index) => <img key={label} data-visible={index === active} loading="lazy" decoding="async" src={photo} alt="" />)}
            <span>{clips[active].label}</span>
          </div>
          <div className={styles.transport}>
            <Button data-target="play-cut" size="small" variant="ghost" icon={playing ? <Pause size={12} /> : <Play size={12} />}>{playing ? "Playing" : "Play"}</Button>
            <code>{["00:00", "00:00", "00:01.5", "00:03", "00:04.5"][step]} / 00:04.5</code>
          </div>
          <div className={styles.timeline}>
            {clips.map(({ photo, label }) => <span key={label}><img src={photo} loading="lazy" decoding="async" alt="" /></span>)}
            <i data-playing={playing} data-ended={step === 4} />
          </div>
          <span className={styles.editEntry} data-target="edit-entry" />
        </div>;
      }}
    </ServicePreview>
  );
}

const findings = [
  { label: "Clarify the headline", icon: Type, rank: 1 },
  { label: "Fix broken links", icon: Link2, rank: 2 },
  { label: "Simplify booking", icon: CalendarDays, rank: 0 },
];
export function AuditPreview() {
  return (
    <ServicePreview height={288} script={rankFindings} cursor={sortCursor}>
      {(step) => (
        <div className={styles.audit} data-audit-ranked={Boolean(step)}>
          <div className={styles.auditHeader}><strong>Audit findings</strong><Button data-target="sort-findings" size="small" variant="secondary" icon={<ArrowDownWideNarrow size={13} />}>{step ? "By priority" : "Sort"}</Button></div>
          <span className={styles.editEntry} data-target="sort-entry" />
          <div className={styles.auditRows}>
            {findings.map((item, index) => (
              <div
                className={styles.auditRow}
                key={item.label}
                data-priority={item.rank === 0}
                style={{ "--row": step ? item.rank : index }}
              >
                <item.icon size={14} strokeWidth={1.7} />
                <span>{item.label}</span>
                {item.rank === 0 && <Badge tone="warning">Priority</Badge>}
              </div>
            ))}
          </div>
        </div>
      )}
    </ServicePreview>
  );
}

const channels = [
  { label: "Website", date: "Mon", icon: Globe2 },
  { label: "Social", date: "Wed", icon: ImageIcon },
  { label: "Email", date: "Fri", icon: Mail },
];
export function RolloutPreview() {
  return (
    <ServicePreview height={285} script={scheduleLaunch} lastStep={channels.length}>
      {(step) => (
        <div className={styles.rollout} data-rollout-step={step}>
          <div className={styles.calendarLabel}><CalendarDays size={14} /> Launch schedule</div>
          <div className={styles.rolloutTrack} style={{ "--progress": Math.max(0, step - 1) / (channels.length - 1) }} />
          {channels.map((channel, index) => (
            <div className={styles.milestone} data-scheduled={step > index} key={channel.label}>
              <span>{channel.date}</span>
              <span className={styles.channelIcon}><channel.icon size={17} strokeWidth={1.65} /></span>
              <strong>{channel.label}</strong><small>{step > index ? "Scheduled" : "Draft"}</small>
            </div>
          ))}
        </div>
      )}
    </ServicePreview>
  );
}

const signals = [20, 32, 25, 51, 38, 71, 48, 84, 56, 32, 65, 42, 73, 88, 60, 79];
const healthChecks = [
  { label: "Pages checked", icon: LayoutTemplate },
  { label: "Links verified", icon: Link2 },
];
export function HealthPreview() {
  return (
    <ServicePreview height={282} script={finishHealthCheck} lastStep={healthChecks.length}>
      {(step) => (
        <div className={styles.health} data-health-step={step}>
          <div className={styles.healthHeader}>
            <strong><Activity size={16} /> Site health</strong>
            <Badge tone={step === healthChecks.length ? "success" : "neutral"}>
              <Roll variant="fade">{step === healthChecks.length ? "All clear" : "Checking"}</Roll>
            </Badge>
          </div>
          <div className={styles.metric}><span>Page response time</span><strong>{step ? "179 ms" : "Measuring"}</strong></div>
          <div className={styles.healthSignals}>
            {signals.map((height, index) => (
              <span key={index} style={{ "--height": `${height}%`, "--order": index }} />
            ))}
          </div>
          <div className={styles.healthChecks}>
            {healthChecks.map((item, index) => (
              <span data-done={step > index} key={item.label}>
                <span className={styles.checkIcon}><item.icon size={13} /><Check size={13} /></span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </ServicePreview>
  );
}
