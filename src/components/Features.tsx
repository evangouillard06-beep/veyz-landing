import {
  Fire,
  FunnelSimple,
  PenNib,
  ArrowsClockwise,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

export default function Features() {
  return (
    <section id="fonctionnalites" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent-soft">
            Ce que fait Veyz
          </span>
          <h2 className="mt-4 max-w-[24ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            L&apos;assistant email qui répond à vos leads immobiliers.
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* F1 - Alerte leads chauds (cellule haute) */}
          <Reveal className="md:col-span-1 lg:col-span-2 lg:row-span-2">
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/[0.08] to-transparent p-7">
              <div>
                <Fire weight="fill" className="h-8 w-8 text-accent-soft" />
                <h3 className="mt-5 text-xl font-medium text-white">
                  Repérez les vendeurs en priorité
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                  Alerte instantanée sur les demandes d&apos;estimation, vos
                  mandats potentiels. Vous rappelez les bons contacts en premier.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 rounded-xl border border-accent/25 bg-ink-900/60 px-3 py-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent-soft">
                  Nouveau lead chaud · Estimation
                </span>
              </div>
            </article>
          </Reveal>

          {/* F2 - Tri automatique (large) */}
          <Reveal className="md:col-span-1 lg:col-span-4">
            <article className="h-full rounded-2xl border border-white/10 bg-ink-900/50 p-7">
              <FunnelSimple weight="duotone" className="h-8 w-8 text-accent-soft" />
              <h3 className="mt-5 text-xl font-medium text-white">
                Répondez avant vos concurrents
              </h3>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
                Vos réponses sont prêtes en quelques secondes. Le premier qui
                répond décroche le mandat : ce sera vous.
              </p>
            </article>
          </Reveal>

          {/* F3 - Réponses personnalisées */}
          <Reveal className="md:col-span-1 lg:col-span-2">
            <article className="h-full rounded-2xl border border-white/10 bg-ink-900/50 p-7">
              <PenNib weight="duotone" className="h-8 w-8 text-accent-soft" />
              <h3 className="mt-5 text-lg font-medium text-white">
                Vous restez maître
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">
                Vous validez chaque réponse. Rien ne part sans vous.
              </p>
            </article>
          </Reveal>

          {/* F4 - Relances automatiques */}
          <Reveal className="md:col-span-1 lg:col-span-2">
            <article className="h-full rounded-2xl border border-white/10 bg-ink-900/50 p-7">
              <ArrowsClockwise weight="duotone" className="h-8 w-8 text-accent-soft" />
              <h3 className="mt-5 text-lg font-medium text-white">
                Ne relancez plus à la main
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">
                Les prospects sans réponse sont relancés pour vous, au bon
                moment.
              </p>
            </article>
          </Reveal>

          {/* F5 - Tableau de bord (pleine largeur) */}
          <Reveal className="md:col-span-2 lg:col-span-6">
            <article className="flex h-full flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-ink-900/50 p-7 md:flex-row md:items-center">
              <div className="max-w-[52ch]">
                <ChartLineUp weight="duotone" className="h-8 w-8 text-accent-soft" />
                <h3 className="mt-5 text-xl font-medium text-white">
                  Gardez l&apos;œil sur tout
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                  Un tableau de bord clair de tous vos contacts : reçus,
                  réponses, relances, mandats chauds du jour.
                </p>
              </div>
              <div className="grid w-full grid-cols-3 gap-3 md:w-auto md:min-w-[300px]">
                {[
                  { k: "Leads", v: "Reçus" },
                  { k: "Réponses", v: "Prêtes" },
                  { k: "Relances", v: "En cours" },
                ].map((b) => (
                  <div
                    key={b.k}
                    className="rounded-xl border border-white/10 bg-ink-950 p-3 text-center"
                  >
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-accent/70" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-white">{b.k}</p>
                    <p className="text-[11px] text-zinc-500">{b.v}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
