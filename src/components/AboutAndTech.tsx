"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, MapPin, FileText, BadgeCheck } from "lucide-react";
import { aboutData, techCategories, certifications } from "@/data/site-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-about-anim]");
      gsap.set(targets, { opacity: 0, y: 26 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          once: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative z-10 border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p data-about-anim className="mb-4 text-[11px] font-medium tracking-[0.2em] text-accent">
            {aboutData.eyebrow}
          </p>
          <h2 data-about-anim className="font-display text-4xl font-semibold leading-tight text-ink md:text-[44px]">
            {aboutData.headingLine1}
            <br />
            <span className="text-gradient">{aboutData.headingGradient}</span>
          </h2>
          <p data-about-anim className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            {aboutData.bio}
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {aboutData.meta.map((m) => (
              <div key={m.label} data-about-anim className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft text-accent">
                  {m.icon === "briefcase" && <Briefcase className="h-4 w-4" />}
                  {m.icon === "graduation" && <GraduationCap className="h-4 w-4" />}
                  {m.icon === "mapPin" && <MapPin className="h-4 w-4" />}
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] tracking-wide text-muted">{m.label}</p>
                  <p className="text-sm font-medium text-ink">{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10">
          {aboutData.stats.map((st) => (
            <div key={st.label} data-about-anim>
              <p className="font-display text-3xl font-semibold text-ink md:text-4xl">{st.value}</p>
              <p className="mt-1 text-[11px] tracking-wide text-muted md:text-xs">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsList() {
  const groups: { title: string; items: typeof certifications }[] = [];
  for (const cert of certifications) {
    const existing = groups.find((g) => g.title === cert.group);
    if (existing) {
      existing.items.push(cert);
    } else {
      groups.push({ title: cert.group, items: [cert] });
    }
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {groups.map((grp) => (
        <div key={grp.title} data-tech-anim className="glow-border rounded-2xl border bg-ink/[0.035] p-5">
          <p className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-accent">
            {grp.title.toUpperCase()}
          </p>
          <div className="space-y-3">
            {grp.items.map((item) => (
              <div
                key={item.verifyUrl}
                className="flex items-start justify-between gap-3 rounded-lg border border-line-strong/60 bg-bg px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_0_16px_-6px_rgba(196,65,36,0.48)]"
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium leading-snug text-ink" title={item.title}>
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {item.issuer} · {item.date}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View certificate: ${item.title}`}
                    title="View certificate"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/50 hover:text-accent"
                  >
                    <FileText size={14} strokeWidth={1.75} />
                  </a>
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Verify certificate: ${item.title}`}
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

export function TechStack() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-tech-anim]");
      gsap.set(targets, { opacity: 0, y: 26 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          once: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" ref={containerRef} className="relative z-10 border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p data-tech-anim className="mb-4 text-[11px] font-medium tracking-[0.2em] text-accent">
            TECH STACK
          </p>
          <h2 data-tech-anim className="font-display text-4xl font-semibold leading-tight text-ink md:text-[44px]">
            Tools I Reach For,
            <br />
            <span className="text-gradient">Not Just Know Of.</span>
          </h2>
          <p data-tech-anim className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            The languages, frameworks, and infrastructure I actually build and ship with — from model training to production deployment.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((cat) => (
            <div key={cat.title} data-tech-anim className="glow-border rounded-2xl border bg-ink/[0.035] p-5">
              <p className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-accent">
                {cat.title.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((it) => (
                  <span
                    key={it}
                    tabIndex={0}
                    className="cursor-default rounded-md border border-line-strong/60 bg-bg px-2.5 py-1 font-mono text-[11px] font-medium text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink hover:shadow-[0_0_16px_-6px_rgba(196,65,36,0.48)] focus-visible:-translate-y-0.5 focus-visible:border-accent/40 focus-visible:text-ink focus-visible:outline-none"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p data-tech-anim className="mb-5 font-mono text-[11px] font-semibold tracking-[0.14em] text-accent">
            CERTIFICATIONS &amp; TRAINING
          </p>
          <CertificationsList />
        </div>
      </div>
    </section>
  );
}
