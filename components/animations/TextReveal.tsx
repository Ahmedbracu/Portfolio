"use client";
import { motion } from "framer-motion";

export function TextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay }
    }
  };
  
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)"
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={child} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
