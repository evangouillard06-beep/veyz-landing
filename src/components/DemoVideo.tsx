"use client";

import { useState } from "react";
import { PlayCircle } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/config";
import Reveal from "./Reveal";

// Démo vidéo. Le placeholder [URL_VIDEO_DEMO] dans config.ts doit être
// remplacé par l'URL d'intégration (YouTube/Vimeo non répertorié).
// Tant qu'il n'est pas renseigné, on affiche une vignette cliquable
// plutôt qu'une iframe vide.
export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);
  const url = siteConfig.demoVideoUrl;
  const ready = url && !url.startsWith("[");

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Voyez Veyz en action.
          </h2>
          <p className="mt-5 max-w-[54ch] text-lg text-zinc-400">
            Deux minutes pour comprendre comment un email entrant devient une
            réponse prête à envoyer.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/50">
            <div className="relative aspect-video w-full">
              {ready && playing ? (
                <iframe
                  src={`${url}${url.includes("?") ? "&" : "?"}autoplay=1`}
                  title="Démonstration de Veyz"
                  allow="accelerated-experience; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => ready && setPlaying(true)}
                  className="group absolute inset-0 grid place-items-center bg-grid"
                  aria-label="Lire la vidéo de démonstration"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                  <div className="relative flex flex-col items-center gap-4">
                    <span className="grid h-20 w-20 place-items-center rounded-full border border-accent/30 bg-ink-950/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                      <PlayCircle weight="fill" className="h-10 w-10 text-accent-soft" />
                    </span>
                    <span className="text-sm text-zinc-400">
                      {ready ? "Lire la démo" : "Démo bientôt disponible"}
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
