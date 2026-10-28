import Background from "@/components/Background";
import Navigation from "@/components/Navigation";
import SideNav from "@/components/SideNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tech from "@/components/Tech";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import projectsData from "@/data/projects.json";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Background />
      <Navigation />
      <SideNav />
      <Hero />
      <About />
      <Tech />
      <section id="projects" className="relative z-10 overflow-clip">
        <div className="mx-auto max-w-[1480px] px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-40">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
              Selected work
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink md:text-7xl">
              Systems built to <span className="text-gradient">hold up.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted md:text-lg">
              Scroll through the architecture, decisions and engineering behind the projects — one narrative at a time.
            </p>
          </div>
        </div>
        {projectsData.map((project: any, idx: number) => (
          <Projects
            key={project.id}
            project={project}
            projectNumber={idx + 1}
          />
        ))}
      </section>
      <Contact />
    </main>
  );
}
