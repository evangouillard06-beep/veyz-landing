import Counter from "./Counter";
import Reveal from "./Reveal";

// Chiffres honnêtes : ce sont des caractéristiques produit réelles
// (surveillance continue, fréquence de vérification, validation humaine),
// pas des statistiques marché inventées.
const STATS = [
  { value: 24, suffix: "/7", label: "Votre boîte mail surveillée en continu" },
  { value: 5, suffix: " min", label: "Entre chaque vérification des nouveaux emails" },
  { value: 100, suffix: " %", label: "Des réponses validées par vous avant envoi" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/40 py-14">
      <div className="mx-auto grid max-w-shell grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:px-6">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="text-center sm:text-left">
              <div className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
