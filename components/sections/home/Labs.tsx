"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { easeStandard, useReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";

export function Labs() {
  const t = useTranslations("home.labs");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInViewOnce(sectionRef);
  const prefersReduced = useReducedMotion();

  const areas = t.raw("areas") as string[];
  const ctaText = t("cta").replace(/→|\&rarr\;/g, "").trim();

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
    <Section id="labs" theme="dark" className="overflow-hidden border-t border-vx-line/40">
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
              className="vx-h2 text-vx-white tracking-tight mb-8"
            >
              {t("headline")}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="vx-body text-vx-muted mb-12 max-w-3xl leading-relaxed"
            >
              {t("copy")}
            </motion.p>

            {/* Exploration Areas: Mono-styled list, explicitly not an icon card grid */}
            <motion.div
              variants={itemVariants}
              className="w-full py-8 border-y border-vx-line/40 mb-12"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-vx-muted/60 mb-6">
                AREAS OF EXPLORATION
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 font-mono text-sm sm:text-base text-vx-white/90">
                {areas.map((area, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 py-1"
                  >
                    <span className="text-vx-amber text-xs font-mono select-none" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="tracking-wide">{area}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Button href="/labs" variant="link" className="text-base sm:text-lg">
                {ctaText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}