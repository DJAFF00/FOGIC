// ⚠️ À MODIFIER : colle ici le lien de la boutique Chariow.
// Tous les boutons "Obtenir le guide" du site pointent vers cette valeur.
export const CHARIOW_URL = "https://REMPLACER-PAR-LE-LIEN-CHARIOW";

export const SITE = {
  title: "Investir dans l’immobilier au Bénin — Le guide complet",
  author: "Francis BABAKPIKPA",
  brand: "FOGIC",
  brandFull: "Fortune et Grandeur Immobilier et Construction",
  price: "9 500 FCFA",
  format: "Livre numérique PDF",
  phones: [
    { label: "+229 01 61 12 59 16", tel: "+2290161125916", wa: "2290161125916" },
    { label: "+229 01 43 43 43 68", tel: "+2290143434368", wa: "2290143434368" },
  ],
};

// ---- WhatsApp (offres physiques) ----
// ⚠️ À CONFIRMER : numéro WhatsApp de Francis, format international sans "+" ni espaces.
export const WHATSAPP_NUMBER = "2290161125916";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const WA_DEDICACE = waLink(
  "Bonjour, je souhaite commander le guide physique dédicacé + PDF."
);
export const WA_ACCOMPAGNEMENT = waLink(
  "Bonjour, je souhaite l’offre guide physique dédicacé + accompagnement personnalisé (100 000 FCFA)."
);

// ---- Image du produit ----
// Pour utiliser l'image de Chariow : l'enregistrer dans /public (ex. product-chariow.jpg),
// puis changer src, width et height ci-dessous (dimensions réelles de l'image).
export const PRODUCT_IMAGE = { src: "/product-book.png", width: 281, height: 436 };

// ---- OFFRE PROMOTIONNELLE ----
// ⚠️ endsAt : date/heure RÉELLE de fin de la promo (fuseau Bénin, +01:00).
// Pour une promo de 12 h : mettre l'heure de lancement + 12 h.
// Une fois cette date passée, le site affiche automatiquement les prix normaux
// (pense alors à remettre aussi les prix normaux sur Chariow).
export const PROMO = {
  endsAt: "2026-10-29T12:00:00+01:00",
  pdf: { promo: "9 500", regular: "16 000" },
  ded: { promo: "22 400", regular: "55 000" },
};

// ---- CHIFFRES AFFICHÉS ----
// buyers = total des ventes tous canaux confondus (Chariow + guides physiques).
// À mettre à jour à la main quand le total change. null = la carte est masquée.
export const STATS = {
  buyers: 200 as number | null,
  positiveReviews: null as string | null, // ex : "100%" → « 100% d’avis positifs »
};
