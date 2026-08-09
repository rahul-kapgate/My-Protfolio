import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function GithubProfileSection({
  defaultUsername = "rahul-kapgate",
}) {
  const sectionRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  /* =========================================================
      SECTION ENTER ANIMATION
  ========================================================= */
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

  /* =========================================================
      FETCH GITHUB PROFILE
  ========================================================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.github.com/users/${defaultUsername}`,
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("GitHub profile not found.");
          }

          throw new Error("Unable to load GitHub profile.");
        }

        const data = await response.json();

        setProfile(data);
      } catch (err) {
        console.error("GitHub profile error:", err);

        setError(err.message || "GitHub profile is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [defaultUsername]);

  const createdYear = profile?.created_at
    ? new Date(profile.created_at).getFullYear()
    : null;

  const websiteUrl = profile?.blog
    ? profile.blog.startsWith("http")
      ? profile.blog
      : `https://${profile.blog}`
    : null;

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "100% 80px",
          }}
        />

        <div className="absolute right-[15%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/[0.01] blur-[120px]" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        {/* ===================================================
            SECTION LABEL
        ==================================================== */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            GitHub
          </span>

          <span className="h-px w-12 bg-white/10" />
        </div>

        {/* ===================================================
            HEADING
        ==================================================== */}
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

        {/* ===================================================
            MAIN DIVIDER
        ==================================================== */}
        <div
          className={`mt-10 h-px w-full max-w-6xl bg-white/[0.08] transition-all delay-300 duration-1000 lg:mt-12 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={{
            transformOrigin: "left",
          }}
        />

        {/* ===================================================
            LOADING STATE
        ==================================================== */}
        {loading && (
          <div className="mt-10 max-w-6xl">
            <div className="animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/[0.05]" />

                <div>
                  <div className="h-4 w-36 rounded bg-white/[0.05]" />

                  <div className="mt-3 h-3 w-52 rounded bg-white/[0.03]" />
                </div>
              </div>

              <div className="mt-10 grid grid-cols-3 border-y border-white/[0.06]">
                <div className="h-24 border-r border-white/[0.06]" />

                <div className="h-24 border-r border-white/[0.06]" />

                <div className="h-24" />
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            ERROR STATE
        ==================================================== */}
        {!loading && error && (
          <div className="mt-10 max-w-6xl border-y border-white/[0.08] py-8">
            <p className="text-sm text-zinc-500">{error}</p>

            <a
              href={`https://github.com/${defaultUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-300 transition hover:text-white"
            >
              Visit GitHub
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        )}

        {/* ===================================================
            PROFILE
        ==================================================== */}
        {!loading && !error && profile && (
          <div
            className={`mt-8 max-w-6xl transition-all delay-[350ms] duration-700 lg:mt-10 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {/* =================================================
                PROFILE TOP
            ================================================== */}
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              {/* PROFILE INFO */}
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Colored GitHub Avatar */}
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${profile.login} on GitHub`}
                  className="shrink-0"
                >
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="h-14 w-14 rounded-full border border-white/[0.1] object-cover transition duration-200 hover:border-white/25 sm:h-16 sm:w-16"
                    loading="lazy"
                  />
                </a>

                <div className="min-w-0">
                  {/* NAME + PROFILE BUTTON */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-medium text-zinc-100 sm:text-xl">
                      {profile.name || profile.login}
                    </h3>

                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 rounded-full border border-white/[0.1] px-2.5 py-1 text-[10px] text-zinc-500 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] hover:text-zinc-200 sm:text-xs"
                    >
                      @{profile.login}
                      <ArrowUpRight
                        size={10}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>

                  {/* BIO */}
                  {profile.bio && (
                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                      {profile.bio}
                    </p>
                  )}

                  {/* META */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {profile.location && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                        <MapPin size={11} />

                        {profile.location}
                      </div>
                    )}

                    {createdYear && (
                      <span className="text-xs text-zinc-600">
                        GitHub since {createdYear}
                      </span>
                    )}

                    {websiteUrl && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-xs text-zinc-600 transition hover:text-zinc-300"
                      >
                        Website
                        <ArrowUpRight
                          size={10}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* LARGE VIEW PROFILE ACTION */}
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-white"
              >
                View GitHub profile
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* =================================================
                STATS
            ================================================== */}
            <div className="mt-10 grid grid-cols-3 border-y border-white/[0.08] sm:mt-12">
              {/* REPOSITORIES */}
              <div className="border-r border-white/[0.08] py-5 pr-3 sm:py-7 sm:pr-6">
                <p className="text-[9px] uppercase tracking-[0.12em] text-zinc-600 sm:text-xs">
                  Repositories
                </p>

                <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-zinc-200 sm:text-3xl">
                  {profile.public_repos}
                </p>
              </div>

              {/* FOLLOWERS */}
              <div className="border-r border-white/[0.08] px-3 py-5 sm:px-8 sm:py-7">
                <p className="text-[9px] uppercase tracking-[0.12em] text-zinc-600 sm:text-xs">
                  Followers
                </p>

                <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-zinc-200 sm:text-3xl">
                  {profile.followers}
                </p>
              </div>

              {/* FOLLOWING */}
              <div className="py-5 pl-3 sm:py-7 sm:pl-8">
                <p className="text-[9px] uppercase tracking-[0.12em] text-zinc-600 sm:text-xs">
                  Following
                </p>

                <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-zinc-200 sm:text-3xl">
                  {profile.following}
                </p>
              </div>
            </div>

            {/* =================================================
                DESCRIPTION + REPOSITORIES
            ================================================== */}
            <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                My GitHub contains projects, experiments and production work
                that reflect how I approach development — understanding the
                problem, building the solution and continuously improving it.
              </p>

              <a
                href={`https://github.com/${defaultUsername}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 border-b border-white/20 pb-1 text-sm text-zinc-300 transition duration-200 hover:border-white hover:text-white"
              >
                Explore repositories
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        )}

        {/* ===================================================
            BOTTOM BAR
        ==================================================== */}
        <div
          className={`mt-10 flex max-w-6xl items-center justify-between border-t border-white/[0.08] pt-5 transition-all delay-700 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-xs text-zinc-700">github.com/{defaultUsername}</p>

          <a
            href={`https://github.com/${defaultUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
          >
            Open GitHub
            <ArrowUpRight
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
