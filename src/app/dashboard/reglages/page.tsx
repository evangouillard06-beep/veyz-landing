"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle, FloppyDisk } from "@phosphor-icons/react";
import { Card, PageHeader } from "@/components/dashboard/ui";
import { agence } from "@/lib/dashboard-data";

const TYPES_DEMANDE = [
  "Estimation",
  "Visite",
  "Renseignement",
  "Location",
  "Achat",
] as const;

const champClass =
  "w-full rounded-lg border border-white/10 bg-ink-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/30";

export default function ReglagesPage() {
  const [tutoiement, setTutoiement] = useState(false);
  const [politesse, setPolitesse] = useState("standard");
  const [signature, setSignature] = useState(
    "Camille Martin\nAgence Démo — Nice\n04 93 00 00 00",
  );
  const [langue, setLangue] = useState("fr");
  const [longueur, setLongueur] = useState("moyenne");
  const [demandes, setDemandes] = useState<string[]>([
    "Estimation",
    "Visite",
    "Renseignement",
  ]);
  const [nomAgence, setNomAgence] = useState<string>(agence.nom);
  const [villeAgence, setVilleAgence] = useState<string>(agence.ville);
  const [instructions, setInstructions] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleDemande = (d: string) =>
    setDemandes((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
  };

  return (
    <form onSubmit={onSubmit}>
      <PageHeader
        title="Réglages"
        subtitle="Personnalisez le ton et le comportement de votre assistant Veyz."
        action={
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-ink-950 transition-[filter] hover:brightness-110"
          >
            <FloppyDisk weight="fill" className="h-4 w-4" />
            Enregistrer
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Ton & style */}
        <Card className="p-5 sm:p-6">
          <SectionTitle>Ton & style</SectionTitle>
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <Label
                title="Tutoiement"
                hint="Par défaut, Veyz vouvoie vos contacts."
              />
              <Switch
                checked={tutoiement}
                onChange={setTutoiement}
                labels={["Vous", "Tu"]}
              />
            </div>

            <Field label="Niveau de politesse">
              <select
                value={politesse}
                onChange={(e) => setPolitesse(e.target.value)}
                className={champClass}
              >
                <option value="decontracte" className="bg-ink-900">
                  Décontracté
                </option>
                <option value="standard" className="bg-ink-900">
                  Standard
                </option>
                <option value="soutenu" className="bg-ink-900">
                  Soutenu
                </option>
              </select>
            </Field>

            <Field label="Langue des réponses">
              <select
                value={langue}
                onChange={(e) => setLangue(e.target.value)}
                className={champClass}
              >
                <option value="fr" className="bg-ink-900">
                  Français
                </option>
                <option value="en" className="bg-ink-900">
                  Anglais
                </option>
                <option value="it" className="bg-ink-900">
                  Italien
                </option>
              </select>
            </Field>

            <Field label="Signature">
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={3}
                className={`${champClass} resize-y`}
              />
            </Field>
          </div>
        </Card>

        {/* Réponses */}
        <Card className="p-5 sm:p-6">
          <SectionTitle>Réponses</SectionTitle>
          <div className="space-y-5">
            <Field label="Longueur des réponses">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { k: "courte", l: "Courte" },
                  { k: "moyenne", l: "Moyenne" },
                  { k: "detaillee", l: "Détaillée" },
                ].map((o) => {
                  const active = longueur === o.k;
                  return (
                    <button
                      key={o.k}
                      type="button"
                      onClick={() => setLongueur(o.k)}
                      aria-pressed={active}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "border-accent/40 bg-accent/15 text-accent-soft"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white"
                      }`}
                    >
                      {o.l}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field
              label="Types de demandes traitées"
              hint="Veyz ne prépare des réponses que pour ces demandes."
            >
              <div className="flex flex-wrap gap-2">
                {TYPES_DEMANDE.map((d) => {
                  const active = demandes.includes(d);
                  return (
                    <label
                      key={d}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        active
                          ? "border-accent/40 bg-accent/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleDemande(d)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-4 w-4 place-items-center rounded border transition-colors ${
                          active
                            ? "border-accent bg-accent text-ink-950"
                            : "border-white/20"
                        }`}
                        aria-hidden
                      >
                        {active && (
                          <CheckCircle weight="fill" className="h-3.5 w-3.5" />
                        )}
                      </span>
                      {d}
                    </label>
                  );
                })}
              </div>
            </Field>
          </div>
        </Card>

        {/* Agence */}
        <Card className="p-5 sm:p-6">
          <SectionTitle>Agence</SectionTitle>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Nom de l'agence">
              <input
                type="text"
                value={nomAgence}
                onChange={(e) => setNomAgence(e.target.value)}
                className={champClass}
              />
            </Field>
            <Field label="Ville">
              <input
                type="text"
                value={villeAgence}
                onChange={(e) => setVilleAgence(e.target.value)}
                className={champClass}
              />
            </Field>
          </div>
        </Card>

        {/* Instructions libres */}
        <Card className="p-5 sm:p-6">
          <SectionTitle>Instructions libres</SectionTitle>
          <Field
            label="Consignes pour Veyz"
            hint="Ex. : ne jamais donner de prix par email, toujours proposer un rendez-vous."
          >
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={5}
              placeholder="Ajoutez vos consignes…"
              className={`${champClass} resize-y`}
            />
          </Field>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-ink-950 transition-[filter] hover:brightness-110"
        >
          <FloppyDisk weight="fill" className="h-4 w-4" />
          Enregistrer les réglages
        </button>
      </div>

      {/* Toast de succès */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-success/30 bg-ink-900/95 px-4 py-3 shadow-2xl backdrop-blur-xl"
        >
          <CheckCircle weight="fill" className="h-5 w-5 text-success-soft" />
          <span className="text-sm font-medium text-white">
            Réglages enregistrés.
          </span>
        </div>
      )}
    </form>
  );
}

/* ------------------------------ sous-composants ----------------------- */

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </h3>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {hint && <p className="mb-2 text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}

function Label({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-200">{title}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function Switch({
  checked,
  onChange,
  labels,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labels?: [string, string];
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2"
    >
      {labels && (
        <span className="text-xs font-medium text-slate-500">
          {checked ? labels[1] : labels[0]}
        </span>
      )}
      <span
        className={`relative h-6 w-11 rounded-full border transition-colors ${
          checked
            ? "border-transparent bg-accent-gradient"
            : "border-white/10 bg-white/[0.06]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
