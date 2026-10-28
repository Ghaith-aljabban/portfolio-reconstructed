"use client";

// Decompiled directly from webpack module 7998 (page-a709b3f34381c2b5.js)
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectScene {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  showcase?: string;
  identityLabel?: string;
  similarity?: string;
  cameraId?: string;
  bgImage?: string;
  repoUrl?: string;
  repoLabel?: string;
  repoUrls?: Array<{ label: string; href: string }>;
  scenes: ProjectScene[];
}

interface ProjectsProps {
  project: ProjectData;
  projectNumber: number;
}

export default function Projects({ project, projectNumber }: ProjectsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScene, setActiveScene] = useState(0);

  const { scenes } = project;
  const totalScenes = scenes.length;

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const el = containerRef.current;
        if (!el) return;

        gsap.set(sceneRefs.current, {
          opacity: 0,
          y: 28,
          filter: "blur(8px)",
        });
        if (sceneRefs.current[0]) {
          gsap.set(sceneRefs.current[0], {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          });
        }

        if (cardStageRef.current) {
          gsap.to(cardStageRef.current, {
            yPercent: -2,
            scale: 1.012,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        scenes.forEach((_, idx) => {
          const startPercent = idx / totalScenes;
          const endPercent = (idx + 1) / totalScenes;
          const sceneEl = sceneRefs.current[idx];
          if (!sceneEl) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: `${100 * startPercent}% top`,
              end: `${100 * endPercent}% top`,
              scrub: 0.8,
              onUpdate: (self) => {
                if (self.progress > 0.45 && self.direction >= 0) {
                  setActiveScene(idx);
                }
                if (self.progress < 0.45 && self.direction < 0) {
                  setActiveScene(Math.max(0, idx - 1));
                }
              },
            },
          });

          if (idx > 0) {
            tl.fromTo(
              sceneEl,
              { opacity: 0, y: 28, filter: "blur(8px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.24 },
              0
            );
          }

          if (idx < totalScenes - 1) {
            tl.to(
              sceneEl,
              { opacity: 0, y: -20, filter: "blur(8px)", duration: 0.2 },
              0.78
            );
          }

          const imgEl = imageRefs.current[idx];
          if (imgEl) {
            gsap.fromTo(
              imgEl,
              { scale: 1.08 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: `${100 * startPercent}% top`,
                  end: `${100 * endPercent}% top`,
                  scrub: 1,
                },
              }
            );
          }
        });
      }, containerRef);

      return () => ctx.revert();
    });

    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-mobile-scene]").forEach((scene) => {
          gsap.fromTo(
            scene,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [scenes, totalScenes]);

  return (
    <article
      ref={containerRef}
      id={`project-${project.id}`}
      className="project-scroller relative border-t border-white/[0.07]"
      style={{
        ["--scene-count" as any]: Math.max(totalScenes, 1),
      }}
    >
      {/* Desktop Sticky Stage */}
      <div className="project-sticky sticky top-0 hidden h-screen lg:flex lg:items-center">
        <div className="mx-auto grid w-full max-w-[1480px] grid-cols-[190px_minmax(0,1fr)_230px] gap-10 px-8 xl:grid-cols-[220px_minmax(0,1fr)_260px] xl:px-12">
          {/* Left Aside */}
          <aside className="flex h-[72vh] flex-col justify-between py-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                Project {String(projectNumber).padStart(2, "0")}
              </p>
              <h3 className="mt-4 max-w-[170px] font-display text-2xl font-semibold leading-tight text-ink">
                {project.name}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {project.category}
              </p>
            </div>
            <div className="space-y-2">
              {scenes.map((scene, idx) => (
                <div key={scene.index} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-px transition-all duration-500",
                      idx === activeScene ? "w-8 bg-accent" : "w-3 bg-white/15"
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.18em] transition-colors",
                      idx === activeScene ? "text-ink" : "text-muted/60"
                    )}
                  >
                    {scene.index}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Center Showcase Card */}
          <div ref={cardStageRef} className="relative">
            <div className="mb-5 flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
                  {project.tagline}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--accent-glow)]" />
                  Scroll to explore
                </div>
              </div>
              <div className="font-mono text-xs text-muted">
                {String(activeScene + 1).padStart(2, "0")} / {String(totalScenes).padStart(2, "0")}
              </div>
            </div>

            <div className="relative min-h-[600px] overflow-hidden rounded-[30px] border border-white/[0.09] bg-[linear-gradient(140deg,rgba(23,21,16,0.055),rgba(23,21,16,0.02))] shadow-[0_30px_100px_-45px_rgba(0,0,0,0.9)] backdrop-blur-xl xl:min-h-[680px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,65,36,0.09),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(21,84,72,0.07),transparent_38%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(23,21,16,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,21,16,0.045)_1px,transparent_1px)] [background-size:56px_56px]" />

              {scenes.map((scene, idx) => (
                <div
                  key={scene.index}
                  ref={(el) => {
                    sceneRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 grid grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] gap-8 p-8 xl:p-10"
                >
                  {/* Left Column: Visual Diagram */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink/5">
                    {scene.image ? (
                      <div
                        ref={(el) => {
                          imageRefs.current[idx] = el;
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={scene.image}
                          alt={scene.imageAlt ?? scene.title}
                          fill
                          sizes="(min-width: 1280px) 620px, 52vw"
                          className="object-contain p-5 xl:p-7"
                          priority={projectNumber === 1 && idx === 0}
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/[0.06] text-accent">
                          <FolderGit2 size={26} strokeWidth={1.5} />
                        </div>
                        <p className="mt-6 max-w-sm font-display text-2xl font-semibold leading-tight text-ink">
                          {scene.title}
                        </p>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                          {project.category}
                        </p>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55 backdrop-blur-md">
                      {project.id} / {scene.index}
                    </div>
                  </div>

                  {/* Right Column: Narrative */}
                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                      {scene.eyebrow}
                    </p>
                    <h4 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.03] tracking-tight text-ink xl:text-5xl">
                      {scene.title}
                    </h4>
                    <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
                      {scene.body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {scene.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.09] bg-ink/[0.05] px-3 py-1.5 text-[10px] font-medium text-ink/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Aside: Signal & Progress */}
          <aside className="flex h-[72vh] flex-col justify-end">
            <div className="border-l border-white/[0.08] pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                Project signal
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {project.tagline}
              </p>
              <div className="mt-7 h-px bg-white/[0.08]" />
              <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>Progress</span>
                <span>{Math.round(((activeScene + 1) / totalScenes) * 100)}%</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{
                    width: `${((activeScene + 1) / totalScenes) * 100}%`,
                  }}
                />
              </div>

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex items-center gap-2 text-xs text-accent transition-colors hover:text-ink"
                >
                  {project.repoLabel ?? "View Code"}{" "}
                  <ArrowUpRight size={13} />
                </a>
              )}

              {project.repoUrls && (
                <div className="mt-8 flex flex-col gap-2">
                  {project.repoUrls.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-xs text-accent transition-colors hover:text-ink"
                    >
                      {link.label} <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              )}

              {!project.repoUrl && !project.repoUrls && (
                <div className="mt-8 inline-flex items-center gap-2 text-xs text-accent">
                  View project details <ArrowUpRight size={13} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Stacked View */}
      <div className="border-t border-white/[0.07] px-5 py-20 lg:hidden sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Project {String(projectNumber).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.tagline}
            </p>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-accent"
              >
                {project.repoLabel ?? "View Code"} <ArrowUpRight size={13} />
              </a>
            )}
            {project.repoUrls && (
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {project.repoUrls.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-xs font-medium text-accent"
                  >
                    {link.label} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            {scenes.map((scene, idx) => (
              <div
                key={scene.index}
                data-mobile-scene
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"
              >
                {scene.image && (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08] bg-ink/5">
                    <Image
                      src={scene.image}
                      alt={scene.imageAlt ?? scene.title}
                      fill
                      sizes="100vw"
                      className="object-contain p-4"
                      priority={projectNumber === 1 && idx === 0}
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {scene.index} — {scene.eyebrow}
                  </p>
                  <h4 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                    {scene.title}
                  </h4>
                  <p className="mt-4 text-sm leading-6 text-muted">{scene.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {scene.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.09] bg-ink/[0.04] px-3 py-1.5 text-[10px] text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
