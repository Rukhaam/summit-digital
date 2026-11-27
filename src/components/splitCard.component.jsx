import { useLayoutEffect, useRef, useState } from "react";
import { Stage } from "./stageshow/stage";
import styles from "./splitCard.module.css";

export function SplitCard({ children, preview, intro = false, copyClassName = "" }) {
  return (
    <div className={intro ? `${styles.card} ${styles.intro}` : styles.card}>
      <div className={`${styles.copy} ${copyClassName}`}>{children}</div>
      {preview}
    </div>
  );
}

export function PreviewStage({ tone, initial, script, poster, cursor, children }) {
  const previewRef = useRef(null);
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    const measure = () => {
      const { clientWidth: width, clientHeight: height } = preview;
      setSize((current) => current?.width === width && current.height === height
        ? current
        : { width, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.preview} data-tone={tone} ref={previewRef} aria-hidden="true">
      {size?.width > 0 && (
        <Stage width={size.width} height={size.height} initial={initial} poster={poster} script={script}
          cursor={cursor} play="once" accent="var(--preview-accent)" className={styles.stage}>
          {children}
        </Stage>
      )}
    </div>
  );
}
