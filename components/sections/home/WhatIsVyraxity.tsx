"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { motion } from "motion/react";
import { easeStandard, useReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";

export function WhatIsVyraxity() {
  const t = useTranslations("home.whatIsVyraxity");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInViewOnce(sectionRef);
  const prefersReduced = useReducedMotion();

  const copyLines = t.raw("copy") as string[];
  const bodyParagraphs = copyLines.slice(0, copyLines.length - 2);
  const leadIn = copyLines[copyLines.length - 2];
  const takeaway = copyLines[copyLines.length - 1];

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
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
    <Section id="about" theme="dark" className="overflow-hidden border-t border-vx-line/40">
      <Container>
        <div ref={sectionRef} className="max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-start"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <EyebrowLabel>{t("eyebrow")}</EyebrowLabel>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="vx-h2 text-vx-white tracking-tight mb-12"
            >
              {t("headline")}
            </motion.h2>

            {/* Main Narrative Body */}
            <div className="flex flex-col space-y-6 text-vx-muted text-lg sm:text-xl leading-relaxed mb-12">
              {bodyParagraphs.map((paragraph, index) => (
                <motion.p key={index} variants={itemVariants}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Restrained Abstract Diagram: single origin branching outward, reusing GenerativeNetwork design grammar */}
            <motion.div
              variants={itemVariants}
              aria-hidden="true"
              className="my-4 py-6 w-full max-w-md flex items-center justify-between relative"
            >
              <svg
                viewBox="0 0 360 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto text-vx-line"
              >
                {/* Branch lines */}
                <line x1="30" y1="40" x2="160" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="30" y1="40" x2="160" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="30" y1="40" x2="160" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

                <line x1="160" y1="20" x2="310" y2="15" stroke="currentColor" strokeWidth="0.75" />
                <line x1="160" y1="40" x2="310" y2="40" stroke="currentColor" strokeWidth="0.75" />
                <line x1="160" y1="60" x2="310" y2="65" stroke="currentColor" strokeWidth="0.75" />

                {/* Origin node (Amber) */}
                <circle cx="30" cy="40" r="5" fill="#F2A93B" />
                <circle cx="30" cy="40" r="10" stroke="#F2A93B" strokeWidth="0.75" strokeOpacity="0.3" />

                {/* First tier branching nodes */}
                <circle cx="160" cy="20" r="3.5" fill="#F4F3EE" fillOpacity="0.8" />
                <circle cx="160" cy="40" r="3.5" fill="#F4F3EE" fillOpacity="0.8" />
                <circle cx="160" cy="60" r="3.5" fill="#F4F3EE" fillOpacity="0.8" />

                {/* Second tier peripheral nodes */}
                <circle cx="310" cy="15" r="2.5" fill="#A4A39D" fillOpacity="0.6" />
                <circle cx="310" cy="40" r="2.5" fill="#A4A39D" fillOpacity="0.6" />
                <circle cx="310" cy="65" r="2.5" fill="#A4A39D" fillOpacity="0.6" />
              </svg>
            </motion.div>

            {/* Lead-in and Highlighted Takeaway */}
            <div className="pt-6 border-t border-vx-line/40 w-full">
              <motion.p
                variants={itemVariants}
                className="font-mono text-xs uppercase tracking-widest text-vx-muted mb-4"
              >
                {leadIn}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-vx-white tracking-tight leading-snug"
              >
                {takeaway.split(". ").map((part, index, arr) => (
                  <span key={index}>
                    {part.includes("Africa") ? (
                      <span className="text-vx-amber">{part}</span>
                    ) : (
                      part
                    )}
                    {index < arr.length - 1 ? ". " : ""}
                  </span>
                ))}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}