// src/components/PremiumCreativePreloaderV2.jsx

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const stages = [
  { at: 0, label: "Booting workspace", code: "INIT" },
  { at: 18, label: "Loading interface", code: "UI" },
  { at: 38, label: "Connecting services", code: "API" },
  { at: 58, label: "Syncing data layer", code: "DB" },
  { at: 78, label: "Warming cloud runtime", code: "CLOUD" },
  { at: 94, label: "Polishing experience", code: "BUILD" },
  { at: 100, label: "Ready to explore", code: "READY" },
];

const orbitNodes = [
  {
    label: "React",
    position: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    accent: "#a78bfa",
  },
  {
    label: "Node",
    position: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
    accent: "#67e8f9",
  },
  {
    label: "Postgres",
    position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    accent: "#818cf8",
  },
  {
    label: "Cloud",
    position: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    accent: "#22d3ee",
  },
];

const particles = [
  { left: "8%", top: "18%", size: 2, delay: 0.2, duration: 5.5 },
  { left: "14%", top: "62%", size: 1, delay: 1.4, duration: 6.2 },
  { left: "23%", top: "35%", size: 2, delay: 0.9, duration: 5.8 },
  { left: "31%", top: "78%", size: 1, delay: 2.1, duration: 6.8 },
  { left: "43%", top: "12%", size: 1, delay: 0.5, duration: 5.2 },
  { left: "55%", top: "85%", size: 2, delay: 1.8, duration: 6.4 },
  { left: "68%", top: "20%", size: 1, delay: 0.7, duration: 5.7 },
  { left: "74%", top: "67%", size: 2, delay: 1.1, duration: 6.1 },
  { left: "83%", top: "39%", size: 1, delay: 2.4, duration: 5.4 },
  { left: "91%", top: "73%", size: 2, delay: 0.3, duration: 6.6 },
];

