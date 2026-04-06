// src/components/Preloader.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => setDone(true), 500);
          return 100;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => onComplete?.(), 800);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const name = "Rahul Kapgate";
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    dur: Math.random() * 4 + 3,
  }));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050510" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                background:
                  p.id % 3 === 0
                    ? "rgba(129,140,248,0.5)"
                    : p.id % 3 === 1
                      ? "rgba(168,85,247,0.4)"
                      : "rgba(236,72,153,0.3)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1, 1.2, 1, 0],
                y: [0, -30, -60, -90, -120],
              }}
              transition={{
                delay: p.delay,
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Orbital rings */}
          <div className="absolute pointer-events-none">
            <motion.div
              className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-indigo-500/10"
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{
                opacity: { delay: 0.2, duration: 0.6 },
                scale: { delay: 0.2, duration: 0.8, ease: "easeOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.7)]" />
            </motion.div>
            <motion.div
              className="absolute inset-4 sm:inset-6 rounded-full border border-purple-500/[0.08]"
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -360 }}
              transition={{
                opacity: { delay: 0.4, duration: 0.6 },
                scale: { delay: 0.4, duration: 0.8, ease: "easeOut" },
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
            </motion.div>
          </div>

          {/* Gradient glow blobs */}
          <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full pointer-events-none translate-x-10 translate-y-6"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
            }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Name with staggered letter animation */}
          <div className="relative flex overflow-hidden z-10">
            {[...name].map((ch, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  y: 60,
                  rotateX: -90,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: 0.3 + i * 0.045,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
                style={{ display: "inline-block" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + name.length * 0.045 + 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-indigo-400"
            >
              .
            </motion.span>
          </div>

          {/* Animated gradient underline */}
          <motion.div
            className="relative z-10 mt-3 h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #818cf8, #a855f7, #ec4899, transparent)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "12rem", opacity: 1 }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="relative z-10 mt-4 text-xs sm:text-sm tracking-[0.3em] uppercase text-slate-400"
          >
            Software Engineer
          </motion.p>

          {/* Progress section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="relative z-10 mt-10 w-56 sm:w-64"
          >
            <div className="h-[1px] w-full rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${count}%`,
                  background:
                    "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                }}
                transition={{ duration: 0.08 }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10px] text-slate-600 tracking-widest uppercase">
                {count < 30
                  ? "Initializing"
                  : count < 70
                    ? "Loading assets"
                    : count < 100
                      ? "Almost there"
                      : "Ready"}
              </p>
              <p className="text-[11px] tabular-nums text-slate-500 tracking-widest font-mono">
                {String(count).padStart(3, "0")}
                <span className="text-slate-700">%</span>
              </p>
            </div>
          </motion.div>

          {/* Corner markers */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute top-6 left-6 text-[10px] tracking-widest uppercase text-slate-700 font-mono"
          >
            portfolio / 2026
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute bottom-6 right-6 text-[10px] tracking-widest uppercase text-slate-700 font-mono"
          >
            loading experience
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}