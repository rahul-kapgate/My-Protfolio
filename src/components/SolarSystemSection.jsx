import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SolarSystem from "./SolarSystem";

const defaultNode = {
  name: "Sun",
  label: "Rahul Kapgate",
  skills: ["Full Stack Developer", "Web", "Mobile", "Systems"],
  target: "about",
};

export default function SolarSystemSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(defaultNode);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const openTarget = () => {
    document.getElementById(selected.target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="playground" ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-[#070707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.018),transparent_48%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        <div className={`mb-8 flex items-center gap-3 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Developer Playground</span>
          <span className="h-px w-12 bg-white/10" />
          <span className="font-mono text-[9px] text-zinc-700">three.js experiment</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <div className="overflow-hidden">
              <h2 className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>Explore the stack</h2>
            </div>
            <div className="overflow-hidden">
              <p className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-500 transition-all delay-200 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>like a small universe.</p>
            </div>
          </div>

          <p className={`max-w-md text-sm leading-7 text-zinc-500 transition-all delay-300 duration-700 sm:text-base ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
            Each planet represents a part of my work. Drag to rotate, scroll to zoom and click a planet to inspect it.
          </p>
        </div>

        <div className={`mt-10 h-px w-full bg-white/[0.08] transition-all delay-300 duration-1000 ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} style={{ transformOrigin: "left" }} />

        <div className={`mt-6 grid gap-5 transition-all delay-[400ms] duration-1000 lg:grid-cols-[1fr_280px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20">
            <SolarSystem onSelect={setSelected} />
          </div>

          <aside className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-700">Selected object</p>
              <p className="mt-4 font-mono text-[10px] text-zinc-600">{selected.name}</p>
              <h3 className="mt-1 text-xl font-medium tracking-[-0.025em] text-zinc-100">{selected.label}</h3>
              <div className="mt-5 space-y-2 border-t border-white/[0.07] pt-4">
                {selected.skills?.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={openTarget} className="group mt-7 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
              Open related section
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </aside>
        </div>

        <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5 transition-all delay-700 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          <p className="text-xs text-zinc-700">Built with Three.js. Rendering pauses when offscreen.</p>
          <p className="text-xs text-zinc-700">Frontend → Mobile → Backend → Data → Projects → DevOps → GitHub → Contact</p>
        </div>
      </div>
    </section>
  );
}
