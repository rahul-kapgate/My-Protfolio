import { ArrowUpRight, Mail } from "lucide-react";

const HeroSection = ({ isReady }) => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white">
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

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.015] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        {/* Availability */}
        <div
          className={`mb-8 flex items-center gap-2 transition-all duration-700 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-xs font-medium tracking-wide text-zinc-500">
            Available for opportunities
          </span>
        </div>

        {/* Main heading */}
        <div className="max-w-5xl">
          <p
            className={`mb-4 text-sm font-medium text-zinc-500 transition-all delay-100 duration-700 sm:text-base ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Hi, I&apos;m
          </p>

          <div className="overflow-hidden">
            <h1
              className={`text-[42px] font-semibold leading-[1.06] tracking-[-0.045em] text-zinc-100 transition-all delay-200 duration-1000 sm:text-6xl md:text-7xl lg:text-[82px] ${
                isReady
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              Rahul Kapgate
            </h1>
          </div>

          <div className="overflow-hidden">
            <span
              className={`block text-[42px] font-semibold leading-[1.06] tracking-[-0.045em] text-zinc-500 transition-all delay-300 duration-1000 sm:text-6xl md:text-7xl lg:text-[82px] ${
                isReady
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              Full Stack Developer
            </span>
          </div>
        </div>

        {/* Lower content */}
        <div
          className={`mt-10 grid max-w-6xl gap-8 border-t border-white/[0.08] pt-7 transition-all delay-[400ms] duration-700 md:grid-cols-[1fr_auto] md:items-end lg:mt-12 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="max-w-2xl">
            <p className="text-sm leading-7 text-zinc-400 sm:text-base">
              I build modern web and mobile applications across frontend,
              backend, APIs and databases — with a focus on performance,
              maintainability and a clear user experience.
            </p>

            <p className="mt-3 text-sm text-zinc-600">
              Based in Bengaluru, India.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToProjects}
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition duration-200 hover:bg-zinc-200"
            >
              View my work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <a
              href="mailto:rahulkapgateyt@gmail.com"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/[0.12] px-5 text-sm font-medium text-zinc-300 transition duration-200 hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
            >
              <Mail size={15} />
              Contact
            </a>
          </div>
        </div>

        {/* Bottom links */}
        <div
          className={`absolute bottom-6 left-5 right-5 hidden items-center justify-between transition-all delay-[600ms] duration-700 sm:left-8 sm:right-8 sm:flex lg:left-12 lg:right-12 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/rahul-kapgate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-600 transition hover:text-zinc-300"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/rahul-kapgate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-600 transition hover:text-zinc-300"
            >
              LinkedIn
            </a>

            <a
              href="/rahul-kapgate-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-600 transition hover:text-zinc-300"
            >
              Resume
            </a>
          </div>

          <p className="text-xs text-zinc-700">rahulkapgate.in</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
