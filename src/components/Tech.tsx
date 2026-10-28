"use client";

// Decompiled directly from webpack module 439 (page-a709b3f34381c2b5.js)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FileText, BadgeCheck } from "lucide-react";
import { techCategories, certifications, Certification } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

interface CertGroup {
  title: string;
  items: Certification[];
}

function CertificationsList() {
  const groups = certifications.reduce<CertGroup[]>((acc, cert) => {
    const existing = acc.find((g) => g.title === cert.group);
    if (existing) {
      existing.items.push(cert);
    } else {
      acc.push({ title: cert.group, items: [cert] });
    }
    return acc;
  }, []);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.title}
          data-tech-anim
          className="glow-border rounded-2xl border bg-ink/[0.035] p-5"
        >
          <p className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-accent">
            {group.title.toUpperCase()}
          </p>
          <div className="space-y-3">
            {group.items.map((cert) => (
              <div
                key={cert.verifyUrl}
                className="flex items-start justify-between gap-3 rounded-lg border border-line-strong/60 bg-bg px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_0_16px_-6px_rgba(196,65,36,0.48)]"
              >
                <div className="min-w-0">
                  <p
                    className="text-[13px] font-medium leading-snug text-ink"
                    title={cert.title}
                  >
                    {cert.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View certificate: ${cert.title}`}
                    title="View certificate"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/50 hover:text-accent"
                  >
                    <FileText size={14} strokeWidth={1.75} />
                  </a>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Verify certificate: ${cert.title}`}
                    title="Verify on Coursera"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/50 hover:text-accent"
                  >
                    <BadgeCheck size={14} strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Tech() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-tech-anim]");
      gsap.set(items, { opacity: 0, y: 26 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative z-10 border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p
            data-tech-anim
            className="mb-4 text-[11px] font-medium tracking-[0.2em] text-accent"
          >
            TECH STACK
          </p>
          <h2
            data-tech-anim
            className="font-display text-4xl font-semibold leading-tight text-ink md:text-[44px]"
          >
            Tools I Reach For,
            <br />
            <span className="text-gradient">Not Just Know Of.</span>
          </h2>
          <p
            data-tech-anim
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted"
          >
            The languages, frameworks, and infrastructure I actually build and ship with — from model training to production deployment.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((cat) => (
            <div
              key={cat.title}
              data-tech-anim
              className="glow-border rounded-2xl border bg-ink/[0.035] p-5"
            >
              <p className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-accent">
                {cat.title.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    tabIndex={0}
                    className="cursor-default rounded-md border border-line-strong/60 bg-bg px-2.5 py-1 font-mono text-[11px] font-medium text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink hover:shadow-[0_0_16px_-6px_rgba(196,65,36,0.48)] focus-visible:-translate-y-0.5 focus-visible:border-accent/40 focus-visible:text-ink focus-visible:outline-none"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p
            data-tech-anim
            className="mb-5 font-mono text-[11px] font-semibold tracking-[0.14em] text-accent"
          >
            CERTIFICATIONS & TRAINING
          </p>
          <CertificationsList />
        </div>
      </div>
    </section>
  );
}
