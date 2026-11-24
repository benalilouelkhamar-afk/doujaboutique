/* =========================================================
   DOUJABOUTIQUE — DONNÉES DU SITE
   Modifiez ici le numéro WhatsApp, les catégories et les produits.
   ========================================================= */

// Numéro WhatsApp de la boutique (format international, sans + ni espaces)
const WHATSAPP_NUMBER = "212XXXXXXXXX";

// Livraison
const FRAIS_LIVRAISON = 30;               // DH, partout au Maroc
const VILLE_LIVRAISON_GRATUITE = "Fès";   // livraison offerte dans cette ville

// Message par défaut du bouton WhatsApp « infos »
const MESSAGE_INFO = "Salam, je veux des informations sur vos nouveautés";

// Villes du formulaire de commande
const VILLES = ["Casablanca", "Rabat", "Fès", "Marrakech", "Tanger", "Meknès", "Agadir", "Oujda", "Kénitra", "Tétouan", "Salé", "El Jadida", "Nador", "Béni Mellal", "Safi", "Autre"];

const TOUTES_TAILLES = ["S", "M", "L", "XL", "XXL"];

// Raccourci vers le dossier des photos produits
const IMG = nom => `images/produits/${nom}.webp`;

/* ---------- Catégories ---------- */
const CATEGORIES = [
  { id: "robes",     nom: "Robes",              image: IMG("robe-franges-beige") },
  { id: "blouses",   nom: "Blouses & Tops",     image: IMG("blouse-rayee-bleue-1") },
  { id: "mailles",   nom: "Mailles & Pulls",    image: IMG("pull-torsade-creme") },
  { id: "gilets",    nom: "Gilets",             image: IMG("gilet-boutons-dores") },
  { id: "manteaux",  nom: "Manteaux & Vestes",  image: IMG("fourrure-creme-1") },
  { id: "ensembles", nom: "Ensembles",          image: IMG("ensemble-bordeaux") }
];

/* ---------- Couleurs réutilisables ---------- */
const C = {
  creme: { nom: "Crème", hex: "#F3EAD9" }, beige: { nom: "Beige", hex: "#D9C3A5" }, noir: { nom: "Noir", hex: "#1E1E1E" },
  blanc: { nom: "Blanc", hex: "#FAFAFA" }, bordeaux: { nom: "Bordeaux", hex: "#6E1F2F" }, marron: { nom: "Marron", hex: "#5A3A2A" },
  marine: { nom: "Bleu marine", hex: "#1F2A4A" }, kaki: { nom: "Kaki", hex: "#6B6A45" }, gris: { nom: "Gris", hex: "#9A9591" },
  rose: { nom: "Rose poudré", hex: "#E8C4C4" }, bleu: { nom: "Bleu ciel", hex: "#AFC6E2" }, jean: { nom: "Jean clair", hex: "#8FA9C8" },
  camel: { nom: "Camel", hex: "#C19A6B" }
};

/* ---------- Produits ----------
   badge : "Nouveau", "-20%", "Stock limité" ou null
   nouveau : plus le chiffre est grand, plus le produit est récent
   bestseller : true pour l'afficher dans le carrousel Best-sellers */
