// Données 100% fictives pour la démo interactive du dashboard Veyz.
// Aucune donnée réelle, aucun appel réseau : tout est en mémoire.

export type CategorieKey =
  | "vendeur_estimation"
  | "acheteur"
  | "visite"
  | "locataire";

export type ScoreKey = "froid" | "tiede" | "chaud" | "tres_chaud";

export type StatutKey =
  | "nouveau"
  | "a_valider"
  | "envoye"
  | "repondu"
  | "relance";

export type Lead = {
  id: string;
  ts: number; // horodatage (ms)
  expediteur: string;
  email: string;
  telephone: string;
  sujet: string;
  source: string;
  categorie: CategorieKey;
  score: ScoreKey;
  statut: StatutKey;
  bien: string;
  resume: string;
  reponse: string;
};

export type Bien = {
  ref: string;
  type: "Appartement" | "Maison" | "Studio" | "Terrain";
  ville: string;
  prix: number;
  surface: number;
  statut: "Disponible" | "Sous compromis" | "Vendu" | "Loué";
};

export const CATEGORIES: Record<CategorieKey, string> = {
  vendeur_estimation: "Vendeur · estimation",
  acheteur: "Acheteur",
  visite: "Visite",
  locataire: "Locataire",
};

export const SCORES: Record<ScoreKey, { label: string; tone: "hot" | "warm" | "cold" }> = {
  tres_chaud: { label: "Très chaud", tone: "hot" },
  chaud: { label: "Chaud", tone: "hot" },
  tiede: { label: "Tiède", tone: "warm" },
  froid: { label: "Froid", tone: "cold" },
};

export const STATUTS: Record<StatutKey, { label: string; tone: "accent" | "amber" | "neutral" }> = {
  nouveau: { label: "Nouveau", tone: "neutral" },
  a_valider: { label: "À valider", tone: "amber" },
  envoye: { label: "Envoyé", tone: "neutral" },
  repondu: { label: "Répondu", tone: "accent" },
  relance: { label: "Relance", tone: "amber" },
};

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

// Base de référence (epoch fixe au chargement du module, côté client).
const NOW = Date.now();

