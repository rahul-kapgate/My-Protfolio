import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const DEFAULT_TERMINAL_SEQUENCE = [
  {
    command: "whoami",
    output: "Rahul Kapgate",
    highlight: true,
  },
  {
    command: "cat role.txt",
    output: "Full Stack Developer",
  },
  {
    command: "ls tech-stack/",
    output: null,
    tags: ["React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "Docker"],
  },
];

// ── Uptime calculator ──
function getUptime() {
  const start = new Date("2025-01-01");
  const now = new Date();
  const diff = now - start;
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${days}d ${hrs}h ${mins}m — coding since Jan 2025`;
}

// ── Spotlight hover ──
function useSpotlight() {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  }, []);
  return { ref, onMove };
}

export default function HeroTerminalCard({
  lines = DEFAULT_TERMINAL_SEQUENCE,
  shellLabel = "zsh",
  promptLabel = "rahul@dev",
  className = "",
  start = true,
}) {
  const reduceMotion = useReducedMotion();
  const { ref: spotRef, onMove: spotMove } = useSpotlight();

  const [finishedLines, setFinishedLines] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const [cmdText, setCmdText] = useState("");
  const [outText, setOutText] = useState("");
  const [phase, setPhase] = useState("command");
  const [uptime, setUptime] = useState(getUptime());
  const [hoveredTag, setHoveredTag] = useState(null);

  // Live uptime ticker
  useEffect(() => {
    const id = setInterval(() => setUptime(getUptime()), 60000);
    return () => clearInterval(id);
  }, []);

  // Terminal typing engine — waits for start prop
  useEffect(() => {
    let timer;

    if (!start) return;

    if (reduceMotion) {
      setFinishedLines(lines);
      setCurIdx(lines.length);
      setPhase("done");
      return;
    }

    if (curIdx >= lines.length) {
      setPhase("done");
      timer = setTimeout(() => {
        setFinishedLines([]);
        setCurIdx(0);
        setCmdText("");
        setOutText("");
        setPhase("command");
      }, 5000);
      return () => clearTimeout(timer);
    }

    const line = lines[curIdx];

    if (phase === "command") {
      if (cmdText.length < line.command.length) {
        timer = setTimeout(
          () => {
            setCmdText(line.command.slice(0, cmdText.length + 1));
          },
          45 + Math.random() * 30,
        ); // variable typing speed
      } else {
        const hasOutput = line.output || line.tags || line.json || line.dynamic;
        timer = setTimeout(() => setPhase(hasOutput ? "output" : "next"), 200);
      }
    } else if (phase === "output") {
      const outputStr = line.output || "";
      if (line.output && outText.length < outputStr.length) {
        timer = setTimeout(() => {
          setOutText(outputStr.slice(0, outText.length + 1));
        }, 18);
      } else {
        timer = setTimeout(() => setPhase("next"), 300);
      }
    } else if (phase === "next") {
      setFinishedLines((prev) => [...prev, line]);
      setCurIdx((prev) => prev + 1);
      setCmdText("");
      setOutText("");
      setPhase("command");
    }

    return () => clearTimeout(timer);
  }, [reduceMotion, lines, curIdx, cmdText, outText, phase, start]);

  // ── Render helpers ──
  const renderOutput = (line, animated = false) => {
    if (line.highlight && line.output) {
      return (
        <p className="mt-1.5 text-lg font-semibold tracking-tight text-white">
          {animated ? outText : line.output}
          {animated && phase === "output" && <Cursor />}
        </p>
      );
    }

    if (line.output) {
      return (
        <p className="mt-1 leading-relaxed text-slate-300">
          {animated ? outText : line.output}
          {animated && phase === "output" && <Cursor />}
        </p>
      );
    }

    if (line.json) {
      const entries = Object.entries(line.json);
      return (
        <div className="mt-2 rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-xs">
          <span className="text-slate-500">{"{"}</span>
          {entries.map(([k, v], i) => (
            <div key={k} className="ml-3">
              <span className="text-purple-400">"{k}"</span>
              <span className="text-slate-500">: </span>
              <span
                className={
                  typeof v === "boolean"
                    ? v
                      ? "text-emerald-400"
                      : "text-red-400"
                    : "text-amber-300"
                }
              >
                {typeof v === "boolean" ? String(v) : `"${v}"`}
              </span>
              {i < entries.length - 1 && (
                <span className="text-slate-500">,</span>
              )}
            </div>
          ))}
          <span className="text-slate-500">{"}"}</span>
        </div>
      );
    }

    if (line.tags) {
      return (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {line.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { delay: i * 0.06, duration: 0.3, ease: "easeOut" }
              }
              onMouseEnter={() => setHoveredTag(tag)}
              onMouseLeave={() => setHoveredTag(null)}
              className={`cursor-default rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all duration-200 ${
                hoveredTag === tag
                  ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  : "border-slate-700/60 bg-slate-800/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      );
    }

    if (line.dynamic === "uptime") {
      return (
        <p className="mt-1 text-slate-400">
          <span className="text-cyan-400">↑</span> {uptime}
        </p>
      );
    }

    return null;
  };

  const Cursor = () => (
    <motion.span
      animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.8, repeat: Infinity }
      }
      className="ml-0.5 inline-block w-[7px] h-[14px] bg-emerald-400/80 align-middle"
      style={{ marginBottom: "1px" }}
    />
  );

  const Prompt = () => (
    <span className="text-slate-500">
      <span className="text-indigo-400">{promptLabel}</span>
      <span className="text-slate-600"> ~ </span>
      <span className="text-emerald-400">$</span>{" "}
    </span>
  );

  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      {/* Glow backdrop */}
      <motion.div
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.15), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(236,72,153,0.1), transparent 60%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Card */}
      <div
        ref={spotRef}
        onMouseMove={spotMove}
        className="group relative rounded-2xl bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/20 p-[1px] shadow-2xl shadow-indigo-500/10"
      >
        {/* Spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--spot-x) var(--spot-y), rgba(129,140,248,0.12), transparent 50%)",
          }}
        />

        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0c0c1d]/95 backdrop-blur-xl">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-slate-800/60 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
            </div>

            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 2, repeat: Infinity }
                  }
                />
                <span className="text-slate-500 uppercase tracking-wider">
                  live
                </span>
              </div>
              <span className="rounded border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-slate-500">
                {shellLabel}
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="relative px-4 py-4 sm:px-5 sm:py-5 font-mono text-[13px] leading-relaxed min-h-[240px]">
            {/* Faint grid bg */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative space-y-3">
              {/* Finished lines */}
              <AnimatePresence>
                {finishedLines.map((line, i) => (
                  <motion.div
                    key={`done-${i}`}
                    initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: "easeOut" }
                    }
                  >
                    <p>
                      <Prompt />
                      <span className="text-slate-200">{line.command}</span>
                    </p>
                    {renderOutput(line)}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Currently typing line */}
              {curIdx < lines.length && (
                <div>
                  <p>
                    <Prompt />
                    <span className="text-slate-200">{cmdText}</span>
                    {phase === "command" && <Cursor />}
                  </p>

                  {phase === "output" && renderOutput(lines[curIdx], true)}
                </div>
              )}

              {/* Idle prompt */}
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p>
                    <Prompt />
                    <Cursor />
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0c0c1d] to-transparent" />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-slate-800/40 px-4 py-1.5 text-[9px] uppercase tracking-widest text-slate-600">
            <div className="flex items-center gap-3">
              <span>utf-8</span>
              <span>ln {finishedLines.length + 1}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>node 20</span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                main
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
