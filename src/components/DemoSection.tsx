"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Lazy-mount : le dashboard (lourd, interactif) n'est monté que lorsque la
// section approche du viewport. Chunk séparé via next/dynamic (ssr: false),
// montage déclenché par IntersectionObserver. Hauteur réservée -> pas de CLS.
const DemoDashboard = dynamic(() => import("./DemoDashboard"), { ssr: false });

export default function DemoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Voyez Veyz en action.
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg text-zinc-400">
            Le tableau de bord, en vrai. Naviguez entre les onglets, filtrez,
            cherchez, ouvrez un lead. Les leads arrivent en direct pendant que
            vous explorez.
          </p>
        </Reveal>

        <div ref={ref} className="mt-12">
          {mounted ? (
            <DemoDashboard />
          ) : (
            <div
              aria-hidden
              className="glass min-h-[560px] animate-pulse rounded-2xl"
            />
          )}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Données de démonstration, fournies à titre illustratif.
        </p>
      </div>
    </section>
  );
}
