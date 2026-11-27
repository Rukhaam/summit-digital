import { MessageCircle } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { Link } from "react-router-dom";
import studioPhoto from "../assets/hero-social.webp";
import { Toast } from "./stageshow/kit/Toast";
import { Stage } from "./stageshow/stage";
import styles from "./heroSection.module.css";

const conversations = [
  ["Where can I see your work?", "Here are our latest projects.", "View projects"],
  ["Can you help with our launch?", "Sure. Tell us about your brand.", "Start a brief"],
];
const initial = { index: 0, question: false, replied: false };
const poster = { index: 0, question: true, replied: true };

async function showEnquiryReply(act) {
  for (let index = 0; index < conversations.length; index++) {
    await act.set({ index, question: true, replied: false });
    await act.wait(850);
    await act.set({ replied: true });
    await act.wait(1900);
    await act.set({ question: false });
    await act.wait(180);
    await act.set({ replied: false });
    await act.wait(450);
  }
  await act.set(initial);
}

function EnquiryPreview() {
  return (
    <div className={styles.preview} aria-hidden="true" inert>
      <Stage
        width={324}
        height={172}
        initial={initial}
        poster={poster}
        script={showEnquiryReply}
        play="loop"
      >
        {({ index, question, replied }) => (
          <div className={styles.thread}>
            <Toast show={question} className={styles.message} icon={<MessageCircle size={16} />}>
              {conversations[index][0]}
            </Toast>
            <Toast show={replied} className={`${styles.message} ${styles.reply}`}>
              {conversations[index][1]}
              <span className={styles.replyAction}>{conversations[index][2]} <span aria-hidden="true">&#8599;</span></span>
            </Toast>
          </div>
        )}
      </Stage>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <img
        className={styles.photo}
        src={studioPhoto}
        width="1536"
        height="1024"
        alt=""
        fetchPriority="high"
      />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.heading} id="hero-heading">
            Marketing that <span className={styles.grows}>grows</span><span> your business.</span>
          </h1>
          <p className={styles.description}>
            We bring marketing, brand promotion, software development, and media management together to help your business grow.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/contact"><span>Start a project</span></Link>

          </div>
        </div>
        <EnquiryPreview />
        <ul className={styles.channels} aria-label="Campaign channels">
          <li><FaInstagram />Instagram</li>
          <li><FaWhatsapp />WhatsApp</li>
          <li><FaFacebookMessenger />Messenger</li>
        </ul>
      </div>
    </section>
  );
}
