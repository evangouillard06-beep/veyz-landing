"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Card, PageHeader, ScoreBadge, StatutBadge } from "@/components/dashboard/ui";
import {
  contacts,
  formatDateCourt,
  SCORES,
  SCORE_LABEL,
  SOURCES,
  TYPES_CONTACT,
  type ScoreKey,
  type SourceKey,
  type ContactType,
} from "@/lib/dashboard-data";

type TypeFiltre = "Tous" | ContactType;
type SourceFiltre = "Toutes" | SourceKey;
type ScoreFiltre = "Tous" | ScoreKey;

export default function ContactsPage() {
  const [recherche, setRecherche] = useState("");
  const [type, setType] = useState<TypeFiltre>("Tous");
  const [source, setSource] = useState<SourceFiltre>("Toutes");
  const [score, setScore] = useState<ScoreFiltre>("Tous");

  const resultats = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return contacts.filter((c) => {
      if (type !== "Tous" && c.type !== type) return false;
      if (source !== "Toutes" && c.source !== source) return false;
      if (score !== "Tous" && c.score !== score) return false;
      if (q && !`${c.nom} ${c.email} ${c.bien}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [recherche, type, source, score]);

  return (
    <>
      <PageHeader
        title="Contacts / Leads"
        subtitle={`${contacts.length} contacts · vendeurs et acheteurs détectés par Veyz.`}
      />

      {/* Filtres */}
      <Card className="mb-4 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher un contact…"
              className="w-full rounded-lg border border-white/10 bg-ink-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <ChipGroup
              options={["Tous", ...TYPES_CONTACT] as TypeFiltre[]}
              value={type}
              onChange={setType}
            />
            <ChipGroup
              options={["Toutes", ...SOURCES] as SourceFiltre[]}
              value={source}
              onChange={setSource}
            />
            <ChipGroup
              options={["Tous", ...SCORES] as ScoreFiltre[]}
              value={score}
              onChange={setScore}
              labelFor={(o) => (o in SCORE_LABEL ? SCORE_LABEL[o as ScoreKey] : o)}
            />
          </div>
        </div>
      </Card>

      {/* Tableau */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-[11px] uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Demande</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {resultats.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.025]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{c.nom}</p>
                    <p className="text-xs text-slate-500">{c.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{c.type}</td>
                  <td className="px-4 py-3 text-slate-400">{c.demande}</td>
                  <td className="px-4 py-3 text-slate-400">{c.source}</td>
                  <td className="px-4 py-3">
                    <ScoreBadge score={c.score} />
                  </td>
                  <td className="px-4 py-3">
                    <StatutBadge statut={c.statut} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-500">
                    {formatDateCourt(c.date)}
                  </td>
                </tr>
              ))}
              {resultats.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    Aucun contact ne correspond à ces filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  labelFor,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labelFor?: (o: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "border-accent/40 bg-accent/15 text-accent-soft"
                : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white"
            }`}
          >
            {labelFor ? labelFor(o) : o}
          </button>
        );
      })}
    </div>
  );
}
