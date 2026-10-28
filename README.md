# Mohammad Hamad — Portfolio (Complete Next.js Source Reverse-Engineering)

This is a complete, unminified, modular React / Next.js 14 App Router codebase reverse-engineered directly from the live Vercel production deployment (`https://portfolio-zeta-virid-47.vercel.app/`), including all original GSAP timelines, Lenis smooth scrolling, design tokens, and RSC data payloads.

---

## 🏗️ Architecture & Animation Breakdown

### 1. Hero Section Animations (`src/components/Hero.tsx`)
- **3D Letter Shatter & Assemble Entrance**:
  - Uses `gsap.timeline({ defaults: { ease: "power4.out" } })`.
  - Disperses characters in 3D coordinate space (`x: random(-18, 18)`, `y: random(90, 190)`, `z: random(-220, 80)`, `rotateX: random(-90, 90)`, `filter: blur(10px)`).
  - Staggers them back into place with `expo.out` at `0.035s` intervals.
- **Continuous 3D Letter Flips**:
  - `data-special-i` flips continuously on `rotateX` (`+=180deg`) every 3 seconds.
  - `data-special-m` flips continuously on `rotateY` (`180deg -> 360deg`) every 5 seconds.
- **Rotating Word Switcher**:
  - Cycles through `think.`, `scale.`, `adapt.`, and `ship.` every 2800ms using a vertical slide timeline (`yPercent: -100` -> `display: none` -> `yPercent: 100` -> `yPercent: 0`).
- **Floating Technology Chips & Visual Orbit**:
  - 8 floating badges (`Python`, `PyTorch`, `TypeScript`, `FastAPI`, `Postgres`, `Redis`, `React`, `Docker`) hovering with independent sine wave amplitudes (`yoyo: true`, `ease: "sine.inOut"`) based on `data-depth`.
  - Core layer pulsing with `data-core-pulse` and 360-degree continuous orbital rotation (`duration: 28s`).

### 2. Smooth Scrolling & Progress (`src/app/layout.tsx` & `src/components/Navigation.tsx`)
- Integrated with `@studio-freight/lenis` (Lenis v1) registered globally on `window.__lenis`.
- Numerical side-rail indicator (`01 HOME` -> `05 CONTACT`) with live SVG fill gradient tracking viewport scroll position.

### 3. ScrollTrigger Reveal Animations (`src/components/AboutAndTech.tsx` & `ProjectsAndContact.tsx`)
- `data-about-anim`, `data-tech-anim`, and `data-contact-anim` fade and slide up (`y: 26 -> 0`, `duration: 0.7s`) triggered via `ScrollTrigger` when sections enter 78% of the viewport.

---

## 🚀 Running the Project

Install dependencies and start the Next.js development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
