const experiences = [
  {
    id: "01",
    period: "Jan 2025 — July 2026",
    duration: "1 year 6 months",
    location: "Bengaluru",
    role: "Full Stack Developer",
    company: "Sirpi DataScience",
    description:
      "Worked across production platforms, contributing to frontend and backend development, APIs, databases, performance optimization, debugging and production releases.",

    work: [
      {
        number: "01",
        title: "ERP workflows",
        description:
          "Contributed to an ERP platform streamlining end-to-end business workflows, digitizing record management, approvals, and status tracking.",
      },
      {
        number: "02",
        title: "Reusable frontend modules",
        description:
          "Developed React.js and TypeScript modules for complex workflows, including dynamic forms, validation, and data tables.",
      },
      {
        number: "03",
        title: "Platform migration",
        description:
          "Modernized a wind energy platform across frontend and backend systems, optimizing application performance and data-driven features.",
      },
      {
        number: "04",
        title: "Production engineering",
        description:
          "Simplified data-driven workflows, optimized API/database interactions, and participated in production releases, code reviews, and defect resolution.",
      },
    ],

    metrics: [
      {
        value: "40%",
        label: "less manual effort",
      },
      {
        value: "25%",
        label: "reduced development effort",
      },
      {
        value: "20%",
        label: "faster response times",
      },
    ],
  },

  {
    id: "02",
    period: "Jun 2024 — Nov 2024",
    duration: "6 months",
    location: "Nagpur",
    role: "Full Stack Developer, Intern",
    company: "Micropro Software Solutions Limited",
    description:
      "Developed and enhanced web applications using JavaScript, React.js, Node.js, and Express.js across the software development lifecycle.",

    work: [
      {
        number: "01",
        title: "Frontend Development",
        description:
          "Built reusable UI components, forms, data tables, and responsive interfaces using React.js.",
      },
      {
        number: "02",
        title: "Backend & Database",
        description:
          "Worked with REST APIs and SQL databases for robust backend integration and data management.",
      },
      {
        number: "03",
        title: "Operations & Deployment",
        description:
          "Contributed to debugging, testing, Git/GitHub workflows, and application deployment.",
      },
      {
        number: "04",
        title: "Collaboration & Code Quality",
        description:
          "Collaborated with developers through Git/GitHub workflows, code reviews and issue resolution while following reusable and maintainable coding practices.",
      },
    ],

    metrics: [],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="bg-[#070b0f] py-24 text-[#d5d9df]">
      <div className="mx-auto max-w-[1060px] px-6 md:px-8">
        {/* SECTION HEADER */}

        <div className="mb-14">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[#09d8e7]">
            // EXPERIENCE
          </p>

          <h2 className="mt-3 font-mono text-[32px] font-bold tracking-[-1px] text-[#f4f5f7] md:text-[39px]">
            Work Experience
          </h2>

          <p className="mt-2 max-w-[650px] font-mono text-[14px] leading-[1.65] text-[#8290a2] md:text-[15px]">
            Building and shipping production applications across frontend,
            backend, databases and cloud infrastructure.
          </p>
        </div>

        {/* EXPERIENCE LIST */}

        <div className="space-y-10">
          {experiences.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceItem = ({ experience }) => {
  return (
    <article className="grid gap-6 md:grid-cols-[190px_1fr] md:gap-10">
      {/* LEFT SIDE */}

      <aside className="font-mono">
        <p className="text-[13px] font-medium text-[#d9dee5]">
          {experience.period}
        </p>

        <p className="mt-2 text-[11px] text-[#617080]">{experience.duration}</p>

        <div className="mt-5 flex items-center gap-2 text-[11px] text-[#8290a2]">
          <span className="text-[#09d8e7]">⌖</span>

          <span>{experience.location}</span>
        </div>
      </aside>

      {/* RIGHT SIDE */}

      <div>
        {/* COMMIT HEADER */}

        <div className="flex items-center gap-3 font-mono">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#164c51] bg-[#092528] text-[10px] text-[#0cdae8]">
            {experience.id}
          </div>

          <span className="text-[10px] uppercase tracking-[0.14em] text-[#53616f]">
            commit {experience.id}
          </span>
        </div>

        {/* MAIN CARD */}

        <div
          className="
            mt-4
            overflow-hidden
            rounded-[11px]
            border
            border-[#252e37]
            bg-[#0d141a]
            transition
            duration-300
            hover:border-[#35414c]
          "
        >
          {/* CARD HEADER */}

          <div className="border-b border-[#202932] px-6 py-6 md:px-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="font-mono text-[20px] font-bold text-[#f2f4f6] md:text-[22px]">
                  {experience.role}
                </h3>

                <p className="mt-2 font-mono text-[13px] text-[#0bd8e7]">
                  {experience.company}
                </p>
              </div>

              {/* BRANCH */}

              <span
                className="
                  w-fit
                  rounded-full
                  border
                  border-[#23313b]
                  bg-[#101820]
                  px-3
                  py-[5px]
                  font-mono
                  text-[10px]
                  text-[#738391]
                "
              >
                main
              </span>
            </div>

            <p className="mt-5 max-w-[770px] font-mono text-[13px] leading-[1.75] text-[#aab3bd]">
              {experience.description}
            </p>
          </div>

          {/* WORK ITEMS */}

          <div className="grid gap-px bg-[#202932] md:grid-cols-2">
            {experience.work.map((item) => (
              <div
                key={item.number}
                className="
                  bg-[#0d141a]
                  px-6
                  py-6
                  transition
                  duration-200
                  hover:bg-[#10181f]
                  md:px-7
                "
              >
                <span className="font-mono text-[10px] text-[#0cd8e7]">
                  {item.number}
                </span>

                <h4 className="mt-3 font-mono text-[14px] font-bold text-[#e8ebee]">
                  {item.title}
                </h4>

                <p className="mt-3 font-mono text-[11.5px] leading-[1.75] text-[#8e9aa6]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* METRICS */}

          {experience.metrics.length > 0 && (
            <div className="border-t border-[#202932] px-6 py-6 md:px-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {experience.metrics.map((metric) => (
                  <div key={metric.label} className="font-mono">
                    <p className="text-[24px] font-bold text-[#11d9e7]">
                      {metric.value}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#687684]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Experience;
