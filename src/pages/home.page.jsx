import HeroSection from "../components/heroSection.component";
import FeaturesGrid from "../components/featuresGrid.component";
import HomeFaq from "../components/homeFaq.component";
import CreatorStrip from "../components/creatorStrip.component";
import { Audience, InboxComparison, Automations, GettingStarted } from "../components/messagingHome.component";

export default function Home() {
  return <>
    <HeroSection />
    <CreatorStrip />
    <FeaturesGrid />
    <Audience />
    <InboxComparison />
    <Automations />
    <GettingStarted />
    <HomeFaq />
  </>;
}
