"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  MagnifyingGlass,
  Fire,
  Sparkle,
  CaretUp,
  CaretDown,
  X,
  Tray,
  PencilSimpleLine,
  CheckCircle,
  ArrowsClockwise,
  ChartLineUp,
  House,
} from "@phosphor-icons/react";
import {
  LEADS,
  LIVE_POOL,
  BIENS,
  CATEGORIES,
  SCORES,
  STATUTS,
  formatDate,
  type Lead,
  type CategorieKey,
  type ScoreKey,
  type StatutKey,
} from "@/lib/demoData";

/* ------------------------------ helpers UI ------------------------------ */

const scoreToneClass: Record<"hot" | "warm" | "cold", string> = {
  hot: "bg-coral/15 text-coral",
  warm: "bg-amber-400/10 text-amber-300",
  cold: "bg-white/5 text-slate-400",
};

const statutToneClass: Record<"success" | "amber" | "neutral", string> = {
  success: "bg-success/15 text-success-soft",
  amber: "bg-amber-400/10 text-amber-300",
  neutral: "bg-white/5 text-slate-400",
};

function ScoreBadge({ score }: { score: ScoreKey }) {
  const s = SCORES[score];
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${scoreToneClass[s.tone]}`}>
      {s.tone === "hot" && <Fire weight="fill" className="h-3 w-3" />}
      {s.label}
    </span>
  );
}

function StatutBadge({ statut }: { statut: StatutKey }) {
  const s = STATUTS[statut];
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${statutToneClass[s.tone]}`}>
      {s.label}
    </span>
  );
}

function AnimatedNumber({ value }: { value: number }) {
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
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / 600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return <>{display}</>;
}

