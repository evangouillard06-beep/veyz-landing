import {
  Fire,
  NotePencil,
  PaperPlaneTilt,
  ArrowsClockwise,
  TrendUp,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { Card, PageHeader } from "@/components/dashboard/ui";
import MailsChart from "@/components/dashboard/MailsChart";
import {
  kpis,
  activiteRecente,
  formatDateRelative,
  type Activite,
} from "@/lib/dashboard-data";

const toneText: Record<string, string> = {
  hot: "text-coral",
  success: "text-success-soft",
  accent: "text-accent-soft",
};

const activiteIcon: Record<Activite["type"], { Icon: typeof Fire; tone: string }> =
  {
    lead: { Icon: Fire, tone: "text-coral" },
    brouillon: { Icon: NotePencil, tone: "text-accent-soft" },
    envoye: { Icon: PaperPlaneTilt, tone: "text-success-soft" },
    relance: { Icon: ArrowsClockwise, tone: "text-accent2" },
  };

export default function VueEnsemblePage() {
  return (
    <>
      <PageHeader
        title="Vue d'ensemble"
        subtitle="Votre activité commerciale des 7 derniers jours."
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.key} className="p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-400">{k.label}</p>
            <div className="mt-3 flex items-end justify-between gap-2">
              <span
                className={`font-mono text-3xl font-semibold tabular-nums ${
                  k.tone ? toneText[k.tone] : "text-white"
                }`}
              >
                {k.valeur}
                {k.suffixe && (
                  <span className="text-lg text-slate-400">{k.suffixe}</span>
                )}
              </span>
              {k.variation && (
                <span className="mb-1 inline-flex items-center gap-0.5 text-[11px] font-medium text-success-soft">
                  <TrendUp weight="bold" className="h-3 w-3" />
                  {k.variation}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Graphique + activité */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 sm:p-6 lg:col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Mails traités par jour
            </h3>
            <span className="text-xs text-slate-500">7 derniers jours</span>
          </div>
          <p className="mb-5 text-xs text-slate-500">
            Volume de demandes reçues et traitées par Veyz.
          </p>
          <MailsChart />
        </Card>

        <Card className="flex flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-1.5">
            <Sparkle weight="fill" className="h-4 w-4 text-accent-soft" />
            <h3 className="text-sm font-semibold text-white">Activité récente</h3>
          </div>
          <ul className="space-y-3.5">
            {activiteRecente.map((a) => {
              const { Icon, tone } = activiteIcon[a.type];
              return (
                <li key={a.id} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.02]">
                    <Icon weight="fill" className={`h-3.5 w-3.5 ${tone}`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug text-slate-200">
                      {a.texte}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {formatDateRelative(a.date)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}
