import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/lib/api/contact.functions";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SR Fitout" },
      { name: "description", content: "Start your interior fit-out project with SR Fitout. Request a consultation or quote." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      type: formData.get("type") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = (await submitContactForm({ data })) as { success: boolean };
      if (res.success) {
        setSubmitted(true);
        e.currentTarget.reset();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      let errorMsg = err?.message || "Failed to connect to the database. Please try again later.";
      
      // Parse Zod schema validation errors into a human-readable list
      try {
        if (typeof errorMsg === "string" && errorMsg.startsWith("[") && errorMsg.endsWith("]")) {
          const parsed = JSON.parse(errorMsg);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
            errorMsg = parsed.map((issue: any) => issue.message).join(", ");
          }
        }
      } catch (e) {
        // Fallback to raw message if parsing fails
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container-x pt-20">
        <div className="eyebrow">Get in Touch</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl leading-[1.02]">
          Tell us about your <em className="text-[color:var(--primary)]">space</em>.
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Share a few details and our team will get back within one working day with next steps.
        </p>
      </section>

      <section className="container-x grid md:grid-cols-12 gap-12 pb-0">
        {submitted ? (
          <div className="md:col-span-7 bg-card rounded-sm p-8 md:p-10 border border-border flex flex-col justify-center items-center text-center">
            <h3 className="font-display text-2xl text-[color:var(--primary)] mb-2">Thank you!</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Your message has been received. Our team will get back to you within one working day.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary mt-6 text-xs tracking-wider"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form
            className="md:col-span-7 bg-card rounded-sm p-8 md:p-10 border border-border"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required className="md:col-span-2" />
              <Field label="Project Type" name="type" placeholder="Residential, Office, Modular…" className="md:col-span-2" />
              <div className="md:col-span-2">
                <label className="eyebrow">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  className="mt-2 w-full bg-transparent border-b border-border focus:border-[color:var(--primary)] outline-none py-2 text-sm"
                  placeholder="Tell us about the space, scope and timeline…"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-4">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-8 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry"}{" "}
              {!loading && <ArrowUpRight size={16} />}
            </button>
          </form>
        )}
        <aside className="md:col-span-5 space-y-8">
          <Info icon={MapPin} title="Studio">
            Frazer Town , Bengaluru , 560001<br /> India
          </Info>
          <Info icon={Phone} title="Phone">
            <a href="tel:+919876543210" className="hover:text-[color:var(--primary)]">+91 98456 66991</a>
          </Info>
          <Info icon={Mail} title="Email">
            <a href="mailto:hello@srfitout.com" className="hover:text-[color:var(--primary)]">support@srfitout.com</a>
          </Info>
          {/* <div className="bg-[color:var(--primary)] text-[color:var(--cream)] p-8 rounded-sm">
            <div className="eyebrow text-white/50">Office Hours</div>
            <p className="mt-3">Mon — Sat · 10:00 – 19:00</p>
            <p className="mt-1 text-white/70 text-sm">Site visits by appointment.</p>
            <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-[color:var(--accent)] text-xs tracking-[0.2em] uppercase border-b border-[color:var(--accent)] pb-1">
              Explore services <ArrowUpRight size={14} />
            </Link>
          </div> */}
        </aside>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder, className = "" }: any) {
  return (
    <div className={className}>
      <label className="eyebrow">{label}</label>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-[color:var(--primary)] outline-none py-2 text-sm"
      />
    </div>
  );
}

function Info({ icon: Icon, title, children }: any) {
  return (
    <div className="border-t border-border pt-5">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-[color:var(--primary)]" />
        <div className="eyebrow">{title}</div>
      </div>
      <div className="mt-3 text-base">{children}</div>
    </div>
  );
}
