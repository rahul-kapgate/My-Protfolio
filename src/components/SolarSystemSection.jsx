// src/components/SolarSystemSection.jsx

import React, { useEffect, useRef, useState } from "react";
import SolarSystem from "./SolarSystem";

export default function SolarSystemSection() {
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
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="playground"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white"
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

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        {/* Label */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Playground
          </span>

          <span className="h-px w-12 bg-white/10" />
        </div>

        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <div className="overflow-hidden">
              <h2
                className={`text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-100 transition-all delay-100 duration-1000 sm:text-5xl md:text-6xl lg:text-[70px] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                A small corner
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
                of the universe.
              </p>
            </div>
          </div>

          {/* Description */}
          <div
            className={`transition-all delay-300 duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <p className="max-w-md text-sm leading-7 text-zinc-500 sm:text-base">
              A small interactive Three.js experiment. Drag around the system
              to explore it and scroll over it to change the camera distance.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-10 h-px w-full bg-white/[0.08] transition-all delay-300 duration-1000 ${
            isVisible
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }`}
          style={{
            transformOrigin: "left",
          }}
        />

        {/* Solar System */}
        <div
          className={`relative mt-6 overflow-hidden transition-all delay-[400ms] duration-1000 sm:mt-8 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Small helper text */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-700">
              Interactive experiment
            </p>

            <p className="hidden text-[10px] uppercase tracking-[0.14em] text-zinc-700 sm:block">
              Drag · Rotate · Zoom
            </p>
          </div>

          {/* Three.js */}
          <SolarSystem />
        </div>

        {/* Bottom */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5 transition-all delay-700 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-xs text-zinc-700">
            Built with Three.js.
          </p>

          <p className="text-xs text-zinc-700">
            Thanks for exploring.
          </p>
        </div>
      </div>
    </section>
  );
}