import {
  EnvelopeSimple,
  Sparkle,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: EnvelopeSimple,
    title: "Le contact arrive.",
    body: "Une demande tombe : estimation, visite, renseignement.",
  },
  {
    icon: Sparkle,
    title: "Veyz prépare la réponse.",
    body: "Personnalisée, avec les infos du bien, en quelques secondes.",
  },
  {
    icon: PaperPlaneTilt,
    title: "Vous validez et envoyez.",
    body: "En un clic. Rien ne part sans vous.",
  },
];

export default function HowItWorks() {
  return (
    <section id="etapes" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trois étapes. Vous gardez la main de bout en bout.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* Ligne de liaison (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10 lg:block"
          />
          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <li className="relative">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-accent/30 bg-ink-900 shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)]">
                    <step.icon
                      weight="fill"
                      className="h-6 w-6 text-accent-soft"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-slate-400">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
