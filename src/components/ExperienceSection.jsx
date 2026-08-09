import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

const ExperienceSection = () => {
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
        threshold: 0.15,
      },
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

        <div className="absolute left-[15%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/[0.01] blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        {/* Section label */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Experience
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
              Building products,
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
              solving real problems.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-10 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 lg:mt-12 ${
            isVisible
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }`}
          style={{
            transformOrigin: "left",
          }}
        />

        {/* =====================================================
            EXPERIENCE 1
        ====================================================== */}
        <div
          className={`grid max-w-6xl gap-6 border-b border-white/[0.08] py-7 transition-all delay-[350ms] duration-700 md:grid-cols-[0.38fr_1fr] md:gap-12 lg:py-9 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {/* Left */}
          <div>
            <p className="text-xs text-zinc-600">
              Jan 2025 — Jun 2026
            </p>

            <p className="mt-1 text-xs text-zinc-700">
              1 year 6 months
            </p>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
              <MapPin size={12} />

              Bengaluru
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-zinc-100 sm:text-2xl">
                  Full Stack Developer
                </h3>

                <p className="mt-1.5 text-sm text-zinc-500">
                  Sirpi DataScience
                </p>
              </div>

              <span className="text-xs text-zinc-700">
                01
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
              Worked across production platforms, contributing to frontend and
              backend development, APIs, databases, performance optimization,
              debugging and production releases.
            </p>

            {/* Work */}
            <div className="mt-6">
              <div className="grid gap-0 sm:grid-cols-2">
                {/* 1 */}
                <div className="border-t border-white/[0.07] py-4 sm:pr-8">
                  <p className="text-xs text-zinc-700">
                    01
                  </p>

                  <h4 className="mt-2 text-sm font-medium text-zinc-300">
                    ERP workflows
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Contributed to workflows for record management, approvals,
                    status tracking and business operations.
                  </p>
                </div>

                {/* 2 */}
                <div className="border-t border-white/[0.07] py-4 sm:pl-8">
                  <p className="text-xs text-zinc-700">
                    02
                  </p>

                  <h4 className="mt-2 text-sm font-medium text-zinc-300">
                    Reusable frontend modules
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Built React and TypeScript modules for dynamic forms,
                    validation, tables, filtering and pagination.
                  </p>
                </div>

                {/* 3 */}
                <div className="border-t border-white/[0.07] py-4 sm:pr-8">
                  <p className="text-xs text-zinc-700">
                    03
                  </p>

                  <h4 className="mt-2 text-sm font-medium text-zinc-300">
                    Platform migration
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Worked across frontend and backend systems while modernizing
                    a wind-energy platform and improving performance.
                  </p>
                </div>

                {/* 4 */}
                <div className="border-y border-white/[0.07] py-4 sm:border-b-0 sm:pl-8">
                  <p className="text-xs text-zinc-700">
                    04
                  </p>

                  <h4 className="mt-2 text-sm font-medium text-zinc-300">
                    Production engineering
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Worked on releases, debugging, code reviews and defect
                    resolution across business-critical workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.07] pt-5">
              <div>
                <span className="text-sm font-medium text-zinc-200">
                  40%
                </span>

                <span className="ml-2 text-xs text-zinc-600">
                  less manual effort
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-zinc-200">
                  25%
                </span>

                <span className="ml-2 text-xs text-zinc-600">
                  reduced development effort
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-zinc-200">
                  20%
                </span>

                <span className="ml-2 text-xs text-zinc-600">
                  faster response times
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            EXPERIENCE 2
        ====================================================== */}
        <div
          className={`grid max-w-6xl gap-6 py-7 transition-all delay-500 duration-700 md:grid-cols-[0.38fr_1fr] md:gap-12 lg:py-9 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {/* Left */}
          <div>
            <p className="text-xs text-zinc-600">
              Jul 2024 — Dec 2024
            </p>

            <p className="mt-1 text-xs text-zinc-700">
              6 months
            </p>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
              <MapPin size={12} />

              Nagpur
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-zinc-100 sm:text-2xl">
                  System Administrator
                </h3>

                <p className="mt-1.5 text-sm text-zinc-500">
                  Micropro Software Solutions Limited
                </p>
              </div>

              <span className="text-xs text-zinc-700">
                02
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
              Gained practical infrastructure experience working with Linux,
              networking, databases, system configuration, Docker and AWS
              environments.
            </p>

            <div className="mt-6 grid gap-0 sm:grid-cols-3">
              <div className="border-t border-white/[0.07] py-4 sm:pr-6">
                <p className="text-xs text-zinc-700">
                  01
                </p>

                <h4 className="mt-2 text-sm font-medium text-zinc-300">
                  Systems
                </h4>

                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  Linux administration, configuration and infrastructure
                  troubleshooting.
                </p>
              </div>

              <div className="border-t border-white/[0.07] py-4 sm:px-6">
                <p className="text-xs text-zinc-700">
                  02
                </p>

                <h4 className="mt-2 text-sm font-medium text-zinc-300">
                  Infrastructure
                </h4>

                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  Networking, database operations and operational support.
                </p>
              </div>

              <div className="border-y border-white/[0.07] py-4 sm:border-b-0 sm:pl-6">
                <p className="text-xs text-zinc-700">
                  03
                </p>

                <h4 className="mt-2 text-sm font-medium text-zinc-300">
                  Cloud & containers
                </h4>

                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  Practical exposure to Docker and AWS infrastructure
                  environments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-2 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5 transition-all delay-700 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
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