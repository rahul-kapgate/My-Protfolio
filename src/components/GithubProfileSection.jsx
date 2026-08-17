import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, GitBranch, MapPin } from "lucide-react";

const githubProfile = {
  name: "Rahul Kapgate",
  login: "rahul-kapgate",
  htmlUrl: "https://github.com/rahul-kapgate",
  avatarUrl: "https://github.com/rahul-kapgate.png",
  location: "Bengaluru, India",
  bio: "Full Stack Developer building web, mobile and backend products.",
};

const recentRepos = [
  {
    id: "artisticvicky-v2-frontend",
    name: "artisticvicky-v2-frontend",
    description: "Frontend for the ArtisticVickey production EdTech platform.",
    language: "TypeScript",
    htmlUrl: "https://github.com/rahul-kapgate/artisticvicky-v2-frontend",
  },
  {
    id: "digital-heroes-golf-app",
    name: "digital-heroes-golf-app",
    description: "Full-stack golf subscription and score-tracking platform.",
    language: "TypeScript",
    htmlUrl: "https://github.com/rahul-kapgate/digital-heroes-golf-app",
  },
  {
    id: "smart-bookmark-app",
    name: "smart-bookmark-app",
    description:
      "Secure Next.js bookmark manager with Supabase authentication.",
    language: "TypeScript",
    htmlUrl: "https://github.com/rahul-kapgate/smart-bookmark-app",
  },
];

export default function GithubProfileSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-emerald-400/[0.05] to-transparent" />
        <div className="absolute right-[12%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-emerald-400/[0.012] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            GitHub
          </span>
          <span className="h-px w-12 bg-white/10" />
          <span className="font-mono text-[9px] text-emerald-400/50">
            origin/main
          </span>
        </div>

        <div className="max-w-5xl">
          <div className="overflow-hidden">
            <h2
              className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Code is better
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
              when you can see the work.
            </p>
          </div>
        </div>

        <div
          className={`mt-10 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 lg:mt-12 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        <div
          className={`mt-9 max-w-6xl transition-all delay-[350ms] duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-600">
                <span className="text-emerald-400">➜</span>
                <span>github</span>
                <span className="text-zinc-700">status --developer</span>
              </div>

              <span className="font-mono text-[8px] text-zinc-700">
                PUBLIC PROFILE
              </span>
            </div>

            <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
              <div>
                <div className="flex items-start gap-4">
                  <a
                    href={githubProfile.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <img
                      src={githubProfile.avatarUrl}
                      alt={githubProfile.name}
                      loading="lazy"
                      className="h-16 w-16 rounded-xl border border-white/[0.1] object-cover"
                    />
                  </a>

                  <div className="min-w-0">
                    <h3 className="text-lg font-medium text-zinc-100">
                      {githubProfile.name}
                    </h3>

                    <a
                      href={githubProfile.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400/70 hover:text-emerald-300"
                    >
                      @{githubProfile.login}
                      <ArrowUpRight size={9} />
                    </a>

                    <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-600">
                      <MapPin size={11} />
                      {githubProfile.location}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-zinc-500">
                  {githubProfile.bio}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    ["3", "featured repos"],
                    ["Web + Mobile", "product focus"],
                    ["Full Stack", "development"],
                    ["Open Source", "GitHub"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.012] p-3"
                    >
                      <p className="text-lg font-medium tracking-[-0.04em] text-zinc-200 sm:text-xl">
                        {value}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-700">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-700">
                      Selected repositories
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Projects that represent my recent full-stack work.
                    </p>
                  </div>

                  <GitBranch size={16} className="text-zinc-700" />
                </div>

                <div className="mt-4 border-t border-white/[0.07]">
                  {recentRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-2 border-b border-white/[0.07] py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-300 transition group-hover:text-white">
                          {repo.name}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-zinc-600">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-700">
                        <span>{repo.language}</span>
                        <ArrowUpRight
                          size={10}
                          className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                    </a>
                  ))}
                </div>

                <a
                  href={`${githubProfile.htmlUrl}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                  Explore repositories
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 flex max-w-6xl items-center justify-between transition-all delay-700 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="font-mono text-[9px] text-zinc-700">
            github.com/{githubProfile.login}
          </p>

          <a
            href={githubProfile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
          >
            Open GitHub
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