const PRODUITS = [
  { id: 1, nom: "Robe longue en maille brodée fleur", categorie: "robes", prix: 320, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme, C.beige],
    images: [IMG("robe-fleur-creme-1"), IMG("robe-fleur-creme-2")], badge: "Nouveau", nouveau: 20, bestseller: true,
    description: "Robe longue droite en maille douce, ornée d'une grande fleur brodée en fil noir. Confortable et élégante, à porter avec des escarpins ou des baskets.",
    matiere: "Maille viscose et polyester", entretien: "Lavage 30 °C programme délicat, séchage à plat." },

  { id: 2, nom: "Robe en maille à franges beige", categorie: "robes", prix: 349, ancienPrix: null,
    tailles: ["S", "M", "L"], couleurs: [C.beige, C.creme],
    images: [IMG("robe-franges-beige")], badge: "Stock limité", nouveau: 19, bestseller: true,
    description: "Robe midi en maille côtelée, boutonnée sur le devant, avec un empiècement à franges sur la poitrine. Une pièce bohème et chic pour l'hiver.",
    matiere: "Maille acrylique et laine", entretien: "Lavage à la main à froid, séchage à plat." },

  { id: 3, nom: "Gilet maille boutons dorés", categorie: "gilets", prix: 249, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme, C.noir],
    images: [IMG("gilet-boutons-dores")], badge: "Nouveau", nouveau: 18, bestseller: true,
    description: "Gilet ajusté en maille douce avec une rangée de boutons dorés et une basquette légère. Se porte fermé comme un top ou ouvert sur un body.",
    matiere: "Maille viscose", entretien: "Lavage 30 °C, séchage à plat." },

  { id: 4, nom: "Veste fausse fourrure crème", categorie: "manteaux", prix: 490, ancienPrix: null,
    tailles: ["S", "M", "L"], couleurs: [C.creme, C.camel],
    images: [IMG("fourrure-creme-1"), IMG("fourrure-creme-2")], badge: "Stock limité", nouveau: 17, bestseller: true,
    description: "Veste courte en fausse fourrure ultra douce, fermée par des bijoux dorés. Sublime sur une robe en maille ou une jupe longue.",
    matiere: "Fausse fourrure polyester, doublure satin", entretien: "Nettoyage à sec recommandé." },

  { id: 5, nom: "Ensemble veste & jupe bordeaux", categorie: "ensembles", prix: 420, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.bordeaux, C.marron, C.marine],
    images: [IMG("ensemble-bordeaux")], badge: "Nouveau", nouveau: 16, bestseller: true,
    description: "Ensemble chic veste double boutonnage à boutons dorés et jupe courte assortie. L'allure d'un tailleur, le confort de la maille.",
    matiere: "Maille épaisse polyester et viscose", entretien: "Lavage 30 °C, repassage doux." },

  { id: 6, nom: "Ensemble veste & jupe marron", categorie: "ensembles", prix: 420, ancienPrix: 520,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.marron, C.bordeaux],
    images: [IMG("ensemble-marron")], badge: "-20%", nouveau: 15, bestseller: false,
    description: "La version chocolat de notre ensemble best-seller : veste croisée à boutons dorés et jupe droite. Parfait pour le bureau ou une sortie.",
    matiere: "Maille épaisse polyester et viscose", entretien: "Lavage 30 °C, repassage doux." },

  { id: 7, nom: "Ensemble tailleur bleu marine", categorie: "ensembles", prix: 450, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.marine, C.noir],
    images: [IMG("ensemble-marine")], badge: null, nouveau: 14, bestseller: false,
    description: "Veste courte à boutons dorés et jupe portefeuille bleu marine. Un ensemble intemporel et très élégant.",
    matiere: "Polyester et viscose", entretien: "Nettoyage à sec ou lavage 30 °C." },

  { id: 8, nom: "Veste en jean brodée de perles", categorie: "manteaux", prix: 450, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.jean],
    images: [IMG("veste-jean-perles-1"), IMG("veste-jean-perles-2")], badge: "Stock limité", nouveau: 13, bestseller: true,
    description: "Veste en jean oversize entièrement brodée de perles et de motifs colorés, finitions rose. Une pièce unique qui transforme un look simple.",
    matiere: "Denim coton, broderies perlées", entretien: "Lavage à la main à l'envers, ne pas essorer." },

  { id: 9, nom: "Veste en jean fleurs brodées", categorie: "manteaux", prix: 390, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.jean],
    images: [IMG("veste-jean-fleurs-1"), IMG("veste-jean-fleurs-2")], badge: "Nouveau", nouveau: 12, bestseller: false,
    description: "Veste en jean classique ornée de grandes fleurs brodées et de strass sur les épaules. Tendance et facile à porter.",
    matiere: "Denim coton", entretien: "Lavage 30 °C à l'envers." },

  { id: 10, nom: "Trench long ceinturé beige", categorie: "manteaux", prix: 450, ancienPrix: 560,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.beige, C.noir],
    images: [IMG("trench-beige")], badge: "-20%", nouveau: 11, bestseller: true,
    description: "Trench intemporel à double boutonnage avec ceinture à nouer. La pièce chic qui habille toutes vos tenues de mi-saison.",
    matiere: "Polyester et coton", entretien: "Lavage 30 °C ou nettoyage à sec." },

  { id: 11, nom: "Parka longue kaki", categorie: "manteaux", prix: 390, ancienPrix: null,
    tailles: ["M", "L", "XL", "XXL"], couleurs: [C.kaki, C.beige],
    images: [IMG("parka-kaki")], badge: null, nouveau: 10, bestseller: false,
    description: "Parka longue et légère avec capuche et cordon à la taille. Idéale pour les journées fraîches et pluvieuses.",
    matiere: "Coton et polyester", entretien: "Lavage 30 °C." },

  { id: 12, nom: "Pull torsadé col V crème", categorie: "mailles", prix: 229, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.creme, C.rose],
    images: [IMG("pull-torsade-creme")], badge: "Nouveau", nouveau: 9, bestseller: true,
    description: "Pull en maille torsadée avec col V souligné de rayures rose et lilas. Un classique preppy, doux et chaud.",
    matiere: "Acrylique et laine", entretien: "Lavage 30 °C programme laine, séchage à plat." },

  { id: 13, nom: "Pull patchwork denim noir", categorie: "mailles", prix: 249, ancienPrix: 310,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.noir, C.blanc],
    images: [IMG("pull-denim-noir-1"), IMG("pull-denim-noir-2"), IMG("pull-denim-blanc")], badge: "-20%", nouveau: 8, bestseller: false,
    description: "Sweat original mi-maille mi-denim effiloché avec poche plaquée. Existe en noir et en blanc.",
    matiere: "Coton molletonné et denim", entretien: "Lavage 30 °C à l'envers." },

  { id: 14, nom: "Pull brodé fleur dorée", categorie: "mailles", prix: 219, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.noir, C.gris],
    images: [IMG("pull-brode-noir"), IMG("pull-fleur-gris")], badge: null, nouveau: 7, bestseller: false,
    description: "Pull col rond orné d'une grande fleur brodée. Chic avec un pantalon droit, cool avec un jean.",
    matiere: "Maille acrylique", entretien: "Lavage 30 °C, séchage à plat." },

  { id: 15, nom: "Gilet liseré noir et blanc", categorie: "gilets", prix: 219, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.blanc, C.noir],
    images: [IMG("gilet-raye-blanc-1"), IMG("gilet-raye-blanc-2"), IMG("debardeur-gilet")], badge: null, nouveau: 6, bestseller: false,
    description: "Gilet col V en maille fine, souligné d'un liseré contrasté. Le basique élégant à superposer toute l'année.",
    matiere: "Viscose et polyester", entretien: "Lavage 30 °C." },

  { id: 16, nom: "Cardigan marinière", categorie: "gilets", prix: 189, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.blanc, C.marine],
    images: [IMG("gilet-mariniere")], badge: "Nouveau", nouveau: 5, bestseller: false,
    description: "Cardigan rayé esprit marinière avec écusson brodé. Une touche chic et décontractée.",
    matiere: "Coton et acrylique", entretien: "Lavage 30 °C." },

  { id: 17, nom: "Blouse rayée bleu ciel", categorie: "blouses", prix: 179, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.bleu, C.blanc],
    images: [IMG("blouse-rayee-bleue-1"), IMG("blouse-rayee-bleue-2")], badge: null, nouveau: 4, bestseller: false,
    description: "Chemise fluide à fines rayures bleu ciel, coupe légèrement ample. Se porte rentrée dans un jean ou ouverte sur un top.",
    matiere: "Coton et viscose", entretien: "Lavage 30 °C, repassage." },

  { id: 18, nom: "Chemise satinée bordeaux", categorie: "blouses", prix: 199, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.bordeaux, C.noir],
    images: [IMG("chemise-bordeaux")], badge: null, nouveau: 3, bestseller: false,
    description: "Chemise au toucher satiné, couleur bordeaux profond. Élégante au bureau comme en soirée.",
    matiere: "Satin polyester", entretien: "Lavage à la main, repassage doux à l'envers." },

  { id: 19, nom: "Body col V boutons dorés", categorie: "blouses", prix: 169, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.noir, C.marron],
    images: [IMG("body-noir-dore-1"), IMG("body-noir-dore-2"), IMG("body-marron")], badge: null, nouveau: 2, bestseller: false,
    description: "Top près du corps à col V, détails boutons dorés. Il structure la silhouette et se marie avec tout.",
    matiere: "Viscose stretch", entretien: "Lavage 30 °C." },

  { id: 20, nom: "Polo en maille crème", categorie: "blouses", prix: 149, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.creme, C.blanc],
    images: [IMG("polo-creme"), IMG("polo-blanc")], badge: null, nouveau: 1, bestseller: false,
    description: "Polo manches courtes en maille fine. Simple, chic et parfait avec un pantalon jogging ou un jean.",
    matiere: "Coton et viscose", entretien: "Lavage 30 °C." }
];

