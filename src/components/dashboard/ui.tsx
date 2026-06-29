// Primitives UI partagées du dashboard. Réutilisent le design system de la
// landing (glass, bordures subtiles, palette indigo/cyan, badges sémantiques).
import type { ReactNode } from "react";
import type {
  ScoreKey,
  StatutContact,
  BienStatut,
} from "@/lib/dashboard-data";
import { SCORE_LABEL } from "@/lib/dashboard-data";

/* -------------------------------- Carte ------------------------------- */

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl ${className}`}>{children}</div>
  );
}

/* ----------------------------- En-tête page --------------------------- */

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* -------------------------------- Badge ------------------------------- */

type Tone = "accent" | "success" | "amber" | "coral" | "neutral";

const toneClass: Record<Tone, string> = {
  accent: "border-accent/30 bg-accent/10 text-accent-soft",
  success: "border-success/30 bg-success/10 text-success-soft",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  coral: "border-coral/30 bg-coral/10 text-coral",
  neutral: "border-white/10 bg-white/5 text-slate-400",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------- Badges spécialisés ------------------------- */

const scoreTone: Record<ScoreKey, Tone> = {
  chaud: "coral",
  tiede: "amber",
  froid: "neutral",
};

export function ScoreBadge({ score }: { score: ScoreKey }) {
  return (
    <Badge tone={scoreTone[score]}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden
      />
      {SCORE_LABEL[score]}
    </Badge>
  );
}

const statutTone: Record<StatutContact, Tone> = {
  Nouveau: "accent",
  "À valider": "amber",
  Envoyé: "success",
  Répondu: "success",
  Relancé: "amber",
};

export function StatutBadge({ statut }: { statut: StatutContact }) {
  return <Badge tone={statutTone[statut]}>{statut}</Badge>;
}

const bienStatutTone: Record<BienStatut, Tone> = {
  Disponible: "success",
  "Sous compromis": "amber",
  Vendu: "neutral",
};

export function BienStatutBadge({ statut }: { statut: BienStatut }) {
  return <Badge tone={bienStatutTone[statut]}>{statut}</Badge>;
}
