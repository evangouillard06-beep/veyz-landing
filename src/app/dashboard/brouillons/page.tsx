import {
  PaperPlaneTilt,
  PencilSimple,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { Card, PageHeader, Badge, ScoreBadge } from "@/components/dashboard/ui";
import { brouillons, formatDateRelative } from "@/lib/dashboard-data";

export default function BrouillonsPage() {
  return (
    <>
      <PageHeader
        title="Brouillons à valider"
        subtitle={`${brouillons.length} réponses préparées par Veyz. Rien n'est envoyé sans vous.`}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {brouillons.map((b) => (
          <Card key={b.id} className="flex flex-col p-5 sm:p-6">
            {/* En-tête */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{b.contact}</h3>
                  <Badge tone="neutral">{b.type}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {b.source} · reçu {formatDateRelative(b.recuLe)}
                </p>
              </div>
              <ScoreBadge score={b.score} />
            </div>

            {/* Sujet */}
            <p className="mt-4 text-sm font-medium text-slate-200">{b.sujet}</p>

            {/* Extrait de la réponse préparée */}
            <div className="mt-3 flex-1 rounded-xl border border-accent/15 bg-accent/[0.04] p-4">
              <span className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-accent-soft">
                <Sparkle weight="fill" className="h-3.5 w-3.5" />
                Réponse préparée
              </span>
              <p className="text-[13px] leading-relaxed text-slate-300">
                {b.extrait}
              </p>
            </div>

            {/* Actions (UI seule) */}
            <div className="mt-5 flex items-center gap-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-ink-950 transition-[filter] hover:brightness-110"
              >
                <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                Valider
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <PencilSimple className="h-4 w-4" />
                Modifier
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
