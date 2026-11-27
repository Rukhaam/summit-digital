import { ArrowUpRight, CalendarDays, Check, Ellipsis, FileText, Folder, Settings } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import LandingCard from "./landingCard.component";
import { Button } from "./stageshow/controls/Button";
import { Field } from "./stageshow/controls/Field";
import { Segmented } from "./stageshow/controls/Segmented";
import { Stage } from "./stageshow/stage";
import { Text, Window } from "./stageshow/window";
import styles from "./callToAction.module.css";

const exampleTitle = "A new site for my studio";
const initial = { service: 1, title: "", editing: false, status: "draft" };
const poster = { service: 0, title: exampleTitle, editing: false, status: "saved" };
const compact = { below: 456, width: 342, height: 308 };
const cursor = { at: "brief-entry", ripple: true, idle: 520 };
const tokens = {
  "--ss-font": '"Plus Jakarta Sans", system-ui, sans-serif',
  "--ss-canvas": "#fdfcf9",
  "--ss-chrome": "#f5f3ee",
  "--ss-surface": "#fffefb",
  "--ss-ink-2": "#efede7",
  "--ss-ink-4": "#d9d5ca",
  "--ss-line": "#ddd7ca",
  "--ss-text-strong": "#282d26",
  "--ss-text": "#565b52",
  "--ss-text-faint": "#6e7268",
  "--ss-accent": "#33483a",
  "--ss-accent-soft": "#dce7db",
  "--ss-success": "#34744e",
  "--ss-control": "38px",
  "--ss-row": "30px",
  "--ss-radius-window": "14px",
};

const buttonLabel = { draft: "Save brief", saving: "Saving…", saved: "Brief saved" };

async function saveBrief(act) {
  await act.wait(740);
  await act.move("brief-website", { duration: 620 });
  await act.click();
  act.mark("service");
  act.put({ service: 0 });
  await act.wait(280);
  await act.move("brief-title", { duration: 560 });
  await act.click();
  act.mark("typing");
  act.put({ editing: true });
  await act.type("title", exampleTitle, { interval: 62 });
  await act.wait(350);
  act.put({ editing: false });
  await act.move("brief-save", { duration: 650 });
  await act.click();
  act.mark("saving");
  act.put({ status: "saving" });
  await act.wait(540);
  act.mark("saved");
  act.put(poster);
  await act.move(act.center("brief-exit"), { duration: 620 });
}

const viewport = { once: true, amount: 0.4 };
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const ease = [0.22, 1, 0.36, 1];

function ProjectPreview({ revealOnView }) {
  return (
    <Motion.div
      className={styles.preview}
      aria-hidden="true"
      initial={revealOnView ? { opacity: 0 } : false}
      whileInView={revealOnView ? { opacity: 1 } : undefined}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.66, ease }}
    >
      <Stage
        width={552}
        height={362}
        compact={compact}
        className={styles.stage}
        fidelity="realistic"
        fill
        tokens={tokens}
        initial={initial}
        poster={poster}
        script={saveBrief}
        cursor={cursor}
        play="once"
      >
        {({ service, title, editing, status }, _rect, layout) => (
          <>
            <Window
              title="Project workspace"
              lights="grey"
              className={styles.window}
              sidebarWidth={112}
              toolbar={layout === "compact" ? <Ellipsis className={styles.toolbarIcon} size={17} /> : undefined}
              sidebar={layout === "wide" ? (
                <div className={styles.sidebar}>
                  <span className={styles.current}><FileText size={15} /> Brief</span>
                  <span><CalendarDays size={15} /> Timeline</span>
                  <span><Folder size={15} /> Files</span>
                  <span className={styles.settings}><Settings size={15} /> Settings</span>
                </div>
              ) : undefined}
            >
              <div className={styles.editor} data-brief-status={status}>
                <div className={styles.editorHeading}>
                  <span className={styles.document}><FileText size={18} strokeWidth={1.6} /></span>
                  <Text>Project brief</Text>
                </div>
                <div className={styles.service}>
                  <Text className={styles.label}>Service</Text>
                  <Segmented
                    items={["Website", "Branding", "Marketing"]}
                    value={service}
                    targets={["brief-website"]}
                    cursor="button"
                  />
                </div>
                <Field
                  className={styles.field}
                  label="Project name"
                  value={title}
                  placeholder="Name your project"
                  focused={editing}
                  box={{ "data-target": "brief-title" }}
                />
                <Button
                  className={styles.save}
                  variant="primary"
                  size="large"
                  data-target="brief-save"
                  icon={status === "saved" ? <Check size={16} /> : undefined}
                >
                  {buttonLabel[status]}
                </Button>
              </div>
            </Window>
            <span className={styles.cursorEntry} data-target="brief-entry" data-decorative="" />
            <span className={styles.cursorExit} data-target="brief-exit" data-decorative="" />
          </>
        )}
      </Stage>
    </Motion.div>
  );
}

function CallToAction({ parallax = false }) {
  const reduceMotion = useReducedMotion();
  const revealOnView = !reduceMotion && !parallax;

  const panel = (
    <div className={styles.panel}>
      <Motion.div
        className={styles.copy}
        initial={revealOnView ? "hidden" : false}
        whileInView={revealOnView ? "visible" : undefined}
        viewport={viewport}
      >
        <Motion.h2 id="next-project-heading" variants={reveal} transition={{ duration: 0.72, ease }}>
          Let’s build <span>what’s next.</span>
        </Motion.h2>
        <Motion.p variants={reveal} transition={{ duration: 0.72, delay: 0.1, ease }}>
          Tell us what you want to launch or improve.
        </Motion.p>
        <Motion.div variants={reveal} transition={{ duration: 0.72, delay: 0.2, ease }}>
          <Link className={`site-button ${styles.cta}`} to="/contact">
            Start a project
            <span className={styles.arrow}><ArrowUpRight size={21} aria-hidden="true" /></span>
          </Link>
        </Motion.div>
      </Motion.div>
      <ProjectPreview revealOnView={revealOnView} />
    </div>
  );

  return (
    <section className="site-section site-container" aria-labelledby="next-project-heading">
      {parallax ? <LandingCard>{panel}</LandingCard> : panel}
    </section>
  );
}

export default CallToAction;
