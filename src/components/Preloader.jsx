// src/components/Preloader.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Text scramble hook ──
function useTextScramble(target, trigger, duration = 1800) {
  const [text, setText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 30);
    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const result = target
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (progress * target.length > i) return target[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setText(result);
      if (frame >= totalFrames) {
        clearInterval(id);
        setText(target);
      }
    }, 30);
    return () => clearInterval(id);
  }, [trigger, target, duration]);

  return text;
}

// ── Particle canvas ──
function ParticleField() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const COUNT = 80;
    particles.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.5,
      color: ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6"][
        Math.floor(Math.random() * 5)
      ],
    }));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const handleMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const pts = particles.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // connections
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129,140,248,${0.15 * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

// ── Main Preloader ──
export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const name = "Rahul Kapgate";
  const scrambledName = useTextScramble(name, started, 2000);

  useEffect(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 2) + 1;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => setDone(true), 600);
          return 100;
        }
        return next;
      });
    }, 35);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => onComplete?.(), 1000);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const bars = 40;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#030014" }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
          }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Interactive particle constellation */}
          <ParticleField />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(129,140,248,0.4), rgba(168,85,247,0.4), transparent)",
              boxShadow: "0 0 20px rgba(129,140,248,0.3)",
            }}
            initial={{ top: "-2%" }}
            animate={{ top: "102%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Morphing hexagon wireframe */}
          <div className="absolute pointer-events-none z-0">
            <motion.svg
              width="500"
              height="500"
              viewBox="0 0 500 500"
              className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]"
              initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Outer rotating hexagon */}
              <motion.polygon
                points="250,50 433,137.5 433,312.5 250,400 67,312.5 67,137.5"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="0.8"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: "250px 225px" }}
              />
              {/* Inner counter-rotating hexagon */}
              <motion.polygon
                points="250,100 393,175 393,275 250,350 107,275 107,175"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="0.5"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: "250px 225px" }}
              />
              {/* Innermost pulsing hexagon */}
              <motion.polygon
                points="250,150 337,200 337,250 250,300 163,250 163,200"
                fill="none"
                stroke="url(#grad3)"
                strokeWidth="0.4"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "250px 225px" }}
              />
              {/* Cross lines */}
              {[0, 60, 120].map((angle) => (
                <motion.line
                  key={angle}
                  x1="250"
                  y1="50"
                  x2="250"
                  y2="400"
                  stroke="rgba(129,140,248,0.06)"
                  strokeWidth="0.5"
                  style={{
                    transformOrigin: "250px 225px",
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              ))}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Pulsing energy rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                borderColor:
                  i === 0
                    ? "rgba(99,102,241,0.12)"
                    : i === 1
                      ? "rgba(168,85,247,0.08)"
                      : "rgba(236,72,153,0.06)",
                width: 200 + i * 120,
                height: 200 + i * 120,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                delay: 0.5 + i * 0.3,
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Main text block ── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Scramble name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="relative"
            >
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white"
                style={{ fontFamily: "inherit" }}
              >
                {scrambledName}
                <span className="text-indigo-400">.</span>
              </h1>

              {/* Glitch layers */}
              <motion.h1
                className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter"
                style={{
                  color: "rgba(236,72,153,0.6)",
                  clipPath: "inset(10% 0 60% 0)",
                  fontFamily: "inherit",
                }}
                animate={{
                  x: [0, -3, 2, -1, 0],
                  opacity: [0, 1, 0, 1, 0],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  times: [0, 0.2, 0.4, 0.6, 1],
                }}
              >
                {scrambledName}
                <span>.</span>
              </motion.h1>
              <motion.h1
                className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter"
                style={{
                  color: "rgba(99,102,241,0.6)",
                  clipPath: "inset(50% 0 20% 0)",
                  fontFamily: "inherit",
                }}
                animate={{
                  x: [0, 3, -2, 1, 0],
                  opacity: [0, 1, 0, 1, 0],
                }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.1,
                  times: [0, 0.2, 0.4, 0.6, 1],
                }}
              >
                {scrambledName}
                <span>.</span>
              </motion.h1>
            </motion.div>

            {/* Gradient line */}
            <motion.div
              className="mt-4 h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #6366f1, #a855f7, #ec4899, transparent)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "16rem", opacity: 1 }}
              transition={{
                delay: 1.8,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Role text */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
              className="mt-4 text-[11px] sm:text-xs uppercase text-slate-400 tracking-[0.3em]"
            >
              Software Engineer
            </motion.p>
          </div>

          {/* Audio visualizer bars */}
          <motion.div
            className="relative z-10 mt-12 flex items-end gap-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {Array.from({ length: bars }, (_, i) => {
              const center = bars / 2;
              const distFromCenter = Math.abs(i - center) / center;
              const maxH = 30 * (1 - distFromCenter * 0.6);
              return (
                <motion.div
                  key={i}
                  className="w-[2px] sm:w-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(to top, #6366f1, #a855f7, #ec4899)",
                    opacity: 0.7 - distFromCenter * 0.4,
                  }}
                  animate={{
                    height: [
                      `${4}px`,
                      `${maxH}px`,
                      `${maxH * 0.4}px`,
                      `${maxH * 0.8}px`,
                      `${4}px`,
                    ],
                  }}
                  transition={{
                    duration: 1.2 + Math.random() * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              );
            })}
          </motion.div>

          {/* Progress + Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="relative z-10 mt-8 w-60 sm:w-72"
          >
            <div className="relative h-[2px] w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${count}%`,
                  background:
                    "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                  boxShadow:
                    "0 0 12px rgba(129,140,248,0.5), 0 0 30px rgba(168,85,247,0.3)",
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <motion.p
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(148,163,184,0.5)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {count < 25
                  ? "Booting up"
                  : count < 50
                    ? "Loading modules"
                    : count < 75
                      ? "Compiling assets"
                      : count < 100
                        ? "Finalizing"
                        : "Launch"}
              </motion.p>
              <p
                className="text-sm tabular-nums font-mono"
                style={{
                  background:
                    "linear-gradient(90deg, #818cf8, #c084fc, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {String(count).padStart(3, "0")}
                <span style={{ WebkitTextFillColor: "rgba(100,116,139,0.4)" }}>
                  %
                </span>
              </p>
            </div>
          </motion.div>

          {/* Corner elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute top-6 left-6 flex flex-col gap-1"
          >
            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-slate-700">
              portfolio / 2026
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i === 0 ? "#6366f1" : i === 1 ? "#a855f7" : "#ec4899",
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-6 right-6 flex flex-col items-end gap-1"
          >
            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-slate-700">
              loading experience
            </span>
            <motion.div
              className="h-[1px] rounded-full"
              style={{
                background: "linear-gradient(90deg, #6366f1, #a855f7)",
              }}
              animate={{ width: ["0px", "40px", "20px", "40px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Top-right crosshair */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="absolute top-6 right-6 pointer-events-none"
          >
            <svg width="30" height="30" viewBox="0 0 30 30">
              <line x1="15" y1="0" x2="15" y2="30" stroke="#818cf8" strokeWidth="0.5" />
              <line x1="0" y1="15" x2="30" y2="15" stroke="#818cf8" strokeWidth="0.5" />
              <circle cx="15" cy="15" r="6" fill="none" stroke="#818cf8" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Film grain noise */}
          <div
            className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
            style={{
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}