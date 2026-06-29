"use client";

import { useState } from "react";
import { Card, PageHeader, BienStatutBadge } from "@/components/dashboard/ui";
import {
  biens,
  formatPrix,
  BIEN_STATUTS,
  type BienStatut,
} from "@/lib/dashboard-data";

export default function BiensPage() {
  // État local des statuts (UI seule — aucune persistance pour l'instant).
  const [statuts, setStatuts] = useState<Record<string, BienStatut>>(
    () => Object.fromEntries(biens.map((b) => [b.id, b.statut])),
  );

  const disponibles = Object.values(statuts).filter(
    (s) => s === "Disponible",
  ).length;

  return (
    <>
      <PageHeader
        title="Biens"
        subtitle={`${biens.length} biens au portefeuille · ${disponibles} disponibles.`}
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-[11px] uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">Réf</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Secteur</th>
                <th className="px-4 py-3 font-medium">Prix</th>
                <th className="px-4 py-3 font-medium">Surface</th>
                <th className="px-4 py-3 font-medium">Pièces</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Modifier</th>
              </tr>
            </thead>
            <tbody>
              {biens.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.025]"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400">
                    {b.ref}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{b.type}</td>
                  <td className="px-4 py-3 text-slate-400">{b.secteur}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-slate-200">
                    {formatPrix(b.prix)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                    {b.surface} m²
                  </td>
                  <td className="px-4 py-3 text-slate-400">{b.pieces}</td>
                  <td className="px-4 py-3">
                    <BienStatutBadge statut={statuts[b.id]} />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={statuts[b.id]}
                      onChange={(e) =>
                        setStatuts((prev) => ({
                          ...prev,
                          [b.id]: e.target.value as BienStatut,
                        }))
                      }
                      aria-label={`Statut du bien ${b.ref}`}
                      className="rounded-lg border border-white/10 bg-ink-950/60 px-2.5 py-1.5 text-xs text-slate-300 outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/30"
                    >
                      {BIEN_STATUTS.map((s) => (
                        <option key={s} value={s} className="bg-ink-900">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-3 text-xs text-slate-600">
        Aperçu de démonstration : les changements de statut ne sont pas
        enregistrés.
      </p>
    </>
  );
}
