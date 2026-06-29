import { mailsParJour } from "@/lib/dashboard-data";

// Graphique léger "mails traités par jour" : barres groupées (reçus / traités)
// en CSS pur, sans dépendance externe. Couleurs de la palette (indigo + cyan).
export default function MailsChart() {
  const max = Math.max(...mailsParJour.flatMap((d) => [d.recus, d.traites]), 1);

  return (
    <div>
      <div className="mb-5 flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" aria-hidden />
          Reçus
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-accent2" aria-hidden />
          Traités
        </span>
      </div>

      <div className="flex h-44 items-end gap-2 sm:gap-4">
        {mailsParJour.map((d) => (
          <div
            key={d.jour}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-36 w-full items-end justify-center gap-1 sm:gap-1.5">
              <div
                className="group relative w-1/2 max-w-[18px] rounded-t-md bg-accent/80 transition-all hover:bg-accent"
                style={{ height: `${(d.recus / max) * 100}%` }}
                title={`${d.recus} reçus`}
              >
                <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                  {d.recus}
                </span>
              </div>
              <div
                className="group relative w-1/2 max-w-[18px] rounded-t-md bg-accent2/80 transition-all hover:bg-accent2"
                style={{ height: `${(d.traites / max) * 100}%` }}
                title={`${d.traites} traités`}
              >
                <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                  {d.traites}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500">{d.jour}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
