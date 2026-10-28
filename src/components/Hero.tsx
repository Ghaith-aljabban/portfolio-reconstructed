"use client";

// Decompiled directly from webpack module 139 (page-a709b3f34381c2b5.js)
import React, { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronRight,
  Activity,
  Bot,
  Boxes,
  Database,
  ArrowUpRight,
  Sparkles,
  Box,
  Brain,
  Code,
} from "lucide-react";
import HeroSocials from "./HeroSocials";
import { heroStats } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

const chipsData = [
  { name: "Python", mark: "PY", role: "AI / DATA", left: "8%", top: "18%", depth: 1.2, tone: "gold" },
  { name: "PyTorch", mark: "PT", role: "VISION", left: "15%", top: "61%", depth: 1.8, tone: "accent" },
  { name: "TypeScript", mark: "TS", role: "BACKEND", left: "31%", top: "4%", depth: 1.4, tone: "ink" },
  { name: "FastAPI", mark: "FA", role: "API", left: "79%", top: "23%", depth: 1.7, tone: "green" },
  { name: "Postgres", mark: "PG", role: "DATA", left: "76%", top: "61%", depth: 1.2, tone: "ink" },
  { name: "Redis", mark: "RD", role: "QUEUE", left: "51%", top: "82%", depth: 1.9, tone: "accent" },
  { name: "React", mark: "R", role: "UI", left: "54%", top: "10%", depth: 1.1, tone: "green" },
  { name: "Docker", mark: "DK", role: "INFRA", left: "89%", top: "78%", depth: 1.6, tone: "green" },
];

const toneStyles: Record<string, string> = {
  accent: "border-accent/30 bg-accent/[0.10] text-accent",
  green: "border-green/30 bg-green/[0.09] text-green",
  gold: "border-gold/30 bg-gold/[0.10] text-gold",
  ink: "border-ink/12 bg-bg-elevated/65 text-ink",
};

