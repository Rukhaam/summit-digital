import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navigation/navbar.component";
import MessagingFooter from "./components/footer/messagingFooter.component";
import Home from "./features/home/home.page";
import Services from "./features/services/service.page";
import Pricing from "./features/pricing/pricing.page";
import Contact from "./features/contact/contact.page";

function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "instant" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" className={pathname === "/" ? "landing-layout" : undefined} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <MessagingFooter />
    </>
  );
}

export default App;
