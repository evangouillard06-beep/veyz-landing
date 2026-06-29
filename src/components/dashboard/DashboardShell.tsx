"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  CaretDown,
  SignOut,
  UserCircle,
  Gear,
} from "@phosphor-icons/react";
import SidebarNav from "./SidebarNav";
import { titreDepuisChemin } from "./nav";
import { agence } from "@/lib/dashboard-data";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilOpen, setProfilOpen] = useState(false);
  const pathname = usePathname();
  const titre = titreDepuisChemin(pathname);

  return (
    <div className="min-h-[100dvh]">
      {/* Halos d'ambiance discrets, cohérents avec la landing */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[360px] w-[360px] rounded-full bg-accent2/[0.07] blur-[120px]" />
      </div>

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/[0.06] bg-ink-900/60 backdrop-blur-xl lg:block">
        <SidebarNav />
      </aside>

      {/* Tiroir mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[82%] border-r border-white/10 bg-ink-900/95 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Colonne principale */}
      <div className="lg:pl-64">
        {/* Barre du haut */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/[0.06] bg-ink-950/70 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:text-white lg:hidden"
          >
            <List className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-white">
              {titre}
            </h2>
          </div>

          {/* Nom d'agence (placeholder) */}
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" aria-hidden />
            {agence.nom}
          </span>

          {/* Menu profil factice */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfilOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profilOpen}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2 transition-colors hover:border-white/20"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-gradient text-[11px] font-semibold text-ink-950">
                {agence.utilisateur.initiales}
              </span>
              <CaretDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {profilOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfilOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-ink-900/95 shadow-2xl backdrop-blur-xl">
                  <div className="border-b border-white/[0.06] px-4 py-3">
                    <p className="truncate text-sm font-medium text-white">
                      {agence.utilisateur.nom}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {agence.utilisateur.role}
                    </p>
                  </div>
                  <div className="p-1.5">
                    <MenuItem icon={UserCircle} label="Profil" />
                    <Link
                      href="/dashboard/reglages"
                      onClick={() => setProfilOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Gear className="h-4 w-4 text-slate-400" />
                      Réglages
                    </Link>
                    <MenuItem icon={SignOut} label="Déconnexion" />
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Contenu */}
        <main className="mx-auto max-w-shell px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
}: {
  icon: typeof Gear;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
    >
      <Icon className="h-4 w-4 text-slate-400" />
      {label}
    </button>
  );
}
