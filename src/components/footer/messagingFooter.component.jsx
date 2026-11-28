import { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import "../../features/home/messaging/messagingHome.css";

const groups = [
  ["Our services", [["Marketing & brand promotion", "/services#brand-launches"], ["Business growth", "/services#digital-strategy"], ["Software development", "/services#web-development"], ["Media management", "/services#social-video"]]],
  ["Explore", [["Our approach", "/#process-heading"], ["Campaign examples", "/#project-examples"], ["Channels", "/#channels"]]],
  ["SummitDigital", [["Services", "/services"], ["Pricing", "/pricing"], ["Contact", "/contact"], ["Instagram", "https://www.instagram.com/summitdigital.in/"], ["WhatsApp · +91 97971 16244", "https://wa.me/919797116244"]]],
  ["Plan a project", [["Enquiry management", "/#inbox"], ["FAQ", "/#faq"], ["Start a brief", "/contact"]]],
];
export default function MessagingFooter() {
  const [playing, setPlaying] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  return <footer className="msg-footer">
    <div><h2>SummitDigital</h2><div className="msg-footer-links">{groups.map(([name, links]) => <div key={name}><h3>{name}</h3>{links.map(([label, path]) => <a key={label} href={path}>{label}</a>)}</div>)}</div><small>© {new Date().getFullYear()} SummitDigital</small></div>
    <div className="msg-footer-art" data-playing={playing}><strong>Selling<br />More</strong><span aria-hidden="true">↗</span><button aria-label={playing ? "Pause animation" : "Play animation"} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></div>
    <a className="msg-footer-cta" href="/contact">Let’s grow your business <ArrowUpRight /></a>
  </footer>;
}
