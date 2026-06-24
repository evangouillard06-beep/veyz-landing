# Veyz — Landing page

Landing page premium pour **Veyz**, l'assistant email IA des agences immobilières.
Veyz lit, trie et prépare des réponses personnalisées aux leads entrants. L'agent
valide, puis envoie. Rien n'est envoyé sans validation humaine.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (thème sombre, accent émeraude)
- **Framer Motion** (entrées, reveals au scroll, micro-interactions)
- **Lenis** (smooth scroll)
- **Geist** (typographie) + **Phosphor Icons**
- SEO complet : métadonnées, Open Graph (image générée dynamiquement), favicon SVG, JSON-LD, `lang="fr"`
- Accessibilité : `prefers-reduced-motion` respecté partout, contrastes WCAG AA

## Lancer en local

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000

Autres commandes :

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Les 2 valeurs à renseigner

Tout est centralisé dans **`src/lib/config.ts`**.

### 1. Numéro de téléphone (seul CTA actuel)

Remplacez le placeholder `[NUMERO_DE_TELEPHONE]` dans `siteConfig.phone` :

```ts
phone: {
  display: "04 XX XX XX XX",        // ce qui s'affiche
  href: "tel:+334XXXXXXXX",         // le lien d'appel (format international conseillé)
},
```

Le numéro apparaît dans le header, le hero, le bandeau CTA final et le footer.

### 2. Vidéo de démonstration

Hébergez la vidéo sur **YouTube ou Vimeo en non répertorié**, récupérez l'URL
d'**intégration** (embed), puis remplacez `[URL_VIDEO_DEMO]` :

```ts
demoVideoUrl: "https://www.youtube.com/embed/XXXXXXXXXXX",
```

Tant que le placeholder n'est pas remplacé, la section démo affiche une vignette
« Démo bientôt disponible » au lieu d'une iframe vide. Ne déposez pas de gros
fichier vidéo dans `/public`.

### Ajouter d'autres CTA plus tard (email, prise de RDV)

Le bloc `siteConfig.contact` (`email`, `bookingUrl`) est déjà prévu. Renseignez-le
puis réutilisez le composant `PhoneCTA` comme modèle pour brancher un nouveau bouton.

## Déployer sur Vercel

1. Poussez le dépôt sur GitHub (voir ci-dessous).
2. Sur [vercel.com](https://vercel.com) : **Add New → Project → Import** le dépôt
   `veyz-landing`.
3. Vercel détecte Next.js automatiquement. Laissez les réglages par défaut et
   cliquez sur **Deploy**.
4. Une fois déployé : **Settings → Domains → Add** `veyz.fr`, puis suivez les
   instructions DNS (enregistrement A / CNAME) chez votre registrar.

Aucune variable d'environnement n'est requise pour cette landing page.

## Structure

```
src/
├── app/
│   ├── layout.tsx           # métadonnées SEO, fonts, JSON-LD
│   ├── page.tsx             # assemblage des sections
│   ├── globals.css          # styles de base + reduced-motion
│   ├── icon.svg             # favicon (monogramme V)
│   └── opengraph-image.tsx  # image OG générée dynamiquement
├── components/              # Header, Hero, Problem, Features, etc.
└── lib/
    └── config.ts            # ← les 2 placeholders à renseigner
```
