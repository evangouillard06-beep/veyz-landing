// Fond ambiant : halos verts diffus + grille fine. Purement décoratif,
// non interactif. L'animation aurora-drift se fige sous prefers-reduced-motion
// (géré globalement dans globals.css).
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] animate-aurora-drift rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute top-24 left-[-12%] h-[420px] w-[420px] animate-aurora-drift rounded-full bg-emerald-500/10 blur-[120px] [animation-delay:-6s]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