function BarRow({
  label,
  value,
  max,
  reduce,
}: {
  label: string;
  value: number;
  max: number;
  reduce: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 shrink-0 truncate text-xs text-slate-400">{label}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent/60 to-accent-soft"
          style={{ width: `${(value / max) * 100}%`, transformOrigin: "left" }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="w-7 shrink-0 text-right font-mono text-xs text-slate-300">
        {value}
      </span>
    </div>
  );
}

/* --------------------------------- KPIs --------------------------------- */

type KpiDef = {
  key: string;
  label: string;
  icon: typeof Tray;
  tone?: "accent" | "hot";
  suffix?: string;
};

const KPI_DEFS: KpiDef[] = [
  { key: "total", label: "Total leads", icon: Tray },
  { key: "hot", label: "Leads chauds", icon: Fire, tone: "hot" },
  { key: "aValider", label: "À valider", icon: PencilSimpleLine },
  { key: "repondu", label: "Répondu", icon: CheckCircle },
  { key: "taux", label: "Taux de réponse", icon: ChartLineUp, suffix: " %" },
  { key: "relances", label: "Relances", icon: ArrowsClockwise },
];

/* --------------------------------- main --------------------------------- */

type Tab = "overview" | "leads" | "biens";
type SortKey = "date" | "expediteur" | "sujet" | "categorie" | "score" | "statut";

const SCORE_RANK: Record<ScoreKey, number> = {
  froid: 0,
  tiede: 1,
  chaud: 2,
  tres_chaud: 3,
};

let liveUid = 5000;

export default function DemoDashboard() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.15 });

  const [tab, setTab] = useState<Tab>("overview");
  const [extra, setExtra] = useState<Lead[]>([]);
  const [toast, setToast] = useState<Lead | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  // Filtres / recherche / tri (onglet Leads)
  const [search, setSearch] = useState("");
  const [fStatut, setFStatut] = useState<StatutKey | "all">("all");
  const [fCategorie, setFCategorie] = useState<CategorieKey | "all">("all");
  const [fScore, setFScore] = useState<ScoreKey | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [selected, setSelected] = useState<Lead | null>(null);

  const cycleRef = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allLeads = useMemo(() => [...extra, ...LEADS], [extra]);

  /* --- touche "vivant" : timers seulement si visible et hors reduced-motion --- */
  useEffect(() => {
    if (reduce || !inView) return;

    const tick = () => {
      const tpl = LIVE_POOL[cycleRef.current % LIVE_POOL.length];
      cycleRef.current += 1;
      const lead: Lead = { ...tpl, id: `LV-${++liveUid}`, ts: Date.now() };

      setExtra((prev) => (prev.length >= 6 ? [lead] : [lead, ...prev]));
      setHighlightId(lead.id);
      if (hlTimer.current) clearTimeout(hlTimer.current);
      hlTimer.current = setTimeout(() => setHighlightId(null), 1600);

      if (lead.score === "tres_chaud" || lead.score === "chaud") {
        setToast(lead);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 2600);
      }
    };

    const interval = setInterval(tick, 7000);
    return () => {
      clearInterval(interval);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (hlTimer.current) clearTimeout(hlTimer.current);
    };
  }, [inView, reduce]);

  /* --- KPIs dérivés --- */
  const kpis = useMemo(() => {
    const total = allLeads.length;
    const hot = allLeads.filter((l) => l.score === "chaud" || l.score === "tres_chaud").length;
    const aValider = allLeads.filter((l) => l.statut === "a_valider").length;
    const repondu = allLeads.filter((l) => l.statut === "repondu").length;
    const relances = allLeads.filter((l) => l.statut === "relance").length;
    const taux = total ? Math.round((repondu / total) * 100) : 0;
    return { total, hot, aValider, repondu, relances, taux } as Record<string, number>;
  }, [allLeads]);

  /* --- graphiques dérivés --- */
  const byCategorie = useMemo(() => {
    return (Object.keys(CATEGORIES) as CategorieKey[]).map((k) => ({
      label: CATEGORIES[k],
      value: allLeads.filter((l) => l.categorie === k).length,
    }));
  }, [allLeads]);

  const byStatut = useMemo(() => {
    return (Object.keys(STATUTS) as StatutKey[]).map((k) => ({
      label: STATUTS[k].label,
      value: allLeads.filter((l) => l.statut === k).length,
    }));
  }, [allLeads]);

  const volumeByDay = useMemo(() => {
    const days: { label: string; value: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const start = d.getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const value = allLeads.filter((l) => l.ts >= start && l.ts < end).length;
      days.push({
        label: ["D", "L", "M", "M", "J", "V", "S"][d.getDay()],
        value,
      });
    }
    return days;
  }, [allLeads]);

  const funnel = useMemo(() => {
    const recus = allLeads.length;
    const traites = allLeads.filter((l) => l.statut !== "nouveau").length;
    const repondus = allLeads.filter((l) => l.statut === "repondu").length;
    return [
      { label: "Reçus", value: recus },
      { label: "Traités", value: traites },
      { label: "Répondus", value: repondus },
    ];
  }, [allLeads]);

  const hotPriority = useMemo(
    () =>
      allLeads
        .filter(
          (l) =>
            (l.score === "tres_chaud" || l.score === "chaud") &&
            (l.statut === "a_valider" || l.statut === "nouveau"),
        )
        .slice(0, 4),
    [allLeads],
  );

  /* --- table Leads : filtre + recherche + tri --- */
  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = allLeads.filter((l) => {
      if (fStatut !== "all" && l.statut !== fStatut) return false;
      if (fCategorie !== "all" && l.categorie !== fCategorie) return false;
      if (fScore !== "all" && l.score !== fScore) return false;
      if (q) {
        const hay = `${l.expediteur} ${l.sujet} ${l.bien} ${l.telephone}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    out.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "date":
          cmp = a.ts - b.ts;
          break;
        case "score":
          cmp = SCORE_RANK[a.score] - SCORE_RANK[b.score];
          break;
        case "expediteur":
          cmp = a.expediteur.localeCompare(b.expediteur);
          break;
        case "sujet":
          cmp = a.sujet.localeCompare(b.sujet);
          break;
        case "categorie":
          cmp = CATEGORIES[a.categorie].localeCompare(CATEGORIES[b.categorie]);
          break;
        case "statut":
          cmp = STATUTS[a.statut].label.localeCompare(STATUTS[b.statut].label);
          break;
      }
      return cmp * dir;
    });
    return out;
  }, [allLeads, search, fStatut, fCategorie, fScore, sortKey, sortDir]);

  const toggleSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir(key === "date" || key === "score" ? "desc" : "asc");
      }
    },
    [sortKey],
  );

  /* --- détail : fermeture au clavier (Échap) --- */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    // Verrouille le défilement de la page pendant l'ouverture du panneau.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  const tabs: { key: Tab; label: string; icon: typeof Tray }[] = [
    { key: "overview", label: "Vue d'ensemble", icon: ChartLineUp },
    { key: "leads", label: "Leads", icon: Tray },
    { key: "biens", label: "Biens", icon: House },
  ];

  return (
    <div
      ref={rootRef}
      className="glass relative overflow-hidden rounded-2xl"
    >
      {/* Chrome de fenêtre d'app */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-400 sm:flex">
            <Sparkle weight="fill" className="h-3.5 w-3.5 text-accent-soft" />
            Veyz · Tableau de bord
          </span>
        </div>
        <span className="rounded-full border border-accent/25 bg-accent/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-accent-soft">
          Démo interactive
        </span>
      </div>

      {/* Onglets (scroll horizontal sur mobile) */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-white/10 px-3 pt-3">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-current={active}
              className={`relative flex shrink-0 items-center gap-1.5 rounded-t-lg px-3 py-2.5 text-sm transition-colors ${
                active ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <t.icon weight={active ? "fill" : "regular"} className="h-4 w-4" />
              <span className="whitespace-nowrap">{t.label}</span>
              {active && (
                <motion.span
                  layoutId={reduce ? undefined : "tab-underline"}
                  className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Contenu */}
      <div className="p-4 sm:p-5">
        {tab === "overview" && (
          <div className="space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {KPI_DEFS.map((k) => (
                <div key={k.key} className="rounded-xl border border-white/10 bg-ink-950/50 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <k.icon weight="duotone" className={`h-3.5 w-3.5 ${k.tone === "hot" ? "text-coral" : k.tone === "accent" ? "text-accent-soft" : "text-slate-400"}`} />
                    {k.label}
                  </div>
                  <div className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${k.tone === "hot" ? "text-coral" : k.tone === "accent" ? "text-accent-soft" : "text-white"}`}>
                    <AnimatedNumber value={kpis[k.key === "taux" ? "taux" : k.key]} />
                    {k.suffix}
                  </div>
                </div>
              ))}
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-ink-950/40 p-4">
                <p className="mb-3 text-xs font-medium text-slate-400">Répartition par catégorie</p>
                <div className="space-y-2.5">
                  {byCategorie.map((d) => (
                    <BarRow key={d.label} label={d.label} value={d.value} max={Math.max(...byCategorie.map((x) => x.value), 1)} reduce={!!reduce} />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-ink-950/40 p-4">
                <p className="mb-3 text-xs font-medium text-slate-400">Répartition par statut</p>
                <div className="space-y-2.5">
                  {byStatut.map((d) => (
                    <BarRow key={d.label} label={d.label} value={d.value} max={Math.max(...byStatut.map((x) => x.value), 1)} reduce={!!reduce} />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-ink-950/40 p-4">
                <p className="mb-3 text-xs font-medium text-slate-400">Volume reçu (7 jours)</p>
                <div className="flex h-24 items-end gap-2">
                  {volumeByDay.map((d, i) => {
                    const max = Math.max(...volumeByDay.map((x) => x.value), 1);
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                        <div className="relative flex h-20 w-full items-end">
                          <motion.div
                            className="w-full rounded-t-md bg-gradient-to-t from-accent/50 to-accent2/90"
                            style={{ height: "100%", transformOrigin: "bottom" }}
                            initial={reduce ? false : { scaleY: 0 }}
                            animate={{ scaleY: Math.max(d.value / max, 0.04) }}
                            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-600">{d.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-ink-950/40 p-4">
                <p className="mb-3 text-xs font-medium text-slate-400">Entonnoir de traitement</p>
                <div className="space-y-2.5">
                  {funnel.map((d) => (
                    <BarRow key={d.label} label={d.label} value={d.value} max={funnel[0].value || 1} reduce={!!reduce} />
                  ))}
                </div>
              </div>
            </div>

            {/* Leads chauds à traiter */}
            <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-4">
              <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-accent-soft">
                <Fire weight="fill" className="h-4 w-4" />
                Leads chauds à traiter en priorité
              </div>
              <ul className="space-y-2">
                <AnimatePresence initial={false}>
                  {hotPriority.map((l) => (
                    <motion.li
                      key={l.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(l)}
                        className="flex w-full items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-950/40 p-2.5 text-left transition-colors hover:border-accent/30 active:border-accent/40"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-800 text-[11px] font-semibold text-accent-soft">
                          {l.expediteur.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium text-white">{l.expediteur}</p>
                          <p className="truncate text-[11px] text-slate-500">{l.sujet}</p>
                        </div>
                        <ScoreBadge score={l.score} />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        )}

        {tab === "leads" && (
          <div>
            {/* Barre de filtres */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-auto sm:min-w-[200px] sm:flex-1">
                <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un lead..."
                  aria-label="Rechercher un lead"
                  className="w-full rounded-lg border border-white/10 bg-ink-950/80 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <Select className="flex-1 sm:flex-none" label="Statut" value={fStatut} onChange={(v) => setFStatut(v as StatutKey | "all")} options={[["all", "Tous statuts"], ...(Object.keys(STATUTS) as StatutKey[]).map((k) => [k, STATUTS[k].label] as [string, string])]} />
              <Select className="flex-1 sm:flex-none" label="Catégorie" value={fCategorie} onChange={(v) => setFCategorie(v as CategorieKey | "all")} options={[["all", "Toutes catégories"], ...(Object.keys(CATEGORIES) as CategorieKey[]).map((k) => [k, CATEGORIES[k]] as [string, string])]} />
              <Select className="flex-1 sm:flex-none" label="Score" value={fScore} onChange={(v) => setFScore(v as ScoreKey | "all")} options={[["all", "Tous scores"], ...(Object.keys(SCORES) as ScoreKey[]).map((k) => [k, SCORES[k].label] as [string, string])]} />
            </div>

            {/* Table */}
            <div className="max-h-[440px] overflow-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="sticky top-0 z-10 bg-ink-900/95 backdrop-blur">
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500">
                    <Th label="Date" k="date" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    <Th label="Expéditeur" k="expediteur" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    <Th label="Sujet" k="sujet" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    <Th label="Catégorie" k="categorie" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    <Th label="Score" k="score" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    <Th label="Statut" k="statut" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    <th className="px-3 py-2.5 font-medium">Téléphone</th>
                    <th className="px-3 py-2.5 font-medium">Bien</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((l) => (
                    <tr
                      key={l.id}
                      onClick={() => setSelected(l)}
                      className={`cursor-pointer border-t border-white/[0.06] transition-colors hover:bg-white/[0.03] active:bg-white/[0.06] ${
                        highlightId === l.id ? "bg-accent/[0.08]" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-slate-400">{formatDate(l.ts)}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 font-medium text-white">{l.expediteur}</td>
                      <td className="max-w-[220px] truncate px-3 py-2.5 text-slate-300">{l.sujet}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-400">{CATEGORIES[l.categorie]}</td>
                      <td className="px-3 py-2.5"><ScoreBadge score={l.score} /></td>
                      <td className="px-3 py-2.5"><StatutBadge statut={l.statut} /></td>
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-slate-400">{l.telephone}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-400">{l.bien}</td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-3 py-10 text-center text-sm text-slate-500">
                        Aucun lead ne correspond à ces filtres.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-600">
              {filteredLeads.length} lead{filteredLeads.length > 1 ? "s" : ""} · cliquez une ligne pour voir le détail
            </p>
          </div>
        )}

        {tab === "biens" && (
          <div className="max-h-[480px] overflow-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10 bg-ink-900/95 backdrop-blur">
                <tr className="text-[11px] uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2.5 font-medium">Référence</th>
                  <th className="px-3 py-2.5 font-medium">Type</th>
                  <th className="px-3 py-2.5 font-medium">Ville</th>
                  <th className="px-3 py-2.5 font-medium">Surface</th>
                  <th className="px-3 py-2.5 font-medium">Prix</th>
                  <th className="px-3 py-2.5 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {BIENS.map((b) => {
                  const tone =
                    b.statut === "Disponible"
                      ? "bg-success/15 text-success-soft"
                      : b.statut === "Sous compromis"
                        ? "bg-amber-400/10 text-amber-300"
                        : "bg-white/5 text-slate-400";
                  return (
                    <tr key={b.ref} className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.03]">
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-slate-300">{b.ref}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-white">{b.type}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-400">{b.ville}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-400">{b.surface} m²</td>
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-slate-300">
                        {b.prix.toLocaleString("fr-FR")} €
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${tone}`}>
                          {b.statut}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast lead chaud */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="pointer-events-none absolute right-4 top-16 z-30 flex items-center gap-2 rounded-xl border border-coral/40 bg-ink-900/95 px-3.5 py-2.5 shadow-[0_12px_40px_-12px_rgba(251,113,133,0.5)] backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-coral" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            <Fire weight="fill" className="h-4 w-4 text-coral" />
            <span className="text-[13px] font-semibold text-white">
              Lead chaud · {toast.expediteur}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panneau de détail */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm"
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Détail du lead ${selected.expediteur}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88dvh] flex-col rounded-t-2xl border-t border-white/10 bg-ink-900/95 backdrop-blur-xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-full sm:max-w-md sm:rounded-t-none sm:border-l sm:border-t-0"
            >
              {/* Poignée (bottom-sheet mobile) */}
              <div className="flex justify-center pt-2.5 sm:hidden">
                <span className="h-1 w-10 rounded-full bg-white/15" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-sm font-medium text-white">Détail du lead</span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Fermer le détail"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-400 transition-colors hover:text-white active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-auto p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink-800 text-sm font-semibold text-accent-soft">
                    {selected.expediteur.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{selected.expediteur}</p>
                    <p className="truncate text-xs text-slate-500">{selected.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">{CATEGORIES[selected.categorie]}</span>
                  <ScoreBadge score={selected.score} />
                  <StatutBadge statut={selected.statut} />
                </div>

                <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  <Info label="Reçu le" value={formatDate(selected.ts)} />
                  <Info label="Téléphone" value={selected.telephone} />
                  <Info label="Source" value={selected.source} />
                  <Info label="Bien" value={selected.bien} span />
                </dl>

                <div>
                  <p className="mb-1.5 text-xs font-medium text-slate-400">Résumé</p>
                  <p className="rounded-lg border border-white/10 bg-ink-950/50 p-3 text-sm leading-relaxed text-slate-300">
                    {selected.resume}
                  </p>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-accent-soft">
                      <Sparkle weight="fill" className="h-3.5 w-3.5" />
                      Réponse proposée
                    </span>
                    <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                      À valider
                    </span>
                  </div>
                  <p className="rounded-lg border border-accent/20 bg-accent/[0.05] p-3 text-sm leading-relaxed text-slate-200">
                    {selected.reponse}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <span className="block w-full rounded-full bg-accent-gradient px-5 py-3 text-center text-sm font-semibold text-ink-950">
                  Valider et envoyer
                </span>
                <p className="mt-2 text-center text-[11px] text-slate-600">
                  Aperçu de démonstration, non fonctionnel.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- sous-composants ---------------------------- */

function Th({
  label,
  k,
  sortKey,
  sortDir,
  onSort,
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void;
}) {
  const active = sortKey === k;
  return (
    <th className="px-3 py-2.5 font-medium">
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`flex items-center gap-1 transition-colors hover:text-slate-300 ${active ? "text-accent-soft" : ""}`}
      >
        {label}
        {active &&
          (sortDir === "asc" ? (
            <CaretUp weight="bold" className="h-3 w-3" />
          ) : (
            <CaretDown weight="bold" className="h-3 w-3" />
          ))}
      </button>
    </th>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  className?: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border border-white/10 bg-ink-950/80 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/30 ${className}`}
    >
      {options.map(([v, l]) => (
        <option key={v} value={v} className="bg-ink-900 text-white">
          {l}
        </option>
      ))}
    </select>
  );
}

function Info({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? "col-span-2 sm:col-span-3" : ""}>
      <dt className="text-[11px] text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-slate-200">{value}</dd>
    </div>
  );
}
