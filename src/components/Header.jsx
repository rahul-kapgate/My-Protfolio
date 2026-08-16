// src/components/ResponsiveCircularHeader.jsx

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "GitHub", id: "github" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Playground", id: "playground" },
];

export default function ResponsiveCircularHeader() {
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");

      if (aboutSection) {
        setShowHeader(aboutSection.getBoundingClientRect().top <= 80);
      }

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      let currentSection = "about";

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 140) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -20, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -14, scale: 0.97 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4"
        >
          <div className="mx-auto w-full max-w-5xl md:w-fit">
            <div className="relative rounded-[22px] border border-white/[0.1] bg-[#0a0a0a]/90 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-full">
              <div className="flex items-center justify-between gap-2">
                {/* Logo */}
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  aria-label="Go to About section"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-semibold tracking-[-0.03em] text-zinc-300 transition duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  RK
                </button>

                {/* Desktop Navigation */}
                <nav
                  className="hidden items-center gap-0.5 lg:flex xl:gap-1"
                  aria-label="Main navigation"
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`relative rounded-full px-3 py-2.5 text-[11px] font-medium transition-colors duration-200 xl:px-4 xl:text-xs ${
                          isActive
                            ? "text-black"
                            : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="responsive-nav-pill"
                            className="absolute inset-0 rounded-full bg-zinc-100"
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 34,
                            }}
                          />
                        )}

                        <span className="relative z-10">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                  {/* Resume */}
                  <a
                    href="/rahul-kapgate-resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden h-10 items-center rounded-full border border-white/[0.1] px-4 text-xs font-medium text-zinc-400 transition duration-200 hover:border-white/20 hover:bg-white/[0.05] hover:text-white sm:inline-flex"
                  >
                    Resume
                  </a>

                  {/* Contact */}
                  <a
                    href="mailto:rahulkapgateyt@gmail.com"
                    className="hidden h-10 items-center rounded-full border border-white/[0.1] px-4 text-xs font-medium text-zinc-400 transition duration-200 hover:border-white/20 hover:bg-white/[0.05] hover:text-white sm:inline-flex"
                  >
                    Contact
                  </a>

                  {/* Tablet + Mobile Menu Button */}
                  <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white lg:hidden"
                  >
                    <span className="relative block h-3.5 w-4">
                      <span
                        className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200 ${
                          mobileOpen ? "translate-y-[6px] rotate-45" : ""
                        }`}
                      />

                      <span
                        className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity duration-200 ${
                          mobileOpen ? "opacity-0" : "opacity-100"
                        }`}
                      />

                      <span
                        className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-200 ${
                          mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>
                </div>
              </div>

              {/* Responsive Menu */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.nav
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8, scale: 0.98 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.2,
                    }}
                    className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#0a0a0a]/95 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
                    aria-label="Responsive navigation"
                  >
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                      {navItems.map((item) => {
                        const isActive = activeSection === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollToSection(item.id)}
                            className={`rounded-full px-4 py-3 text-left text-xs font-medium transition ${
                              isActive
                                ? "bg-zinc-100 text-black"
                                : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Mobile actions */}
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
                      <a
                        href="/rahul-kapgate-resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 items-center justify-center rounded-full border border-white/[0.1] text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                      >
                        Resume
                      </a>

                      <a
                        href="mailto:rahulkapgateyt@gmail.com"
                        className="flex h-11 items-center justify-center rounded-full border border-white/[0.1] text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                      >
                        Contact
                      </a>
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}