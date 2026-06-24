import Image from "next/image";
import { Phone, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/config";
import Reveal from "./Reveal";
import PhoneCTA from "./PhoneCTA";
import CallbackForm from "./CallbackForm";

export default function FinalCta() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 px-6 py-14 sm:px-10 sm:py-16">
            {/* Image d'ambiance réelle, fortement assombrie pour servir de fond. */}
            <Image
              src="https://picsum.photos/seed/veyz-skyline-night/1600/900"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/92 to-ink-950" />
            <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              {/* Colonne gauche : message + téléphone + réassurance essai */}
              <div>
                <h2 className="max-w-[20ch] text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Appelez-nous, ou laissez vos coordonnées et on vous rappelle.
                </h2>
                <p className="mt-5 max-w-[46ch] text-lg text-zinc-300">
                  Répondez à vos leads avant vos concurrents. On vous montre
                  comment Veyz s&apos;adapte à votre agence, en quelques minutes.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <PhoneCTA size="lg" />
                  <span className="inline-flex items-center gap-2 text-sm text-zinc-400">
                    <Phone weight="fill" className="h-4 w-4 text-accent-soft" />
                    Appel direct, réponse rapide.
                  </span>
                </div>

                <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-[15px] text-accent-soft">
                  <SealCheck
                    weight="fill"
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden
                  />
                  <span>{siteConfig.trial.long}</span>
                </p>
              </div>

              {/* Colonne droite : formulaire "Être rappelé" */}
              <CallbackForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
