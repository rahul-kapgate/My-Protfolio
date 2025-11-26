// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import "../App.css";
import "../assets/fonts/fonts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import GithubProfileSection from "../components/GithubProfileSection";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  const [apodData, setApodData] = useState(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [apodError, setApodError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        setApodLoading(true);
        setApodError("");
        const res = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=3qtzEDG1tFeKF2sI71I6VJ9h0tbeXWwLZd2REy6Z"
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setApodData(data);
      } catch (err) {
        console.error(err);
        setApodError("Unable to load NASA Astronomy Picture of the Day right now.");
      } finally {
        setApodLoading(false);
      }
    };

    fetchApod();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const techSections = [
    {
      label: "Frontend",
      blurb: "Building fast, responsive UI with modern React tooling.",
      items: [
        { name: "Next.js", emoji: "⚡", note: "Full-stack React framework" },
        { name: "React", emoji: "⚛️", note: "Component-driven UIs" },
        { name: "TypeScript", emoji: "🔷", note: "Type-safe frontend logic" },
        { name: "JavaScript (ES6+)", emoji: "📜", note: "Core language of the web" },
        { name: "Tailwind CSS", emoji: "🎨", note: "Utility-first styling" },
        { name: "HTML & CSS", emoji: "🧱", note: "Semantic layouts & responsive design" },
      ],
    },
    {
      label: "Backend & APIs",
      blurb: "Designing clean, predictable APIs and backend services.",
      items: [
        { name: "Python", emoji: "🐍", note: "Scripting, services, automation" },
        { name: "FastAPI", emoji: "⚡", note: "High-performance web APIs" },
        { name: "Node.js", emoji: "🟢", note: "APIs, workers, tooling" },
        { name: "Express.js", emoji: "🛣️", note: "Minimal and flexible HTTP server" },
      ],
    },
    {
      label: "Auth",
      blurb: "Keeping user data safe with battle-tested auth patterns.",
      items: [
        { name: "JWT", emoji: "🔐", note: "Token-based authentication" },
        { name: "Auth0", emoji: "🛡️", note: "Hosted identity & auth flows" },
      ],
    },
    {
      label: "Database",
      blurb: "Modeling data for real products and exam-style workflows.",
      items: [
        { name: "MongoDB", emoji: "🍃", note: "Document store for flexible data" },
        { name: "Supabase", emoji: "🧪", note: "Postgres, auth & APIs" },
        { name: "SQL / PostgreSQL", emoji: "🐘", note: "Relational data & constraints" },
      ],
    },
    {
      label: "Tools & Editors",
      blurb: "Day-to-day tools that keep my workflow fast and focused.",
      items: [
        { name: "Git & GitHub", emoji: "🌱", note: "Version control & collaboration" },
        { name: "Postman", emoji: "📮", note: "API testing & debugging" },
        { name: "Figma", emoji: "🎨", note: "UI/UX design & prototyping" },
        { name: "VS Code", emoji: "🧩", note: "Primary code editor" },
        { name: "Cursor", emoji: "🧠", note: "AI-assisted coding" },
        { name: "Windsurf", emoji: "🌊", note: "IDE tuned for AI workflows" },
      ],
    },
    {
      label: "Services & Hosting",
      blurb: "Sending emails and getting apps live on the internet.",
      items: [
        { name: "Resend", emoji: "✉️", note: "Transactional email for apps" },
        { name: "Netlify", emoji: "☁️", note: "Static & JAMstack hosting" },
        { name: "Render", emoji: "🚀", note: "Backend & service hosting" },
        { name: "Backblaze B2", emoji: "💾", note: "Object storage for assets" },
      ],
    },
    {
      label: "Cloud & Storage",
      blurb: "Serving and optimizing media for real users.",
      items: [
        { name: "Cloudinary", emoji: "🌥️", note: "Media optimization & delivery" },
        { name: "Supabase Storage", emoji: "📂", note: "Bucket storage for files" },
      ],
    },
    {
      label: "Systems & DevOps",
      blurb: "Understanding the layers below the app: OS, network, containers.",
      items: [
        { name: "Linux", emoji: "🐧", note: "Day-to-day dev environment & servers" },
        { name: "Networking basics", emoji: "🌐", note: "HTTP, DNS, routing, tooling" },
        { name: "Docker", emoji: "🐳", note: "Containerized dev & deployment" },
      ],
    },
  ];

  const featureFlow = [
    {
      title: "1. Understand the problem",
      subtitle: "Talk to people & read context",
      detail: "Clarify the why before touching code – requirements, constraints, and success criteria.",
      tags: ["Calls / chats", "Product docs"],
    },
    {
      title: "2. Sketch the solution",
      subtitle: "Flows, rough UI, data shapes",
      detail: "Quick wireframes and data models to see how the feature fits into existing systems.",
      tags: ["Figma / pen & paper", "ERDs"],
    },
    {
      title: "3. Build iteratively",
      subtitle: "Backend + frontend slices",
      detail: "Ship vertical slices: API, UI, and state together so the feature is testable end-to-end.",
      tags: ["React", "FastAPI / Node", "PostgreSQL"],
    },
    {
      title: "4. Ship & refine",
      subtitle: "Review, deploy, iterate",
      detail: "Code review, deploy, then improve based on usage, edge cases, and feedback.",
      tags: ["Code review", "Monitoring", "User feedback"],
    },
  ];


  return (
    <div className="min-h-screen font-custom bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo / Name */}
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md rk-avatar-glow" />
              {/* Main avatar circle */}
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Rahul Kapgate
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide">
                Software Engineer
              </p>
            </div>
          </div>


          <div className="flex items-center gap-4">
            {/* Nav Links */}
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <a
                href="#home"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#experience"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Projects
              </a>
            </nav>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faMoon : faSun}
                className={
                  theme === "dark" ? "text-yellow-400" : "text-slate-900"
                }
              />
              <span>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-10 pb-20 space-y-24">
        {/* HOME / HERO SECTION */}
        <section
          id="home"
          className="grid gap-10 md:grid-cols-[3fr,2fr] items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-4">
              SOFTWARE ENGINEER
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Building clean, modern, and reliable web experiences.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              I&apos;m Rahul, a full-stack engineer currently focused on
              building{" "}
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                Artistic Vickey
              </span>{" "}
              — a dedicated platform for MAH AAC CET aspirants. I love working
              with <span className="text-slate-900 dark:text-slate-200">React</span>,{" "}
              <span className="text-slate-900 dark:text-slate-200">
                Node / FastAPI
              </span>
              , and{" "}
              <span className="text-slate-900 dark:text-slate-200">
                modern web tools
              </span>{" "}
              to craft products that feel fast, polished, and thoughtfully
              designed.
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
              >
                View Projects
              </a>
              <a
                href="#experience"
                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900 transition-colors"
              >
                View Experience
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-5 text-slate-500 dark:text-slate-400">
              <a
                href="https://github.com/rahul-kapgate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github Profile"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-kapgate/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a
                href="https://x.com/Rahul__Kapgate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </div>
          </div>

          {/* Hero side card focusing Artistic Vickey */}
          <div className="hidden md:block">
            <div className="relative h-64 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 overflow-hidden dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors rk-animate-float">

              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-60" />
              <div className="absolute inset-x-6 bottom-6 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  CURRENTLY BUILDING
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  <span className="font-semibold">Artistic Vickey</span> – a
                  focused prep platform for the Maharashtra Applied Arts and
                  Crafts Common Entrance Test (MAH AAC CET).
                </p>
                <a
                  href="https://artisticvickey.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs items-center rounded-full bg-slate-900/5 px-4 py-2 text-slate-800 hover:bg-slate-900/10 dark:bg-slate-100/10 dark:text-slate-100 dark:hover:bg-slate-100/20 transition-colors"
                >
                  Visit artisticvickey.in
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* HOW I SHIP A FEATURE */}
        <section className="space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              How I ship a feature
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              From problem to production: a simple flow I follow when building things like
              Artistic Vickey, internal tools, and dashboards.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute inset-x-4 top-8 h-px bg-slate-200 dark:bg-slate-700" />

            <div className="grid gap-4 md:grid-cols-4">
              {featureFlow.map((step) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none"
                >
                  {/* Step dot (for desktop line) */}
                  <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.25)]" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-400">
                      {step.subtitle}
                    </p>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {step.tags && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Experience
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              A quick look at where I&apos;ve been learning, building, and shipping.
            </p>
          </div>

          <div className="space-y-6">
            {/* SirpiDataScience */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors">
              <div className="flex gap-3">
                <div className="mt-1 h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-slate-800 flex items-center justify-center text-[11px] sm:text-xs font-semibold text-slate-200">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <a
                        href="https://www.sirpi.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        SirpiDataScience
                      </a>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Full-time · 11 mos · Bengaluru, Karnataka, India · On-site
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2 sm:justify-end">
                      <span className="text-[10px] sm:text-[11px] rounded-full border border-slate-300 px-2.5 py-1 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                        React.js · FastAPI · Full Stack
                      </span>
                      <a
                        href="https://www.sirpi.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-[11px] text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200 underline-offset-2 hover:underline"
                      >
                        Visit website ↗
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                        <span className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-700 hidden sm:block" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Full Stack Developer
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Jun 2025 – Present · 6 mos
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                          Working across frontend and backend to build internal tools,
                          dashboards, and data-heavy workflows using React, FastAPI,
                          and modern cloud services.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Full Stack Developer Intern
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Jan 2025 – Jun 2025 · 6 mos
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                          Contributed to features in existing products, fixed bugs, and
                          gained hands-on experience with real-world production code,
                          APIs, and deployment workflows.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Micropro card */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors">
              <div className="flex gap-3">
                <div className="mt-1 h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-slate-800 flex items-center justify-center text-[11px] sm:text-xs font-semibold text-slate-200">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <a
                        href="https://www.microproindia.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        System Administrator
                      </a>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Micropro Software Solutions Limited · Internship
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-500">
                        Jul 2024 – Sep 2024 · 3 mos · Nagpur, Maharashtra, India · On-site
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2 sm:justify-end">
                      <span className="text-[10px] sm:text-[11px] rounded-full border border-slate-300 px-2.5 py-1 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                        Computer Networking · Linux
                      </span>
                      <a
                        href="https://www.microproindia.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-[11px] text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200 underline-offset-2 hover:underline"
                      >
                        Visit website ↗
                      </a>
                    </div>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Worked on system administration tasks, basic networking, and
                    troubleshooting. This experience gave me a strong foundation in
                    how infrastructure and operating systems behave under real
                    workloads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub snapshot (with input) */}
        <GithubProfileSection defaultUsername="rahul-kapgate" />

        {/* NASA APOD SECTION – nice visual break between Experience & Projects */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Space Break: NASA Astronomy Picture of the Day 🚀
          </h3>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors">
            {apodLoading && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Loading today&apos;s space picture...
              </p>
            )}

            {!apodLoading && apodError && (
              <p className="text-sm text-red-500">{apodError}</p>
            )}

            {!apodLoading && !apodError && apodData && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {apodData.title}
                  </h4>
                  {apodData.date && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {apodData.date}
                    </span>
                  )}
                </div>

                {apodData.media_type === "image" && (
                  <div className="mt-2 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-700/70">
                    <img
                      src={apodData.url}
                      alt={apodData.title}
                      className="w-full max-h-[400px] object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {apodData.media_type === "video" && (
                  <div className="mt-2 overflow-hidden rounded-xl aspect-video">
                    <iframe
                      src={apodData.url}
                      title={apodData.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}

                {apodData.explanation && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {apodData.explanation}
                  </p>
                )}

                {apodData.copyright && (
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500">
                    © {apodData.copyright} · Data from{" "}
                    <a
                      href="https://api.nasa.gov/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-indigo-600 dark:hover:text-indigo-300"
                    >
                      NASA Open APIs
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </section>


                {/* TECH STACK – PINTEREST / MASONRY STYLE */}
                <section className="space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Tech I enjoy working with
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              The tools I reach for when building platforms like Artistic Vickey,
              internal dashboards, and data-heavy workflows.
            </p>
          </div>

          {/* Masonry-style columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {techSections.map((section) => (
              <div
                key={section.label}
                style={{ breakInside: "avoid" }}
                className="mb-4 rounded-3xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm
                           hover:shadow-md hover:-translate-y-0.5 transition-all
                           dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none"
              >
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                    {section.label}
                  </h4>
                  <span className="text-[10px] sm:text-xs rounded-full border border-slate-200 px-2 py-0.5 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    {section.items.length} tools
                  </span>
                </div>

                {section.blurb && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {section.blurb}
                  </p>
                )}

                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-2
                                 hover:border-indigo-300 hover:bg-indigo-50/80 transition-all
                                 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-indigo-500/70 dark:hover:bg-slate-900"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-lg shadow-sm
                                      group-hover:scale-105 transition-transform dark:bg-slate-800">
                        <span>{item.emoji}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Projects
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              A few key projects that represent what I like building.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Project 1 – Artistic Vickey */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6 flex flex-col justify-between shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Artistic Vickey
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  An educational platform tailored for{" "}
                  <span className="text-slate-900 dark:text-slate-200 font-medium">
                    MAH AAC CET
                  </span>{" "}
                  aspirants: courses, mock tests, PYQs, resources, and video
                  lectures – all structured for applied arts preparation.
                </p>
              </div>

              {/* Links */}
              <div className="mt-4 space-y-2">
                <a
                  href="https://artisticvickey.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center items-center rounded-full bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                >
                  Visit artisticvickey.in ↗
                </a>

                <div className="flex flex-wrap gap-3 text-[11px] text-slate-700 dark:text-slate-300">
                  <a
                    href="https://github.com/rahul-kapgate/artisticvicky-v2-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-900 transition-colors"
                  >
                    Frontend Repo
                  </a>
                  <a
                    href="https://github.com/rahul-kapgate/artisticvicky-v2-backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-900 transition-colors"
                  >
                    Backend Repo
                  </a>
                </div>
              </div>
            </div>

            {/* Additional project cards can go here */}
          </div>
        </section>
      </main>
    </div>
  );
}
