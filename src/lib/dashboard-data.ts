// ---------------------------------------------------------------------------
// DONNÉES DE DÉMO DU DASHBOARD VEYZ (gabarit)
// ---------------------------------------------------------------------------
// Tout le contenu factice du tableau de bord vit ICI, dans un seul fichier.
// Pour brancher une vraie agence plus tard : remplacer ces constantes par des
// appels à votre source de données (Supabase, Google Sheets, API…), en gardant
// les MÊMES types exportés. Les composants n'auront pas à changer.
// ---------------------------------------------------------------------------

/* ------------------------------- Agence ------------------------------- */

export const agence = {
  nom: "Agence Démo",
  ville: "Nice",
  utilisateur: {
    nom: "Camille Martin",
    role: "Responsable d'agence",
    initiales: "CM",
  },
} as const;

/* ------------------------------- Types -------------------------------- */

export type ScoreKey = "chaud" | "tiede" | "froid";
export type ContactType = "Vendeur" | "Acheteur";
export type DemandeType = "Estimation" | "Visite" | "Renseignement";
export type SourceKey = "SeLoger" | "Leboncoin" | "Direct";
export type StatutContact =
  | "Nouveau"
  | "À valider"
  | "Envoyé"
  | "Répondu"
  | "Relancé";
export type BienStatut = "Disponible" | "Sous compromis" | "Vendu";

export type Contact = {
  id: string;
  nom: string;
  email: string;
  type: ContactType;
  demande: DemandeType;
  source: SourceKey;
  score: ScoreKey;
  statut: StatutContact;
  bien: string;
  date: string; // ISO
};

export type Brouillon = {
  id: string;
  contact: string;
  type: ContactType;
  sujet: string;
  source: SourceKey;
  score: ScoreKey;
  extrait: string;
  recuLe: string; // ISO
};

export type Bien = {
  id: string;
  ref: string;
  type: string;
  secteur: string;
  prix: number;
  surface: number;
  pieces: number;
  statut: BienStatut;
};

export type Activite = {
  id: string;
  type: "lead" | "brouillon" | "envoye" | "relance";
  texte: string;
  date: string; // ISO
};

/* ------------------------- Vue d'ensemble (KPI) ----------------------- */

export type Kpi = {
  key: string;
  label: string;
  valeur: number;
  suffixe?: string;
  variation?: string; // ex. "+12 %"
  tone?: "accent" | "hot" | "success";
};

export const kpis: Kpi[] = [
  { key: "recues", label: "Demandes reçues (7 j)", valeur: 38, variation: "+12 %", tone: "accent" },
  { key: "brouillons", label: "Brouillons préparés", valeur: 27, variation: "+8 %" },
  { key: "chauds", label: "Leads chauds", valeur: 9, variation: "+3", tone: "hot" },
  { key: "tempsGagne", label: "Temps gagné estimé", valeur: 14, suffixe: " h", tone: "success" },
  { key: "relances", label: "Relances envoyées", valeur: 16, variation: "+5" },
];

// Mails traités par jour (7 derniers jours, du plus ancien au plus récent).
export const mailsParJour: { jour: string; recus: number; traites: number }[] = [
  { jour: "Lun", recus: 6, traites: 5 },
  { jour: "Mar", recus: 9, traites: 8 },
  { jour: "Mer", recus: 5, traites: 5 },
  { jour: "Jeu", recus: 11, traites: 9 },
  { jour: "Ven", recus: 8, traites: 7 },
  { jour: "Sam", recus: 4, traites: 4 },
  { jour: "Dim", recus: 2, traites: 2 },
];

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const NOW = Date.now();
const iso = (offset: number) => new Date(NOW - offset).toISOString();

