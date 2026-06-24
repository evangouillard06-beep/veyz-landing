"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const FAQ = [
  {
    q: "L'IA envoie-t-elle des emails à ma place ?",
    a: "Non. Veyz prépare un brouillon de réponse, mais rien n'est envoyé sans votre validation. Vous relisez, vous ajustez si besoin, puis vous décidez d'envoyer. Vous gardez le contrôle total.",
  },
  {
    q: "Et le RGPD ? Que deviennent mes données ?",
    a: "Vos données sont traitées de manière sécurisée et conforme au RGPD. Elles servent uniquement à trier vos emails et préparer vos réponses. Vous restez propriétaire de vos données et gardez le contrôle dessus.",
  },
  {
    q: "C'est compliqué à installer ?",
    a: "Non. La mise en route est rapide et nous nous occupons de la configuration pour vous. Vous n'avez pas de logiciel à gérer : Veyz se connecte à votre boîte mail et travaille en arrière-plan.",
  },
  {
    q: "Est-ce que ça remplace mon CRM ?",
    a: "Non. Veyz ne remplace pas votre CRM : il traite vos emails en amont, là où le CRM s'arrête souvent. Les deux sont complémentaires.",
  },
];

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-white/10">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-6 text-left"
        >
          <span className="text-lg font-medium text-white">{q}</span>
          <motion.span
            animate={reduce ? undefined : { rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-accent-soft"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-[68ch] pb-6 text-[15px] leading-relaxed text-zinc-400">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent-soft">
                Questions fréquentes
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Vos objections, sans détour.
              </h2>
            </div>
          </Reveal>

          <div>
            {FAQ.map((item, i) => (
              <Item key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
