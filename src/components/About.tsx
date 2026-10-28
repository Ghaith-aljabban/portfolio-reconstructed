"use client";

// Decompiled directly from webpack module 5887 (page-a709b3f34381c2b5.js)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { aboutData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  mapPin: MapPin,
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-about-anim]");
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
      id="about"
      ref={sectionRef}
      className="relative z-10 border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <div>
            <p
              data-about-anim
              className="mb-4 text-[11px] font-medium tracking-[0.2em] text-accent"
            >
              {aboutData.eyebrow}
            </p>
            <h2
              data-about-anim
              className="font-display text-4xl font-semibold leading-tight text-ink md:text-[44px]"
            >
              {aboutData.headingLine1}
              <br />
              <span className="text-gradient">{aboutData.headingGradient}</span>
            </h2>
            <p
              data-about-anim
              className="mt-6 max-w-md text-[15px] leading-relaxed text-muted"
            >
              {aboutData.bio}
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {aboutData.meta.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <div
                    key={item.label}
                    data-about-anim
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft text-accent">
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11px] tracking-wide text-muted">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-ink">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10">
          {aboutData.stats.map((stat) => (
            <div key={stat.label} data-about-anim>
              <p className="font-display text-3xl font-semibold text-ink md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] tracking-wide text-muted md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
