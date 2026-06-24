"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Gift } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/config";
import AuroraBackground from "./AuroraBackground";
import ProductPreview from "./ProductPreview";
import PhoneCTA from "./PhoneCTA";

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-16 pt-28 md:pt-24"
    >
      <AuroraBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent-soft">
              Assistant email IA · Agences immobilières
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Ne perdez plus jamais{" "}
            <span className="text-gradient">un lead immobilier.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[42ch] text-lg leading-relaxed text-zinc-400"
          >
            Veyz lit vos emails, trie vos leads et prépare une réponse
            personnalisée. Vous validez, vous envoyez.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PhoneCTA size="lg" />
            <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <ShieldCheck weight="fill" className="h-4 w-4 text-accent-soft" />
              Le premier qui répond décroche le mandat.
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm font-medium text-accent-soft">
              <Gift weight="fill" className="h-4 w-4" />
              {siteConfig.trial.short}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-3xl" />
          <ProductPreview />
        </motion.div>
      </div>
    </section>
  );
}
