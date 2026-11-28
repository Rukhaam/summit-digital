import ServicesSection from "./hero/servicePage.component";
import ServicesDetailedGrid from "./catalog/serviceDetailgrid";


import HomeFaq from "../../components/faq/homeFaq.component";
import CreatorStrip from "../../components/testimonials/creatorStrip.component";

const serviceQuestions = [
  { question: "Can we start with an audit?", answer: "Yes. A website or Instagram audit gives you a prioritized list of improvements and helps you decide which work to take on first." },
  { question: "Can you work with our existing brand?", answer: "Yes. Share your brand guidelines, design files, and examples of your current work so we can plan around the identity you already use." },
  { question: "Can one project include a website and launch content?", answer: "Yes. We can scope the site, campaign assets, and rollout together so your team knows what needs approval before launch." },
  { question: "What support is available after launch?", answer: "Maintenance can include content changes, link updates, deployments, and Firebase support. We agree on the ongoing work when we scope your project." },
];

const Services = () => (
  <>
    <ServicesSection />
    <ServicesDetailedGrid />
    <CreatorStrip />
    <HomeFaq items={serviceQuestions} />
  </>
);

export default Services;