function DataPanel({ side, title, lines, accent = "#8b5cf6" }) {
  const sideClass =
    side === "left" ? "left-[5%] xl:left-[8%]" : "right-[5%] xl:right-[8%]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: side === "left" ? 0.35 : 0.48 }}
      className={`pointer-events-none absolute top-1/2 hidden w-[220px] -translate-y-1/2 lg:block ${sideClass}`}
    >
      <div
        className="overflow-hidden rounded-2xl border backdrop-blur-xl"
        style={{
          borderColor: `${accent}2b`,
          background:
            "linear-gradient(145deg, rgba(18,18,30,0.72), rgba(7,7,12,0.58))",
          boxShadow: `0 18px 60px rgba(0,0,0,0.3), 0 0 45px ${accent}10`,
        }}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 10px ${accent}`,
              }}
            />
            <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">
              {title}
            </span>
          </div>

          <span className="font-mono text-[8px] text-zinc-700">LIVE</span>
        </div>

        <div className="space-y-3 px-4 py-4">
          {lines.map((line, index) => (
            <motion.div
              key={`${title}-${index}`}
              initial={{ opacity: 0, x: side === "left" ? -8 : 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.65 + index * 0.1,
              }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-[9px]" style={{ color: accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-white/[0.06]" />
              <span className="max-w-[135px] truncate font-mono text-[9px] text-zinc-600">
                {line}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PremiumCreativePreloaderV2({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  const activeStage = useMemo(
    () =>
      [...stages].reverse().find((stage) => progress >= stage.at) ?? stages[0],
    [progress],
  );

  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);

      const timer = window.setTimeout(() => {
        setVisible(false);
      }, 280);

      return () => window.clearTimeout(timer);
    }

    let current = 0;

    const interval = window.setInterval(() => {
      const remaining = 100 - current;
      const increment = Math.max(
        1,
        Math.ceil(remaining * (Math.random() * 0.055 + 0.04)),
      );

      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(interval);

        window.setTimeout(() => {
          setVisible(false);
        }, 650);
      }
    }, 70);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        onComplete?.();
      }}
    >
      {visible && (
        <motion.div
          key="premium-preloader-v2"
          className="fixed inset-0 z-[9999] overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(circle at 50% 44%, #141429 0%, #090910 43%, #050507 100%)",
          }}
          initial={{
            opacity: 1,
            clipPath: "circle(150% at 50% 50%)",
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  clipPath: "circle(0% at 50% 50%)",
                  transition: {
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }
          }
        >
          {/* =====================================================
              BACKGROUND
          ====================================================== */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-[12%] top-[12%] h-[360px] w-[360px] rounded-full blur-[120px] sm:h-[520px] sm:w-[520px]"
              style={{ background: "rgba(124,58,237,0.14)" }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 28, -12, 0],
                      y: [0, -18, 15, 0],
                      scale: [1, 1.08, 0.97, 1],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-[8%] right-[10%] h-[320px] w-[320px] rounded-full blur-[120px] sm:h-[500px] sm:w-[500px]"
              style={{ background: "rgba(34,211,238,0.09)" }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -22, 14, 0],
                      y: [0, 18, -14, 0],
                      scale: [1, 0.96, 1.07, 1],
                    }
              }
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.075]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)",
                backgroundSize: "68px 68px",
                maskImage:
                  "radial-gradient(circle at center, black 0%, transparent 76%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 0%, transparent 76%)",
              }}
            />

            {/* faint diagonal energy line */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[-20%] top-[48%] h-px w-[140%] rotate-[-9deg]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139,92,246,0.12), rgba(34,211,238,0.22), rgba(139,92,246,0.1), transparent)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.25, 0.85, 0.25],
                      scaleX: [0.75, 1, 0.75],
                    }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* tiny floating particles */}
            {particles.map((particle, index) => (
              <motion.span
                key={index}
                className="absolute rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  background:
                    index % 2 === 0
                      ? "rgba(167,139,250,0.75)"
                      : "rgba(103,232,249,0.7)",
                  boxShadow:
                    index % 2 === 0
                      ? "0 0 10px rgba(139,92,246,0.65)"
                      : "0 0 10px rgba(34,211,238,0.55)",
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -12, 0],
                        opacity: [0.2, 0.9, 0.2],
                        scale: [0.8, 1.25, 0.8],
                      }
                }
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* slow scan */}
            {!reduceMotion && (
              <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(103,232,249,0.25), transparent)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.1)",
                }}
                initial={{ top: "12%", opacity: 0 }}
                animate={{
                  top: ["12%", "88%"],
                  opacity: [0, 0.55, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.62) 100%)",
              }}
            />
          </div>

          {/* =====================================================
              SIDE DATA PANELS - DESKTOP
          ====================================================== */}
          <DataPanel
            side="left"
            title="Runtime"
            accent="#8b5cf6"
            lines={[
              "react.render()",
              "hydrate.modules",
              "api.connect",
              "cache.warm",
            ]}
          />

          <DataPanel
            side="right"
            title="Pipeline"
            accent="#22d3ee"
            lines={["GET /portfolio", "200 OK", "db.synced", "deploy.ready"]}
          />

          {/* =====================================================
              TOP META
          ====================================================== */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8 lg:left-12 lg:right-12">
            <motion.div
              className="flex items-center gap-2"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#22d3ee",
                  boxShadow: "0 0 12px rgba(34,211,238,0.8)",
                }}
                animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
                System online
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <span className="hidden font-mono text-[9px] text-zinc-700 sm:inline">
                BUILD.2026.08
              </span>

              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]">
                RK / PORTFOLIO
              </span>
            </motion.div>
          </div>

          {/* =====================================================
              MAIN
          ====================================================== */}
          <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-5 py-20">
            <div className="flex w-full max-w-xl flex-col items-center">
              {/* stage chip */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.45 }}
                className="mb-5 flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 backdrop-blur-md"
              >
                <span className="font-mono text-[8px] text-violet-300/70">
                  {activeStage.code}
                </span>
                <span className="h-3 w-px bg-white/[0.08]" />
                <span className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                  loading sequence
                </span>
              </motion.div>

              {/* orbit system */}
              <motion.div
                className="relative h-[260px] w-[260px] sm:h-[330px] sm:w-[330px]"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.84,
                        rotate: -5,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* wide outer radar ring */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[-15px] rounded-full border border-white/[0.035]"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 42,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span className="absolute left-1/2 top-[-2px] h-1 w-1 -translate-x-1/2 rounded-full bg-violet-300/60 shadow-[0_0_9px_rgba(167,139,250,0.7)]" />
                  <span className="absolute bottom-[20%] right-[3%] h-1 w-1 rounded-full bg-cyan-300/50 shadow-[0_0_9px_rgba(103,232,249,0.6)]" />
                </motion.div>

                {/* aura */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[-24px] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(139,92,246,0.18), transparent 28%, rgba(34,211,238,0.13), transparent 58%, rgba(99,102,241,0.12), transparent)",
                    filter: "blur(20px)",
                  }}
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* outer dashed ring */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[4px] rounded-full border border-dashed"
                  style={{ borderColor: "rgba(139,92,246,0.18)" }}
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* second ring */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[18px] rounded-full border"
                  style={{
                    borderColor: "rgba(34,211,238,0.08)",
                    borderStyle: "dotted",
                  }}
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* tech orbit */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[31px] rounded-full border sm:inset-[39px]"
                  style={{
                    borderColor: "rgba(255,255,255,0.09)",
                    boxShadow:
                      "inset 0 0 34px rgba(124,58,237,0.04), 0 0 34px rgba(34,211,238,0.025)",
                  }}
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {orbitNodes.map((node) => (
                    <div
                      key={node.label}
                      className={`absolute ${node.position}`}
                    >
                      <motion.div
                        className="flex h-11 min-w-11 items-center justify-center rounded-full border px-2.5 text-[8px] font-medium tracking-[0.1em] text-zinc-200 backdrop-blur-xl sm:h-12 sm:min-w-12 sm:text-[9px]"
                        style={{
                          borderColor: `${node.accent}55`,
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.025))",
                          boxShadow: `0 0 26px ${node.accent}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
                        }}
                        animate={reduceMotion ? undefined : { rotate: 360 }}
                        transition={{
                          duration: 22,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {node.label}
                      </motion.div>
                    </div>
                  ))}
                </motion.div>

                {/* rotating sweep */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-[46px] rounded-full sm:inset-[58px]"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(103,232,249,0.45), transparent)",
                        boxShadow: "0 0 10px rgba(34,211,238,0.18)",
                      }}
                    />
                  </motion.div>
                )}

                {/* circular progress */}
                <svg
                  className="absolute inset-1/2 h-[194px] w-[194px] -translate-x-1/2 -translate-y-1/2 -rotate-90 sm:h-[232px] sm:w-[232px]"
                  viewBox="0 0 180 180"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="premiumLoaderGradientV2"
                      x1="0"
                      y1="0"
                      x2="180"
                      y2="180"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="48%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#67e8f9" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.055)"
                    strokeWidth="1.5"
                  />

                  <motion.circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="url(#premiumLoaderGradientV2)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    style={{
                      filter:
                        "drop-shadow(0 0 5px rgba(139,92,246,0.65)) drop-shadow(0 0 9px rgba(34,211,238,0.24))",
                    }}
                  />
                </svg>

                {/* core halo */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-1/2 h-[152px] w-[152px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[178px] sm:w-[178px]"
                  style={{
                    background:
                      "conic-gradient(from 180deg, rgba(139,92,246,0.12), transparent, rgba(34,211,238,0.08), transparent, rgba(139,92,246,0.12))",
                    filter: "blur(12px)",
                  }}
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* center core */}
                <div
                  className="absolute inset-1/2 flex h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-xl sm:h-[154px] sm:w-[154px]"
                  style={{
                    borderColor: "rgba(139,92,246,0.2)",
                    background:
                      "linear-gradient(145deg, rgba(24,22,43,0.96), rgba(8,8,14,0.92))",
                    boxShadow:
                      "0 0 64px rgba(124,58,237,0.12), 0 0 100px rgba(34,211,238,0.045), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <motion.div
                    className="text-center"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale:
                              progress === 100 ? [1, 1.08, 1] : [1, 1.015, 1],
                          }
                    }
                    transition={{
                      duration: progress === 100 ? 0.5 : 2.4,
                      repeat: progress === 100 ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="bg-clip-text text-[36px] font-semibold tracking-[-0.065em] text-transparent sm:text-[44px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #fafafa 8%, #c4b5fd 48%, #67e8f9 100%)",
                      }}
                    >
                      RK
                    </div>

                    <div className="mt-1 text-[8px] uppercase tracking-[0.24em] text-violet-300/55">
                      Build / Ship
                    </div>
                  </motion.div>
                </div>

                {/* moving accent dot */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[1px] w-[1px]"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3.1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span
                      className="absolute left-[98px] top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full sm:left-[124px]"
                      style={{
                        background: "#67e8f9",
                        boxShadow:
                          "0 0 9px rgba(103,232,249,1), 0 0 20px rgba(139,92,246,0.7)",
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* =================================================
                  STATUS
              ================================================== */}
              <div className="mt-6 flex w-full max-w-sm flex-col items-center sm:mt-7">
                <div className="flex min-h-6 items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeStage.label}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 6,
                              filter: "blur(4px)",
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              y: -6,
                              filter: "blur(4px)",
                            }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.22,
                      }}
                      className="text-xs font-medium tracking-wide text-zinc-400 sm:text-sm"
                    >
                      {activeStage.label}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="mt-2 flex items-end gap-1 font-medium tabular-nums">
                  <span
                    className="bg-clip-text text-3xl tracking-[-0.05em] text-transparent sm:text-4xl"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #ddd6fe, #67e8f9)",
                    }}
                  >
                    {String(progress).padStart(2, "0")}
                  </span>

                  <span className="mb-1 text-[10px] text-zinc-600">%</span>
                </div>

                {/* stage bars */}
                <div className="mt-4 grid w-full grid-cols-6 gap-1.5">
                  {stages.slice(0, 6).map((stage, index) => {
                    const nextStage = stages[index + 1];

                    const completed =
                      progress >= (nextStage?.at ?? 100) ||
                      (index === 5 && progress === 100);

                    const active =
                      progress >= stage.at && progress < (nextStage?.at ?? 101);

                    return (
                      <motion.span
                        key={stage.code}
                        className="h-[2px] rounded-full"
                        style={{
                          background:
                            completed || active
                              ? "linear-gradient(90deg, #8b5cf6, #22d3ee)"
                              : "rgba(255,255,255,0.07)",
                          boxShadow:
                            completed || active
                              ? "0 0 10px rgba(99,102,241,0.3)"
                              : "none",
                        }}
                        animate={
                          active && !reduceMotion
                            ? { opacity: [0.35, 1, 0.35] }
                            : { opacity: 1 }
                        }
                        transition={{
                          duration: 1.15,
                          repeat: active && !reduceMotion ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </div>

                {/* mobile mini technical status */}
                <div className="mt-4 grid w-full grid-cols-3 gap-2 lg:hidden">
                  {["UI", "API", "DATA"].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center"
                    >
                      <p className="font-mono text-[7px] text-zinc-700">
                        {item}
                      </p>
                      <p
                        className="mt-1 font-mono text-[8px]"
                        style={{
                          color:
                            progress > [22, 46, 68][index]
                              ? "#67e8f9"
                              : "#52525b",
                        }}
                      >
                        {progress > [22, 46, 68][index] ? "OK" : "..."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM META
          ====================================================== */}
          <motion.div
            className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8 lg:left-12 lg:right-12"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500 sm:text-[10px]">
                Full Stack Developer
              </p>

              <p className="mt-1 hidden text-[10px] text-zinc-700 sm:block">
                Frontend · Backend · Mobile · Systems
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,92,246,0.75), rgba(34,211,238,0.75))",
                }}
              />

              <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600 sm:text-[10px]">
                Loading portfolio
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
