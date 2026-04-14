// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import "../assets/fonts/fonts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faReddit,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import {
  faSun,
  faMoon,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import GithubProfileSection from "../components/GithubProfileSection";
import { motion, useReducedMotion } from "framer-motion";
import HeroTerminalCard from "../components/HeroTerminalCard";
import Preloader from "../components/Preloader";
import ScrollToTop from "../components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import RubiksCube from "../components/RubiksCube";
import SolarSystem from "../components/SolarSystem";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);

  // ✅ For smooth scroll offset (sticky header)
  const headerRef = useRef(null);

  // ✅ Track active section for nav highlight
  const [activeSection, setActiveSection] = useState("home");

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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

  // ✅ Smooth scroll handler (prevents jump + accounts for sticky header)
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);

    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 0;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // ✅ Auto update active nav while scrolling
  useEffect(() => {
    const ids = ["home", "experience", "skills", "projects"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-20% 0px -65% 0px",
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ----- Experience date helpers -----
  const formatMonthYear = (date) =>
    date.toLocaleString("en-US", { month: "short", year: "numeric" });

  const formatDuration = (start, end) => {
    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    if (months < 1) months = 1;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (remainingMonths > 0)
      parts.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`);

    return parts.join(" ");
  };

  const formatDateRange = (startStr, endStr = null) => {
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : new Date();

    const fromLabel = formatMonthYear(start);
    const toLabel = endStr ? formatMonthYear(end) : "Present";
    const durationLabel = formatDuration(start, end);

    return `${fromLabel} – ${toLabel} · ${durationLabel}`;
  };

  const techSections = [
    {
      label: "Frontend",
      blurb: "Building fast, responsive UI with modern React tooling.",
      items: [
        { name: "Next.js", emoji: "⚡", note: "Full-stack React framework" },
        { name: "React", emoji: "⚛️", note: "Component-driven UIs" },
        { name: "TypeScript", emoji: "🔷", note: "Type-safe frontend logic" },
        {
          name: "JavaScript (ES6+)",
          emoji: "📜",
          note: "Core language of the web",
        },
        { name: "Tailwind CSS", emoji: "🎨", note: "Utility-first styling" },
        {
          name: "HTML & CSS",
          emoji: "🧱",
          note: "Semantic layouts & responsive design",
        },
      ],
    },
    {
      label: "Backend & APIs",
      blurb: "Designing clean, predictable APIs and backend services.",
      items: [
        {
          name: "Python",
          emoji: "🐍",
          note: "Scripting, services, automation",
        },
        { name: "FastAPI", emoji: "⚡", note: "High-performance web APIs" },
        { name: "Node.js", emoji: "🟢", note: "APIs, workers, tooling" },
        {
          name: "Express.js",
          emoji: "🛣️",
          note: "Minimal and flexible HTTP server",
        },
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
        {
          name: "MongoDB",
          emoji: "🍃",
          note: "Document store for flexible data",
        },
        { name: "Supabase", emoji: "🧪", note: "Postgres, auth & APIs" },
        {
          name: "SQL / PostgreSQL",
          emoji: "🐘",
          note: "Relational data & constraints",
        },
      ],
    },
    {
      label: "Tools & Editors",
      blurb: "Day-to-day tools that keep my workflow fast and focused.",
      items: [
        {
          name: "Git & GitHub",
          emoji: "🌱",
          note: "Version control & collaboration",
        },
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
        {
          name: "Backblaze B2",
          emoji: "💾",
          note: "Object storage for assets",
        },
      ],
    },
    {
      label: "Cloud & Storage",
      blurb: "Serving and optimizing media for real users.",
      items: [
        {
          name: "Cloudinary",
          emoji: "🌥️",
          note: "Media optimization & delivery",
        },
        {
          name: "Supabase Storage",
          emoji: "📂",
          note: "Bucket storage for files",
        },
      ],
    },
    {
      label: "Systems & DevOps",
      blurb: "Understanding the layers below the app: OS, network, containers.",
      items: [
        {
          name: "Linux",
          emoji: "🐧",
          note: "Day-to-day dev environment & servers",
        },
        {
          name: "Networking basics",
          emoji: "🌐",
          note: "HTTP, DNS, routing, tooling",
        },
        { name: "Docker", emoji: "🐳", note: "Containerized dev & deployment" },
      ],
    },
  ];

  // ✅ Motion variants
  const containerV = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.08 },
    },
  };

  const fadeUpV = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: "easeOut" },
    },
  };

  const cardInV = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: "easeOut" },
    },
  };

  // ✅ Spotlight hover background effect (ONLY this, no tabs/search/expand)
  function SpotlightCard({ children, className = "" }) {
    const ref = useRef(null);

    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        className={`group relative overflow-hidden ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100
          [background:radial-gradient(650px_circle_at_var(--x)_var(--y),rgba(99,102,241,0.18),transparent_45%)]"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <>
      <HelmetProvider>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        <div
          className={`min-h-screen font-custom bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 ${loading ? "overflow-hidden" : ""}`}
        >
          {/* Top Navbar */}
          <header
            ref={headerRef}
            className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 transition-colors duration-300"
          >
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
              {/* Logo / Name */}
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md rk-avatar-glow" />
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
                <nav className="hidden sm:flex items-center gap-2 text-sm">
                  <div className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-2 py-1 dark:border-slate-800 dark:bg-slate-900/40">
                    <a
                      href="#home"
                      onClick={(e) => handleNavClick(e, "home")}
                      className={`relative px-3 py-1.5 rounded-full transition-colors ${
                        activeSection === "home"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {activeSection === "home" && (
                        <motion.span
                          layoutId="rk-nav-pill"
                          className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/10"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 30,
                                }
                          }
                        />
                      )}
                      <span className="relative z-10">Home</span>
                    </a>

                    <a
                      href="#experience"
                      onClick={(e) => handleNavClick(e, "experience")}
                      className={`relative px-3 py-1.5 rounded-full transition-colors ${
                        activeSection === "experience"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {activeSection === "experience" && (
                        <motion.span
                          layoutId="rk-nav-pill"
                          className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/10"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 30,
                                }
                          }
                        />
                      )}
                      <span className="relative z-10">Experience</span>
                    </a>

                    <a
                      href="#skills"
                      onClick={(e) => handleNavClick(e, "skills")}
                      className={`relative px-3 py-1.5 rounded-full transition-colors ${
                        activeSection === "skills"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {activeSection === "skills" && (
                        <motion.span
                          layoutId="rk-nav-pill"
                          className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/10"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 30,
                                }
                          }
                        />
                      )}
                      <span className="relative z-10">Skills</span>
                    </a>

                    <a
                      href="#projects"
                      onClick={(e) => handleNavClick(e, "projects")}
                      className={`relative px-3 py-1.5 rounded-full transition-colors ${
                        activeSection === "projects"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {activeSection === "projects" && (
                        <motion.span
                          layoutId="rk-nav-pill"
                          className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/10"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 30,
                                }
                          }
                        />
                      )}
                      <span className="relative z-10">Projects</span>
                    </a>
                  </div>
                </nav>

                {/* Theme toggle */}
                <motion.button
                  type="button"
                  onClick={toggleTheme}
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 24 }
                  }
                  className="flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={theme === "dark" ? faMoon : faSun}
                    className={
                      theme === "dark" ? "text-yellow-400" : "text-slate-900"
                    }
                  />
                  <span>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
                </motion.button>
              </div>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-4 pt-10 pb-20 space-y-24">
            {/* HOME / HERO SECTION */}
            <motion.section
              id="home"
              className="grid gap-10 md:grid-cols-[1fr,1fr] items-center scroll-mt-24"
              variants={containerV}
              initial="hidden"
              animate="show"
            >
              {/* Left side */}
              <motion.div variants={containerV}>
                <motion.p
                  variants={fadeUpV}
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-4"
                >
                  I'M SOFTWARE ENGINEER
                </motion.p>

                <motion.h2
                  variants={fadeUpV}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
                >
                  Rahul Kapgate
                </motion.h2>

                <motion.p
                  variants={fadeUpV}
                  className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
                >
                  I’m a full-stack developer focused on crafting modern web
                  applications with{" "}
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">
                    React
                  </span>
                  ,{" "}
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">
                    Next.js
                  </span>
                  ,{" "}
                  <span className="text-slate-900 dark:text-slate-200">
                    Node.js / FastAPI
                  </span>
                  , and{" "}
                  <span className="text-slate-900 dark:text-slate-200">
                    DevOps workflows
                  </span>
                  . I enjoy turning ideas into performant, scalable, and
                  thoughtfully designed products.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={fadeUpV}
                  className="mt-7 flex flex-wrap gap-3"
                >
                  <motion.a
                    href="#projects"
                    onClick={(e) => handleNavClick(e, "projects")}
                    whileHover={reduceMotion ? undefined : { y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                  >
                    View Projects
                  </motion.a>

                  <motion.a
                    href="#experience"
                    onClick={(e) => handleNavClick(e, "experience")}
                    whileHover={reduceMotion ? undefined : { y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900 transition-colors"
                  >
                    View Experience
                  </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={fadeUpV}
                  className="mt-8 flex items-center gap-5 text-slate-500 dark:text-slate-400"
                >
                  <a
                    href="https://github.com/rahul-kapgate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Github Personal Profile"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      GitHub (Personal)
                    </span>
                  </a>

                  <a
                    href="https://github.com/rahul-sirpi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Github Work Profile"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      GitHub (Work)
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/rahul-kapgate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href="https://x.com/Rahul__Kapgate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Profile"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      X
                    </span>
                  </a>

                  <a
                    href="https://www.reddit.com/user/rahul-kapgate-01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Reddit Profile"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faReddit} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      Reddit
                    </span>
                  </a>

                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord Profile"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faDiscord} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      Discord
                    </span>
                  </a>

                  <a
                    href="/Rahul-Kapgate-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Resume"
                    className="group relative hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} size="lg" />
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      Resume
                    </span>
                  </a>
                  <motion.div
                    variants={fadeUpV}
                    className="relative flex justify-center md:justify-start"
                  >
                    <div className="w-10 h-10">
                      <RubiksCube />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right side terminal card */}
              <motion.div
                variants={fadeUpV}
                className="relative flex justify-center md:justify-end overflow-hidden w-full"
              >
                <HeroTerminalCard start={!loading} />
              </motion.div>
            </motion.section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="space-y-6 scroll-mt-24">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Experience
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  A quick look at where I&apos;ve been learning, building, and
                  shipping.
                </p>
              </div>

              <div className="space-y-6">
                {/* SirpiDataScience */}
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, ease: "easeOut" }
                  }
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors"
                >
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
                            {formatDateRange("2025-01-01")} · Bengaluru,
                            Karnataka, India · On-site
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
                              {formatDateRange("2025-06-01")}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                              Working across frontend and backend to build
                              internal tools, dashboards, and data-heavy
                              workflows using React, FastAPI, and modern cloud
                              services.
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
                              {formatDateRange("2025-01-01", "2025-05-30")}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                              Contributed to features in existing products,
                              fixed bugs, and gained hands-on experience with
                              real-world production code, APIs, and deployment
                              workflows.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Micropro card */}
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, ease: "easeOut" }
                  }
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors"
                >
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
                            Jul 2024 – Sep 2024 · 3 mos · Nagpur, Maharashtra,
                            India · On-site
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
                        Worked on system administration tasks, basic networking,
                        and troubleshooting. This experience gave me a strong
                        foundation in how infrastructure and operating systems
                        behave under real workloads.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* SOLAR SYSTEM SECTION */}
            <motion.section
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.55, ease: "easeOut" }
              }
              className="space-y-6 scroll-mt-24"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  A little corner of the universe
                </h3>
                <p className="mt-2 text-sm text-slate-800 dark:text-slate-400 max-w-2xl">
                  When I'm not shipping features, I'm probably thinking about
                  systems — much like this one.
                </p>
              </div>

              <div className="">
                <SolarSystem />
              </div>
            </motion.section>

            {/* GitHub snapshot (with input) */}
            <GithubProfileSection defaultUsername="rahul-kapgate" />

            {/* ✅ SKILLS – ONLY spotlight hover bg effect, no tabs/search/expand */}
            <section id="skills" className="space-y-4 scroll-mt-24">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Tech I enjoy working with
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                  The tools I reach for when building platforms like Artistic
                  Vickey, internal dashboards, and data-heavy workflows.
                </p>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {techSections.map((section) => (
                  <motion.div
                    key={section.label}
                    style={{ breakInside: "avoid" }}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.4, ease: "easeOut" }
                    }
                    className="mb-4"
                  >
                    <SpotlightCard
                      className="rounded-3xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm
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
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-lg shadow-sm
                                        group-hover:scale-105 transition-transform dark:bg-slate-800"
                            >
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
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="space-y-6 scroll-mt-24">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Projects
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  A few key projects that represent what I like building.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, ease: "easeOut" }
                  }
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6 flex flex-col justify-between shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                          ArtisticVickey.in
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 font-medium">
                          Full-Stack Course + Practice Platform
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        Live
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      A full-stack platform for{" "}
                      <span className="font-medium text-slate-900 dark:text-slate-200">
                        MAH AAC CET
                      </span>{" "}
                      aspirants with courses, resources, video lectures, mock
                      tests, and PYQ practice in one structured learning
                      experience.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                      {[
                        "React",
                        "TypeScript",
                        "Tailwind CSS",
                        "TanStack Query",
                        "Node.js",
                        "Express",
                        "JWT",
                        "Supabase",
                        "AWS S3",
                        "Razorpay",
                        "Resend",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-300 px-2.5 py-1 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <li>
                        • Built a responsive course platform with course
                        catalog, pricing/discount display, and authenticated{" "}
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          My Courses
                        </span>{" "}
                        access for enrolled learners.
                      </li>
                      <li>
                        • Implemented section-based learning flows for{" "}
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          Resources, Video Lectures, Mock Tests, and PYQ tests
                        </span>
                        .
                      </li>
                      <li>
                        • Developed a timed test engine with question loading,
                        answer submission, scoring, and detailed attempt review.
                      </li>
                      <li>
                        • Built backend foundations including auth, password
                        reset, role-based admin controls, and payment order +
                        verification for enrollments.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 space-y-3">
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, ease: "easeOut" }
                  }
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6 flex flex-col justify-between shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Smart Bookmark App
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 font-medium">
                          Private Bookmark Manager
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        GitHub
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      A bookmark manager built with{" "}
                      <span className="font-medium text-slate-900 dark:text-slate-200">
                        Next.js App Router
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-slate-900 dark:text-slate-200">
                        Supabase
                      </span>{" "}
                      where users can securely save private bookmarks, manage
                      them across tabs, and authenticate with Google OAuth.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                      {[
                        "Next.js",
                        "App Router",
                        "TypeScript",
                        "Tailwind CSS",
                        "Supabase Auth",
                        "Postgres",
                        "Realtime",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-300 px-2.5 py-1 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <li>
                        • Built Google OAuth-only authentication using Supabase
                        Auth with secure callback handling.
                      </li>
                      <li>
                        • Implemented private user-specific bookmarks with{" "}
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          Row Level Security
                        </span>{" "}
                        to ensure users only access their own data.
                      </li>
                      <li>
                        • Added realtime bookmark syncing across tabs so changes
                        appear without requiring a manual refresh.
                      </li>
                      <li>
                        • Solved tricky issues around OAuth redirect URLs, App
                        Router cookie handling, and stale realtime auth state.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 space-y-3">
                    <a
                      href="https://github.com/rahul-kapgate/smart-bookmark-app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full justify-center items-center rounded-full bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                    >
                      View GitHub Repo ↗
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>
          <ScrollToTop />
        </div>
      </HelmetProvider>
    </>
  );
}
