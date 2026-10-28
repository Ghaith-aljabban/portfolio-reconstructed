"use client";

// Navigation header for Ghaith Aljabban
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, X, Menu } from "lucide-react";
import { navLinks } from "@/data/site-data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo/logo.png"
        alt="Ghaith Aljabban logo"
        width={74}
        height={74}
        priority
        className="shrink-0 object-contain drop-shadow-sm"
      />
      <div className="leading-tight">
        <p className="font-display text-[15px] font-semibold tracking-wide text-ink">
          GHAITH ALJABBAN
        </p>
        <p className="text-[10px] font-medium tracking-[0.2em] text-accent">
          AI ENGINEER & DEVELOPER
        </p>
      </div>
    </div>
  );
}

const sectionIds = navLinks.map((item) => item.id);

export default function Navigation() {
  const activeSection = useActiveSection(sectionIds);
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentActive = clickedSection != null ? clickedSection : activeSection;

  useEffect(() => {
    if (clickedSection !== null && clickedSection === activeSection) {
      setClickedSection(null);
    }
  }, [activeSection, clickedSection]);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const navItemRefs = useRef<HTMLButtonElement[]>([]);
  const connectBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    setClickedSection(id);
    setMobileMenuOpen(false);
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.25, offset: 0 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power4.out" }
      );
      gsap.fromTo(
        logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        navItemRefs.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, delay: 0.35, duration: 0.65, ease: "power3.out" }
      );
      gsap.fromTo(
        connectBtnRef.current,
        { x: 18, scale: 0.9, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, delay: 0.65, duration: 0.8, ease: "back.out(1.7)" }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15, scale: 0.98, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.out" }
      );
    }, mobileMenuRef);
    return () => ctx.revert();
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[150px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)]">
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-transparent backdrop-blur-xl" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent dark:from-white/[0.04] dark:via-white/[0.015]" />
        <div className="absolute left-[20%] top-[-80px] h-44 w-44 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="absolute left-1/2 top-[-100px] h-40 w-[35%] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        <button
          ref={logoRef}
          onClick={() => scrollTo("home")}
          className="relative z-10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
          aria-label="Go to home"
        >
          <Logo />
        </button>

        <nav className="relative z-10 hidden items-center gap-9 lg:flex">
          {navLinks.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                if (el && !navItemRefs.current.includes(el)) {
                  navItemRefs.current.push(el);
                }
              }}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "group relative text-[13px] font-medium tracking-[0.12em] transition-colors duration-300",
                currentActive === item.id ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {item.label.toUpperCase()}
              <span
                className={cn(
                  "absolute -bottom-2 left-1/2 h-[3px] rounded-full bg-accent transition-all duration-500",
                  currentActive === item.id
                    ? "w-7 -translate-x-1/2 opacity-100 shadow-[0_0_14px_theme(colors.accent)]"
                    : "w-0 opacity-0 group-hover:w-3 group-hover:-translate-x-1/2 group-hover:opacity-40"
                )}
              />
            </button>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* Connect CTA Button */}
          <button
            ref={connectBtnRef}
            onMouseMove={(e) => {
              const btn = connectBtnRef.current;
              if (!btn) return;
              const rect = btn.getBoundingClientRect();
              const relX = e.clientX - rect.left - rect.width / 2;
              const relY = e.clientY - rect.top - rect.height / 2;
              gsap.to(btn, { x: 0.15 * relX, y: 0.15 * relY, duration: 0.35, ease: "power3.out" });
            }}
            onMouseLeave={() => {
              gsap.to(connectBtnRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            }}
            onClick={() => scrollTo("contact")}
            className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-line bg-bg-elevated/80 px-6 py-3 text-[13px] font-medium tracking-[0.08em] text-ink will-change-transform shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-colors duration-500 md:flex"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.1] via-white/[0.03] to-transparent backdrop-blur-md" />
            <span className="pointer-events-none absolute left-[12%] right-[12%] top-0 h-[45%] rounded-full bg-white/[0.08] blur-md opacity-80" />
            <span className="pointer-events-none absolute inset-x-2 bottom-0 h-1/2 rounded-full bg-gradient-to-t from-transparent to-transparent opacity-60" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute -left-[50%] top-[-20%] h-[140%] w-[28%] rotate-[20deg] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent blur-md opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
            <span className="relative z-10">LET'S CONNECT</span>
            <ArrowRight size={15} className="relative z-10 text-accent transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="relative z-10 text-ink lg:hidden p-2 rounded-lg hover:bg-bg-soft"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="relative mx-6 mb-4 overflow-hidden rounded-2xl border border-line bg-bg-elevated/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] lg:hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.09] via-white/[0.025] to-transparent" />
          <div className="relative p-4 space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "block w-full rounded-xl px-4 py-3 text-left text-sm tracking-wide transition-all duration-300",
                  currentActive === item.id
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-muted hover:bg-bg-soft hover:text-ink"
                )}
              >
                {item.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
