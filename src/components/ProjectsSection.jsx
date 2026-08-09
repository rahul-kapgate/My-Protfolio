// src/components/ProjectsSection.jsx

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "ArtisticVickey.in",
    type: "Production EdTech Platform",
    status: "Live",
    description:
      "A full-stack MAH AAC CET coaching platform bringing courses, resources, video lectures, mock tests and PYQ practice into one structured learning experience.",

    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Node.js",
      "Express",
      "Supabase",
      "AWS S3",
      "Razorpay",
    ],

    points: [
      "Built responsive course catalog, pricing and authenticated enrolled-course experiences.",
      "Created learning flows for resources, video lectures, mock tests and PYQ practice.",
      "Developed a timed assessment engine with scoring and detailed attempt review.",
      "Implemented authentication, admin controls and secure payment enrollment workflows.",
    ],

    links: [
      {
        label: "Visit live",
        href: "https://artisticvickey.in/",
      },
      {
        label: "Frontend",
        href: "https://github.com/rahul-kapgate/artisticvicky-v2-frontend",
      },
      {
        label: "Backend",
        href: "https://github.com/rahul-kapgate/artisticvicky-v2-backend",
      },
    ],
  },

  {
    number: "02",
    title: "Digital Heroes Golf App",
    type: "Subscription + Score Tracking Platform",
    status: "GitHub",

    description:
      "A full-stack golf platform for tracking scores, managing subscriptions, joining monthly draws and supporting charities through a mobile-friendly experience.",

    tech: [
      "React",
      "Vite",
      "TypeScript",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "JWT",
      "Stripe",
    ],

    points: [
      "Implemented JWT-based authentication and protected application workflows.",
      "Built subscription and payment flows.",
      "Added golf score tracking and recent performance history.",
      "Developed administration workflows for users, draws and winners.",
    ],

    links: [
      {
        label: "View repository",
        href: "https://github.com/rahul-kapgate/digital-heroes-golf-app",
      },
    ],
  },

  {
    number: "03",
    title: "Smart Bookmark App",
    type: "Secure Personal Bookmark Manager",
    status: "GitHub",

    description:
      "A Next.js and Supabase bookmark application where users can securely save private bookmarks, authenticate with Google and keep data synchronized across browser tabs.",

    tech: [
      "Next.js",
      "App Router",
      "TypeScript",
      "Tailwind CSS",
      "Supabase Auth",
      "PostgreSQL",
      "Realtime",
    ],

    points: [
      "Implemented Google OAuth authentication with secure callback handling.",
      "Used Row Level Security to isolate bookmarks by user.",
      "Added realtime bookmark synchronization across browser tabs.",
      "Handled App Router cookies, OAuth redirects and realtime authentication state.",
    ],

    links: [
      {
        label: "View repository",
        href: "https://github.com/rahul-kapgate/smart-bookmark-app",
      },
    ],
  },
];

export default function ProjectsSection() {
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
        threshold: 0.1,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
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

        <div className="absolute right-[10%] top-[35%] h-[500px] w-[500px] rounded-full bg-white/[0.01] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        {/* Label */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Projects
          </span>

          <span className="h-px w-12 bg-white/10" />
        </div>

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
              Selected projects
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
              built from end to end.
            </p>
          </div>
        </div>

        <p
          className={`mt-8 max-w-2xl text-sm leading-7 text-zinc-500 transition-all delay-300 duration-700 sm:text-base ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          A few projects that best represent the kind of products and
          engineering problems I enjoy working on.
        </p>

        {/* Divider */}
        <div
          className={`mt-10 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 ${
            isVisible
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }`}
          style={{
            transformOrigin: "left",
          }}
        />

        {/* Projects */}
        <div className="max-w-6xl">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`grid gap-7 border-b border-white/[0.08] py-10 transition-all duration-700 lg:grid-cols-[0.38fr_1fr] lg:gap-16 lg:py-12 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-7 opacity-0"
              }`}
              style={{
                transitionDelay: `${350 + index * 120}ms`,
              }}
            >
              {/* Left */}
              <div>
                <span className="text-xs text-zinc-700">
                  {project.number}
                </span>

                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-zinc-600">
                  {project.status}
                </p>
              </div>

              {/* Right */}
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] text-zinc-100 sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">
                      {project.type}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
                      >
                        {link.label}

                        <ArrowUpRight
                          size={11}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] text-zinc-600 sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Work */}
                <div className="mt-7 grid gap-0 sm:grid-cols-2">
                  {project.points.map((point, pointIndex) => (
                    <div
                      key={point}
                      className={`border-t border-white/[0.07] py-4 ${
                        pointIndex % 2 === 0
                          ? "sm:pr-8"
                          : "sm:pl-8"
                      }`}
                    >
                      <div className="flex gap-3">
                        <span className="pt-[2px] text-[9px] text-zinc-700">
                          0{pointIndex + 1}
                        </span>

                        <p className="text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div
          className={`mt-7 flex max-w-6xl flex-wrap items-center justify-between gap-4 transition-all delay-700 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-xs text-zinc-700">
            More projects are available on GitHub.
          </p>

          <a
            href="https://github.com/rahul-kapgate?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
          >
            Explore all repositories

            <ArrowUpRight
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}