// Module 139: b(e) - The Hero Circle graphic with continuous rotation, idle sine wave, and interactive mouse parallax
function HeroCircle({ mobile = false }: { mobile?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const floatEls = gsap.utils.toArray<HTMLElement>("[data-float]");
      const currentPos = { x: 0, y: 0 };
      const targetPos = { x: 0, y: 0 };

      if (!reducedMotion) {
        floatEls.forEach((chip, idx) => {
          const depth = Number(chip.dataset.depth || "1");
          gsap.to(chip, {
            y: `+=${8 + (idx % 3) * 4}`,
            x: `+=${idx % 2 ? -5 : 5}`,
            rotate: idx % 2 ? -2 : 2,
            duration: 2.8 + 0.65 * depth,
            delay: 0.12 * idx,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        gsap.to("[data-core-pulse]", {
          scale: 1.16,
          opacity: 0.16,
          duration: 2.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        if (orbitRef.current) {
          gsap.to(orbitRef.current, {
            rotate: 360,
            duration: 28,
            repeat: -1,
            ease: "none",
          });
        }
      }

      const onPointerMove = (evt: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        targetPos.x = ((evt.clientX - rect.left) / rect.width - 0.5) * 2;
        targetPos.y = ((evt.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      const tickerLoop = () => {
        currentPos.x += (targetPos.x - currentPos.x) * 0.06;
        currentPos.y += (targetPos.y - currentPos.y) * 0.06;

        floatEls.forEach((chip) => {
          const depth = Number(chip.dataset.depth || "1");
          gsap.set(chip, {
            x: 10 * currentPos.x * depth,
            y: 7 * currentPos.y * depth,
          });
        });

        if (orbitRef.current) {
          gsap.set(orbitRef.current, {
            x: 8 * currentPos.x,
            y: 6 * currentPos.y,
          });
        }
      };

      // Listen on both element and window for responsive tracking
      el.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      if (!reducedMotion) {
        gsap.ticker.add(tickerLoop);
      }

      return () => {
        el.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointermove", onPointerMove);
        if (!reducedMotion) {
          gsap.ticker.remove(tickerLoop);
        }
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${mobile ? "h-[340px]" : "h-[630px]"}`}
      aria-hidden="true"
    >
      <div className="absolute inset-[6%] rounded-full border border-line/55" />
      <div className="absolute inset-[17%] rounded-full border border-dashed border-ink/10" />
      <div className="absolute inset-[31%] rounded-full border border-accent/10" />

      {/* Orbit ring rotating 360 deg */}
      <div ref={orbitRef} className="absolute inset-[18%]">
        <div className="absolute inset-0 rounded-full border border-green/15" />
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_rgba(196,65,36,0.55)]" />
        <span className="absolute bottom-3 right-[7%] h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_14px_rgba(21,84,72,0.55)]" />
      </div>

      {/* Core Center Pulse */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          data-core-pulse
          className="absolute -inset-8 rounded-full border border-accent/20 bg-accent/[0.035]"
        />
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-line bg-bg-elevated/65 shadow-[0_25px_80px_rgba(20,18,15,0.10)] backdrop-blur-xl sm:h-56 sm:w-56">
          <div className="absolute inset-5 rounded-full border border-green/15" />
          <div
            className="absolute inset-9 rounded-full transition-all duration-500"
            style={{ background: "var(--hero-sphere-grad)" }}
          />
          <div className="relative text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-bg/60 text-accent">
              <Activity size={22} />
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-muted">
              Core layer
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
              AI + API
            </p>
            <p className="mt-1 text-[10px] text-muted">intelligence in motion</p>
          </div>
        </div>
      </div>

      {/* Floating Chips */}
      {chipsData.map((chip) => (
        <div
          key={chip.name}
          data-float
          data-hero-float
          data-depth={chip.depth}
          className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ left: chip.left, top: chip.top }}
        >
          <div
            className={`group flex items-center gap-2 rounded-2xl border px-3 py-2 shadow-[0_14px_32px_rgba(20,18,15,0.08)] backdrop-blur-md transition-transform duration-300 hover:scale-110 ${toneStyles[chip.tone]}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-bg-elevated/80 font-mono text-[10px] font-semibold">
              {chip.mark}
            </span>
            <div className="pr-1">
              <p className="font-display text-[12px] font-semibold text-ink">
                {chip.name}
              </p>
              <p className="mt-0.5 font-mono text-[8px] tracking-[0.12em] text-muted">
                {chip.role}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Status Card */}
      <div className="absolute bottom-6 left-1/2 flex w-[min(88%,520px)] -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-line bg-bg-elevated/70 px-4 py-3 shadow-[0_18px_48px_rgba(20,18,15,0.08)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green/10 text-green">
            <Bot size={16} />
          </span>
          <div>
            <p className="font-display text-xs font-semibold text-ink">
              Systems in motion
            </p>
            <p className="text-[10px] text-muted">
              inference · APIs · data · infra
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-4 text-[10px] text-muted sm:flex">
          <span className="inline-flex items-center gap-2">
            <Boxes size={14} className="text-gold" />
            10+ builds
          </span>
          <span className="inline-flex items-center gap-2">
            <Database size={14} className="text-accent" />
            production ready
          </span>
        </div>
        <ArrowUpRight size={15} className="text-accent" />
      </div>

      {/* Top Right Live System Badge */}
      <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/60 px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] text-muted backdrop-blur-md sm:right-7 sm:top-7">
        <Sparkles size={11} className="text-gold" /> LIVE SYSTEM
      </div>
    </div>
  );
}

// Module 139: k() - Hero Stats (Mobile)
const statIconMap = {
  box: Box,
  brain: Brain,
  code: Code,
};

function HeroStats() {
  return (
    <div
      data-hero-anim
      className="flex max-w-xl flex-wrap gap-4 rounded-2xl border border-line bg-ink/[0.045] p-5 backdrop-blur-sm sm:gap-6"
    >
      {heroStats.map((item, idx) => {
        const Icon = statIconMap[item.icon];
        return (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg-soft text-accent">
              <Icon size={18} strokeWidth={1.75} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xl font-semibold text-ink">{item.value}</p>
              <p className="text-[11px] leading-tight text-muted">{item.label}</p>
            </div>
            {idx < heroStats.length - 1 && (
              <span className="ml-2 hidden h-8 w-px bg-line sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}

const rotatingWords = ["think.", "scale.", "adapt.", "ship."];

// Module 139: Z(e) - Single character wrapper with 3D transform preserve
function HeroChar({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-hero-char
      aria-hidden="true"
      className=" inline-block will-change-transform [transform-style:preserve-3d] "
      style={{
        transformOrigin: "50% 100%",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </span>
  );
}

// Module 139: _(e) - Special flip animation for letter 'i'
function SpecialCharI({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { rotateX: 0, transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      delay: 1.5 * Math.random(),
    });
    for (let i = 0; i < 2; i++) {
      tl.to(el, { rotateX: "+=180", duration: 0.36, ease: "power2.inOut" });
    }
    tl.to(el, { rotateX: "+=180", duration: 0.75, ease: "power4.out" });
    tl.to({}, { duration: 2.8 });
    for (let i = 0; i < 2; i++) {
      tl.to(el, { rotateX: "+=180", duration: 0.36, ease: "power2.inOut" });
    }
    tl.to(el, { rotateX: "+=180", duration: 0.75, ease: "power4.out" });
    tl.to({}, { duration: 2.8 });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      data-special-hero
      className=" inline-block will-change-transform text-accent [transform-style:preserve-3d] "
      style={{
        transformOrigin: "50% 50%",
        backfaceVisibility: "visible",
        WebkitBackfaceVisibility: "visible",
      }}
    >
      {children}
    </span>
  );
}

// Module 139: A(e) - Special flip animation for letter 'm'
function SpecialCharM({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 5,
      delay: 1.5 * Math.random(),
    });
    tl.to(el, { rotateY: 180, duration: 0.55, ease: "power3.in" })
      .to(el, { rotateY: 360, duration: 0.7, ease: "power3.out" });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      data-special-hero
      className=" inline-block will-change-transform text-green [transform-style:preserve-3d] "
      style={{
        transformOrigin: "50% 50% -5px",
        backfaceVisibility: "visible",
      }}
    >
      {children}
    </span>
  );
}

// Module 139: S() - Custom 3D SVG icon
function SpecialIconS() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { transformOrigin: "50% 50%", perspective: 1000 });
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(el, { rotateY: 360, duration: 1.8, ease: "power2.inOut" })
      .to(el, { rotate: 15, duration: 0.6, ease: "elastic.out(1, 0.3)" })
      .to(el, { rotateY: 0, rotate: 0, duration: 1.4, ease: "power4.out", delay: 2.5 });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={ref}
      data-special-hero
      className=" inline-block h-[0.85em] w-[0.85em] ml-0 align-middle text-green will-change-transform "
      viewBox="0 0 90 90"
      aria-hidden="true"
    >
      <path
        d=" M 25 15 C 25 35, 40 45, 50 52 C 60 45, 75 35, 75 15 C 85 15, 85 30, 70 48 C 60 60, 58 65, 58 85 C 58 92, 42 92, 42 85 C 42 65, 40 60, 30 48 C 15 30, 15 15, 25 15 Z "
        fill="currentColor"
      />
      <circle cx="50" cy="38" r="8" fill="#0e100f" />
    </svg>
  );
}

// Module 139: C(e) - Line wrapper that splits strings into HeroChar
function HeroLine({ children }: { children: React.ReactNode }) {
  const renderTokens = (content: any): React.ReactNode => {
    if (typeof content === "string") {
      return content.split("").map((char, idx) =>
        char === " " ? (
          <span
            key={`space-${idx}`}
            data-hero-space
            className="inline-block"
            aria-hidden="true"
          >
            &nbsp;
          </span>
        ) : (
          <HeroChar key={`${char}-${idx}`}>{char}</HeroChar>
        )
      );
    }
    if (Array.isArray(content)) {
      return content.map((item, idx) => (
        <Fragment key={idx}>{renderTokens(item)}</Fragment>
      ));
    }
    return content;
  };

  return (
    <span className="block overflow-visible [perspective:1200px]">
      <span
        data-hero-line
        className=" block origin-bottom-left will-change-transform [transform-style:preserve-3d] "
      >
        {renderTokens(children)}
      </span>
    </span>
  );
}

// Module 139: E() - Main Hero content with 3D character scatter/gather and dynamic word animation
function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector("[data-hero-eyebrow]");
      const chars = gsap.utils.toArray<HTMLElement>("[data-hero-char]");
      const copy = el.querySelector("[data-hero-copy]");
      const actions = el.querySelector("[data-hero-actions]");
      const meta = el.querySelector("[data-hero-meta]");
      const visual = el.querySelector("[data-hero-visual]");
      const stats = el.querySelector("[data-hero-stats]");

      gsap.set(eyebrow, { y: 18, opacity: 0 });
      chars.forEach((c) => {
        gsap.set(c, {
          opacity: 0,
          y: gsap.utils.random(90, 190),
          x: gsap.utils.random(-18, 18),
          z: gsap.utils.random(-220, 80),
          rotateX: gsap.utils.random(-90, 90),
          rotateY: gsap.utils.random(-35, 35),
          rotateZ: gsap.utils.random(-10, 10),
          scale: gsap.utils.random(0.75, 1.12),
          skewX: gsap.utils.random(-6, 6),
          filter: "blur(10px)",
          transformOrigin: "50% 100%",
          willChange: "transform, opacity, filter",
        });
      });
      gsap.set(copy, { y: 30, opacity: 0 });
      gsap.set(actions, { y: 24, opacity: 0 });
      gsap.set(meta, { y: 20, opacity: 0 });
      if (stats) gsap.set(stats, { y: 20, opacity: 0 });
      if (visual) {
        gsap.set(visual, {
          y: 70,
          scale: 0.5,
          opacity: 0,
          rotateY: -10,
          transformOrigin: "50% 50%",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.65 })
        .to(
          chars,
          {
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            skewX: 0,
            filter: "blur(0px)",
            duration: 1.25,
            stagger: { each: 0.035, from: "start" },
            ease: "expo.out",
          },
          "-=0.15"
        )
        .to(
          chars,
          {
            y: -3,
            duration: 0.16,
            stagger: { each: 0.012, from: "start" },
            ease: "power2.out",
          },
          "-=0.38"
        )
        .to(
          chars,
          {
            y: 0,
            duration: 0.3,
            stagger: { each: 0.01, from: "start" },
            ease: "power3.out",
          },
          "-=0.02"
        )
        .to(copy, { y: 0, opacity: 1, duration: 0.75 }, "-=0.65")
        .to(actions, { y: 0, opacity: 1, duration: 0.65 }, "-=0.45")
        .to(meta, { y: 0, opacity: 1, duration: 0.6 }, "-=0.42");

      if (stats) {
        tl.to(stats, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35");
      }

      if (visual) {
        tl.to(
          visual,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1.25,
            ease: "power4.out",
          },
          "-=1"
        ).call(() => {
          gsap.to(visual, {
            y: -8,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = wordsRef.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (words.length < 2) return;

    const ctx = gsap.context(() => {
      let currentIdx = 0;
      words.forEach((w, idx) => {
        if (idx === 0) {
          gsap.set(w, { display: "inline-block", yPercent: 0, opacity: 1 });
        } else {
          gsap.set(w, { display: "none", yPercent: 100, opacity: 0 });
        }
      });

      const timer = window.setInterval(() => {
        const nextIdx = (currentIdx + 1) % words.length;
        const current = words[currentIdx];
        const next = words[nextIdx];

        gsap.timeline()
          .to(current, { yPercent: -100, opacity: 0, duration: 0.45, ease: "power4.in" })
          .set(current, { display: "none" })
          .set(next, { display: "inline-block", yPercent: 100, opacity: 0 })
          .to(next, { yPercent: 0, opacity: 1, duration: 0.65, ease: "power4.out" });

        currentIdx = nextIdx;
      }, 2800);

      return () => {
        window.clearInterval(timer);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className=" grid items-start gap-8 py-8 sm:py-12 lg:min-h-[calc(100vh-80px)] lg:items-center lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:gap-16 "
    >
      <div className="w-full max-w-3xl">
        <p
          data-hero-eyebrow
          className=" mt-1 font-mono text-[10.5px] tracking-[0.16em] text-muted sm:text-[11px] sm:tracking-[0.2em] md:text-[12px] lg:tracking-[0.24em] "
        >
          AI ENGINEERING / BACKEND / COMPUTER VISION
        </p>

        <h1 className=" mt-2 font-display text-[clamp(2.1rem,9vw,2.5rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-ink sm:text-[clamp(2.5rem,6.5vw,7.5rem)] sm:leading-[0.86] sm:tracking-[-0.065em] ">
          <HeroLine>
            I bu<SpecialCharI>i</SpecialCharI>ld
          </HeroLine>
          <HeroLine>
            s<SpecialIconS />ste<SpecialCharM>m</SpecialCharM>s that
          </HeroLine>
          <span className="block pb-[0.1em]">
            <span
              data-hero-line
              className=" flex flex-wrap items-end gap-x-[0.15em] gap-y-1 will-change-transform "
            >
              <span
                ref={wordsRef}
                className=" relative inline-flex h-[1.15em] min-w-[5.1ch] align-baseline overflow-visible whitespace-nowrap text-[1.2em] "
              >
                {rotatingWords.map((word, idx) => (
                  <span
                    key={word}
                    data-word
                    className=" absolute inset-x-0 top-0 inline-block w-max whitespace-nowrap text-gradient leading-[1.25] "
                    style={{ display: idx === 0 ? "inline-block" : "none" }}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className=" font-sans text-[0.3em] font-medium tracking-[-0.02em] text-muted/80 sm:text-[0.26em] md:text-[0.24em] ">
                & make them real.
              </span>
            </span>
          </span>
        </h1>

        <div
          className="sr-only"
          aria-label={`I build systems that ${rotatingWords.join(" ")}`}
        >
          I build systems that think, scale, adapt, and ship.
        </div>

        <p
          data-hero-copy
          className=" hero-readable mt-4 max-w-2xl text-[14px] leading-6 text-muted sm:text-[16px] sm:leading-7 lg:text-[18px] lg:leading-8 "
        >
          I design intelligent products and production-grade backend services — from model inference and computer vision to high-concurrency APIs, data, and infrastructure.
        </p>

        <div
          data-hero-actions
          className=" mt-6 flex flex-wrap items-center gap-4 sm:mt-8 "
        >
          <a
            href="#projects"
            className=" group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-green px-5 py-3 text-[12px] font-semibold tracking-wide text-bg shadow-[0_15px_35px_rgba(196,65,36,0.16)] transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-[13px] "
          >
            VIEW MY WORK
            <ArrowRight
              size={16}
              className=" transition-transform group-hover:translate-x-1 "
            />
          </a>
          <a
            href="#about"
            className=" group inline-flex items-center gap-1 px-3 py-2 text-[12px] font-semibold tracking-wide text-ink sm:text-[13px] "
          >
            ABOUT ME
            <ChevronRight
              size={16}
              className=" text-accent transition-transform group-hover:translate-x-1 "
            />
          </a>
        </div>

        <div
          data-hero-meta
          className=" mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4 "
        >
          <HeroSocials />
        </div>

        <div data-hero-stats className="mt-8 lg:hidden">
          <HeroStats />
        </div>
      </div>

      <div
        data-hero-visual
        className=" hidden h-full min-h-[400px] w-full lg:block "
      >
        <HeroCircle />
      </div>
    </div>
  );
}

// Module 139: I() - Default export Hero component
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero-kicker]", { y: 22, opacity: 0, duration: 0.65 })
        .from(
          "[data-hero-line]",
          { yPercent: 110, rotateX: -55, opacity: 0, duration: 0.9, stagger: 0.09 },
          "-=0.35"
        )
        .from("[data-hero-copy]", { y: 28, opacity: 0, duration: 0.7 }, "-=0.5")
        .from("[data-hero-actions]", { y: 22, opacity: 0, duration: 0.65 }, "-=0.4")
        .from("[data-hero-meta]", { y: 18, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(
          "[data-hero-float]",
          { scale: 0.7, opacity: 0, duration: 0.65, stagger: 0.06 },
          "-=0.8"
        );

      if (!reducedMotion) {
        gsap.to("[data-hero-parallax]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.to("[data-hero-fade]", {
          opacity: 0,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "55% top",
            scrub: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative z-10 flex min-h-screen w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        data-hero-parallax
      >
        <div className="hero-grid absolute inset-0 opacity-[0.16]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_32%,var(--canvas-glow),transparent_34%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 pb-14 pt-28 sm:px-7 lg:px-10 lg:pb-10 lg:pt-32">
        <div data-hero-fade>
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
