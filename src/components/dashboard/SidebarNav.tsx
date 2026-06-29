"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { NAV } from "./nav";

// Contenu de la barre latérale (logo + liens). Réutilisé par la version
// desktop (colonne fixe) et la version mobile (tiroir).
export default function SidebarNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-5">
        <Link href="/" aria-label="Accueil Veyz" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent/10 text-white"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-lg border transition-colors ${
                  active
                    ? "border-accent/40 bg-accent/15 text-accent-soft"
                    : "border-white/10 bg-white/[0.02] text-slate-400 group-hover:text-white"
                }`}
              >
                <item.icon weight={active ? "fill" : "regular"} className="h-4 w-4" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 p-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <p className="text-xs font-medium text-white">Essai gratuit</p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            Gabarit de démonstration. Données fictives.
          </p>
        </div>
      </div>
    </div>
  );
}
