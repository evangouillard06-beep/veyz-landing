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

## Configuration

Tout est centralisé dans **`src/lib/config.ts`**.

### 1. Contact = formulaire uniquement

Le seul moyen de contact est le **formulaire « Être rappelé »** (section
`#contact`). Tous les CTA (header, hero, bandeau final, footer) défilent vers ce
formulaire via `siteConfig.ctaHref` / `siteConfig.ctaLabel`. Il n'y a plus de
numéro de téléphone ni de lien `tel:`.

### 2. Formulaire « Être rappelé » (Formspree)

Le formulaire de rappel envoie les coordonnées via [Formspree](https://formspree.io)
(aucun serveur à coder). Pour l'activer :

1. Créez un compte gratuit sur **formspree.io**.
2. Créez un nouveau formulaire (form) relié à votre adresse email de réception.
3. Copiez l'**endpoint** fourni (de la forme `https://formspree.io/f/xxxx`).
4. Collez-le à la place de `[FORMSPREE_ENDPOINT]` dans `siteConfig.formspreeEndpoint`.

Tant que l'endpoint n'est pas renseigné, le formulaire reste visible et validé
côté client, mais l'envoi affiche un message invitant à appeler. Une fois
l'endpoint collé, les demandes arrivent directement dans votre boîte mail.

Le formulaire inclut un champ honeypot anti-spam (`_gotcha`, géré nativement par
Formspree), la validation des champs, et les états chargement / succès / erreur.

### 3. Section démo : dashboard vivant

La section démo (`#demo`) n'utilise plus de vidéo. C'est un composant React
(`LiveDashboard.tsx`) qui simule le tableau de bord Veyz en fonctionnement :
KPIs animés, arrivée de leads fictifs en boucle, mini-répartition, alerte « Lead
chaud » et encart « Brouillon préparé ». Aucune configuration requise.

Détails techniques : les timers ne tournent que lorsque la section est visible
(`useInView`) et sont nettoyés à la sortie du viewport et au démontage. En
`prefers-reduced-motion`, un dashboard statique pré-rempli s'affiche sans timer.
Toutes les animations sont en `transform` / `opacity` (60 fps, pas de CLS). Les
données sont fictives et illustratives.

### Ajouter d'autres CTA plus tard (email, prise de RDV)

Le bloc `siteConfig.contact` (`email`, `bookingUrl`) est déjà prévu. Renseignez-le
puis réutilisez le composant `CtaButton` comme modèle pour brancher un nouveau bouton.

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
