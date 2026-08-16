// src/components/PremiumCreativePreloader.jsx

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const stages = [
  { at: 0, label: "Starting workspace" },
  { at: 22, label: "Connecting interface" },
  { at: 46, label: "Preparing APIs" },
  { at: 68, label: "Syncing data layer" },
  { at: 86, label: "Finalizing experience" },
  { at: 100, label: "Ready" },
];

const orbitNodes = [
  {
    label: "React",
    position: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    label: "Node.js",
    position: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
    glow: "rgba(34,211,238,0.3)",
  },
  {
    label: "Database",
    position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    label: "CLOUD",
    position: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    glow: "rgba(34,211,238,0.28)",
  },
];

export default function PremiumCreativePreloader({ onComplete }) {
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
      }, 250);

      return () => window.clearTimeout(timer);
    }

    let current = 0;

    const interval = window.setInterval(() => {
      const remaining = 100 - current;

      const increment = Math.max(
        1,
        Math.ceil(remaining * (Math.random() * 0.075 + 0.045)),
      );

      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(interval);

        window.setTimeout(() => {
          setVisible(false);
        }, 520);
      }
    }, 65);

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
          key="premium-preloader"
          className="fixed inset-0 z-[9999] overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, #101023 0%, #080810 42%, #050507 100%)",
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
                    duration: 0.95,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }
          }
        >
          {/* Premium ambient background */}
          <div className="pointer-events-none absolute inset-0">
            {/* Violet glow */}
            <motion.div
              className="absolute left-[18%] top-[18%] h-[320px] w-[320px] rounded-full blur-[110px] sm:h-[460px] sm:w-[460px]"
              style={{
                background: "rgba(124,58,237,0.16)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 22, -10, 0],
                      y: [0, -16, 12, 0],
                      scale: [1, 1.08, 0.98, 1],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Cyan glow */}
            <motion.div
              className="absolute bottom-[15%] right-[15%] h-[280px] w-[280px] rounded-full blur-[110px] sm:h-[420px] sm:w-[420px]"
              style={{
                background: "rgba(34,211,238,0.1)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -18, 10, 0],
                      y: [0, 14, -12, 0],
                      scale: [1, 0.96, 1.06, 1],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Soft grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,92,246,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                maskImage:
                  "radial-gradient(circle at center, black 0%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 0%, transparent 72%)",
              }}
            />

            {/* Premium vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.58) 100%)",
              }}
            />
          </div>

          {/* Top meta */}
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
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.45, 1, 0.45],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
                System online
              </span>
            </motion.div>

            <motion.span
              className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              RK / PORTFOLIO
            </motion.span>
          </div>

          {/* Main loader */}
          <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-5 py-20">
            <div className="flex w-full max-w-xl flex-col items-center">
              <motion.div
                className="relative h-[250px] w-[250px] sm:h-[320px] sm:w-[320px]"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.88,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                      }
                }
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Outer aura */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[-16px] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(139,92,246,0.16), transparent, rgba(34,211,238,0.12), transparent)",
                    filter: "blur(18px)",
                  }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: 360,
                      }
                  }
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Outer orbit */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[8px] rounded-full border border-dashed"
                  style={{
                    borderColor: "rgba(139,92,246,0.18)",
                  }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: 360,
                      }
                  }
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Orbit */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[28px] rounded-full border sm:inset-[36px]"
                  style={{
                    borderColor: "rgba(255,255,255,0.09)",
                    boxShadow:
                      "inset 0 0 30px rgba(124,58,237,0.035), 0 0 32px rgba(34,211,238,0.025)",
                  }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: -360,
                      }
                  }
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
                        className="flex h-10 min-w-10 items-center justify-center rounded-full border px-2 text-[8px] font-medium tracking-[0.12em] text-zinc-300 backdrop-blur-md sm:h-11 sm:min-w-11 sm:text-[9px]"
                        style={{
                          borderColor: node.glow,
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
                          boxShadow: `0 0 24px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                        }}
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                rotate: 360,
                              }
                        }
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

                {/* Gradient circular progress */}
                <svg
                  className="absolute inset-1/2 h-[194px] w-[194px] -translate-x-1/2 -translate-y-1/2 -rotate-90 sm:h-[230px] sm:w-[230px]"
                  viewBox="0 0 180 180"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="premiumLoaderGradient"
                      x1="0"
                      y1="0"
                      x2="180"
                      y2="180"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="55%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1.5"
                  />

                  <motion.circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="url(#premiumLoaderGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{
                      strokeDashoffset: dashOffset,
                    }}
                    transition={{
                      duration: 0.16,
                      ease: "easeOut",
                    }}
                    style={{
                      filter:
                        "drop-shadow(0 0 5px rgba(139,92,246,0.65)) drop-shadow(0 0 8px rgba(34,211,238,0.28))",
                    }}
                  />
                </svg>

                {/* Center core */}
                <div
                  className="absolute inset-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-xl sm:h-[150px] sm:w-[150px]"
                  style={{
                    borderColor: "rgba(139,92,246,0.2)",
                    background:
                      "linear-gradient(145deg, rgba(22,20,38,0.96), rgba(8,8,14,0.9))",
                    boxShadow:
                      "0 0 60px rgba(124,58,237,0.12), 0 0 90px rgba(34,211,238,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <motion.div
                    className="text-center"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: progress === 100 ? [1, 1.06, 1] : 1,
                          }
                    }
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <div
                      className="bg-clip-text text-[34px] font-semibold tracking-[-0.06em] text-transparent sm:text-[42px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #f4f4f5 12%, #c4b5fd 48%, #67e8f9 100%)",
                      }}
                    >
                      RK
                    </div>

                    <div
                      className="mt-1 text-[9px] uppercase tracking-[0.22em]"
                      style={{
                        color: "rgba(196,181,253,0.62)",
                      }}
                    >
                      Build / Ship
                    </div>
                  </motion.div>
                </div>

                {/* Moving accent dot */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[1px] w-[1px]"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span
                      className="absolute left-[94px] top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full sm:left-[120px]"
                      style={{
                        background: "#67e8f9",
                        boxShadow:
                          "0 0 9px rgba(103,232,249,1), 0 0 20px rgba(139,92,246,0.75)",
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Status */}
              <div className="mt-7 flex w-full max-w-sm flex-col items-center sm:mt-8">
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

                <div className="mt-3 flex items-end gap-1 font-medium tabular-nums">
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

                {/* Premium segmented progress */}
                <div className="mt-5 grid w-full grid-cols-5 gap-1.5">
                  {stages.slice(0, 5).map((stage, index) => {
                    const nextStage = stages[index + 1];

                    const completed =
                      progress >= (nextStage?.at ?? 100) ||
                      (index === 4 && progress === 100);

                    const active =
                      progress >= stage.at &&
                      progress < (nextStage?.at ?? 101);

                    return (
                      <motion.span
                        key={stage.label}
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
                            ? {
                                opacity: [0.4, 1, 0.4],
                              }
                            : {
                                opacity: 1,
                              }
                        }
                        transition={{
                          duration: 1.2,
                          repeat: active && !reduceMotion ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom meta */}
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