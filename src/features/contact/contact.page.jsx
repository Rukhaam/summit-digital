import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import ContactHero from "./hero/contactHero.component";
import ContactForm from "./form/contactForm.component";
import styles from "./contact.module.css";

export default function Contact() {
  return <>
    <ContactHero />
    <section className={styles.layout} aria-labelledby="direct-contact">
      <div className={styles.details}>
        <h2 id="direct-contact">Get in touch.</h2>
          <address className={styles.channels}>
            <div>
              <Mail size={20} strokeWidth={1.6} aria-hidden="true" />
              <div><strong>Email</strong><a href="mailto:SummitDigital.in@gmail.com">SummitDigital.in@gmail.com</a></div>
            </div>
            <div>
              <Phone size={20} strokeWidth={1.6} aria-hidden="true" />
              <div><strong>Phone / WhatsApp</strong><a href="tel:+919797116244">+91 97971 16244</a><a href="https://wa.me/919797116244">Chat on WhatsApp</a></div>
            </div>
            <div>
              <Instagram size={20} strokeWidth={1.6} aria-hidden="true" />
              <div><strong>Instagram</strong><a href="https://www.instagram.com/summitdigital.in/">@summitdigital.in</a></div>
            </div>
            <div>
              <MapPin size={20} strokeWidth={1.6} aria-hidden="true" />
              <div><strong>Location</strong><span>Srinagar, Jammu and Kashmir</span></div>
            </div>
          </address>
      </div>
      <ContactForm />
    </section>
  </>;
}
