import { useEffect, useRef } from "react";
import Lenis from "lenis";
import HeroSection from "./hero/heroSection.component";
import FeaturesGrid from "./capabilities/featuresGrid.component";
import HomeFaq from "../../components/faq/homeFaq.component";
import CreatorStrip from "../../components/testimonials/creatorStrip.component";
import { Audience, InboxComparison, Automations, GettingStarted } from "./messaging/messagingHome.component";

export default function Home() {
  const scroll = useRef(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48.01rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    function configure() {
      scroll.current?.destroy();
      scroll.current = desktop.matches ? new Lenis({
        autoRaf: true,
        lerp: 0.18,
        allowNestedScroll: true,
        prevent: node => node.tagName === "DIALOG",
        virtualScroll: ({ event, deltaX, deltaY }) => {
          if (event.ctrlKey || Math.abs(deltaX) > Math.abs(deltaY)) return false;
          const engine = scroll.current;
          if (engine?.isScrolling === "smooth" && engine.velocity * deltaY < 0) {
            engine.scrollTo(engine.actualScroll, { immediate: true });
          }
        },
      }) : null;
    }
    configure();
    desktop.addEventListener("change", configure);
    return () => {
      desktop.removeEventListener("change", configure);
      scroll.current?.destroy();
      scroll.current = null;
    };
  }, []);
  return <>
    <HeroSection />
    <CreatorStrip />
    <FeaturesGrid scroll={scroll} />
    <Audience />
    <InboxComparison />
    <Automations />
    <GettingStarted />
    <HomeFaq />
  </>;
}
