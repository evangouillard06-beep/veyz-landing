// Configuration centrale du site Veyz.
// Les deux placeholders à remplacer avant mise en ligne :
//   - phone.display / phone.href : le numéro de téléphone (seul CTA actuel)
//   - demoVideoUrl : l'URL d'intégration de la vidéo de démonstration
//
// Pour ajouter plus tard un email ou un lien de prise de RDV, complétez
// le bloc `contact` ci-dessous : les composants liront ces valeurs.

export const siteConfig = {
  name: "Veyz",
  baseline: "L'assistant email IA des agences immobilières.",
  url: "https://veyz.fr",
  description:
    "Veyz lit, trie et prépare des réponses personnalisées à vos leads immobiliers. Vous validez, vous envoyez. Répondez avant vos concurrents et ne perdez plus jamais un mandat.",

  // PLACEHOLDER 1 - Numéro de téléphone (seul CTA pour l'instant)
  phone: {
    display: "[NUMERO_DE_TELEPHONE]",
    href: "tel:[NUMERO_DE_TELEPHONE]",
  },

  // PLACEHOLDER 2 - URL d'intégration de la vidéo (YouTube/Vimeo non répertorié)
  demoVideoUrl: "[URL_VIDEO_DEMO]",

  // Canaux de contact additionnels (optionnels, vides pour l'instant).
  contact: {
    email: "",
    bookingUrl: "",
  },

  nav: [
    { label: "Le problème", href: "#probleme" },
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Comment ça marche", href: "#etapes" },
    { label: "Démo", href: "#demo" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
