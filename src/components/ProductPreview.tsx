"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Fire,
  PaperPlaneTilt,
  Sparkle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Aperçu produit RÉEL : une mini-version animée de l'interface Veyz
// (tri de la boîte mail + brouillon préparé). Ce n'est pas une fausse
// capture en <div> figée : le flux se rejoue pour montrer le produit en action.

type Lead = {
  id: number;
  name: string;
  source: string;
  subject: string;
  category: string;
  hot: boolean;
};

const LEADS: Lead[] = [
  {
    id: 1,
    name: "Camille Berthier",
    source: "SeLoger",
    subject: "Estimation maison 4 pièces, Aix",
    category: "Vendeur",
    hot: true,
  },
  {
    id: 2,
    name: "Yanis Lefebvre",
    source: "Leboncoin",
    subject: "Visite T3 rue des Lices ?",
    category: "Acheteur",
    hot: false,
  },
  {
    id: 3,
    name: "Hélène Vasseur",
    source: "Contact direct",
    subject: "Mandat de gestion locative",
    category: "Vendeur",
    hot: true,
  },
];

export default function ProductPreview() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [showDraft, setShowDraft] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShowDraft(true);
      return;
    }
    setShowDraft(false);
    const draftTimer = setTimeout(() => setShowDraft(true), 900);
    const cycle = setInterval(() => {
      setShowDraft(false);
      setActive((i) => (i + 1) % LEADS.length);
      setTimeout(() => setShowDraft(true), 900);
    }, 4200);
    return () => {
      clearTimeout(draftTimer);
      clearInterval(cycle);
    };
  }, [reduce]);

  const current = LEADS[active];

  return (
    <div className="glass relative w-full overflow-hidden rounded-2xl p-4 sm:p-5">
      {/* Barre de fenêtre */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <Sparkle weight="fill" className="h-3.5 w-3.5 text-accent-soft" />
          Veyz · Boîte de réception
        </div>
      </div>

      {/* Liste des leads */}
      <div className="space-y-2">
        {LEADS.map((lead, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={lead.id}
              animate={{
                borderColor: isActive
                  ? "rgba(99,102,241,0.5)"
                  : "rgba(255,255,255,0.07)",
                backgroundColor: isActive
                  ? "rgba(99,102,241,0.07)"
                  : "rgba(255,255,255,0.015)",
              }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border p-3"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-800 text-[13px] font-semibold text-accent-soft">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">
                    {lead.name}
                  </p>
                  <span className="shrink-0 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {lead.source}
                  </span>
                </div>
                <p className="truncate text-xs text-slate-500">{lead.subject}</p>
              </div>
              {lead.hot ? (
                <span className="relative flex shrink-0 items-center gap-1 rounded-full bg-coral/15 px-2 py-1 text-[10px] font-semibold text-coral">
                  {isActive && !reduce && (
                    <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-coral">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-coral" />
                    </span>
                  )}
                  <Fire weight="fill" className="h-3 w-3" />
                  Lead chaud
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-400">
                  {lead.category}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Brouillon préparé par Veyz */}
      <div className="mt-3 min-h-[150px]">
        <AnimatePresence mode="wait">
          {showDraft && (
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-accent/20 bg-ink-900/80 p-4"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-accent-soft">
                  <Sparkle weight="fill" className="h-3.5 w-3.5" />
                  Brouillon préparé
                </span>
                <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                  À valider
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Bonjour {current.name.split(" ")[0]}, merci pour votre message
                concernant{" "}
                <span className="text-white">
                  {current.subject.toLowerCase()}
                </span>
                . Je vous propose un créneau dès demain pour en discuter de vive
                voix.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-gradient px-3 py-1.5 text-[11px] font-semibold text-ink-950">
                  <PaperPlaneTilt weight="fill" className="h-3.5 w-3.5" />
                  Valider et envoyer
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Rien n&apos;est envoyé sans vous
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
