"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const FAQ = [
  {
    q: "L'IA va-t-elle écrire n'importe quoi à mes clients ?",
    a: "Non. Veyz prépare un brouillon. Vous le relisez et l'envoyez vous-même. Rien ne part sans vous.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Oui, traitées de façon sécurisée et conforme au RGPD. Vous gardez le contrôle.",
  },
  {
    q: "C'est compliqué à mettre en place ?",
    a: "Non. On connecte votre boîte mail et on s'occupe de tout. Opérationnel en moins d'une heure.",
  },
  {
    q: "Ça remplace mon logiciel / CRM ?",
    a: "Non. Veyz travaille en amont, sur vos emails, et se complète avec vos outils.",
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
              <p className="max-w-[68ch] pb-6 text-[15px] leading-relaxed text-slate-400">
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
