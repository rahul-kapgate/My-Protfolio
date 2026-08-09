import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const AboutSection = () => {
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
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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

        <div className="absolute right-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/[0.012] blur-[120px]" />
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
            About
          </span>

          <span className="h-px w-12 bg-white/10" />
        </div>

        {/* Main heading */}
        <div className="max-w-5xl">
          <div className="overflow-hidden">
            <h2
              className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              I work across the
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
              complete product lifecycle.
            </p>
          </div>
        </div>

        {/* Main divider */}
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

        {/* About content */}
        <div className="mt-8 grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:mt-10 lg:gap-24">
          {/* Left */}
          <div
            className={`transition-all delay-[350ms] duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <p className="max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              I&apos;m Rahul Kapgate, a Full Stack Developer based in Bengaluru.
              I build web and mobile applications from the interface users
              interact with to the APIs, databases and systems working behind
              them.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
              I like understanding the complete workflow before writing code —
              what the user needs, how the data moves through the application,
              where things can fail, and how the product will behave in
              production.
            </p>
          </div>

          {/* Right - What I do */}
          <div
            className={`transition-all delay-500 duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              What I do
            </p>

            {/* Row 1 */}
            <div className="group border-t border-white/[0.08] py-4 sm:py-5">
              <div className="grid grid-cols-[32px_1fr] gap-3 sm:grid-cols-[40px_1fr]">
                <span className="pt-0.5 text-xs text-zinc-700">
                  01
                </span>

                <div>
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">
                    Web applications
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Responsive interfaces and complete application workflows
                    for real-world products.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="group border-t border-white/[0.08] py-4 sm:py-5">
              <div className="grid grid-cols-[32px_1fr] gap-3 sm:grid-cols-[40px_1fr]">
                <span className="pt-0.5 text-xs text-zinc-700">
                  02
                </span>

                <div>
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">
                    Backend systems
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 sm:text-sm">
                    REST APIs, authentication, databases, integrations and
                    server-side application logic.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="group border-t border-white/[0.08] py-4 sm:py-5">
              <div className="grid grid-cols-[32px_1fr] gap-3 sm:grid-cols-[40px_1fr]">
                <span className="pt-0.5 text-xs text-zinc-700">
                  03
                </span>

                <div>
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">
                    Mobile applications
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Cross-platform mobile products connected to the same
                    services and workflows as the web application.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="group border-y border-white/[0.08] py-4 sm:py-5">
              <div className="grid grid-cols-[32px_1fr] gap-3 sm:grid-cols-[40px_1fr]">
                <span className="pt-0.5 text-xs text-zinc-700">
                  04
                </span>

                <div>
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">
                    Production engineering
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 sm:text-sm">
                    Debugging, performance improvements, deployment and
                    maintaining applications after release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-5 border-t border-white/[0.08] pt-5 transition-all delay-700 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <p className="max-w-lg text-xs leading-5 text-zinc-600 sm:text-sm">
            I care about software that is reliable, maintainable and simple for
            people to use.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/rahul-kapgate"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
            >
              GitHub

              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="https://linkedin.com/in/rahul-kapgate"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
            >
              LinkedIn

              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;