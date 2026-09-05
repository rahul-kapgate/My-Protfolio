import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

const experiences = [
  {
    number: "01",
    period: "Jan 2025 — Jun 2026",
    duration: "1 year 6 months",
    location: "Bengaluru",
    role: "Full Stack Developer",
    company: "Sirpi DataScience",
    summary:
      "Worked across production platforms, contributing to frontend and backend development, APIs, databases, performance optimization, debugging and production releases.",
    work: [
      [
        "ERP workflows",
        "Contributed to an ERP platform streamlining end-to-end business workflows, digitizing record management, approvals, and status tracking.",
      ],
      [
        "Reusable frontend modules",
        "Developed React.js and TypeScript modules for complex workflows, including dynamic forms, validation, and data tables.",
      ],
      [
        "Platform migration",
        "Modernized a wind energy platform across frontend and backend systems, optimizing application performance and data-driven features.",
      ],
      [
        "Production engineering",
        "Simplified data-driven workflows, optimized API/database interactions, and participated in production releases, code reviews, and defect resolution.",
      ],
    ],
    results: [
      ["40%", "less manual effort"],
      ["25%", "reduced development effort"],
      ["20%", "faster response times"],
    ],
  },
  {
    number: "02",
    period: "Jun 2024 — Nov 2024",
    duration: "6 months",
    location: "Nagpur",
    role: "Full Stack Developer, Intern",
    company: "Micropro Software Solutions Limited",
    summary:
      "Developed and enhanced web applications using JavaScript, React.js, Node.js, and Express.js across the software development lifecycle.",
    work: [
      [
        "Frontend Development",
        "Built reusable UI components, forms, data tables, and responsive interfaces using React.js.",
      ],
      [
        "Backend & Database",
        "Worked with REST APIs and SQL databases for robust backend integration and data management.",
      ],
      [
        "Operations & Deployment",
        "Contributed to debugging, testing, Git/GitHub workflows, and application deployment.",
      ],
    ],
    results: [],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "96px 100%",
          }}
        />
        <div className="absolute left-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-emerald-400/[0.015] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Experience
          </span>
          <span className="h-px w-12 bg-white/10" />
          <span className="font-mono text-[9px] text-zinc-700">
            git log --career
          </span>
        </div>

        <div className="max-w-5xl">
          <div className="overflow-hidden">
            <h2
              className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              Building products,
            </h2>
          </div>
          <div className="overflow-hidden">
            <p
              className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-500 transition-all delay-200 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              solving real problems.
            </p>
          </div>
        </div>

        <div
          className={`mt-10 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 lg:mt-12 ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
          style={{ transformOrigin: "left" }}
        />

        <div className="relative mt-4 max-w-6xl">
          <div className="absolute bottom-8 left-[9px] top-8 hidden w-px bg-white/[0.09] md:block" />

          {experiences.map((experience, index) => (
            <article
              key={experience.company}
              className={`relative grid gap-7 border-b border-white/[0.07] py-9 transition-all duration-700 md:grid-cols-[44px_0.28fr_1fr] md:gap-8 lg:py-11 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: `${340 + index * 140}ms` }}
            >
              <div className="hidden md:flex md:justify-start">
                <div className="relative z-10 mt-1 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-emerald-400/40 bg-[#0a0a0a] shadow-[0_0_0_6px_rgba(10,10,10,1)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] text-zinc-600">
                  {experience.period}
                </p>
                <p className="mt-1 font-mono text-[9px] text-zinc-700">
                  {experience.duration}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
                  <MapPin size={12} />
                  {experience.location}
                </div>
                <p className="mt-5 font-mono text-[9px] text-emerald-400/60">
                  commit {experience.number}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em] text-zinc-100 sm:text-2xl">
                      {experience.role}
                    </h3>
                    <p className="mt-1.5 text-sm text-zinc-500">
                      {experience.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-600">
                    main
                  </span>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                  {experience.summary}
                </p>

                <div
                  className={`mt-6 grid gap-0 ${experience.work.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
                >
                  {experience.work.map(([title, description], workIndex) => (
                    <div
                      key={title}
                      className="border-t border-white/[0.07] py-4 sm:px-4 sm:first:pl-0 sm:last:pr-0"
                    >
                      <p className="font-mono text-[9px] text-zinc-700">
                        0{workIndex + 1}
                      </p>
                      <h4 className="mt-2 text-sm font-medium text-zinc-300">
                        {title}
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>

                {experience.results.length > 0 && (
                  <div className="mt-5 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
                    {experience.results.map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-4 py-3"
                      >
                        <span className="text-lg font-medium text-zinc-200">
                          {value}
                        </span>
                        <span className="ml-2 text-xs text-zinc-600">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div
          className={`mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-4 transition-all delay-700 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <p className="text-xs text-zinc-600 sm:text-sm">
            Full work history and details are available in my resume.
          </p>
          <a
            href="/rahul-kapgate-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
          >
            View Resume
            <ArrowUpRight
              size={12}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
