import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "./navbar.component";

const Footer = () => (
  <footer className="site-footer">
    <div className="site-container">
      <div className="site-footer-grid">
        <div className="site-footer-intro">
          <Brand onClick={() => window.scrollTo(0, 0)} />
          <p>Websites, visual identities, and campaigns for businesses ready to grow online.</p>
          <div className="site-socials">
            <a href="https://www.instagram.com/summitdigital.in/" aria-label="SummitDigital on Instagram">
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/company/SummitDigitalin/" aria-label="SummitDigital on LinkedIn">
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="site-footer-column">
          <h2>Explore</h2>
          <Link to="/services">Services</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="site-footer-column">
          <h2>Get in touch</h2>
          <a href="mailto:SummitDigital.in@gmail.com">SummitDigital.in@gmail.com</a>
          <a href="tel:+919797116244">+91 97971 16244</a>
          <a href="https://wa.me/919797116244">Chat on WhatsApp</a>
          <a href="tel:+919541606958">+91 95416 06958</a>
          <p>Srinagar, Jammu and Kashmir</p>
        </div>
      </div>
      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} SummitDigital</p>
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          Back to home <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
