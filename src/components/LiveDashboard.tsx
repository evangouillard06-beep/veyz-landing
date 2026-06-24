"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Fire,
  Sparkle,
  Tray,
  PencilSimpleLine,
  ChartLineUp,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";

// Pool de leads fictifs, clairement illustratifs (démo produit).
// Aucun chiffre client réel, aucun logo de portail (sources en texte).
type CatKey = "estimation" | "acheteur" | "visite" | "locataire";

type Lead = {
  name: string;
  source: string;
  subject: string;
  cat: CatKey;
  catLabel: string;
  hot: boolean;
};

const POOL: Lead[] = [
  { name: "Camille Berthier", source: "SeLoger", subject: "Estimation maison 4 pièces", cat: "estimation", catLabel: "Vendeur · estimation", hot: true },
  { name: "Yanis Lefebvre", source: "Leboncoin", subject: "Visite T3 rue des Lices", cat: "visite", catLabel: "Visite", hot: false },
  { name: "Hélène Vasseur", source: "Contact direct", subject: "Mandat de gestion locative", cat: "estimation", catLabel: "Vendeur · estimation", hot: true },
  { name: "Karim Benali", source: "SeLoger", subject: "Budget 320k, 3 chambres", cat: "acheteur", catLabel: "Acheteur", hot: false },
  { name: "Sophie Marchand", source: "Leboncoin", subject: "Dossier location T2", cat: "locataire", catLabel: "Locataire", hot: false },
  { name: "Thomas Réaux", source: "Contact direct", subject: "Vendre appartement centre", cat: "estimation", catLabel: "Vendeur · estimation", hot: true },
  { name: "Léa Fontaine", source: "SeLoger", subject: "Visite ce week-end ?", cat: "visite", catLabel: "Visite", hot: false },
  { name: "Nicolas Girard", source: "Leboncoin", subject: "Estimation terrain", cat: "acheteur", catLabel: "Acheteur", hot: false },
];

type Row = Lead & { uid: number };

type Buckets = Record<CatKey, number>;

type DashState = {
  leads: Row[];
  total: number;
  hot: number;
  toValidate: number;
  responseRate: number;
  buckets: Buckets;
  step: number;
};

const MAX_STEPS = 6; // après 6 arrivées, la boucle se réinitialise proprement
const TICK_MS = 4500;
const BARS: { key: CatKey; label: string }[] = [
  { key: "estimation", label: "Estim." },
  { key: "acheteur", label: "Achat" },
  { key: "visite", label: "Visite" },
  { key: "locataire", label: "Loc." },
];

let uidCounter = 1000;
const nextUid = () => ++uidCounter;

