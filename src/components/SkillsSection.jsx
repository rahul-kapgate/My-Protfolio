// src/components/SkillsSection.jsx

import React, { useEffect, useRef, useState } from "react";
import RubiksCube from "./RubiksCube";

const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Interfaces, application flows and responsive experiences.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML & CSS",
    ],
  },

  {
    number: "02",
    title: "Mobile",
    description: "Cross-platform mobile applications for Android and iOS.",
    skills: ["React Native", "Expo"],
  },

  {
    number: "03",
    title: "Backend & APIs",
    description: "APIs, services, application logic and integrations.",
    skills: ["Python", "FastAPI", "Node.js", "Express.js"],
  },

  {
    number: "04",
    title: "Database",
    description: "Relational and document-based data for real applications.",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "SQL"],
  },

  {
    number: "05",
    title: "Authentication",
    description: "Secure identity and application access patterns.",
    skills: ["JWT", "Auth0"],
  },

  {
    number: "06",
    title: "Cloud & DevOps",
    description: "Deployment, storage and infrastructure fundamentals.",
    skills: [
      "AWS",
      "Docker",
      "Linux",
      "Networking",
      "Cloudinary",
      "Backblaze B2",
    ],
  },

  {
    number: "07",
    title: "Tools",
    description: "Tools I use for development, debugging and collaboration.",
    skills: [
      "Git & GitHub",
      "Postman",
      "Figma",
      "VS Code",
      "Cursor",
      "Windsurf",
    ],
  },

  {
    number: "08",
    title: "Services",
    description: "Services used to support and ship production applications.",
    skills: ["Resend", "Netlify", "Render", "Supabase Storage"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "100% 80px",
          }}
        />

        <div className="absolute left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/[0.01] blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        {/* Section label */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Skills
          </span>

          <span className="h-px w-12 bg-white/10" />
        </div>

        {/* =====================================================
            HEADING + RUBIK'S CUBE
        ====================================================== */}
        <div className="grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          {/* Heading */}
          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <h2
                className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Tools I use
              </h2>
            </div>

            <div className="overflow-hidden">
              <p
                className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-500 transition-all delay-200 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                to build real products.
              </p>
            </div>
          </div>

          {/* Rubik's Cube */}
          <div
            className={`hidden h-28 w-28 shrink-0 transition-all delay-500 duration-1000 md:block lg:h-32 lg:w-32 ${
              isVisible
                ? "translate-y-0 rotate-0 opacity-100"
                : "translate-y-5 rotate-6 opacity-0"
            }`}
          >
            <RubiksCube />
          </div>
        </div>

        {/* Intro */}
        <div
          className={`mt-8 max-w-2xl transition-all delay-300 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-sm leading-7 text-zinc-500 sm:text-base">
            Technologies I reach for when building web applications, mobile
            products, internal dashboards and data-heavy workflows.
          </p>
        </div>

        {/* Divider */}
        <div
          className={`mt-8 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 ${
            isVisible
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }`}
          style={{
            transformOrigin: "left",
          }}
        />

        {/* =====================================================
            SKILLS
        ====================================================== */}
        <div className="mt-2 max-w-6xl">
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className={`grid gap-4 border-b border-white/[0.07] py-5 transition-all duration-700 md:grid-cols-[0.35fr_0.65fr] md:gap-10 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: `${350 + index * 70}ms`,
              }}
            >
              {/* Group heading */}
              <div className="flex gap-4">
                <span className="pt-1 text-[10px] text-zinc-700">
                  {group.number}
                </span>

                <div>
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">
                    {group.title}
                  </h3>

                  <p className="mt-1.5 max-w-xs text-xs leading-5 text-zinc-600">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap content-start gap-x-5 gap-y-3 md:justify-end">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-zinc-400 transition-colors duration-200 hover:text-white sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className={`mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-3 transition-all delay-700 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-xs text-zinc-700">
            Always learning. Always refining the stack.
          </p>

          <span className="text-xs text-zinc-700">
            {skillGroups.reduce(
              (total, group) => total + group.skills.length,
              0,
            )}{" "}
            technologies
          </span>
        </div>
      </div>
    </section>
  );
}