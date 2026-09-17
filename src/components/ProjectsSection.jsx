import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "AV Art Academy",
    type: "Production EdTech Platform",
    status: "Live",
    image: "/artistic-vickey.png",
    description:
      "A full-stack MAH AAC CET coaching platform bringing courses, resources, video lectures, mock tests and PYQ practice into one structured learning experience.",
    challenge:
      "Bring course discovery, learning resources, assessments and paid enrollment into one coherent student experience.",
    build:
      "Responsive course flows, authenticated learning experiences, timed assessments, admin controls and payment enrollment workflows.",
    outcome:
      "A production EdTech platform that supports the complete learning journey from discovery to enrolled-course access.",
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
      { label: "Visit live", href: "https://artisticvickey.in/" },
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
    image: "/digital-heroes.png",
    description:
      "A full-stack golf platform for tracking scores, managing subscriptions, joining monthly draws and supporting charities through a mobile-friendly experience.",
    challenge:
      "Combine membership, score tracking, draws and administration without making the user flow feel fragmented.",
    build:
      "JWT authentication, subscription flows, golf score history and administration workflows for users, draws and winners.",
    outcome:
      "A full-stack product architecture that connects customer-facing golf features with secure operational workflows.",
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
    image: "/smart-bookmark.png",
    description:
      "A Next.js and Supabase bookmark application where users can securely save private bookmarks, authenticate with Google and keep data synchronized across browser tabs.",
    challenge:
      "Keep personal bookmark data private while maintaining a simple realtime experience across browser tabs.",
    build:
      "Google OAuth, secure callback handling, Row Level Security and realtime synchronization with the Next.js App Router.",
    outcome:
      "A compact example of secure user-scoped data, realtime state synchronization and modern authentication patterns.",
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
  {
    number: "04",
    title: "DSA Tracker",
    type: "Interview Prep Progress Tracker",
    status: "Live",
    image: "/dsa-tracker.png",
    description:
      "A full-stack Next.js app for organizing DSA questions, tracking solve status, adding notes, and building consistent coding streaks for interview preparation.",
    challenge:
      "Give developers one place to collect problems from multiple sources, track readiness, and stay consistent without losing notes or progress.",
    build:
      "JWT auth with email verification, question organization and progress tracking, notes, streak tracking, and a secure dashboard on the Next.js App Router with MongoDB.",
    outcome:
      "A production interview-prep companion that keeps question organization, progress, notes and streaks in one authenticated experience.",
    tech: [
      "Next.js",
      "App Router",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Zustand",
      "Zod",
      "Resend",
    ],
    points: [
      "Built authenticated flows with email verification, JWT access/refresh tokens and secure session handling.",
      "Implemented question organization, solve-status tracking and personal notes for interview prep.",
      "Added streak tracking to encourage consistent daily practice.",
      "Used MongoDB models, TanStack Query and Zustand for data, caching and client state across the dashboard.",
    ],
    links: [
      { label: "Visit live", href: "https://dsatracker.stackfromscratch.in/" },
      {
        label: "View repository",
        href: "https://github.com/rahul-kapgate/dsa-tracker-next-js-app",
      },
    ],
  },
];

function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d]">
      {/* Window Header */}
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] px-4 bg-[#0a0a0a]">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate font-mono text-[8px] text-zinc-700">
          {project.title.toLowerCase().replaceAll(" ", "-")}
        </span>
      </div>

      {!failed ? (
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-auto object-contain rounded-b-2xl"
        />
      ) : (
        /* FALLBACK UI */
        <div className="relative aspect-[4/3] overflow-hidden p-3 sm:aspect-[16/9] sm:p-5 md:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.05),transparent_38%)]" />
          <div className="relative flex h-full flex-col justify-between rounded-xl border border-white/[0.07] bg-white/[0.018] p-4 sm:p-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-700">
                  Product preview
                </span>
                <span className="rounded-full border border-white/[0.07] px-2 py-1 font-mono text-[7px] uppercase text-zinc-600">
                  {project.status}
                </span>
              </div>
              <p className="mt-4 max-w-[95%] text-base font-medium tracking-[-0.025em] text-zinc-200 sm:max-w-[75%] sm:text-xl md:text-2xl line-clamp-2">
                {project.title}
              </p>
              <p className="mt-1.5 max-w-[95%] text-[10px] leading-4 text-zinc-600 sm:max-w-[70%] sm:text-xs sm:leading-5 line-clamp-1">
                {project.type}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <div
                  key={tech}
                  className="rounded-md border border-white/[0.06] bg-black/20 px-1.5 py-1 font-mono text-[7px] text-zinc-600 sm:px-2 sm:py-1.5 sm:text-[8px]"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-5%] top-[20%] h-[600px] w-[600px] rounded-full bg-white/[0.012] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Projects
          </span>
          <span className="h-px w-12 bg-white/10" />
          <span className="font-mono text-[9px] text-zinc-700">
            case studies / 03
          </span>
        </div>

        <div className="max-w-5xl">
          <div className="overflow-hidden">
            <h2
              className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              Selected projects
            </h2>
          </div>
          <div className="overflow-hidden">
            <p
              className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-500 transition-all delay-200 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              built from end to end.
            </p>
          </div>
        </div>

        <p
          className={`mt-8 max-w-2xl text-sm leading-7 text-zinc-500 transition-all delay-300 duration-700 sm:text-base ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
        >
          A few projects that best represent the kind of products and
          engineering problems I enjoy working on.
        </p>

        <div
          className={`mt-10 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
          style={{ transformOrigin: "left" }}
        />

        <div className="max-w-6xl">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`border-b border-white/[0.08] py-12 transition-all duration-700 lg:py-16 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${350 + index * 130}ms` }}
            >
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-zinc-700">
                      {project.number} / 04
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-600">
                      {project.status}
                    </span>
                  </div>
                  <ProjectPreview project={project} />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <h3 className="text-2xl font-medium tracking-[-0.03em] text-zinc-100 sm:text-3xl">
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

                  <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base">
                    {project.description}
                  </p>

                  <div className="mt-7 grid gap-4 sm:gap-5 sm:grid-cols-3">
                    {[
                      ["Problem", project.challenge],
                      ["Build", project.build],
                      ["Result", project.outcome],
                    ].map(([label, text]) => (
                      <div
                        key={label}
                        className="border-t border-white/[0.07] pt-4"
                      >
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-700">
                          {label}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-zinc-500">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/[0.06] px-2.5 py-1 text-[9px] text-zinc-600 sm:text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <details className="group mt-6 border-t border-white/[0.07] pt-4">
                    <summary className="cursor-pointer list-none text-xs text-zinc-500 transition hover:text-zinc-200">
                      Engineering details{" "}
                      <span className="ml-1 text-zinc-700 group-open:hidden">
                        +
                      </span>
                      <span className="ml-1 hidden text-zinc-700 group-open:inline">
                        −
                      </span>
                    </summary>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {project.points.map((point, pointIndex) => (
                        <div
                          key={point}
                          className="flex gap-3 rounded-lg border border-white/[0.05] bg-white/[0.012] p-3"
                        >
                          <span className="font-mono text-[8px] text-zinc-700">
                            0{pointIndex + 1}
                          </span>
                          <p className="text-xs leading-5 text-zinc-500">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`mt-7 flex max-w-6xl flex-wrap items-center justify-between gap-4 transition-all delay-700 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
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
