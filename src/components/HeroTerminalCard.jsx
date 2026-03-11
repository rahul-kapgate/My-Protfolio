import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_TERMINAL_SEQUENCE = [
  {
    command: "whoami",
    output: "Rahul Kapgate",
  },
  {
    command: "role",
    output: "Full Stack Developer",
  },
  {
    command: "stack",
    output: "React, Next.js, Node.js, FastAPI, PostgreSQL, Docker",
  },
];

export default function HeroTerminalCard({
  lines = DEFAULT_TERMINAL_SEQUENCE,
  shellLabel = "zsh",
  promptLabel = "rahul@portfolio:~",
  className = "",
}) {
  const reduceMotion = useReducedMotion();

  const [finishedTerminalLines, setFinishedTerminalLines] = useState([]);
  const [currentTerminalIndex, setCurrentTerminalIndex] = useState(0);
  const [currentCommandText, setCurrentCommandText] = useState("");
  const [currentOutputText, setCurrentOutputText] = useState("");
  const [terminalPhase, setTerminalPhase] = useState("command");

  useEffect(() => {
    let timer;

    if (reduceMotion) {
      setFinishedTerminalLines(lines);
      setCurrentTerminalIndex(lines.length);
      setCurrentCommandText("");
      setCurrentOutputText("");
      setTerminalPhase("done");
      return;
    }

    if (currentTerminalIndex >= lines.length) {
      setTerminalPhase("done");

      // restart after 2 seconds
      timer = window.setTimeout(() => {
        setFinishedTerminalLines([]);
        setCurrentTerminalIndex(0);
        setCurrentCommandText("");
        setCurrentOutputText("");
        setTerminalPhase("command");
      }, 4000);

      return () => window.clearTimeout(timer);
    }

    const currentLine = lines[currentTerminalIndex];

    if (terminalPhase === "command") {
      if (currentCommandText.length < currentLine.command.length) {
        timer = window.setTimeout(() => {
          setCurrentCommandText(
            currentLine.command.slice(0, currentCommandText.length + 1),
          );
        }, 55);
      } else if (currentLine.output) {
        timer = window.setTimeout(() => {
          setTerminalPhase("output");
        }, 220);
      } else {
        timer = window.setTimeout(() => {
          setFinishedTerminalLines((prev) => [...prev, currentLine]);
          setCurrentTerminalIndex((prev) => prev + 1);
          setCurrentCommandText("");
          setCurrentOutputText("");
          setTerminalPhase("command");
        }, 180);
      }
    } else if (terminalPhase === "output") {
      if (currentOutputText.length < currentLine.output.length) {
        timer = window.setTimeout(() => {
          setCurrentOutputText(
            currentLine.output.slice(0, currentOutputText.length + 1),
          );
        }, 24);
      } else {
        timer = window.setTimeout(() => {
          setFinishedTerminalLines((prev) => [...prev, currentLine]);
          setCurrentTerminalIndex((prev) => prev + 1);
          setCurrentCommandText("");
          setCurrentOutputText("");
          setTerminalPhase("command");
        }, 260);
      }
    }

    return () => window.clearTimeout(timer);
  }, [
    reduceMotion,
    lines,
    currentTerminalIndex,
    currentCommandText,
    currentOutputText,
    terminalPhase,
  ]);

  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/20 to-cyan-500/25 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.04, 1],
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <div className="relative rounded-[28px] bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-cyan-400/30 p-[1px] shadow-[0_0_50px_rgba(99,102,241,0.18)]">
        <div className="overflow-hidden rounded-[27px] border border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/85 px-4 py-3 dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-slate-300/80 px-2 py-0.5 dark:border-slate-700/80">
                {shellLabel}
              </span>
              <span>{promptLabel}</span>
            </div>
          </div>

          <div className="relative px-5 py-5 sm:px-6 sm:py-6 font-mono text-sm">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-cyan-400/[0.03]" />

            <div className="relative space-y-4">
              {finishedTerminalLines.map((line, index) => (
                <div key={`${line.command}-${index}`}>
                  <p className="text-emerald-500">$ {line.command}</p>

                  {line.output && (
                    <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                      {line.output}
                    </p>
                  )}

                  {line.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {line.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-300/80 bg-slate-100/80 px-3 py-1 text-[11px] text-slate-700 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {currentTerminalIndex < lines.length && (
                <div>
                  <p className="text-emerald-500">
                    $ {currentCommandText}
                    {terminalPhase === "command" && (
                      <motion.span
                        animate={
                          reduceMotion ? undefined : { opacity: [1, 0, 1] }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 1, repeat: Infinity }
                        }
                        className="ml-0.5 inline-block text-emerald-500"
                      >
                        _
                      </motion.span>
                    )}
                  </p>

                  {(terminalPhase === "output" ||
                    currentOutputText.length > 0) && (
                    <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                      {currentOutputText}
                      {terminalPhase === "output" && (
                        <motion.span
                          animate={
                            reduceMotion ? undefined : { opacity: [1, 0, 1] }
                          }
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { duration: 1, repeat: Infinity }
                          }
                          className="ml-0.5 inline-block text-slate-500 dark:text-slate-400"
                        >
                          _
                        </motion.span>
                      )}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-2 text-slate-500 dark:text-slate-500">
                <span className="text-emerald-500">$</span>{" "}
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 1, repeat: Infinity }
                  }
                  className="inline-block"
                >
                  _
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}