function seed(): DashState {
  return {
    leads: [
      { ...POOL[3], uid: 1 },
      { ...POOL[1], uid: 2 },
      { ...POOL[4], uid: 3 },
    ],
    total: 113,
    hot: 27,
    toValidate: 5,
    responseRate: 94,
    buckets: { estimation: 38, acheteur: 26, visite: 31, locataire: 18 },
    step: 0,
  };
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

function KpiNumber({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;
    const start = performance.now();
    const dur = 600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);

  return <>{display}</>;
}

function KpiCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent,
}: {
  icon: typeof Tray;
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3.5">
      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
        <Icon
          weight="duotone"
          className={`h-3.5 w-3.5 ${accent ? "text-accent-soft" : "text-zinc-400"}`}
        />
        {label}
      </div>
      <div
        className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${
          accent ? "text-accent-soft" : "text-white"
        }`}
      >
        <KpiNumber value={value} />
        {suffix}
      </div>
    </div>
  );
}

export default function LiveDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const [data, setData] = useState<DashState>(seed);
  const [toast, setToast] = useState<Row | null>(null);

  const stepRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // En mode réduit : dashboard statique pré-rempli, aucun timer.
    if (reduce || !inView) return;

    const tick = () => {
      const step = stepRef.current;

      if (step >= MAX_STEPS) {
        // Réinitialisation propre : la démo reste toujours "vivante".
        stepRef.current = 0;
        setToast(null);
        setData(seed());
        return;
      }

      const lead = POOL[step % POOL.length];
      stepRef.current = step + 1;

      setData((prev) => ({
        leads: [{ ...lead, uid: nextUid() }, ...prev.leads].slice(0, 5),
        total: prev.total + 1,
        hot: prev.hot + (lead.hot ? 1 : 0),
        toValidate: clamp(prev.toValidate + 1, 0, 12),
        responseRate: 92 + ((step + 1) % 5) - 2,
        buckets: { ...prev.buckets, [lead.cat]: prev.buckets[lead.cat] + 1 },
        step: prev.step + 1,
      }));

      if (lead.hot) {
        setToast({ ...lead, uid: nextUid() });
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setToast(null), 2400);
      }
    };

    intervalRef.current = setInterval(tick, TICK_MS);

    return () => {
      // Nettoyage : timers stoppés à la sortie du viewport / au démontage.
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, [inView, reduce]);

  const maxBucket = Math.max(...BARS.map((b) => data.buckets[b.key]), 1);

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Voyez Veyz en action.
          </h2>
          <p className="mt-5 max-w-[54ch] text-lg text-zinc-400">
            Le tableau de bord en temps réel : les leads arrivent, sont triés,
            notés, et une réponse est préparée pour validation.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={ref}
            className="glass relative mt-12 overflow-hidden rounded-2xl p-4 sm:p-6"
          >
            {/* Barre de fenêtre + libellé démo */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
                <Sparkle weight="fill" className="h-3.5 w-3.5 text-accent-soft" />
                Veyz · Aperçu en direct (démo)
              </span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <KpiCard icon={Tray} label="Total leads" value={data.total} />
              <KpiCard icon={Fire} label="Leads chauds" value={data.hot} accent />
              <KpiCard icon={PencilSimpleLine} label="À valider" value={data.toValidate} />
              <KpiCard icon={ChartLineUp} label="Taux de réponse" value={data.responseRate} suffix=" %" />
            </div>

            {/* Liste + colonne droite */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
              {/* Liste de leads */}
              <div className="min-h-[296px] rounded-xl border border-white/10 bg-ink-950/40 p-2">
                <ul className="space-y-2">
                  <AnimatePresence initial={false}>
                    {data.leads.map((lead) => (
                      <motion.li
                        key={lead.uid}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.015] p-2.5"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-800 text-[11px] font-semibold text-accent-soft">
                          {lead.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[13px] font-medium text-white">
                              {lead.name}
                            </p>
                            <span className="hidden shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400 sm:inline">
                              {lead.source}
                            </span>
                          </div>
                          <p className="truncate text-[11px] text-zinc-500">
                            {lead.subject}
                          </p>
                        </div>
                        {lead.hot ? (
                          <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent-soft">
                            <Fire weight="fill" className="h-3 w-3" />
                            Chaud
                          </span>
                        ) : (
                          <span className="hidden shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400 sm:inline">
                            {lead.catLabel}
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>

              {/* Colonne droite : répartition + brouillon */}
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-white/10 bg-ink-950/40 p-4">
                  <p className="text-[11px] text-zinc-500">Répartition par type</p>
                  <div className="mt-3 flex h-20 items-end gap-2.5">
                    {BARS.map((bar) => (
                      <div key={bar.key} className="flex flex-1 flex-col items-center gap-1.5">
                        <div className="relative flex h-16 w-full items-end justify-center">
                          <motion.div
                            className="w-full rounded-t-md bg-gradient-to-t from-accent/40 to-accent-soft/80"
                            style={{ height: "100%", transformOrigin: "bottom" }}
                            animate={{ scaleY: data.buckets[bar.key] / maxBucket }}
                            transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-accent/20 bg-ink-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-accent-soft">
                      <Sparkle weight="fill" className="h-3.5 w-3.5" />
                      Brouillon préparé
                    </span>
                    <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                      À valider
                    </span>
                  </div>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-zinc-300">
                    Réponse personnalisée prête, avec le ton de l&apos;agence et
                    les infos du bien. Un clic pour valider et envoyer.
                  </p>
                </div>
              </div>
            </div>

            {/* Toast lead chaud */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="pointer-events-none absolute right-4 top-14 flex items-center gap-2 rounded-xl border border-accent/30 bg-ink-900/95 px-3.5 py-2.5 shadow-[0_12px_40px_-12px_rgba(16,185,129,0.6)] backdrop-blur-sm"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <Fire weight="fill" className="h-4 w-4 text-accent-soft" />
                  <span className="text-[13px] font-semibold text-white">
                    Lead chaud · {toast.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Données de démonstration, fournies à titre illustratif.
        </p>
      </div>
    </section>
  );
}
