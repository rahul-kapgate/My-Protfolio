// src/components/GitTimelinePreloader.jsx

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const commits = [
  {
    at: 0,
    hash: "a61f92c",
    message: "feat: frontend",
    detail: "React interface initialized",
    branch: "main",
  },
  {
    at: 22,
    hash: "c93a1f8",
    message: "feat: backend",
    detail: "API services connected",
    branch: "main",
  },
  {
    at: 43,
    hash: "e8216d3",
    message: "feat: mobile",
    detail: "Mobile experience loaded",
    branch: "feature/mobile",
  },
  {
    at: 65,
    hash: "41bd27a",
    message: "feat: cloud",
    detail: "Cloud runtime online",
    branch: "main",
  },
  {
    at: 86,
    hash: "f02ac91",
    message: "deploy: rahul portfolio",
    detail: "Production deployment ready",
    branch: "production",
  },
];

const particles = [
  { left: "8%", top: "19%", delay: 0.3 },
  { left: "17%", top: "72%", delay: 1.2 },
  { left: "28%", top: "31%", delay: 0.7 },
  { left: "43%", top: "84%", delay: 1.8 },
  { left: "59%", top: "16%", delay: 1.1 },
  { left: "73%", top: "69%", delay: 0.4 },
  { left: "87%", top: "28%", delay: 1.5 },
];

