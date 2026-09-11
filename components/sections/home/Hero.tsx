"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Button } from "@/components/ui/Button";
import { GenerativeNetwork } from "@/components/visuals/GenerativeNetwork";
import { motion } from "motion/react";
import { motionDurations, easeStandard, useReducedMotion } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("home.hero");
  const prefersReduced = useReducedMotion();

  // Narrative container variant orchestrating sequential narrative entrance
  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  };

  // Eyebrow enters with subtle fade
  const eyebrowVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.6,
        ease: easeStandard,
      },
    },
  };

  // Headline: deliberate cinematic entrance (narrative category 800–1200ms) with confident ease
  const headlineVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : motionDurations.narrative,
        ease: easeStandard,
      },
    },
  };

  // Body copy follows smoothly
  const bodyVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.7,
        ease: easeStandard,
      },
    },
  };

  // CTAs fade in cleanly to vary the motion vocabulary from headline slide
  const ctaVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.6,
        ease: easeStandard,
      },
    },
  };

  // Supporting statement enters quietly
  const statementVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.6,
        ease: easeStandard,
      },
    },
  };

  // Right visual fades in softly
  const visualVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 1.2,
        ease: easeStandard,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-vx-black text-vx-white pt-12 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
      <Container className="flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Eyebrow, Headline, Supporting Copy, CTAs, Supporting Statement */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            <motion.div variants={eyebrowVariant}>
              <EyebrowLabel className="mb-6">{t("eyebrow")}</EyebrowLabel>
            </motion.div>

            <motion.h1
              variants={headlineVariant}
              className="vx-h1 text-vx-white tracking-tight mb-8"
            >
              {t("headline")}
            </motion.h1>

            <motion.p
              variants={bodyVariant}
              className="vx-body text-vx-muted max-w-xl mb-10"
            >
              {t("supportingCopy")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ctaVariant}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Button href="/products" variant="primary">
                {t("primaryCta")}
              </Button>
              <Button href="/vision" variant="secondary">
                {t("secondaryCta")}
              </Button>
            </motion.div>

            {/* Supporting Statement */}
            <motion.p
              variants={statementVariant}
              className="font-mono text-xs text-vx-muted/80 max-w-md border-l border-vx-line pl-4"
            >
              {t("supportingStatement")}
            </motion.p>
          </motion.div>

          {/* Right Column: Generative Network Visual */}
          <motion.div
            variants={visualVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 w-full flex items-center justify-center"
          >
            <GenerativeNetwork />
          </motion.div>
        </div>
      </Container>

      {/* Subtle Scroll Hint Indicator */}
      <div className="w-full flex justify-center pt-8">
        <span className="font-mono text-xs uppercase tracking-widest text-vx-muted/60 flex items-center gap-2 select-none">
          <span aria-hidden="true">&darr;</span>
          {t("scrollHint")}
        </span>
      </div>
    </section>
  );
}