// Fond ambiant : halos indigo + cyan diffus + grille fine. Purement décoratif,
// non interactif. L'animation aurora-drift se fige sous prefers-reduced-motion
// (géré globalement dans globals.css).
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      {/* Halos : flou réduit + animation désactivée sur mobile pour préserver le GPU */}
      <div className="absolute -top-40 right-[-10%] h-[360px] w-[360px] rounded-full bg-accent/20 blur-[80px] motion-safe:md:animate-aurora-drift md:h-[520px] md:w-[520px] md:blur-[120px]" />
      <div className="absolute top-24 left-[-12%] h-[300px] w-[300px] rounded-full bg-accent2/10 blur-[80px] [animation-delay:-6s] motion-safe:md:animate-aurora-drift md:h-[420px] md:w-[420px] md:blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent2/40 to-transparent" />
    </div>
  );
}