function CommitItem({ commit, index, active, completed, reduceMotion }) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -18,
            }
      }
      animate={
        active || completed
          ? {
              opacity: 1,
              x: 0,
            }
          : {
              opacity: 0.22,
              x: 0,
            }
      }
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-5"
    >
      {/* Git graph */}
      <div className="relative flex w-7 shrink-0 justify-center">
        {index < commits.length - 1 && (
          <div className="absolute left-1/2 top-6 h-[calc(100%+20px)] w-px -translate-x-1/2 bg-[#30363d]" />
        )}

        {index === 2 && (
          <motion.div
            className="absolute left-1/2 top-4 h-12 w-7 rounded-bl-2xl border-b border-l"
            style={{
              borderColor: active || completed ? "#d29922" : "#30363d",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: completed || active ? 1 : 0.2 }}
          />
        )}

        <motion.div
          className="relative z-10 mt-1 flex h-4 w-4 items-center justify-center rounded-full border"
          style={{
            borderColor:
              active || completed
                ? commit.branch === "feature/mobile"
                  ? "#d29922"
                  : "#3fb950"
                : "#484f58",

            background:
              active || completed
                ? commit.branch === "feature/mobile"
                  ? "#d29922"
                  : "#3fb950"
                : "#161b22",

            boxShadow: active
              ? commit.branch === "feature/mobile"
                ? "0 0 0 5px rgba(210,153,34,0.1), 0 0 22px rgba(210,153,34,0.35)"
                : "0 0 0 5px rgba(63,185,80,0.1), 0 0 22px rgba(63,185,80,0.35)"
              : "none",
          }}
          animate={
            active && !reduceMotion
              ? {
                  scale: [1, 1.3, 1],
                }
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 1.2,
            repeat: active && !reduceMotion ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {completed && (
            <div className="h-1.5 w-1.5 rounded-full bg-[#0d1117]" />
          )}
        </motion.div>
      </div>

      {/* Commit content */}
      <div className="min-w-0 flex-1 pb-7">
        <div className="flex flex-wrap items-center gap-2">
          <motion.p
            className="font-mono text-[13px] font-medium sm:text-sm"
            style={{
              color: active || completed ? "#f0f6fc" : "#484f58",
            }}
          >
            {commit.message}
          </motion.p>

          {active && (
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-full border border-[#3fb950]/20 bg-[#3fb950]/10 px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.15em] text-[#3fb950]"
            >
              HEAD
            </motion.span>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[9px] text-[#6e7681]">
            {commit.hash}
          </span>

          <span className="h-1 w-1 rounded-full bg-[#30363d]" />

          <span
            className="font-mono text-[9px]"
            style={{
              color:
                commit.branch === "feature/mobile" ? "#d29922" : "#58a6ff",
            }}
          >
            {commit.branch}
          </span>
        </div>

        <motion.p
          className="mt-1 text-[10px] text-[#484f58]"
          animate={{
            color: active || completed ? "#6e7681" : "#30363d",
          }}
        >
          {commit.detail}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function GitTimelinePreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [deploying, setDeploying] = useState(false);

  const reduceMotion = useReducedMotion();

  const currentCommitIndex = useMemo(() => {
    let index = 0;

    commits.forEach((commit, commitIndex) => {
      if (progress >= commit.at) {
        index = commitIndex;
      }
    });

    return index;
  }, [progress]);

  useEffect(() => {
    if (!visible) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 400);

      return () => clearTimeout(timer);
    }

    let current = 0;

    const interval = setInterval(() => {
      const remaining = 100 - current;

      const increment = Math.max(
        1,
        Math.ceil(remaining * (Math.random() * 0.045 + 0.035)),
      );

      current = Math.min(100, current + increment);

      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);

        setDeploying(true);

        setTimeout(() => {
          setVisible(false);
        }, 900);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        onComplete?.();
      }}
    >
      {visible && (
        <motion.div
          key="git-preloader"
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#0d1117] text-white"
          exit={
            reduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: "-4%",
                  scale: 1.025,

                  transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }
          }
        >
          {/* =========================
              BACKGROUND
          ========================= */}

          <div className="pointer-events-none absolute inset-0">
            {/* top glow */}

            <div
              className="absolute left-1/2 top-[-220px] h-[480px] w-[680px] -translate-x-1/2 rounded-full blur-[140px]"
              style={{
                background: "rgba(46,160,67,0.08)",
              }}
            />

            {/* noise/grid */}

            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(48,54,61,0.15) 1px, transparent 1px)",
                backgroundSize: "100% 34px",
              }}
            />

            {/* particles */}

            {!reduceMotion &&
              particles.map((particle, index) => (
                <motion.span
                  key={index}
                  className="absolute h-[2px] w-[2px] rounded-full bg-[#3fb950]"
                  style={{
                    left: particle.left,
                    top: particle.top,
                    boxShadow: "0 0 8px rgba(63,185,80,0.6)",
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: particle.delay,
                    repeat: Infinity,
                  }}
                />
              ))}

            {/* terminal scan */}

            {!reduceMotion && (
              <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(63,185,80,0.12), transparent)",
                }}
                initial={{
                  top: "0%",
                }}
                animate={{
                  top: "100%",
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 20%, rgba(1,4,9,0.5) 100%)",
              }}
            />
          </div>

          {/* =========================
              HEADER
          ========================= */}

          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-9 sm:right-9 sm:top-8 lg:left-12 lg:right-12">
            <div className="flex items-center gap-2.5">
              <motion.div
                className="h-2 w-2 rounded-full bg-[#3fb950]"
                style={{
                  boxShadow: "0 0 12px rgba(63,185,80,0.6)",
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.35, 1, 0.35],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              <span className="font-mono text-[9px] text-[#6e7681] sm:text-[10px]">
                rahul@portfolio
              </span>

              <span className="font-mono text-[9px] text-[#3fb950]">
                ~/main
              </span>
            </div>

            <span className="hidden font-mono text-[9px] text-[#484f58] sm:block">
              git log --oneline
            </span>
          </div>

          {/* =========================
              MAIN
          ========================= */}

          <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-5 py-20">
            <motion.div
              className="w-full max-w-[580px]"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
              }}
            >
              {/* top terminal command */}

              <div className="mb-8 border-b border-[#21262d] pb-5">
                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
                  <span className="text-[#3fb950]">➜</span>

                  <span className="text-[#58a6ff]">portfolio</span>

                  <span className="text-[#6e7681]">git</span>

                  <motion.span
                    className="text-[#f0f6fc]"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [1, 0.45, 1],
                          }
                    }
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    boot --production
                  </motion.span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#484f58]">
                    building commit history
                  </span>

                  <div className="h-px flex-1 bg-[#21262d]" />
                </div>
              </div>

              {/* =========================
                  GIT TIMELINE
              ========================= */}

              <div>
                {commits.map((commit, index) => (
                  <CommitItem
                    key={commit.hash}
                    commit={commit}
                    index={index}
                    active={index === currentCommitIndex}
                    completed={index < currentCommitIndex || progress === 100}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>

              {/* =========================
                  PROGRESS
              ========================= */}

              <div className="mt-3 border-t border-[#21262d] pt-5">
                <div className="flex items-center justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCommitIndex}
                      initial={{
                        opacity: 0,
                        y: 4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                      }}
                      className="font-mono text-[9px] text-[#6e7681] sm:text-[10px]"
                    >
                      {progress === 100
                        ? "✓ deployment successful"
                        : `checkout ${commits[currentCommitIndex].hash}`}
                    </motion.div>
                  </AnimatePresence>

                  <span className="font-mono text-[11px] font-medium text-[#3fb950]">
                    {String(progress).padStart(2, "0")}%
                  </span>
                </div>

                <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-[#21262d]">
                  <motion.div
                    className="h-full rounded-full bg-[#3fb950]"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    style={{
                      boxShadow: "0 0 12px rgba(63,185,80,0.35)",
                    }}
                  />
                </div>
              </div>

              {/* DEPLOY SUCCESS */}

              <AnimatePresence>
                {deploying && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-5 flex items-center justify-between rounded-md border border-[#238636]/40 bg-[#238636]/10 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                          rotate: [0, 10, 0],
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#238636] text-[11px] text-white"
                      >
                        ✓
                      </motion.div>

                      <div>
                        <p className="font-mono text-[10px] font-medium text-[#3fb950]">
                          Production deployed
                        </p>

                        <p className="mt-0.5 font-mono text-[8px] text-[#6e7681]">
                          rahul-kapgate / portfolio
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-[8px] text-[#3fb950]/60">
                      LIVE
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between sm:bottom-8 sm:left-9 sm:right-9 lg:left-12 lg:right-12">
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#484f58]">
              Full Stack Developer
            </span>

            <div className="flex items-center gap-2">
              <span className="h-px w-7 bg-[#30363d]" />

              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#484f58]">
                main → production
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}