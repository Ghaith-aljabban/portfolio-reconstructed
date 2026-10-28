"use client";

// Decompiled directly from webpack module 2295 (page-a709b3f34381c2b5.js)
import dynamic from "next/dynamic";

const BackgroundCanvas = dynamic(() => import("./BackgroundCanvas"), {
  ssr: false,
});

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.78]"
    >
      <BackgroundCanvas />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle_at_50%_40%, var(--canvas-glow) 0%, transparent 45%), linear-gradient(180deg, var(--canvas-overlay-1) 0%, var(--canvas-overlay-2) 100%)`,
        }}
      />
    </div>
  );
}