/* ---------- Avis clientes ---------- */
const AVIS = [
  { prenom: "Salma", ville: "Fès", note: 5, texte: "Tbarkellah, l'ensemble bordeaux est encore plus beau en vrai ! Livré le lendemain et la qualité est top. Merci Douja 🤍" },
  { prenom: "Imane", ville: "Tanger", note: 5, texte: "J'ai commandé sur WhatsApp, réponse rapide et colis reçu en 48h. J'ai payé à la livraison, aucun stress. Je recommande !" },
  { prenom: "Khadija", ville: "Kénitra", note: 5, texte: "La veste fourrure est trop chaude et trop chic. On m'a même échangé la taille sans problème. Service au top." },
  { prenom: "Nour", ville: "Tétouan", note: 4, texte: "Les nouveautés chaque semaine c'est mon petit plaisir 😍 Les tailles sont justes et les conseils sur WhatsApp m'ont beaucoup aidée." }
];

/* ---------- Photos de la grille Instagram ---------- */
const INSTA = [IMG("ensemble-marron"), IMG("robe-franges-beige"), IMG("veste-jean-perles-1"), IMG("gilet-boutons-dores"), IMG("fourrure-creme-2"), IMG("ensemble-top-bordeaux-1")];

/* ---------- Photos des pages ---------- */
const PHOTOS_PAGES = {
  hero: IMG("robe-franges-beige"),
  heroMosaique: [IMG("ensemble-bordeaux"), IMG("fourrure-creme-1"), IMG("gilet-boutons-dores")],
  apropos: IMG("ensemble-top-bordeaux-1")
};
