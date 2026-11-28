import styles from "./gettingStartedPreviews.module.css";
import signup from "../../../assets/process/signup.webp";
import signupDetail from "../../../assets/process/signup-detail.png";
import channels from "../../../assets/process/channels.webp";

import setup from "../../../assets/process/setup.webp";
import setupDetail from "../../../assets/process/setup-detail.png";

function Preview({ scene, background, detail, label }) {
  return (
    <div className={styles.preview} role="img" aria-label={label}>
      <img loading="lazy" decoding="async" className={styles.background} src={background} alt="" width="427" height="292" />
      {detail && <img loading="lazy" decoding="async" className={styles[scene]} src={detail} alt="" />}
    </div>
  );
}

export function BriefAnimation() {
  return <Preview scene="signup" background={signup} detail={signupDetail} label="A cursor hovers over Get Started Free on a yellow grid." />;
}

export function ReviewAnimation() {
  return <Preview scene="channels" background={channels} label="A link connects the app to a profile on a lavender checkerboard." />;
}

export function LaunchAnimation() {
  return <Preview scene="setup" background={setup} detail={setupDetail} label="A cursor moves to Set Up beside Conversation Starters." />;
}
