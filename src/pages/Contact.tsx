import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await fetch("https://formspree.io/f/maqpwgzd", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });
    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <main className="contact">
      <h1>Get in Touch</h1>
      <p className="contact-intro">
        Feel free to reach out — whether it's about a role, a project, or just
        to connect.
      </p>

      <div className="contact-links">
        <a
          href="https://linkedin.com/in/amiashman"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <span className="contact-dot">·</span>
        <a
          href="https://github.com/amiashman"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      <div className="contact-divider" />

      {submitted ? (
        <p className="contact-success">
          Thanks for reaching out! I'll get back to you soon.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required />
          </div>
          <button type="submit" className="form-btn">
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
