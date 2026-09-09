"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.08, initialDelay = 0.1 }: StaggerChildrenProps) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 12 } 
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
