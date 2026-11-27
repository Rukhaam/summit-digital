import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import styles from "./contactPage.module.css";
import { ContactPreview } from "./pagePreviews.component";

const fields = [
  { name: "firstName", label: "First name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", autoComplete: "family-name" },
  { name: "email", label: "Work email", autoComplete: "email", type: "email" },
  { name: "orgName", label: "Organisation", autoComplete: "organization" },
];

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setIsSubmitting(true);
    setStatus(null);

    try {
      const { submitContact } = await import("../utils/firebase/firebase.utils");
      await submitContact(values);
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Unable to submit the contact form", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.layout} aria-labelledby="contact-heading">
        <header className={styles.intro}>
          <h1 id="contact-heading">Tell us about your project.</h1>
          <p>What are you planning, and when would you like to launch? Share your goals and timeline so we can suggest a first step.</p>
        </header>
        <div className={styles.preview}><ContactPreview /></div>
        <form id="project-enquiry" className={styles.form} onSubmit={handleSubmit} aria-labelledby="form-heading" aria-busy={isSubmitting}>
          <h2 id="form-heading">Send a project enquiry</h2>
          <div className="contact-fields">
            {fields.map(({ name, label, autoComplete, type = "text" }) => (
              <label className="contact-field" key={name}>
                <span>{label}</span>
                <input name={name} type={type} autoComplete={autoComplete} required />
              </label>
            ))}
            <label className="contact-field contact-field--wide">
              <span>Project details</span>
              <textarea name="message" rows={5} required />
            </label>
          </div>
          <button className="site-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send enquiry"} <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          {status === "success" && <p className="contact-status" role="status">Thanks for reaching out. Your enquiry was sent.</p>}
          {status === "error" && <p className="contact-status" role="alert">Your enquiry couldn’t be sent. Try again or email us directly.</p>}
        </form>
      </section>
      <section className={styles.details} aria-labelledby="direct-contact">
        <h2 id="direct-contact">Get in touch.</h2>
          <address className="contact-details">
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
      </section>
    </div>
  );
};

export default ContactForm;
