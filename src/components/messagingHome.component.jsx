import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CircleX,
  Instagram,
  MessageCircle,
  Music2,
  Phone,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  motion as Motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import audiencePortrait from "../assets/audience-portrait.webp";
import { BriefAnimation, ReviewAnimation, LaunchAnimation } from "./gettingStartedPreviews.component";
import photo from "../assets/services-coffee.webp";
import "./messagingHome.css";

const channels = [
  {
    name: "Instagram",
    slug: "instagram",
    Icon: Instagram,
    color: "#c6299c",
    detail: "Turn comments, mentions, and story replies into DMs.",
  },
  {
    name: "TikTok",
    slug: "tiktok",
    Icon: Music2,
    color: "#111",
    detail: "Continue the conversation with viewers in their inbox.",
  },
  {
    name: "WhatsApp",
    slug: "whatsapp",
    Icon: Phone,
    color: "#008c4e",
    detail: "Send updates and answer customers in the same chat.",
  },
  {
    name: "Messenger",
    slug: "messenger-marketing",
    Icon: MessageCircle,
    color: "#695aff",
    detail: "Welcome new contacts and follow up in Messenger.",
  },
];
const signup = "/contact";
function StartLink({ children = "Start a project" }) {
  return (
    <a className="msg-pill" href={signup}> 
      {children}
    </a>
  );
}

