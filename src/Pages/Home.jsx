// Home.jsx
import React from "react";
import "../App.css";
import "../assets/fonts/fonts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-custom">
            {/* Top Navbar */}
            <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo / Name */}
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
                        <div>
                            <h1 className="text-sm font-semibold tracking-tight text-slate-100">
                                Rahul Kapgate
                            </h1>
                            <p className="text-xs text-slate-400 tracking-wide">
                                Software Engineer
                            </p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden sm:flex items-center gap-6 text-sm">
                        <a
                            href="#home"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#experience"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Experience
                        </a>
                        <a
                            href="#projects"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Projects
                        </a>
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 pt-10 pb-20 space-y-24">
                {/* HOME / HERO SECTION */}
                <section
                    id="home"
                    className="grid gap-10 md:grid-cols-[3fr,2fr] items-center"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-4">
                            SOFTWARE ENGINEER
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-50">
                            Building clean, modern, and reliable web experiences.
                        </h2>
                        <p className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                            I&apos;m Rahul, a full-stack engineer currently focused on
                            building{" "}
                            <span className="text-slate-200 font-semibold">
                                Artistic Vickey
                            </span>{" "}
                            — a dedicated platform for MAH AAC CET aspirants. I love working
                            with <span className="text-slate-200">React</span>,{" "}
                            <span className="text-slate-200">Node / FastAPI</span>, and{" "}
                            <span className="text-slate-200">modern web tools</span> to craft
                            products that feel fast, polished, and thoughtfully designed.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="#projects"
                                className="inline-flex items-center rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 transition-colors"
                            >
                                View Projects
                            </a>
                            <a
                                href="#experience"
                                className="inline-flex items-center rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900 transition-colors"
                            >
                                View Experience
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 flex items-center gap-5 text-slate-400">
                            <a
                                href="https://github.com/rahul-kapgate"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Github Profile"
                                className="hover:text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faGithub} size="lg" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/rahul-kapgate/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="hover:text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                            <a
                                href="https://x.com/Rahul__Kapgate"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter Profile"
                                className="hover:text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                        </div>
                    </div>

                    {/* Hero side card focusing Artistic Vickey */}
                    <div className="hidden md:block">
                        <div className="relative h-64 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
                            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-60" />
                            <div className="absolute inset-x-6 bottom-6 space-y-3">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                    CURRENTLY BUILDING
                                </p>
                                <p className="text-sm text-slate-200">
                                    <span className="font-semibold">Artistic Vickey</span> – a
                                    focused prep platform for the Maharashtra Applied Arts and
                                    Crafts Common Entrance Test (MAH AAC CET).
                                </p>
                                <a
                                    href="https://artisticvickey.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex text-xs items-center rounded-full bg-slate-100/10 px-4 py-2 text-slate-100 hover:bg-slate-100/20 transition-colors"
                                >
                                    Visit artisticvickey.in
                                    <span className="ml-2 text-slate-400">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION – LINKEDIN STYLE TIMELINE */}
                <section id="experience" className="space-y-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-50">
                            Experience
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            A quick look at where I&apos;ve been learning, building, and
                            shipping.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* SirpiDataScience */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
                            {/* Company row */}
                            <div className="flex items-start gap-4">
                                {/* Placeholder logo circle */}
                                <div className="mt-1 h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-200">
                                    S
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <a
                                                href="https://www.sirpi.io/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm sm:text-base font-semibold text-slate-100 hover:text-indigo-300 transition-colors"
                                            >
                                                SirpiDataScience
                                            </a>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Full-time · 11 mos · Bengaluru, Karnataka, India · On-site
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[11px] rounded-full border border-slate-700 px-3 py-1 text-slate-300">
                                                React.js · FastAPI · Full Stack
                                            </span>
                                            <a
                                                href="https://www.sirpi.io/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[11px] text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline"
                                            >
                                                Visit website ↗
                                            </a>
                                        </div>
                                    </div>

                                    {/* Timeline for roles */}
                                    <div className="mt-4 space-y-4">
                                        {/* Role 1 */}
                                        <div className="flex gap-3">
                                            {/* Dot + line */}
                                            <div className="flex flex-col items-center">
                                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                                                <span className="mt-1 w-px flex-1 bg-slate-700" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h5 className="text-sm font-semibold text-slate-100">
                                                    Full Stack Developer
                                                </h5>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    Jun 2025 – Present · 6 mos
                                                </p>
                                                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                                                    Working across frontend and backend to build internal tools,
                                                    dashboards, and data-heavy workflows using React, FastAPI, and
                                                    modern cloud services.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Role 2 */}
                                        <div className="flex gap-3">
                                            {/* Dot without extending line down */}
                                            <div className="flex flex-col items-center">
                                                <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                                                <span className="mt-1 w-px flex-1 bg-transparent" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h5 className="text-sm font-semibold text-slate-100">
                                                    Full Stack Developer Intern
                                                </h5>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    Jan 2025 – Jun 2025 · 6 mos
                                                </p>
                                                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                                                    Contributed to features in existing products, fixed bugs, and
                                                    gained hands-on experience with real-world production code, APIs,
                                                    and deployment workflows.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Micropro Software Solutions Limited */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                                {/* Placeholder logo circle */}
                                <div className="mt-1 h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-200">
                                    M
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <a
                                                href="https://www.microproindia.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm sm:text-base font-semibold text-slate-100 hover:text-indigo-300 transition-colors"
                                            >
                                                System Administrator
                                            </a>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Micropro Software Solutions Limited · Internship
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Jul 2024 – Sep 2024 · 3 mos · Nagpur, Maharashtra, India · On-site
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[11px] rounded-full border border-slate-700 px-3 py-1 text-slate-300">
                                                Computer Networking · Linux
                                            </span>
                                            <a
                                                href="https://www.microproindia.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[11px] text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline"
                                            >
                                                Visit website ↗
                                            </a>
                                        </div>
                                    </div>

                                    <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                                        Worked on system administration tasks, basic networking, and
                                        troubleshooting. This experience gave me a strong foundation in how
                                        infrastructure and operating systems behave under real workloads.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="space-y-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-50">
                            Projects
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            A few key projects that represent what I like building.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Project 1 – Artistic Vickey */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="text-base sm:text-lg font-semibold text-slate-100">
                                    Artistic Vickey
                                </h4>
                                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                                    An educational platform tailored for{" "}
                                    <span className="text-slate-200 font-medium">
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
                                    className="inline-flex w-full justify-center items-center rounded-full bg-indigo-500 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-indigo-400 transition-colors"
                                >
                                    Visit artisticvickey.in ↗
                                </a>

                                <div className="flex flex-wrap gap-3 text-[11px] text-slate-300">
                                    <a
                                        href="https://github.com/rahul-kapgate/artisticvicky-v2-frontend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 hover:border-slate-500 hover:bg-slate-900 transition-colors"
                                    >
                                        Frontend Repo
                                    </a>
                                    <a
                                        href="https://github.com/rahul-kapgate/artisticvicky-v2-backend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 hover:border-slate-500 hover:bg-slate-900 transition-colors"
                                    >
                                        Backend Repo
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* You can add another project card here later if you want */}
                    </div>
                </section>
            </main>
        </div>
    );
}
