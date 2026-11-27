import { ChevronDown, X } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";

const processMenu = [
    { title: "Our approach", links: [["Automation examples", "/#project-examples"], ["Get started in three steps", "/#process-heading"]] },
    { title: "Plan a project", links: [["Compare packages", "/pricing#packages"], ["Tell us what you need", "/contact"]] },
];

const homeMenus = {
  Services: [{ title: "Reach your audience", links: [["Marketing & brand promotion", "/services#brand-launches"], ["Media management", "/services#social-video"]] }, { title: "Build your business", links: [["Business growth", "/services#digital-strategy"], ["Software development", "/services#web-development"]] }],
  "Business growth": [{ title: "Campaigns", links: [["Campaign enquiries", "/#inbox"], ["Brand launches", "/services#brand-launches"]] }, { title: "Development", links: [["Web development", "/services#web-development"], ["Maintenance", "/services#maintenance"]] }],
  "Campaign examples": [{ title: "Explore", links: [["Interactive examples", "/#project-examples"], ["Our services", "/#capabilities"]] }],
  "Get started": processMenu,
  FAQ: [{ title: "Questions", links: [["Frequently asked questions", "/#faq"], ["Pricing", "/pricing"], ["Contact us", "/contact"]] }],
};

const mobileSections = [
  { label: "Products", links: [["All services", "/services"], ...homeMenus.Services.flatMap(group => group.links)] },
  { label: "Solutions", links: homeMenus["Business growth"].flatMap(group => group.links) },
  { label: "Agencies", links: [["Our process", "/#process-heading"], ["Campaign examples", "/#project-examples"], ["Start a project", "/contact"]] },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", links: homeMenus.FAQ[0].links },
];

