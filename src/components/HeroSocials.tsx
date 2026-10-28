"use client";

// Communication links for Ghaith Aljabban
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Send,
  MessageSquare,
  Phone,
  Globe,
} from "lucide-react";
import { communicationLinks, SocialLink } from "@/data/site-data";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  telegram: Send,
  whatsapp: Phone,
  discord: MessageSquare,
  globe: Globe,
  phone: Phone,
};

export default function HeroSocials({
  all = false,
  className = "",
}: {
  all?: boolean;
  className?: string;
}) {
  const linksToDisplay = all ? communicationLinks : communicationLinks.slice(0, 5);

  return (
    <div data-hero-anim className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {linksToDisplay.map((item) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Mail;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.label}
            title={`${item.label} — ${item.description || item.username || ""}`}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elevated/70 text-muted backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:text-accent hover:shadow-[0_0_18px_rgba(224,83,52,0.25)] hover:scale-110 active:scale-95"
          >
            <IconComponent size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:scale-110" />
            
            {/* Tooltip on hover */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-bg-elevated px-2 py-0.5 text-[10px] font-medium text-ink opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
