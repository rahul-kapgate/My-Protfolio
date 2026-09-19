import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    id: 1,
    title: "AV Art Academy",
    subtitle: "Production EdTech Platform",
    // year: "2026",
    featured: true,

    image: "/artistic-vickey.png",

    description:
      "A full-stack MAH AAC CET coaching platform bringing courses, resources, video lectures, mock tests and PYQ practice into one structured learning experience.",

    technologies: [
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

    github: "https://github.com/rahul-kapgate/artisticvicky-v2-backend",

    frontend: "https://github.com/rahul-kapgate/artisticvicky-v2-frontend",

    live: "https://artisticvickey.in/",
  },

  {
    id: 2,
    title: "DSA Tracker",
    subtitle: "Interview Prep Progress Tracker",
    // year: "2026",
    featured: true,

    image: "/dsa-tracker.png",

    description:
      "A full-stack Next.js app for organizing DSA questions, tracking solve status, adding notes and building consistent coding streaks for interview preparation.",

    technologies: [
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

    github: "https://github.com/rahul-kapgate/dsa-tracker-next-js-app",

    live: "https://dsatracker.stackfromscratch.in/",
  },

  {
    id: 3,
    title: "Digital Heroes Golf App",
    subtitle: "Subscription + Score Tracking Platform",
    // year: "2026",
    featured: false,

    image: "/digital-heroes.png",

    description:
      "A full-stack golf platform for tracking scores, managing subscriptions, joining monthly draws and supporting charities through a mobile-friendly experience.",

    technologies: [
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

    github: "https://github.com/rahul-kapgate/digital-heroes-golf-app",

    live: "",
  },

  {
    id: 4,
    title: "Smart Bookmark App",
    subtitle: "Secure Personal Bookmark Manager",
    // year: "2026",
    featured: false,

    image: "/smart-bookmark.png",

    description:
      "A Next.js and Supabase bookmark application where users can securely save private bookmarks, authenticate with Google and keep data synchronized across browser tabs.",

    technologies: [
      "Next.js",
      "App Router",
      "TypeScript",
      "Tailwind CSS",
      "Supabase Auth",
      "PostgreSQL",
      "Realtime",
    ],

    github: "https://github.com/rahul-kapgate/smart-bookmark-app",

    live: "",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const visibleProjects =
    filter === "featured"
      ? projects.filter((project) => project.featured)
      : projects;

  return (
    <section id="projects" className="bg-[#070b0f] py-24 text-[#d5d9df]">
      <div className="mx-auto max-w-[1060px] px-6 md:px-8">
        {/* SECTION HEADER */}

        <div>
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[#09d8e7]">
            // MY WORK
          </p>

          <h2 className="mt-3 font-mono text-[32px] font-bold tracking-[-1px] text-[#f4f5f7] md:text-[39px]">
            Featured Projects
          </h2>

          <p className="mt-2 max-w-[620px] font-mono text-[14px] leading-[1.6] text-[#8290a2] md:text-[15px]">
            Full-stack applications, developer tools and practical products
            built with React, Node.js, Python and modern cloud technologies.
          </p>
        </div>

        {/* FILTER */}

        <div className="mt-6 inline-flex rounded-[10px] border border-[#202832] bg-[#0a1015] p-[4px]">
          <button
            onClick={() => setFilter("all")}
            className={`
              rounded-[7px]
              px-4
              py-[8px]
              font-mono
              text-[12px]
              transition
              duration-200

              ${
                filter === "all"
                  ? "border border-[#075b63] bg-[#08343a] text-[#12e0ec]"
                  : "border border-transparent text-[#8190a0] hover:text-[#cbd2d9]"
              }
            `}
          >
            All
          </button>

          <button
            onClick={() => setFilter("featured")}
            className={`
              rounded-[7px]
              px-4
              py-[8px]
              font-mono
              text-[12px]
              transition
              duration-200

              ${
                filter === "featured"
                  ? "border border-[#075b63] bg-[#08343a] text-[#12e0ec]"
                  : "border border-transparent text-[#8190a0] hover:text-[#cbd2d9]"
              }
            `}
          >
            Featured
          </button>
        </div>

        {/* PROJECT GRID */}

        <div className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[11px]
        border
        border-[#252e37]
        bg-[#0d141a]
        transition
        duration-300
        hover:-translate-y-[3px]
        hover:border-[#36424e]
      "
    >
      {/* PROJECT IMAGE */}

      <div className="relative h-[235px] overflow-hidden bg-[#12191f]">
        <img
          src={project.image}
          alt={project.title}
          className="
            h-full
            w-full
            object-cover
            object-top
            transition
            duration-500
            group-hover:scale-[1.02]
          "
        />

        {/* same fade effect as screenshot */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-transparent
            via-transparent
            to-[#0d141a]
          "
        />
      </div>

      {/* CONTENT */}

      <div className="px-5 pb-5">
        {/* META + LINKS */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.featured && (
              <span
                className="
                  rounded-[6px]
                  border
                  border-[#076553]
                  bg-[#063128]
                  px-[10px]
                  py-[4px]
                  font-mono
                  text-[11px]
                  text-[#16d89d]
                "
              >
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub`}
                className="text-[#758697] transition hover:text-[#c6d0d8]"
              >
                <FontAwesomeIcon icon={faGithub} className="text-[17px]" />
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
                className="text-[#758697] transition hover:text-[#c6d0d8]"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-[14px]"
                />
              </a>
            )}
          </div>
        </div>

        {/* TITLE */}

        <div className="mt-4">
          <h3 className="font-mono text-[19px] font-bold leading-[1.5] text-[#f1f2f3]">
            {project.title}
          </h3>

          <p className="mt-1 font-mono text-[11px] text-[#728091]">
            {project.subtitle}
          </p>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-3
            min-h-[88px]
            font-mono
            text-[12.5px]
            leading-[1.7]
            text-[#a7b0ba]
          "
        >
          {project.description}
        </p>

        {/* DIVIDER */}

        <div className="my-4 h-px bg-[#202932]" />

        {/* TECH STACK */}

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="
                rounded-[6px]
                border
                border-[#29333e]
                bg-[#131c23]
                px-[10px]
                py-[5px]
                font-mono
                text-[10.5px]
                text-[#8f9dac]
                transition
                group-hover:border-[#34404c]
              "
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Projects;