function MobileMenu({ id, open, onDismiss, onNavigate }) {
  const dialog = useRef(null);
  const [expanded, setExpanded] = useState(null);

  useLayoutEffect(() => {
    if (!open) return;
    const panel = dialog.current;
    const overflow = document.body.style.overflow;
    panel.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      panel.close();
      setExpanded(null);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <dialog ref={dialog} id={id} className={styles.mobilePanel} aria-label="Main menu"
      onCancel={event => { event.preventDefault(); onDismiss(); }}>
      <div className={styles.mobileBar}>
        <Link to="/" onClick={onNavigate} className={styles.mobileMark} aria-label="SummitDigital home">SD</Link>
        <label className={styles.language}>
          <select aria-label="Language" defaultValue="en"><option value="en">EN</option></select>
        </label>
        <button type="button" className={styles.close} autoFocus aria-label="Close navigation" onClick={onDismiss}>
          <X size={25} strokeWidth={1.25} />
        </button>
      </div>
      <div className={styles.account}>
        <Link to="/contact" className={styles.start} onClick={onNavigate}>Get started</Link>
      </div>
      <ul className={styles.sections}>
        {mobileSections.map(({ label, to, links }) => (
          <li key={label}>
            {to ? <Link className={styles.sectionRow} to={to} onClick={onNavigate}>{label}</Link> : <>
              <button type="button" className={styles.sectionRow} aria-expanded={expanded === label}
                aria-controls={id + label} onClick={() => setExpanded(expanded === label ? null : label)}>
                {label}<i aria-hidden="true" />
              </button>
              <ul id={id + label} hidden={expanded !== label} className={styles.submenu}>
                {links.map(([text, path]) => <li key={path}><Link to={path} onClick={onNavigate}>{text}</Link></li>)}
              </ul>
            </>}
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export const Brand = ({ onClick, messaging = false }) => (
  <Link className="site-brand" aria-label="SummitDigital home" to="/" onClick={onClick}>
    {!messaging && <span className="site-brand-mark" aria-hidden="true" />}
    <span className={styles.wordmark} aria-hidden="true">S<span className={styles.suffix}><span>ummit</span></span>D<span className={styles.suffix}><span>igital</span></span></span>
  </Link>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const route = pathname.replace(/\/+$/, "");
  const overlay = route === "" ? "dark" : ["/services", "/contact"].includes(route) ? "light" : undefined;
  const [menu, setMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16);
  const header = useRef(null);
  const closeTimer = useRef(null);
  const focusDropdown = useRef(false);
  const toggle = useRef(null);
  const navId = useId();
  const desktopOpen = menu !== null;
  const solid = scrolled || desktopOpen || mobileOpen;

  useLayoutEffect(() => {
    if (!menu || !focusDropdown.current) return;
    focusDropdown.current = false;
    document.getElementById(`${navId}-${menu}`)?.querySelector("a")?.focus();
  }, [menu, navId]);

  useEffect(() => {
    const mobileLayout = window.matchMedia("(max-width: 52rem)");
    const updateScroll = () => setScrolled(window.scrollY > 16);
    const resetMenus = () => {
      clearTimeout(closeTimer.current);
      setMenu(null);
      setMobileOpen(false);
    };
    resetMenus();
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    mobileLayout.addEventListener("change", resetMenus);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      mobileLayout.removeEventListener("change", resetMenus);
      clearTimeout(closeTimer.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (!desktopOpen && !mobileOpen) return;
    const dismissOutside = (event) => {
      if (header.current?.contains(event.target)) return;
      setMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [desktopOpen, mobileOpen]);

  function closeAll() {
    clearTimeout(closeTimer.current);
    setMenu(null);
    setMobileOpen(false);
  }

  function goTo(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    closeAll();
    const link = new URL(event.currentTarget.href);
    if (link.pathname === pathname && link.hash === window.location.hash) {
      if (link.hash) document.getElementById(link.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  function hoverMenu(event, name) {
    if (event.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setMenu(name);
  }

  function openFromKeyboard(name) {
    clearTimeout(closeTimer.current);
    if (menu === name) {
      document.getElementById(`${navId}-${name}`)?.querySelector("a")?.focus();
      return;
    }
    focusDropdown.current = true;
    setMenu(name);
  }

  function onKeyDown(event) {
    if (event.key !== "Escape" || (!desktopOpen && !mobileOpen)) return;
    event.preventDefault();
    closeAll();
    if (mobileOpen) toggle.current?.focus();
    else document.getElementById(`${navId}-${menu}-trigger`)?.focus();
  }

  const renderTrigger = (name, label) => (
    <button key={name}
      className={styles.navLink}
      id={`${navId}-${name}-trigger`}
      type="button"
      aria-expanded={menu === name}
      aria-controls={`${navId}-${name}`}
      data-current={name === "Services" && pathname === "/services" || undefined}
      onPointerEnter={(event) => hoverMenu(event, name)}
      onClick={(event) => {
        if (event.detail === 0 && menu !== name) openFromKeyboard(name);
        else setMenu((current) => current === name ? null : name);
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        openFromKeyboard(name);
      }}
    >
      {label} <ChevronDown size={13} aria-hidden="true" />
    </button>
  );

  return (
    <header
      ref={header}
      className={styles.header}
      data-overlay={overlay}
      data-solid={solid || undefined}
      data-scrolled={scrolled || undefined}
      data-dropdown={desktopOpen || undefined}
    >
      <nav
        className={styles.nav}
        aria-label="Main navigation"
        onKeyDown={onKeyDown}
        onPointerEnter={() => clearTimeout(closeTimer.current)}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          closeTimer.current = setTimeout(() => setMenu(null), 170);
        }}
        onBlur={(event) => {
          if (desktopOpen && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeAll();
        }}
      >
        <Brand onClick={goTo} messaging />
        <div className={styles.desktopLinks}>
          {Object.keys(homeMenus).map(label => renderTrigger(label, label))}
        </div>
        <a className={styles.navCta} href="/contact">Get started free</a>

        <button
          className={styles.toggle}
          ref={toggle}
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-haspopup="dialog"
          aria-controls={mobileOpen ? `${navId}-mobile` : undefined}
          onClick={() => {
            setMenu(null);
            setMobileOpen((open) => !open);
          }}
        >
          <span aria-hidden="true" />
        </button>

        <div className={styles.dropdown} data-open={desktopOpen} inert={!desktopOpen}>
          {Object.entries(homeMenus).map(([name, columns]) => (
            <section
              key={name}
              id={`${navId}-${name}`}
              className={styles.dropdownContent}
              data-active={menu === name}
              inert={menu !== name}
              aria-hidden={menu !== name}
              aria-labelledby={`${navId}-${name}-trigger`}
            >
              {columns.map(({ title, links }) => (
                <div className={styles.group} key={title}>
                  <p>{title}</p>
                  <ul>
                    {links.map(([label, to]) => <li key={to}><Link to={to} onClick={goTo}>{label}</Link></li>)}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>

      </nav>
      <MobileMenu id={`${navId}-mobile`} open={mobileOpen} onDismiss={closeAll} onNavigate={goTo} />
    </header>
  );
}
