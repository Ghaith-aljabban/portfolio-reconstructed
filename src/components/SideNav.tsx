"use client";

// Decompiled directly from webpack module 2220 (page-a709b3f34381c2b5.js)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { navSections } from "@/data/site-data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

const sectionIds = navSections.map((s) => s.id);

export default function SideNav() {
  const activeSection = useActiveSection(sectionIds);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power4.out", delay: 0.4 }
      );
    }
  }, []);

  const scrollTo = (id: string) => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.4, offset: 0 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = navSections.findIndex((s) => s.id === activeSection);

  useEffect(() => {
    if (progressLineRef.current) {
      gsap.to(progressLineRef.current, {
        height: activeIndex >= 0 ? `${(activeIndex / (navSections.length - 1)) * 100}%` : "0%",
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex flex-col items-start">
        <div className="absolute left-[13px] top-3 bottom-3 w-px">
          <div className="absolute inset-0 bg-line" />
          <div
            ref={progressLineRef}
            className="absolute top-0 w-px bg-gradient-to-b from-accent via-green to-accent"
          />
        </div>

        {navSections.map((section) => {
          const isActive = section.id === activeSection;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group relative z-10 flex items-center gap-4 py-3"
            >
              <span
                className={cn(
                  "relative flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[10px] font-mono transition-all duration-500",
                  isActive
                    ? "border-accent bg-accent/20 text-accent scale-110"
                    : "border-line bg-bg text-muted group-hover:border-muted"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-accent/20 blur-md animate-pulse" />
                )}
                {isActive ? (
                  section.index
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-muted/60 transition-all duration-300 group-hover:scale-150" />
                )}
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium tracking-[0.16em] transition-all duration-500",
                  isActive
                    ? "text-ink translate-x-1"
                    : "text-muted/70 group-hover:text-muted group-hover:translate-x-1"
                )}
              >
                {section.label.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
