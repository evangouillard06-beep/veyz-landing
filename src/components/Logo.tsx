// Logo-texte Veyz : monogramme "V" + wordmark. SVG simple et géométrique.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative grid h-8 w-8 place-items-center rounded-[9px] border border-accent/40 bg-ink-900"
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-4 w-4">
          <path
            d="M7 9 L16 24 L25 9"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">
        Veyz
      </span>
    </span>
  );
}