export const activiteRecente: Activite[] = [
  { id: "a1", type: "lead", texte: "Nouveau lead chaud · Sophie Berger (Estimation, SeLoger)", date: iso(12 * MIN) },
  { id: "a2", type: "brouillon", texte: "Brouillon préparé pour Marc Lefèvre", date: iso(48 * MIN) },
  { id: "a3", type: "envoye", texte: "Réponse envoyée à Nadia Girard", date: iso(3 * HOUR) },
  { id: "a4", type: "relance", texte: "Relance envoyée à Thomas Roy", date: iso(6 * HOUR) },
  { id: "a5", type: "lead", texte: "Nouveau lead · Camille Petit (Visite, Leboncoin)", date: iso(9 * HOUR) },
  { id: "a6", type: "envoye", texte: "Réponse envoyée à Manon Lambert", date: iso(1 * DAY) },
  { id: "a7", type: "brouillon", texte: "Brouillon préparé pour Hugo Moreau", date: iso(1 * DAY + 4 * HOUR) },
];

/* ----------------------------- Contacts ------------------------------- */

export const contacts: Contact[] = [
  { id: "c1", nom: "Sophie Berger", email: "s.berger@gmail.com", type: "Vendeur", demande: "Estimation", source: "SeLoger", score: "chaud", statut: "À valider", bien: "Maison · Cimiez", date: iso(12 * MIN) },
  { id: "c2", nom: "Marc Lefèvre", email: "marc.lefevre@orange.fr", type: "Vendeur", demande: "Estimation", source: "Direct", score: "chaud", statut: "Nouveau", bien: "Appartement · Carré d'Or", date: iso(48 * MIN) },
  { id: "c3", nom: "Nadia Girard", email: "n.girard@outlook.fr", type: "Acheteur", demande: "Visite", source: "Leboncoin", score: "tiede", statut: "Envoyé", bien: "T3 · Libération", date: iso(3 * HOUR) },
  { id: "c4", nom: "Thomas Roy", email: "thomas.roy@gmail.com", type: "Acheteur", demande: "Renseignement", source: "SeLoger", score: "froid", statut: "Relancé", bien: "Studio · Port", date: iso(6 * HOUR) },
  { id: "c5", nom: "Camille Petit", email: "camille.petit@gmail.com", type: "Acheteur", demande: "Visite", source: "Leboncoin", score: "chaud", statut: "Répondu", bien: "T4 · Gambetta", date: iso(9 * HOUR) },
  { id: "c6", nom: "Manon Lambert", email: "manon.lambert@hotmail.fr", type: "Vendeur", demande: "Estimation", source: "Direct", score: "tiede", statut: "Envoyé", bien: "Villa · Saint-Roch", date: iso(1 * DAY) },
  { id: "c7", nom: "Hugo Moreau", email: "h.moreau@gmail.com", type: "Acheteur", demande: "Renseignement", source: "SeLoger", score: "froid", statut: "Nouveau", bien: "T2 · Riquier", date: iso(1 * DAY + 4 * HOUR) },
  { id: "c8", nom: "Léa Fontaine", email: "lea.fontaine@gmail.com", type: "Vendeur", demande: "Estimation", source: "Leboncoin", score: "chaud", statut: "À valider", bien: "Maison · Fabron", date: iso(1 * DAY + 7 * HOUR) },
  { id: "c9", nom: "Antoine Dubois", email: "a.dubois@orange.fr", type: "Acheteur", demande: "Visite", source: "Direct", score: "tiede", statut: "Répondu", bien: "T3 · Magnan", date: iso(2 * DAY) },
  { id: "c10", nom: "Inès Caron", email: "ines.caron@gmail.com", type: "Acheteur", demande: "Renseignement", source: "SeLoger", score: "froid", statut: "Relancé", bien: "Studio · Vieux-Nice", date: iso(2 * DAY + 5 * HOUR) },
];

/* ---------------------------- Brouillons ------------------------------ */

