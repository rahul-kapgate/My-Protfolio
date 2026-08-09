// src/components/ScrollToTop.jsx

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 500);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollUp}
          aria-label="Scroll to top"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.25,
                  ease: "easeOut",
                }
          }
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -2,
                }
          }
          whileTap={
            reduceMotion
              ? undefined
              : {
                  scale: 0.96,
                }
          }
          className="
            group
            fixed bottom-5 right-5 z-40
            flex h-10 w-10 items-center justify-center
            rounded-md
            border border-white/[0.1]
            bg-[#0f0f0f]/90
            text-zinc-500
            backdrop-blur-md
            transition-colors duration-200
            hover:border-white/20
            hover:bg-[#151515]
            hover:text-white
            sm:bottom-6 sm:right-6
          "
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}