export const LEADS: Lead[] = [
  {
    id: "L-2048",
    ts: NOW - 18 * MIN,
    expediteur: "Camille Berthier",
    email: "camille.berthier@gmail.com",
    telephone: "06 24 18 75 02",
    sujet: "Estimation maison 4 pièces, Aix",
    source: "SeLoger",
    categorie: "vendeur_estimation",
    score: "tres_chaud",
    statut: "a_valider",
    bien: "Maison · Aix-en-Provence",
    resume: "Souhaite vendre rapidement, déménagement prévu. Demande une estimation et une visite cette semaine.",
    reponse: "Bonjour Camille, merci pour votre message. Je peux passer estimer votre maison dès jeudi 14h. Cela vous convient-il ?",
  },
  {
    id: "L-2047",
    ts: NOW - 52 * MIN,
    expediteur: "Yanis Lefebvre",
    email: "yanis.lefebvre@outlook.fr",
    telephone: "07 81 33 90 14",
    sujet: "Visite T3 rue des Lices ?",
    source: "Leboncoin",
    categorie: "visite",
    score: "chaud",
    statut: "envoye",
    bien: "T3 · rue des Lices",
    resume: "Intéressé par le T3, disponible en semaine après 18h pour une visite.",
    reponse: "Bonjour Yanis, je vous propose une visite mardi à 18h30. Me confirmez-vous votre venue ?",
  },
  {
    id: "L-2046",
    ts: NOW - 2 * HOUR,
    expediteur: "Hélène Vasseur",
    email: "h.vasseur@gmail.com",
    telephone: "06 70 45 21 88",
    sujet: "Mandat de gestion locative",
    source: "Contact direct",
    categorie: "vendeur_estimation",
    score: "chaud",
    statut: "a_valider",
    bien: "Appartement · Marseille 8e",
    resume: "Propriétaire d'un T2 loué, cherche une agence pour la gestion locative complète.",
    reponse: "Bonjour Hélène, nous gérons ce type de bien avec plaisir. Puis-je vous appeler demain matin pour en discuter ?",
  },
  {
    id: "L-2045",
    ts: NOW - 5 * HOUR,
    expediteur: "Karim Benali",
    email: "karim.benali@gmail.com",
    telephone: "06 12 88 47 30",
    sujet: "Budget 320k, 3 chambres",
    source: "SeLoger",
    categorie: "acheteur",
    score: "tiede",
    statut: "repondu",
    bien: "Recherche · 3 chambres",
    resume: "Cherche une maison 3 chambres, budget 320k, secteur sud. Primo-accédant.",
    reponse: "Bonjour Karim, j'ai deux biens correspondant à votre recherche. Souhaitez-vous les recevoir par email ?",
  },
  {
    id: "L-2044",
    ts: NOW - 8 * HOUR,
    expediteur: "Sophie Marchand",
    email: "sophie.m@laposte.net",
    telephone: "07 62 19 04 55",
    sujet: "Dossier location T2",
    source: "Leboncoin",
    categorie: "locataire",
    score: "tiede",
    statut: "envoye",
    bien: "T2 · Aubagne",
    resume: "Recherche un T2 en location, dossier complet disponible, emménagement souhaité sous un mois.",
    reponse: "Bonjour Sophie, merci pour votre intérêt. Pouvez-vous m'envoyer votre dossier complet par retour de mail ?",
  },
  {
    id: "L-2043",
    ts: NOW - 11 * HOUR,
    expediteur: "Thomas Réaux",
    email: "thomas.reaux@gmail.com",
    telephone: "06 41 27 63 19",
    sujet: "Vendre appartement centre-ville",
    source: "Contact direct",
    categorie: "vendeur_estimation",
    score: "tres_chaud",
    statut: "a_valider",
    bien: "Appartement · centre-ville",
    resume: "Souhaite mettre en vente son T3 en centre-ville, déjà décidé, veut un rendez-vous rapidement.",
    reponse: "Bonjour Thomas, excellente nouvelle. Je peux vous rencontrer dès demain pour lancer la mise en vente. Quel créneau vous arrange ?",
  },
  {
    id: "L-2042",
    ts: NOW - 1 * DAY - 1 * HOUR,
    expediteur: "Léa Fontaine",
    email: "lea.fontaine@gmail.com",
    telephone: "07 55 30 12 47",
    sujet: "Visite ce week-end ?",
    source: "SeLoger",
    categorie: "visite",
    score: "chaud",
    statut: "repondu",
    bien: "Maison · Cassis",
    resume: "Disponible ce samedi pour visiter la maison à Cassis, vient en couple.",
    reponse: "Bonjour Léa, je vous propose samedi 11h pour la visite. Au plaisir de vous accueillir.",
  },
  {
    id: "L-2041",
    ts: NOW - 1 * DAY - 4 * HOUR,
    expediteur: "Nicolas Girard",
    email: "n.girard@orange.fr",
    telephone: "06 09 74 52 38",
    sujet: "Estimation terrain constructible",
    source: "Leboncoin",
    categorie: "acheteur",
    score: "tiede",
    statut: "relance",
    bien: "Terrain · La Ciotat",
    resume: "Cherche un terrain constructible, budget flexible, demande des disponibilités.",
    reponse: "Bonjour Nicolas, je reviens vers vous : un terrain à La Ciotat correspond à votre projet. On en parle cette semaine ?",
  },
  {
    id: "L-2040",
    ts: NOW - 1 * DAY - 9 * HOUR,
    expediteur: "Amélie Roussel",
    email: "amelie.roussel@gmail.com",
    telephone: "07 88 16 49 23",
    sujet: "Estimation appartement T4",
    source: "SeLoger",
    categorie: "vendeur_estimation",
    score: "chaud",
    statut: "repondu",
    bien: "T4 · Marseille 6e",
    resume: "Souhaite estimer son T4 avant une éventuelle mise en vente au printemps.",
    reponse: "Bonjour Amélie, je peux réaliser une estimation gratuite à votre convenance. Quelle disponibilité avez-vous ?",
  },
  {
    id: "L-2039",
    ts: NOW - 2 * DAY - 2 * HOUR,
    expediteur: "Julien Mercier",
    email: "julien.mercier@gmail.com",
    telephone: "06 33 90 71 65",
    sujet: "Recherche maison avec jardin",
    source: "Contact direct",
    categorie: "acheteur",
    score: "tiede",
    statut: "envoye",
    bien: "Recherche · maison + jardin",
    resume: "Famille de 4, cherche une maison avec jardin, budget 450k, secteur est.",
    reponse: "Bonjour Julien, je note votre recherche. J'ai un bien qui pourrait vous plaire, je vous l'envoie.",
  },
  {
    id: "L-2038",
    ts: NOW - 2 * DAY - 7 * HOUR,
    expediteur: "Manon Lambert",
    email: "manon.lambert@hotmail.fr",
    telephone: "07 41 25 88 90",
    sujet: "Location studio meublé étudiant",
    source: "Leboncoin",
    categorie: "locataire",
    score: "froid",
    statut: "nouveau",
    bien: "Studio · centre",
    resume: "Étudiante, cherche un studio meublé pour septembre, demande les disponibilités.",
    reponse: "Bonjour Manon, merci pour votre message. Je vous tiens informée des studios disponibles pour la rentrée.",
  },
  {
    id: "L-2037",
    ts: NOW - 2 * DAY - 12 * HOUR,
    expediteur: "Pierre Cohen",
    email: "pierre.cohen@gmail.com",
    telephone: "06 78 44 12 09",
    sujet: "Vendre maison familiale",
    source: "SeLoger",
    categorie: "vendeur_estimation",
    score: "tres_chaud",
    statut: "repondu",
    bien: "Maison · Allauch",
    resume: "Succession, souhaite vendre la maison familiale rapidement, mandat à confier.",
    reponse: "Bonjour Pierre, toutes mes condoléances. Je peux vous accompagner pour cette vente. Prenons rendez-vous quand vous le souhaitez.",
  },
  {
    id: "L-2036",
    ts: NOW - 3 * DAY - 3 * HOUR,
    expediteur: "Inès Da Silva",
    email: "ines.dasilva@gmail.com",
    telephone: "07 60 35 81 42",
    sujet: "Visite appartement vue mer",
    source: "Leboncoin",
    categorie: "visite",
    score: "chaud",
    statut: "relance",
    bien: "T3 · Marseille 7e",
    resume: "Très intéressée par l'appartement vue mer, demande un créneau de visite ce week-end.",
    reponse: "Bonjour Inès, je relance suite à votre demande : visite possible dimanche 10h, cela vous convient-il ?",
  },
  {
    id: "L-2035",
    ts: NOW - 3 * DAY - 10 * HOUR,
    expediteur: "Maxime Olivier",
    email: "maxime.olivier@gmail.com",
    telephone: "06 50 29 73 14",
    sujet: "Budget 250k appartement",
    source: "SeLoger",
    categorie: "acheteur",
    score: "froid",
    statut: "nouveau",
    bien: "Recherche · T2/T3",
    resume: "Investisseur, cherche un T2 ou T3 à mettre en location, budget 250k.",
    reponse: "Bonjour Maxime, je note votre projet d'investissement. Je reviens vers vous avec des biens à fort rendement.",
  },
  {
    id: "L-2034",
    ts: NOW - 4 * DAY - 5 * HOUR,
    expediteur: "Clara Petit",
    email: "clara.petit@gmail.com",
    telephone: "07 72 61 40 28",
    sujet: "Estimation avant divorce",
    source: "Contact direct",
    categorie: "vendeur_estimation",
    score: "chaud",
    statut: "repondu",
    bien: "Appartement · Marseille 5e",
    resume: "Besoin d'une estimation dans le cadre d'un divorce, souhaite de la discrétion.",
    reponse: "Bonjour Clara, je m'occupe de votre estimation en toute confidentialité. Quel moment vous conviendrait ?",
  },
  {
    id: "L-2033",
    ts: NOW - 5 * DAY - 6 * HOUR,
    expediteur: "Hugo Renard",
    email: "hugo.renard@gmail.com",
    telephone: "06 14 83 50 77",
    sujet: "Location T3 famille",
    source: "Leboncoin",
    categorie: "locataire",
    score: "tiede",
    statut: "envoye",
    bien: "T3 · Aubagne",
    resume: "Famille avec deux enfants, cherche un T3 en location proche des écoles.",
    reponse: "Bonjour Hugo, j'ai un T3 proche des écoles disponible. Souhaitez-vous le visiter cette semaine ?",
  },
  {
    id: "L-2032",
    ts: NOW - 6 * DAY - 8 * HOUR,
    expediteur: "Sarah Nguyen",
    email: "sarah.nguyen@gmail.com",
    telephone: "07 39 22 64 51",
    sujet: "Vendre studio investissement",
    source: "SeLoger",
    categorie: "vendeur_estimation",
    score: "tiede",
    statut: "repondu",
    bien: "Studio · Marseille 1er",
    resume: "Souhaite revendre un studio locatif, demande une estimation de marché.",
    reponse: "Bonjour Sarah, je vous prépare une estimation de marché pour votre studio. Je vous l'envoie sous 48h.",
  },
  {
    id: "L-2031",
    ts: NOW - 7 * DAY - 4 * HOUR,
    expediteur: "Antoine Faure",
    email: "antoine.faure@gmail.com",
    telephone: "06 91 07 38 26",
    sujet: "Visite maison avec piscine",
    source: "Contact direct",
    categorie: "visite",
    score: "froid",
    statut: "nouveau",
    bien: "Maison · Gémenos",
    resume: "Curieux du bien avec piscine, sans urgence, demande des photos supplémentaires.",
    reponse: "Bonjour Antoine, je vous envoie des photos complémentaires de la maison. Une visite reste possible quand vous le souhaitez.",
  },
];

