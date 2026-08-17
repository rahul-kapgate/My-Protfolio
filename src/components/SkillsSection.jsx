import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Rotate3D } from "lucide-react";
import RubiksCube from "./RubiksCube";

const skillGroups = [
  { number: "01", title: "Frontend", description: "Interfaces, application flows and responsive experiences.", skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"] },
  { number: "02", title: "Mobile", description: "Cross-platform mobile applications for Android and iOS.", skills: ["React Native", "Expo"] },
  { number: "03", title: "Backend & APIs", description: "APIs, services, application logic and integrations.", skills: ["Python", "FastAPI", "Node.js", "Express.js"] },
  { number: "04", title: "Database", description: "Relational and document-based data for real applications.", skills: ["PostgreSQL", "MongoDB", "Supabase", "SQL"] },
  { number: "05", title: "Authentication", description: "Secure identity and application access patterns.", skills: ["JWT", "Auth0"] },
  { number: "06", title: "Cloud & DevOps", description: "Deployment, storage and infrastructure fundamentals.", skills: ["AWS", "Docker", "Linux", "Networking", "Cloudinary", "Backblaze B2"] },
  { number: "07", title: "Tools", description: "Tools I use for development, debugging and collaboration.", skills: ["Git & GitHub", "Postman", "Figma", "VS Code", "Cursor", "Windsurf"] },
  { number: "08", title: "Services", description: "Services used to support and ship production applications.", skills: ["Resend", "Netlify", "Render", "Supabase Storage"] },
];

const projectSkills = [
  { name: "ArtisticVickey.in", skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Supabase", "AWS"] },
  { name: "Digital Heroes Golf App", skills: ["React", "TypeScript", "Node.js", "Express.js", "Supabase", "PostgreSQL", "JWT"] },
  { name: "Smart Bookmark App", skills: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"] },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("React");

  const cubeSkills = useMemo(() => skillGroups.flatMap((group) => group.skills), []);

  const selectedGroup = useMemo(
    () => skillGroups.find((group) => group.skills.includes(selectedSkill)),
    [selectedSkill],
  );

  const matchingProjects = useMemo(
    () => projectSkills.filter((project) => project.skills.includes(selectedSkill)),
    [selectedSkill],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const viewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[20%] h-[560px] w-[560px] rounded-full bg-blue-400/[0.012] blur-[150px]" />
        <div className="absolute right-[8%] top-[42%] h-[420px] w-[420px] rounded-full bg-red-400/[0.012] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        <div className={`mb-8 flex items-center gap-3 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Skills</span>
          <span className="h-px w-12 bg-white/10" />
          <span className="font-mono text-[9px] text-zinc-700">interactive stack</span>
        </div>

        <div className="grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <h2 className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                Tools I use
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-500 transition-all delay-200 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                to build real products.
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-[180px_1fr] items-center gap-4 transition-all delay-400 duration-1000 sm:grid-cols-[210px_1fr] lg:grid-cols-1 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <div className="h-[180px] w-[180px] sm:h-[210px] sm:w-[210px] lg:mx-auto lg:h-[230px] lg:w-[230px]">
              <RubiksCube skills={cubeSkills} onSkillSelect={setSelectedSkill} />
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.018] p-4 lg:mt-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-700">Selected sticker</p>
                  <h3 className="mt-1 text-base font-medium text-zinc-100">{selectedSkill}</h3>
                </div>
                <Rotate3D size={16} className="text-zinc-700" />
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-600">{selectedGroup?.description}</p>

              {matchingProjects.length > 0 ? (
                <div className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-700">Used in</p>
                  {matchingProjects.map((project) => (
                    <p key={project.name} className="text-[11px] text-zinc-500">• {project.name}</p>
                  ))}
                </div>
              ) : (
                <p className="mt-3 border-t border-white/[0.06] pt-3 text-[11px] text-zinc-600">Part of my day-to-day development stack and workflow.</p>
              )}

              <button onClick={viewProjects} className="group mt-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-500 transition hover:text-white">
                View related work
                <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        <p className={`mt-7 max-w-2xl text-sm leading-7 text-zinc-500 transition-all delay-300 duration-700 sm:text-base ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          Drag the cube to explore. Click a labeled sticker to see where that technology fits in my stack and projects.
        </p>

        <div className={`mt-8 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} style={{ transformOrigin: "left" }} />

        <div className="mt-2 max-w-6xl">
          {skillGroups.map((group, index) => (
            <div key={group.title} className={`grid gap-4 border-b border-white/[0.07] py-5 transition-all duration-700 md:grid-cols-[0.35fr_0.65fr] md:gap-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`} style={{ transitionDelay: `${350 + index * 60}ms` }}>
              <div className="flex gap-4">
                <span className="pt-1 text-[10px] text-zinc-700">{group.number}</span>
                <div>
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">{group.title}</h3>
                  <p className="mt-1.5 max-w-xs text-xs leading-5 text-zinc-600">{group.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap content-start gap-2 md:justify-end">
                {group.skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition sm:text-sm ${selectedSkill === skill ? "border-white/20 bg-white/[0.07] text-white" : "border-white/[0.06] text-zinc-500 hover:border-white/15 hover:text-zinc-200"}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-3 transition-all delay-700 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          <p className="text-xs text-zinc-700">Always learning. Always refining the stack.</p>
          <span className="text-xs text-zinc-700">{cubeSkills.length} technologies</span>
        </div>
      </div>
    </section>
  );
}
