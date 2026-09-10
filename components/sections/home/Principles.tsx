"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { motion } from "motion/react";
import { easeStandard, useReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";

interface PrincipleItem {
  title: string;
  description: string;
}

export function Principles() {
  const t = useTranslations("home.principles");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInViewOnce(sectionRef);
  const prefersReduced = useReducedMotion();

  const items = t.raw("items") as PrincipleItem[];

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
    <Section id="principles" theme="light" className="overflow-hidden py-24 md:py-32">
      <Container>
        <div ref={sectionRef} className="max-w-5xl">
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
              className="vx-h2 text-vx-ink-text tracking-tight mb-16"
            >
              {t("headline")}
            </motion.h2>

            {/* Clean four-part list with 01-04 numbering, explicitly no cards/borders/shadows */}
            <div className="w-full divide-y divide-vx-ink-secondary/20 border-y border-vx-ink-secondary/20">
              {items.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
                >
                  {/* Numbering + Title */}
                  <div className="md:col-span-4 flex items-baseline gap-4">
                    <span className="font-mono text-xs sm:text-sm text-vx-ink-accent select-none">
                      0{index + 1}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-vx-ink-text tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-8">
                    <p className="text-base sm:text-lg text-vx-ink-secondary leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}