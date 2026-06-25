// Configuration centrale du site Veyz.
// Placeholder à remplacer avant mise en ligne :
//   - formspreeEndpoint : l'endpoint Formspree qui reçoit le formulaire de contact
//
// Le seul moyen de contact est le formulaire "Être rappelé" (section #contact).
// Pour ajouter plus tard un email ou un lien de prise de RDV, complétez
// le bloc `contact` ci-dessous : les composants liront ces valeurs.

export const siteConfig = {
  name: "Veyz",
  baseline: "L'assistant email IA des agences immobilières.",
  url: "https://veyz.fr",
  description:
    "Veyz prépare vos réponses aux demandes d'estimation, de visite et d'achat. Vous validez, vous envoyez. Ne perdez plus un mandat. Essai 2 semaines gratuit.",

  // Cible de tous les CTA : la section formulaire "Être rappelé".
  ctaHref: "#contact",
  ctaLabel: "Être rappelé",

  // Offre d'essai (inversion du risque)
  trial: {
    short: "2 semaines d'essai gratuit, sans engagement.",
    long: "Testez Veyz 2 semaines gratuitement, sans engagement. On s'occupe de l'installation.",
  },

  // PLACEHOLDER - Endpoint Formspree du formulaire "Être rappelé"
  // (créer un form gratuit sur formspree.io, coller l'URL ici, ex. https://formspree.io/f/xxxx)
  formspreeEndpoint: "https://formspree.io/f/mdaraykk",

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
