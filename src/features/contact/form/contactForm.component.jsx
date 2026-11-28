import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import styles from "./contactPage.module.css";


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
      const { submitContact } = await import("../api/firebase.utils");
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
    <form id="project-enquiry" className={styles.form} onSubmit={handleSubmit} aria-labelledby="form-heading" aria-busy={isSubmitting}>
      <h2 id="form-heading">Project enquiry</h2>
      <p className={styles.note}>All fields are required.</p>
      <div className="contact-fields">
        {fields.map(({ name, label, autoComplete, type = "text" }) => (
          <label className="contact-field" key={name}>
            <span>{label}</span>
            <input name={name} type={type} autoComplete={autoComplete} required />
          </label>
        ))}
        <label className="contact-field contact-field--wide">
          <span>Project details</span>
          <textarea name="message" rows={5} placeholder="What would you like to make, and when?" required />
        </label>
      </div>
      <button className="site-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send enquiry"} <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      {status === "success" && <p className={styles.success} role="status">Thanks for reaching out. Your enquiry was sent.</p>}
      {status === "error" && <p className={styles.error} role="alert">Your enquiry couldn’t be sent. Try again or email us directly.</p>}
    </form>
  );
};

export default ContactForm;
