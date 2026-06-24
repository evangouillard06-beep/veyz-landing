import { ClockCountdown, EnvelopeOpen, PhoneSlash } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const PAINS = [
  {
    icon: PhoneSlash,
    title: "Des leads qui filent",
    body: "Sans réponse rapide, le prospect appelle l'agence suivante. Le mandat se gagne dans l'heure, pas dans la journée.",
  },
  {
    icon: ClockCountdown,
    title: "Des réponses trop lentes",
    body: "Entre les visites et les appels, traiter chaque email prend du temps. Le soir, la pile s'accumule.",
  },
  {
    icon: EnvelopeOpen,
    title: "Des relances oubliées",
    body: "Un prospect sans nouvelle se refroidit. Les relances manuelles passent toujours après le reste.",
  },
];

export default function Problem() {
  return (
    <section id="probleme" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Vos leads ne vous attendent pas.
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg text-zinc-400">
            Chaque email entrant est un mandat potentiel. Et chaque heure sans
            réponse, c&apos;est une longueur d&apos;avance offerte au concurrent.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
          {PAINS.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.08}>
              <div className="h-full bg-ink-950 p-7 lg:p-9">
                <pain.icon
                  weight="duotone"
                  className="h-8 w-8 text-accent-soft"
                  aria-hidden
                />
                <h3 className="mt-5 text-lg font-medium text-white">
                  {pain.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">
                  {pain.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