// Petit pool pour la touche "vivant" (nouveaux leads qui arrivent en direct).
export const LIVE_POOL: Omit<Lead, "id" | "ts">[] = [
  {
    expediteur: "Élodie Charpentier",
    email: "elodie.charpentier@gmail.com",
    telephone: "06 27 55 81 40",
    sujet: "Estimation urgente avant achat",
    source: "SeLoger",
    categorie: "vendeur_estimation",
    score: "tres_chaud",
    statut: "a_valider",
    bien: "Maison · Roquefort",
    resume: "Doit vendre pour acheter, souhaite une estimation au plus vite.",
    reponse: "Bonjour Élodie, je peux estimer votre bien dès demain. Quel créneau vous convient ?",
  },
  {
    expediteur: "Romain Dubois",
    email: "romain.dubois@outlook.fr",
    telephone: "07 48 12 90 63",
    sujet: "Visite T2 ce soir possible ?",
    source: "Leboncoin",
    categorie: "visite",
    score: "chaud",
    statut: "nouveau",
    bien: "T2 · Marseille 9e",
    resume: "Disponible ce soir pour visiter le T2, très motivé.",
    reponse: "Bonjour Romain, une visite à 19h est possible. Me confirmez-vous ?",
  },
  {
    expediteur: "Nadia Haddad",
    email: "nadia.haddad@gmail.com",
    telephone: "06 83 41 27 95",
    sujet: "Recherche appartement 2 chambres",
    source: "Contact direct",
    categorie: "acheteur",
    score: "tiede",
    statut: "nouveau",
    bien: "Recherche · 2 chambres",
    resume: "Cherche un appartement 2 chambres avec balcon, budget 280k.",
    reponse: "Bonjour Nadia, je vous envoie une sélection correspondant à votre recherche.",
  },
  {
    expediteur: "Guillaume Perez",
    email: "guillaume.perez@gmail.com",
    telephone: "07 90 64 18 52",
    sujet: "Mandat de vente maison",
    source: "SeLoger",
    categorie: "vendeur_estimation",
    score: "tres_chaud",
    statut: "a_valider",
    bien: "Maison · Carnoux",
    resume: "Décidé à vendre, veut confier un mandat rapidement.",
    reponse: "Bonjour Guillaume, je peux passer signer le mandat cette semaine. Quel jour vous arrange ?",
  },
  {
    expediteur: "Chloé Garnier",
    email: "chloe.garnier@gmail.com",
    telephone: "06 35 78 20 41",
    sujet: "Location meublée longue durée",
    source: "Leboncoin",
    categorie: "locataire",
    score: "tiede",
    statut: "nouveau",
    bien: "T2 meublé · centre",
    resume: "Cherche une location meublée longue durée, dossier solide.",
    reponse: "Bonjour Chloé, j'ai un T2 meublé disponible. Souhaitez-vous le visiter ?",
  },
];

export const BIENS: Bien[] = [
  { ref: "VZ-1042", type: "Maison", ville: "Aix-en-Provence", prix: 615000, surface: 142, statut: "Disponible" },
  { ref: "VZ-1039", type: "Appartement", ville: "Marseille 8e", prix: 329000, surface: 68, statut: "Sous compromis" },
  { ref: "VZ-1036", type: "Appartement", ville: "Marseille 6e", prix: 412000, surface: 89, statut: "Disponible" },
  { ref: "VZ-1031", type: "Studio", ville: "Marseille 1er", prix: 138000, surface: 24, statut: "Vendu" },
  { ref: "VZ-1028", type: "Maison", ville: "Cassis", prix: 845000, surface: 165, statut: "Disponible" },
  { ref: "VZ-1024", type: "Terrain", ville: "La Ciotat", prix: 245000, surface: 520, statut: "Disponible" },
  { ref: "VZ-1019", type: "Appartement", ville: "Aubagne", prix: 198000, surface: 52, statut: "Loué" },
  { ref: "VZ-1015", type: "Maison", ville: "Allauch", prix: 530000, surface: 128, statut: "Sous compromis" },
];

export function formatDate(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
