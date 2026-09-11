"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { easeStandard, useReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";

export interface ExperimentMeta {
  status: string;
  version: string;
  updated: string;
  [key: string]: string;
}

export interface ExperimentCardProps {
  system?: string;
  id: string;
  status: string;
  description: string;
  meta: ExperimentMeta;
  className?: string;
}

export function ExperimentCard({
  system = "VYRAXITY LABS",
  id,
  status,
  description,
  meta,
  className = "",
}: ExperimentCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInViewOnce(cardRef);
  const prefersReduced = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: easeStandard,
      },
    },
  };

  return (
    <div ref={cardRef} className={`w-full max-w-xl ${className}`.trim()}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full rounded-vx-sm border border-vx-line/80 bg-vx-ink/60 p-6 sm:p-8 font-mono text-xs sm:text-sm text-vx-white/90 flex flex-col justify-between"
      >
        {/* Header Section */}
        <div className="flex flex-col space-y-2 mb-6">
          <div className="flex items-center justify-between text-vx-muted/70 text-[11px] uppercase tracking-wider">
            <span>{system}</span>
            <span className="text-vx-amber flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-vx-amber inline-block animate-pulse" />
              {status}
            </span>
          </div>
          <div className="text-sm sm:text-base font-bold tracking-widest text-vx-white">
            {id}
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6 font-sans text-sm sm:text-base text-vx-muted font-light leading-relaxed">
          {description}
        </div>

        {/* Hairline Divider & Meta Readout Table */}
        <div className="pt-4 border-t border-vx-line/60 flex flex-col space-y-2 font-mono text-xs">
          {Object.entries(meta).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between py-0.5 tracking-wider"
            >
              <span className="text-vx-muted/60 uppercase">{key}</span>
              <span className="text-vx-white/90 uppercase">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
