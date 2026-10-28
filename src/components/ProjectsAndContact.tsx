"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Check, Copy } from "lucide-react";
import projectsData from "@/data/projects.json";
import { contactData } from "@/data/site-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  return (
    <section id="projects" className="relative z-10 overflow-clip">
      <div className="mx-auto max-w-[1480px] px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-40">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-accent">Selected work</p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink md:text-7xl">
            Systems built to <span className="text-gradient">hold up.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Scroll through the architecture, decisions and engineering behind the projects — one narrative at a time.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-32 pb-32">
        {projectsData.map((project: any, idx: number) => (
          <ProjectNarrative key={project.id} project={project} index={idx + 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectNarrative({ project, index }: { project: any; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const scenes = project.scenes || [];

  return (
    <div id={`project-${project.id}`} ref={containerRef} className="border-t border-line/60 pt-16">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left Column: Project details & sequential scenes */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-accent">
                <span>0{index}</span>
                <span>/</span>
                <span>{project.category}</span>
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 text-base text-muted">{project.tagline}</p>
            </div>

            {/* Architecture narrative scenes */}
            <div className="flex flex-col gap-8">
              {scenes.map((scene: any, sIdx: number) => (
                <div
                  key={scene.id || sIdx}
                  onClick={() => setActiveScene(sIdx)}
                  className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                    activeScene === sIdx
                      ? "border-accent/50 bg-bg-elevated shadow-lg"
                      : "border-line bg-bg-soft/40 hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wider text-accent uppercase">
                      Phase 0{sIdx + 1} // {scene.phase || "Architecture"}
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-semibold text-ink">{scene.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{scene.narrative || scene.summary}</p>

                  {scene.metrics && (
                    <div className="mt-4 flex flex-wrap gap-4 border-t border-line/40 pt-3">
                      {scene.metrics.map((m: any, mIdx: number) => (
                        <div key={mIdx} className="leading-tight">
                          <p className="font-mono text-sm font-semibold text-ink">{m.value}</p>
                          <p className="text-[10px] text-muted">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Architecture / Interactive Diagram */}
          <div className="sticky top-28 h-fit">
            <div className="overflow-hidden rounded-2xl border border-line bg-bg-elevated p-6 shadow-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-bg-soft/50">
                {scenes[activeScene]?.asset ? (
                  <Image
                    src={scenes[activeScene].asset}
                    alt={scenes[activeScene].title || project.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center text-muted font-mono text-xs">
                    [System Architecture Diagram: {scenes[activeScene]?.title || project.name}]
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">
                  SCENE {activeScene + 1} OF {scenes.length}
                </span>
                <div className="flex gap-1.5">
                  {scenes.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveScene(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeScene === i ? "w-6 bg-accent" : "w-2 bg-line-strong"
                      }`}
                      aria-label={`Go to scene ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-contact-anim]");
      gsap.set(targets, { opacity: 0, y: 26 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <section id="contact" ref={containerRef} className="relative z-10 border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p data-contact-anim className="mb-4 text-[11px] font-medium tracking-[0.2em] text-accent">
            {contactData.eyebrow}
          </p>
          <h2 data-contact-anim className="font-display text-4xl font-semibold leading-tight text-ink md:text-[44px]">
            {contactData.headingLine1}
            <br />
            <span className="text-gradient">{contactData.headingGradient}</span>
          </h2>
          <p data-contact-anim className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            {contactData.description}
          </p>

          <div data-contact-anim className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${contactData.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold tracking-wider text-bg shadow-md transition-transform hover:-translate-y-0.5"
            >
              SEND AN EMAIL
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft px-5 py-3.5 text-xs font-mono font-medium text-ink transition-colors hover:border-accent"
            >
              {copied ? <Check className="h-4 w-4 text-green" /> : <Copy className="h-4 w-4 text-muted" />}
              <span>{copied ? "COPIED TO CLIPBOARD" : contactData.email}</span>
            </button>
          </div>

          <div data-contact-anim className="mt-12 flex flex-col gap-2 font-mono text-xs text-muted">
            <p>Phone: {contactData.phone}</p>
            <p>Location: {contactData.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
