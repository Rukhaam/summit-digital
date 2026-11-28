import { useCallback, useLayoutEffect, useRef } from "react";
import { motion as Motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./landingCard.module.css";

const entranceRange = ["start 114%", "start 64%"];

export default function LandingCard({ children, className = "", reverse = false, role }) {
  const frame = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: entranceRange });
  const depth = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.3, 0]);

  const syncPlayback = useCallback((focused) => {
    // Targeted cursor demos need the card's front plane to be flat.
    const host = frame.current;
    if (!host) return;
    const playback = reduceMotion || focused || scrollYProgress.get() >= 1 ? "ready" : "paused";
    if (host.dataset.ssPlayback !== playback) host.dataset.ssPlayback = playback;
  }, [reduceMotion, scrollYProgress]);

  const syncScroll = useCallback(() => {
    syncPlayback(frame.current?.contains(document.activeElement));
  }, [syncPlayback]);
  useMotionValueEvent(scrollYProgress, "change", syncScroll);
  useLayoutEffect(syncScroll, [syncScroll]);

  return (
    <div
      className={`${styles.frame} ${className}`}
      data-landing-card=""
      data-ss-playback={reduceMotion ? "ready" : "paused"}
      data-reverse={reverse || undefined}
      ref={frame}
      role={role}
      onFocus={() => syncPlayback(true)}
      onBlur={(event) => syncPlayback(event.currentTarget.contains(event.relatedTarget))}
    >
      <Motion.div className={styles.surface} style={reduceMotion ? undefined : { "--card-depth": depth }}>
        {children}
      </Motion.div>
    </div>
  );
}
