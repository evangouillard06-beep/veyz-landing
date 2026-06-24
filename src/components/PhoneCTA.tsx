"use client";

import { Phone } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";

type PhoneCTAProps = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// CTA unique du site : le numéro de téléphone (lien tel:).
// Même libellé partout pour une intention de conversion unique.
export default function PhoneCTA({
  variant = "primary",
  size = "md",
  className = "",
}: PhoneCTAProps) {
  const reduce = useReducedMotion();

  const sizes = {
    sm: "text-sm px-4 py-2 gap-2",
    md: "text-[15px] px-5 py-3 gap-2.5",
    lg: "text-base md:text-lg px-7 py-4 gap-3",
  };

  const variants = {
    primary:
      "bg-accent text-ink-950 font-semibold shadow-[0_8px_30px_-8px_rgba(16,185,129,0.6)] hover:bg-accent-soft",
    ghost:
      "glass text-white font-medium hover:bg-white/[0.06] border-white/10",
  };

  return (
    <motion.a
      href={siteConfig.phone.href}
      aria-label={`Appeler Veyz au ${siteConfig.phone.display}`}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <Phone
        weight="fill"
        className={size === "lg" ? "h-5 w-5" : "h-4 w-4"}
        aria-hidden
      />
      <span className="font-mono tracking-tight">{siteConfig.phone.display}</span>
    </motion.a>
  );
}
