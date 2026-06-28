"use client";

import { useState } from "react";
import { CheckCircle, CircleNotch, Warning } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";

type Status = "idle" | "loading" | "success" | "error";

type Fields = {
  nom: string;
  agence: string;
  telephone: string;
  email: string;
  message: string;
};

const EMPTY: Fields = {
  nom: "",
  agence: "",
  telephone: "",
  email: "",
  message: "",
};

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-ink-950/80 px-4 py-3 text-[15px] text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/30";

export default function CallbackForm() {
  const reduce = useReducedMotion();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [hp, setHp] = useState(""); // honeypot anti-spam

  const endpoint = siteConfig.formspreeEndpoint;
  const endpointReady = Boolean(endpoint) && !endpoint.startsWith("[");

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.nom.trim().length < 2) next.nom = "Indiquez votre nom.";
    if (fields.agence.trim().length < 2)
      next.agence = "Indiquez le nom de votre agence.";
    const phoneDigits = fields.telephone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 8)
      next.telephone = "Indiquez un numéro de téléphone valide.";
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      next.email = "Cet email ne semble pas valide.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) {
      // Bot détecté : on simule un succès sans rien envoyer.
      setStatus("success");
      return;
    }
    if (!validate()) return;

    if (!endpointReady) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          Nom: fields.nom,
          Agence: fields.agence,
          Téléphone: fields.telephone,
          Email: fields.email || "(non renseigné)",
          Message: fields.message || "(aucun)",
          // `email` en minuscule : Formspree l'utilise comme adresse de réponse.
          ...(fields.email ? { email: fields.email } : {}),
          _subject: `Nouvelle demande de rappel - ${fields.agence}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFields(EMPTY);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex min-h-[280px] flex-col items-center justify-center rounded-2xl p-8 text-center">
        <motion.span
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid h-14 w-14 place-items-center rounded-full bg-success/15"
        >
          <CheckCircle weight="fill" className="h-8 w-8 text-success-soft" />
        </motion.span>
        <p className="mt-5 text-lg font-medium text-white">
          Merci, on vous rappelle très vite.
        </p>
        <p className="mt-2 max-w-[34ch] text-sm text-slate-400">
          Votre demande est bien arrivée. On revient vers vous très rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-2xl p-6 sm:p-7">
      {/* Honeypot anti-spam : invisible pour les humains, rempli par les bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" tabIndex={-1}>
        <label htmlFor="company-website">Ne pas remplir</label>
        <input
          id="company-website"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id="nom"
          label="Nom"
          required
          value={fields.nom}
          onChange={(v) => update("nom", v)}
          error={errors.nom}
          autoComplete="name"
        />
        <Field
          id="agence"
          label="Agence"
          required
          value={fields.agence}
          onChange={(v) => update("agence", v)}
          error={errors.agence}
          autoComplete="organization"
        />
        <Field
          id="telephone"
          label="Téléphone"
          required
          type="tel"
          value={fields.telephone}
          onChange={(v) => update("telephone", v)}
          error={errors.telephone}
          autoComplete="tel"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          optional
          value={fields.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-300">
          Message <span className="text-slate-600">(optionnel)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Un mot sur votre besoin (facultatif)"
          className={fieldClass + " resize-none"}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200"
        >
          <Warning weight="fill" className="h-4 w-4 shrink-0" />
          {endpointReady
            ? "L'envoi a échoué. Merci de réessayer dans un instant."
            : "Le formulaire n'est pas encore activé. Merci de réessayer bientôt."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-[15px] font-semibold text-ink-950 transition-[filter] hover:brightness-110 disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <CircleNotch className="h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Être rappelé"
        )}
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        {siteConfig.trial.short} Vos données restent confidentielles.
      </p>
    </form>
  );
}

type FieldProps = {
  id: keyof Fields | string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  optional,
  autoComplete,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}{" "}
        {required && <span className="text-accent-soft">*</span>}
        {optional && <span className="text-slate-600">(optionnel)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
      />
      {error && (
        <span id={`${id}-error`} className="text-xs text-rose-300">
          {error}
        </span>
      )}
    </div>
  );
}
