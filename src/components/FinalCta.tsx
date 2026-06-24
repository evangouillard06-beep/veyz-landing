import Image from "next/image";
import Reveal from "./Reveal";
import PhoneCTA from "./PhoneCTA";

export default function FinalCta() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 px-6 py-16 text-center sm:px-10 sm:py-20">
            {/* Image d'ambiance réelle, fortement assombrie pour servir de fond. */}
            <Image
              src="https://picsum.photos/seed/veyz-skyline-night/1600/900"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/90 to-ink-950" />
            <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

            <div className="relative">
              <h2 className="mx-auto max-w-[20ch] text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Répondez avant vos concurrents, dès aujourd&apos;hui.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] text-lg text-zinc-300">
                Parlons de votre flux de leads en quelques minutes. Appelez-nous,
                on vous montre comment Veyz s&apos;adapte à votre agence.
              </p>
              <div className="mt-9 flex justify-center">
                <PhoneCTA size="lg" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
