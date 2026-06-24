"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";

type CtaButtonProps = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};

// CTA unique du site : fait défiler vers le formulaire de contact (#contact).
// Aucun numéro de téléphone. Même intention partout (header, hero, CTA final).
export default function CtaButton({
  variant = "primary",
  size = "md",
  label = siteConfig.ctaLabel,
  className = "",
}: CtaButtonProps) {
  const reduce = useReducedMotion();

  const sizes = {
    sm: "text-sm px-4 py-2 gap-1.5",
    md: "text-[15px] px-5 py-3 gap-2",
    lg: "text-base md:text-lg px-7 py-4 gap-2.5",
  };

  const variants = {
    primary:
      "bg-accent text-ink-950 font-semibold shadow-[0_8px_30px_-8px_rgba(16,185,129,0.6)] hover:bg-accent-soft",
    ghost: "glass text-white font-medium hover:bg-white/[0.06] border-white/10",
  };

  return (
    <motion.a
      href={siteConfig.ctaHref}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <span>{label}</span>
      <ArrowRight
        weight="bold"
        className={`${size === "lg" ? "h-5 w-5" : "h-4 w-4"} transition-transform group-hover:translate-x-0.5`}
        aria-hidden
      />
    </motion.a>
  );
}
