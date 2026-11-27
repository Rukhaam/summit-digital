import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Instagram, Pause, Play, X } from "lucide-react";
import styles from "./creatorStrip.module.css";

const stories = [
  {
    name: "Natasha Willis", followers: "27.3K followers", handle: "Natasha Willis",
    quote: "We've used SummitDigital to generate over $65 million in sales…",
  },
  {
    name: "Giovanni Begossi", followers: "2M followers", handle: "@elprofessordaoratoria",
    quote: "My Instagram account gained over 1 million followers in less than a year… Today we use SummitDigital on more than one profile in our company.",
  },
  {
    name: "Cassie Schoonover", followers: "504K followers", handle: "@cassie.schoonover",
    quote: "This is a 10 out of 10. The functionality, the creativity, the ability to create the flows in the ways that you can do it… This is one of the most important tools for our brand to get to the level that we're attempting to get to.",
  },
  {
    name: "Michelle Hansen", followers: "214K followers", handle: "Michelle Hansen",
    quote: "I've had over 3 million new views to my account in the last 30 days.",
  },
];

function Portrait({ index, badge = false }) {
  return <span className={styles.portrait}>
    <img src={`https://mccdn.me/martcdn/next-lp/contents/home-redesign/influencer_0${index + 1}v2.jpg`} alt="" loading="lazy" />
    {badge && <Instagram className={styles.instagram} size={18} aria-hidden="true" />}
  </span>;
}

export default function CreatorStrip() {
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const dialog = useRef(null);
  const scrollArea = useRef(null);
  const storyRefs = useRef([]);

  const viewport = useRef(null);
  const cards = useRef([]);
  const currentSlide = useRef(1);

  function centerSlide(index, behavior) {
    const rail = viewport.current;
    const card = cards.current[index];
    const offset = card.getBoundingClientRect().left - rail.getBoundingClientRect().left;
    rail.scrollTo({ left: rail.scrollLeft + offset - (rail.clientWidth - card.offsetWidth) / 2, behavior });
  }

  useLayoutEffect(() => {
    const rail = viewport.current;
    const mobile = window.matchMedia("(max-width: 600px)");
    const resize = new ResizeObserver(() => {
      if (mobile.matches) centerSlide(currentSlide.current, "instant");
      else rail.scrollLeft = 0;
    });
    resize.observe(rail);
    return () => resize.disconnect();
  }, []);

  function moveSlide(direction) {
    currentSlide.current = (currentSlide.current + direction + stories.length) % stories.length;
    centerSlide(currentSlide.current, matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth");
  }

  function syncSlide() {
    const rail = viewport.current;
    const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    const index = cards.current.findIndex(card => {
      const rect = card.getBoundingClientRect();
      return center >= rect.left && center <= rect.right;
    });
    if (index >= 0) currentSlide.current = index;
  }

  useEffect(() => {
    if (selected === null) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    const area = scrollArea.current;
    const story = storyRefs.current[selected];
    area.scrollTop += story.getBoundingClientRect().top - area.getBoundingClientRect().top - 80;
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return <>
    <aside className={styles.strip} aria-label="SummitDigital creator stories" data-paused={paused || selected !== null}>
      <div className={styles.label}>
        <strong>❤️ Creator stories,<br />marketers &amp; brands</strong>
        <div><span>From SummitDigital</span><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play creator marquee" : "Pause creator marquee"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
      </div>
      <h2 className={styles.mobileHeading}><span aria-hidden="true">&#10084;&#65039;</span>&#8217;d by 2M+ creators, marketers &amp; brands</h2>
      <div className={styles.viewport} ref={viewport} onScroll={syncSlide}>
        <div className={styles.track}>
          {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 || undefined}>
            {stories.map((story, index) => <button className={styles.card} type="button" key={story.name} ref={copy === 0 ? node => { cards.current[index] = node; } : undefined} tabIndex={copy === 1 ? -1 : 0} onClick={() => setSelected(index)} aria-label={`Read ${story.name}'s story`}>
              <Portrait index={index} />
              <span className={styles.summary}>
                <span><span className={styles.name}>{story.name}</span> <span className={styles.followers}>{story.followers}</span></span>
                <span className={styles.excerpt}>“{story.quote}”</span>
                <span className={styles.mobileExcerpt}>&ldquo;{story.quote.split("\u2026")[0]}...&rdquo;</span>
                <span className={styles.learn}>Learn more <ArrowRight size={16} /></span>
              </span>
            </button>)}
          </div>)}
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous creator story"><ArrowLeft size={18} /></button>
        <button type="button" onClick={() => moveSlide(1)} aria-label="Next creator story"><ArrowRight size={18} /></button>
      </div>
    </aside>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="creator-dialog-heading" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className={styles.scrollArea} ref={scrollArea}>
        <div className={styles.dialogBar}><h2 id="creator-dialog-heading">SummitDigital creator stories</h2><button type="button" onClick={() => setSelected(null)} aria-label="Close creator stories" autoFocus><X size={22} /></button></div>
        {stories.map((story, index) => <article className={styles.story} key={story.name} ref={element => { storyRefs.current[index] = element; }}>
          <header><Portrait index={index} badge /><div><h3 className={styles.name}>{story.handle}</h3><p className={styles.followers}>{story.followers}</p></div></header>
          <blockquote>“{story.quote}”</blockquote>
        </article>)}
        <a className={styles.source} href="https://summitdigital.in/" target="_blank" rel="noreferrer">Creator testimonials from SummitDigital <ArrowRight size={16} /></a>
      </div>
    </dialog>
  </>;
}
