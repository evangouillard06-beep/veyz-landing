"use client";

import {
  SquaresFour,
  Users,
  NotePencil,
  House,
  Gear,
  type Icon,
} from "@phosphor-icons/react";

export type NavItem = {
  label: string;
  href: string;
  icon: Icon;
};

// Navigation du dashboard. Source unique partagée par la sidebar et la barre
// du haut (pour déduire le titre de la page courante).
export const NAV: NavItem[] = [
  { label: "Vue d'ensemble", href: "/dashboard", icon: SquaresFour },
  { label: "Contacts", href: "/dashboard/contacts", icon: Users },
  { label: "Brouillons", href: "/dashboard/brouillons", icon: NotePencil },
  { label: "Biens", href: "/dashboard/biens", icon: House },
  { label: "Réglages", href: "/dashboard/reglages", icon: Gear },
];

// Retourne le titre de la page correspondant au chemin courant.
export function titreDepuisChemin(pathname: string): string {
  // Correspondance exacte d'abord, puis préfixe le plus long.
  const exact = NAV.find((n) => n.href === pathname);
  if (exact) return exact.label;
  const match = [...NAV]
    .filter((n) => pathname.startsWith(n.href) && n.href !== "/dashboard")
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.label ?? "Vue d'ensemble";
}