export const brouillons: Brouillon[] = [
  {
    id: "b1",
    contact: "Sophie Berger",
    type: "Vendeur",
    sujet: "Demande d'estimation — Maison à Cimiez",
    source: "SeLoger",
    score: "chaud",
    extrait:
      "Bonjour Sophie, merci pour votre demande concernant l'estimation de votre maison à Cimiez. Je vous propose un rendez-vous dès demain après-midi pour une visite d'évaluation. Seriez-vous disponible à 14h ?",
    recuLe: iso(12 * MIN),
  },
  {
    id: "b2",
    contact: "Marc Lefèvre",
    type: "Vendeur",
    sujet: "Estimation appartement — Carré d'Or",
    source: "Direct",
    score: "chaud",
    extrait:
      "Bonjour Marc, je vous remercie de votre message. Pour estimer au plus juste votre appartement du Carré d'Or, j'aurais besoin de quelques précisions sur la surface et l'étage. Quand pourrions-nous échanger 10 minutes par téléphone ?",
    recuLe: iso(48 * MIN),
  },
  {
    id: "b3",
    contact: "Léa Fontaine",
    type: "Vendeur",
    sujet: "Estimation maison — Fabron",
    source: "Leboncoin",
    score: "chaud",
    extrait:
      "Bonjour Léa, merci de votre confiance. Je connais très bien le secteur de Fabron et je serais ravi de vous accompagner pour la vente. Je peux passer évaluer le bien cette semaine, quel créneau vous conviendrait le mieux ?",
    recuLe: iso(1 * DAY + 7 * HOUR),
  },
  {
    id: "b4",
    contact: "Camille Petit",
    type: "Acheteur",
    sujet: "Visite T4 — Gambetta",
    source: "Leboncoin",
    score: "chaud",
    extrait:
      "Bonjour Camille, le T4 du quartier Gambetta est toujours disponible à la visite. Je vous propose un créneau samedi matin. Confirmez-moi votre disponibilité et je bloque le rendez-vous.",
    recuLe: iso(9 * HOUR),
  },
];

/* ------------------------------- Biens -------------------------------- */

export const biens: Bien[] = [
  { id: "p1", ref: "VEY-1042", type: "Maison", secteur: "Cimiez", prix: 845000, surface: 142, pieces: 5, statut: "Disponible" },
  { id: "p2", ref: "VEY-1043", type: "Appartement", secteur: "Carré d'Or", prix: 520000, surface: 78, pieces: 3, statut: "Sous compromis" },
  { id: "p3", ref: "VEY-1044", type: "Studio", secteur: "Port", prix: 189000, surface: 26, pieces: 1, statut: "Disponible" },
  { id: "p4", ref: "VEY-1045", type: "Villa", secteur: "Saint-Roch", prix: 1190000, surface: 210, pieces: 7, statut: "Disponible" },
  { id: "p5", ref: "VEY-1046", type: "Appartement", secteur: "Libération", prix: 312000, surface: 64, pieces: 3, statut: "Vendu" },
  { id: "p6", ref: "VEY-1047", type: "Appartement", secteur: "Gambetta", prix: 398000, surface: 86, pieces: 4, statut: "Disponible" },
  { id: "p7", ref: "VEY-1048", type: "Studio", secteur: "Vieux-Nice", prix: 215000, surface: 30, pieces: 1, statut: "Sous compromis" },
  { id: "p8", ref: "VEY-1049", type: "Maison", secteur: "Fabron", prix: 690000, surface: 120, pieces: 5, statut: "Disponible" },
];

/* ----------------------- Libellés / référentiels ---------------------- */

export const SCORE_LABEL: Record<ScoreKey, string> = {
  chaud: "Chaud",
  tiede: "Tiède",
  froid: "Froid",
};

export const SOURCES: SourceKey[] = ["SeLoger", "Leboncoin", "Direct"];
export const TYPES_CONTACT: ContactType[] = ["Vendeur", "Acheteur"];
export const SCORES: ScoreKey[] = ["chaud", "tiede", "froid"];
export const BIEN_STATUTS: BienStatut[] = ["Disponible", "Sous compromis", "Vendu"];

/* ------------------------------ Formatage ----------------------------- */

export function formatPrix(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDateRelative(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const min = Math.round(diff / MIN);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.round(h / 24);
  return j <= 1 ? "hier" : `il y a ${j} j`;
}

export function formatDateCourt(isoDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}
