"use client";

// Decompiled directly from webpack module 168 (page-a709b3f34381c2b5.js)
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail, Check, Copy, Phone, MapPin, Download, Send } from "lucide-react";
import { contactData } from "@/data/site-data";
import HeroSocials from "./HeroSocials";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-contact-anim]");
      gsap.set(items, { opacity: 0, y: 26 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name || "your site"}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n—\n${formData.name}${formData.email ? ` (${formData.email})` : ""}`
    );
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p
            data-contact-anim
            className="mb-4 text-[11px] font-medium tracking-[0.2em] text-accent"
          >
            {contactData.eyebrow}
          </p>
          <h2
            data-contact-anim
            className="font-display text-4xl font-semibold leading-tight text-ink md:text-[44px]"
          >
            {contactData.headingLine1}
            <br />
            <span className="text-gradient">{contactData.headingGradient}</span>
          </h2>
          <p
            data-contact-anim
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted"
          >
            {contactData.description}
          </p>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <button
                onClick={copyEmail}
                data-contact-anim
                className="group flex items-start gap-3 text-left"
                aria-label="Copy email address"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft text-accent">
                  <Mail size={16} strokeWidth={1.75} />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] tracking-wide text-muted">Email</p>
                  <p className="flex items-center gap-2 text-sm font-medium text-ink">
                    {contactData.email}
                    {copied ? (
                      <Check size={13} className="text-green" />
                    ) : (
                      <Copy
                        size={13}
                        className="text-muted/60 transition-colors group-hover:text-accent"
                      />
                    )}
                  </p>
                </div>
              </button>

              <a
                href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
                data-contact-anim
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft text-accent">
                  <Phone size={16} strokeWidth={1.75} />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] tracking-wide text-muted">Phone</p>
                  <p className="text-sm font-medium text-ink">{contactData.phone}</p>
                </div>
              </a>

              <div data-contact-anim className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft text-accent">
                  <MapPin size={16} strokeWidth={1.75} />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] tracking-wide text-muted">Location</p>
                  <p className="text-sm font-medium text-ink">{contactData.location}</p>
                </div>
              </div>
            </div>

            <div data-contact-anim className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={contactData.resumeUrl}
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-green px-5 py-3 text-[12px] font-semibold tracking-wide text-bg shadow-[0_15px_35px_rgba(196,65,36,0.16)] transition-transform hover:-translate-y-0.5"
                >
                  DOWNLOAD CV
                  <Download
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
              <div className="mt-2">
                <p className="text-[11px] font-mono tracking-wider text-muted mb-2 uppercase">
                  Direct Channels & Profiles
                </p>
                <HeroSocials all />
              </div>
            </div>
          </div>

          <div
            data-contact-anim
            className="relative overflow-hidden rounded-2xl border border-line bg-white/[0.045] p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.10)] md:p-8 lg:-mt-60"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.09] via-white/[0.02] to-transparent" />
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
              <p className="mb-1 text-[11px] tracking-wide text-muted">
                Send a message directly
              </p>
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="rounded-lg border border-line bg-bg-soft/70 px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="rounded-lg border border-line bg-bg-soft/70 px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50"
              />
              <textarea
                required
                rows={10}
                placeholder="What are you building?"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="resize-none rounded-lg border border-line bg-bg-soft/70 px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50"
              />
              <button
                type="submit"
                className="group hover:-translate-y-0.5 mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-accent/40 px-5 py-2.5 text-[12px] font-semibold tracking-wide text-ink transition-all hover:border-accent hover:bg-accent/5"
              >
                SEND MESSAGE
                <Send
                  size={14}
                  className="text-accent transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
