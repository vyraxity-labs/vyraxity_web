"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { motion } from "motion/react";
import { easeStandard, useReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";

export function Origin() {
  const t = useTranslations("home.origin");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInViewOnce(sectionRef);
  const prefersReduced = useReducedMotion();

  const visualSteps = t.raw("visualSteps") as string[];

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
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

  const stepVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.55,
        ease: easeStandard,
      },
    },
  };

  return (
    <Section id="origin" theme="dark" className="overflow-hidden border-t border-vx-line/40 py-24 md:py-32">
      <Container>
        <div ref={sectionRef}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Column: Narrative Copy */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
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
                className="vx-body text-vx-muted max-w-xl leading-relaxed"
              >
                {t("copy")}
              </motion.p>
            </div>

            {/* Right Column: Pure Typographic Progression (Stacked Type + Downward Arrows) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
              <div className="flex flex-col items-center lg:items-start space-y-4 py-8 px-6 sm:px-10 border border-vx-line/40 rounded-vx-md bg-vx-ink/30 w-full max-w-md">
                {visualSteps.map((step, index) => {
                  const isFinal = index === visualSteps.length - 1;
                  const isOrigin = index === 0;

                  return (
                    <React.Fragment key={step}>
                      <motion.div
                        variants={stepVariants}
                        className="flex items-baseline gap-4"
                      >
                        <span className="font-mono text-xs text-vx-muted/50 select-none">
                          0{index + 1}
                        </span>
                        <span
                          className={`
                            font-mono font-bold tracking-widest text-2xl sm:text-3xl lg:text-4xl
                            ${isOrigin ? "text-vx-amber" : isFinal ? "text-vx-white" : "text-vx-white/80"}
                          `.trim()}
                        >
                          {step}
                        </span>
                      </motion.div>

                      {!isFinal && (
                        <motion.div
                          variants={stepVariants}
                          className="pl-8 text-vx-muted/40 font-mono text-lg select-none"
                          aria-hidden="true"
                        >
                          &darr;
                        </motion.div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}