export function Audience() {
  const sequence = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sequence,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 0.84],
    ["-28vw", "48vw", "72vw"],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.42, 0.57, 0.71, 0.84],
    [1, 1, 1.65, 3.7, 11],
  );
  const yellowFill = useTransform(scrollYProgress, [0.74, 0.84], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.85, 0.94], [1, 0]);
  const visibility = useTransform(scrollYProgress, (p) =>
    p >= 0.94 ? "hidden" : "visible",
  );

  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const el = track.current;
    const update = () =>
      setEdges({
        start: el.scrollLeft < 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);
  function move(direction) {
    const el = track.current;
    const distance = el.children[1].offsetLeft - el.children[0].offsetLeft;
    el.scrollBy({
      left: direction * distance,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      ref={sequence}
      className="msg-audience-sequence"
      aria-labelledby="audience-heading"
    >
      <span className="msg-channel-anchor" id="channels" aria-hidden="true" />
      <div className="msg-audience-stage">
        <div
          className="msg-audience"
          onFocus={() => {
            if (!reduced && scrollYProgress.get() < 0.94)
              document
                .getElementById("channels")
                .scrollIntoView({ behavior: "instant" });
          }}
        >
          <h2 id="audience-heading">
            Grow where your
            <br /> customers are
          </h2>
          <div
            className="msg-carousel"
            ref={track}
            aria-label="Messaging channels"
            tabIndex={0}
          >
            {channels.map((channel) => (
              <article key={channel.slug}>
                <h3>
                  <channel.Icon size={25} color={channel.color} />
                  {channel.name}
                </h3>
                <p>{channel.detail}</p>
                <a href={"https://SummitDigital.in/product/" + channel.slug}>
                  Learn more <ChevronRight size={14} />
                </a>
              </article>
            ))}
          </div>
          <div className="msg-controls">
            <button
              disabled={edges.start}
              onClick={() => move(-1)}
              aria-label="Previous channel"
            >
              <ArrowLeft />
            </button>
            <button
              disabled={edges.end}
              onClick={() => move(1)}
              aria-label="Next channel"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        {!reduced && (
          <Motion.div
            aria-hidden="true"
            className="msg-audience-overlay"
            style={{ opacity, visibility }}
          >
            <img
              src={audiencePortrait}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <Motion.span className="msg-audience-word" style={{ x, scale }}>
              Everywhere
            </Motion.span>
            <Motion.div
              className="msg-audience-fill"
              style={{ opacity: yellowFill }}
            />
          </Motion.div>
        )}
      </div>
    </section>
  );
}
function Heading({ icon, title, children, id }) {
  const HeadingIcon = icon;
  return (
    <header className="msg-heading">
      <HeadingIcon aria-hidden="true" />
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}
const comparison = [
  [
    "Without a shared plan",
    "Growth feels like hard work",
    [
      "Campaigns without a clear audience",
      "Enquiries scattered across channels",
      "Software that slows down your team",
      "Content published without a schedule",
    ],
  ],
  [
    "With SummitDigital",
    "Ready for your next stage",
    [
      "Marketing built around your goals",
      "A clear route from enquiry to follow-up",
      "Custom software for your workflows",
      "Consistent media planning and publishing",
    ],
  ],
];
export function InboxComparison() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 18%", "end 100%"],
  });
  // Each card travels half its width plus half the gap to share one footprint.
  const shift = useTransform(scrollYProgress, [0, 0.65, 1], ["calc(0% + 0px)", "calc(-50% - 6px)", "calc(-50% - 6px)"]);
  const shiftBack = useTransform(scrollYProgress, [0, 0.65, 1], ["calc(0% + 0px)", "calc(50% + 6px)", "calc(50% + 6px)"]);
  return (
    <section className="msg-section" id="inbox">
      <Heading icon={Workflow} title="Campaign enquiries, before and after">
        Bring your marketing, customer enquiries, software, and media into one plan.
      </Heading>
      <div className="msg-compare-track" ref={ref}>
        <div className="msg-comparison">
          {comparison.map(([label, title, items], i) => (
            <Motion.article
              key={label}
              style={reduced ? undefined : { x: i ? shift : shiftBack }}
            >
              <small>{label}</small>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    {item}
                    {i ? <Check size={16} /> : <CircleX size={16} />}
                  </li>
                ))}
              </ul>
              <StartLink />
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
const flows = [
  [
    "Greet new followers",
    "Thanks for the follow! Want a quick tour?",
    "Yes, show me around",
    "Here’s where to start.",
  ],
  [
    "Send a welcome message",
    "Welcome! What brings you here today?",
    "I’m browsing",
    "Great. Take a look at our latest collection.",
  ],
  [
    "Answer common questions",
    "How can we help?",
    "When do you ship?",
    "Orders ship on weekdays. We’ll send tracking by DM.",
  ],
  [
    "Reply to comments",
    "You asked for the guide in the comments.",
    "Send the guide",
    "Here’s your copy. Enjoy!",
  ],
  [
    "Run a giveaway",
    "Ready to enter this week’s giveaway?",
    "Count me in",
    "You’re on the list. Good luck!",
  ],
];
export function ChatPreview({ index = 0, replay = false }) {
  const thread = useRef(null);
  const visible = useInView(thread, { amount: .6 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!replay || !visible || reduced) return;
    const bubbles = Array.from(thread.current.children);
    const animations = bubbles.map((bubble, i) => {
      const start = .04 + i * .22;
      const enter = { opacity: 0, transform: "translateY(9px) scale(.96)" };
      const hold = { opacity: 1, transform: "none" };
      return bubble.animate([
        { ...enter, offset: 0 }, { ...enter, offset: start, easing: "ease-out" },
        { ...hold, offset: start + .085 }, { ...hold, offset: .87 },
        { opacity: 0, transform: "translateY(-5px)", offset: .97 },
        { ...enter, offset: 1 },
      ], { duration: 5800, iterations: Infinity });
    });
    return () => animations.forEach(animation => animation.cancel());
  }, [index, replay, visible, reduced]);
  const flow = flows[index];
  return (
    <div className="msg-phone" aria-hidden="true">
      <div className="msg-profile">
        <img alt="" src={photo} />
        <strong>Studio inbox</strong>
      </div>
      <div key={index} ref={thread} className="msg-thread" data-replay={replay || undefined}>
        <span>{flow[1]}</span>
        <span>{flow[2]}</span>
        <span>{flow[3]}</span>
      </div>
      <div className="msg-compose">Message…</div>
    </div>
  );
}
export function Automations() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="msg-section" id="project-examples">
      <Heading
        icon={Sparkles}
        title="Turn marketing interest into business enquiries"
      >
        See how a campaign, brand promotion, or media post can start a conversation with your next customer.
      </Heading>
      <div className="msg-demo">
        <div className="msg-picker">
          <h3>See it in action…</h3>
          {flows.map(([title], i) => (
            <button
              key={title}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              {title}
              <ChevronRight size={14} />
            </button>
          ))}
          <StartLink />
        </div>
        <ChatPreview index={selected} />
        <p aria-live="polite">
          {flows[selected][0]} with a conversation that follows up for you.
        </p>
      </div>
    </section>
  );
}
const steps = [
  ["Set the brief", "Tell us about your audience, business goals, and timeline."],
  [
    "Create and build",
    "Review the campaign creative or try a working version of your software.",
  ],
  ["Launch and refine", "Go live and use feedback from real customers to guide improvements."],
];
export function GettingStarted() {
  return (
    <section className="msg-section" id="process-heading">
      <Heading icon={Rocket} title="From first brief to launch">
        Plan your marketing, grow your business, build your software, and manage your media with one team.
      </Heading>
      <div className="msg-steps">
        {steps.map(([title, desc], i) => (
          <article key={title}>
            {i === 0 ? <BriefAnimation /> : i === 1 ? <ReviewAnimation /> : <LaunchAnimation />}
            <h3>
              Step {i + 1}: {title}
            </h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <div className="msg-actions">
        <StartLink>Discuss your project</StartLink>
        <a
          className="msg-pill outline"
          href="/pricing"
        >
          See plans
        </a>
      </div>
    </section>
  );
}
