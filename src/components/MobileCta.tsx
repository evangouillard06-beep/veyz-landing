"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";

// CTA flottant, mobile uniquement. Apparaît une fois le hero dépassé,
// se masque quand le formulaire (#contact) est visible. Basé sur
// IntersectionObserver (pas de listener scroll), respecte reduced-motion.
export default function MobileCta() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    let heroVisible = true;
    let contactVisible = false;
    const update = () => setShow(!heroVisible && !contactVisible);

    const ioHero = hero
      ? new IntersectionObserver(
          (e) => {
            heroVisible = e[0].isIntersecting;
            update();
          },
          { threshold: 0 },
        )
      : null;
    const ioContact = contact
      ? new IntersectionObserver(
          (e) => {
            contactVisible = e[0].isIntersecting;
            update();
          },
          { threshold: 0.12 },
        )
      : null;

    if (hero) ioHero?.observe(hero);
    if (contact) ioContact?.observe(contact);
    return () => {
      ioHero?.disconnect();
      ioContact?.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mx-auto mb-[max(0.75rem,env(safe-area-inset-bottom))] w-[calc(100%-1.5rem)]"
          >
            <a
              href={siteConfig.ctaHref}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink-950 shadow-[0_10px_34px_-8px_rgba(16,185,129,0.7)] transition-transform active:scale-[0.98]"
            >
              {siteConfig.ctaLabel}
              <ArrowRight weight="bold" className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
