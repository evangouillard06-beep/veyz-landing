import { siteConfig } from "@/lib/config";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-shell px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              {siteConfig.baseline} Veyz lit, trie et prépare vos réponses aux
              leads. Vous validez, vous envoyez.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-sm">
            <span className="text-xs uppercase tracking-wider text-slate-600">
              Navigation
            </span>
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <span className="text-xs uppercase tracking-wider text-slate-600">
              Contact
            </span>
            <a
              href={siteConfig.ctaHref}
              className="text-slate-300 transition-colors hover:text-accent-soft"
            >
              Être rappelé
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-slate-300">
              Mentions légales
            </a>
            <a href="#" className="transition-colors hover:text-slate-300">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
