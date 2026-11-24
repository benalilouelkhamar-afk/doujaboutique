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


/* ---------- Nouvel arrivage : photos ajoutées sur GitHub (images/produits/watermarked_img_…) ---------- */
const W = num => `images/produits/watermarked_img_${num}.webp`;

PRODUITS.push(
  { id: 21, nom: "Doudoune longue sans manches col fourrure", categorie: "manteaux", prix: 390, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.noir],
    images: [W("10505514029965152665")], badge: "Nouveau", nouveau: 133, bestseller: false,
    description: "Long gilet matelassé sans manches avec col en fausse fourrure amovible. Il réchauffe sans alourdir la silhouette.",
    matiere: "Polyester matelassé, col fausse fourrure", entretien: "Lavage 30 °C, col à retirer avant lavage." },

  { id: 22, nom: "Blouse satinée crème col montant", categorie: "blouses", prix: 219, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("10915095590516630955")], badge: "Nouveau", nouveau: 132, bestseller: true,
    description: "Blouse fluide au toucher satiné, col montant et manches bouffantes resserrées aux poignets. Chic avec un pantalon droit.",
    matiere: "Satin polyester", entretien: "Lavage à la main, repassage doux à l'envers." },

  { id: 23, nom: "Robe chemise rayée jaune ceinturée", categorie: "robes", prix: 290, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [{ nom: "Jaune pastel", hex: "#F2E3A0" }],
    images: [W("11008167513460789741")], badge: null, nouveau: 131, bestseller: false,
    description: "Robe chemise longue à fines rayures, ceinture à nouer et manches longues. Légère et élégante pour la mi-saison.",
    matiere: "Coton et viscose", entretien: "Lavage 30 °C, repassage." },

  { id: 24, nom: "Ensemble gilet & jupe plissée crème", categorie: "ensembles", prix: 390, ancienPrix: null,
    tailles: ["S", "M", "L"], couleurs: [C.creme],
    images: [W("11503517147088695581")], badge: "Nouveau", nouveau: 130, bestseller: true,
    description: "Gilet court à boutons bijoux et jupe longue plissée assortie. Un ensemble doux et raffiné pour les occasions.",
    matiere: "Maille viscose, jupe polyester plissé", entretien: "Lavage à la main à froid." },

  { id: 25, nom: "Blouse plissée taupe ceinturée", categorie: "blouses", prix: 229, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [{ nom: "Taupe", hex: "#A8998A" }],
    images: [W("11766587041463543883")], badge: null, nouveau: 129, bestseller: false,
    description: "Blouse à plis fins sur le devant, cordon à nouer à la taille. Une pièce féminine qui se porte avec tout.",
    matiere: "Viscose fluide", entretien: "Lavage 30 °C programme délicat." },

  { id: 26, nom: "Parka beige capuche fourrure", categorie: "manteaux", prix: 590, ancienPrix: null,
    tailles: ["M", "L", "XL"], couleurs: [C.beige],
    images: [W("1212188270736755138")], badge: "Stock limité", nouveau: 128, bestseller: false,
    description: "Parka mi-longue ajustée par un cordon, capuche bordée de fausse fourrure. Chaude et chic pour l'hiver à Fès.",
    matiere: "Polyester déperlant, doublure ouatinée", entretien: "Lavage 30 °C, fourrure amovible." },

  { id: 27, nom: "Manteau fausse fourrure marron", categorie: "manteaux", prix: 590, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.marron],
    images: [W("12933782814608865687"), W("9737547063673920733")], badge: "Nouveau", nouveau: 127, bestseller: true,
    description: "Manteau mi-long en fausse fourrure ultra douce avec ceinture à nouer et col large. Chaleur et élégance pour les soirées fraîches.",
    matiere: "Fausse fourrure 100 % polyester, doublure satin", entretien: "Nettoyage à sec recommandé." },

  { id: 28, nom: "Manteau fausse fourrure prune", categorie: "manteaux", prix: 550, ancienPrix: 690,
    tailles: ["S", "M", "L"], couleurs: [{ nom: "Prune", hex: "#4A1F2E" }],
    images: [W("13539680176088971801"), W("4371200384629200901")], badge: "-20%", nouveau: 126, bestseller: false,
    description: "Manteau en fausse fourrure couleur prune, coupe droite et col cranté. Une pièce forte qui illumine les tenues sombres.",
    matiere: "Fausse fourrure polyester", entretien: "Nettoyage à sec recommandé." },

  { id: 29, nom: "Doudoune ceinturée camel col fourrure", categorie: "manteaux", prix: 650, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.camel],
    images: [W("13721703411861569052"), W("14984449920764577918")], badge: "Stock limité", nouveau: 125, bestseller: true,
    description: "Doudoune matelassée ceinturée à la taille avec grand col en fausse fourrure. Le confort d'une doudoune, l'allure d'un manteau.",
    matiere: "Polyester, garnissage ouate", entretien: "Lavage 30 °C programme doux." },

  { id: 30, nom: "Ensemble maille bordeaux dentelle", categorie: "ensembles", prix: 349, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.bordeaux],
    images: [W("14218981571472593475")], badge: null, nouveau: 124, bestseller: false,
    description: "Pull et pantalon en maille bordeaux, épaules ornées de dentelle. Confortable et chic pour la maison comme pour sortir.",
    matiere: "Maille viscose, dentelle", entretien: "Lavage 30 °C, séchage à plat." },

  { id: 31, nom: "Doudoune sans manches crème à capuche", categorie: "manteaux", prix: 420, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("14550999724705292153"), W("14672266096149527611")], badge: "Nouveau", nouveau: 123, bestseller: false,
    description: "Gilet matelassé sans manches à capuche, ceinture à boucle dorée. À superposer sur un pull fin.",
    matiere: "Polyester matelassé", entretien: "Lavage 30 °C." },

  { id: 32, nom: "Robe chemise rayée noire", categorie: "robes", prix: 299, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.noir],
    images: [W("14683865187611428013")], badge: null, nouveau: 122, bestseller: false,
    description: "Robe chemise à rayures tennis, ceinture à nouer. Un classique facile à porter au quotidien.",
    matiere: "Coton et polyester", entretien: "Lavage 30 °C, repassage." },

  { id: 33, nom: "Trench crème ceinturé", categorie: "manteaux", prix: 520, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("14753041877328397439")], badge: "Nouveau", nouveau: 121, bestseller: false,
    description: "Trench long crème à double boutonnage, ceinture et pattes de poignets. Intemporel et lumineux.",
    matiere: "Coton et polyester", entretien: "Lavage 30 °C ou nettoyage à sec." },

  { id: 34, nom: "Ensemble veste tweed & jupe", categorie: "ensembles", prix: 450, ancienPrix: null,
    tailles: ["S", "M", "L"], couleurs: [C.blanc],
    images: [W("15194688100856960237")], badge: "Stock limité", nouveau: 120, bestseller: false,
    description: "Veste en tweed à boutons bijoux et jupe assortie. L'ensemble chic par excellence pour les fêtes.",
    matiere: "Tweed polyester et coton", entretien: "Nettoyage à sec." },

  { id: 35, nom: "Gilet côtelé boutonné beige", categorie: "gilets", prix: 189, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.beige],
    images: [W("15875299946222614879")], badge: null, nouveau: 119, bestseller: false,
    description: "Gilet ajusté en maille côtelée avec boutons perlés. Se porte fermé comme un top.",
    matiere: "Maille viscose stretch", entretien: "Lavage 30 °C, séchage à plat." },

  { id: 36, nom: "Manteau simili cuir col fourrure", categorie: "manteaux", prix: 690, ancienPrix: null,
    tailles: ["M", "L", "XL"], couleurs: [C.noir],
    images: [W("17128276634975041595")], badge: "Stock limité", nouveau: 118, bestseller: false,
    description: "Manteau long en simili cuir, ceinturé, avec large col en fausse fourrure. La pièce statement de la saison.",
    matiere: "Simili cuir PU, col fausse fourrure", entretien: "Nettoyer avec un chiffon humide." },

  { id: 37, nom: "Veste maille col fourrure chocolat", categorie: "gilets", prix: 349, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.marron],
    images: [W("1715462789164679089")], badge: "Nouveau", nouveau: 117, bestseller: true,
    description: "Veste en maille épaisse zippée avec col en fausse fourrure et poches plaquées. Douillette et élégante.",
    matiere: "Maille acrylique et laine, col fausse fourrure", entretien: "Lavage à la main à froid." },

  { id: 38, nom: "Chemise blanche classique", categorie: "blouses", prix: 159, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.blanc],
    images: [W("17708310116349898701")], badge: null, nouveau: 116, bestseller: false,
    description: "La chemise blanche indispensable, coupe droite et col classique. À porter partout.",
    matiere: "Coton stretch", entretien: "Lavage 40 °C, repassage." },

  { id: 39, nom: "Body col V blanc", categorie: "blouses", prix: 149, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.blanc],
    images: [W("17871523708191158767")], badge: null, nouveau: 115, bestseller: false,
    description: "Top près du corps à col V, manches longues. La base parfaite sous un gilet ou une veste.",
    matiere: "Viscose stretch", entretien: "Lavage 30 °C." },

  { id: 40, nom: "Blouse cintrée crème", categorie: "blouses", prix: 209, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("17969103182839402082"), W("7623933164215580270")], badge: null, nouveau: 114, bestseller: false,
    description: "Blouse à col chemise, cintrée par des plis à la taille. Elle structure la silhouette avec élégance.",
    matiere: "Coton et polyester", entretien: "Lavage 30 °C, repassage doux." },

  { id: 41, nom: "Veste fausse fourrure bordeaux", categorie: "manteaux", prix: 490, ancienPrix: null,
    tailles: ["S", "M", "L"], couleurs: [C.bordeaux],
    images: [W("1956542704620608522")], badge: "Nouveau", nouveau: 113, bestseller: false,
    description: "Veste courte en fausse fourrure bordeaux, ceinture à nouer et poignets en fourrure. Glamour garanti.",
    matiere: "Fausse fourrure polyester", entretien: "Nettoyage à sec recommandé." },

  { id: 42, nom: "Trench bicolore ceinturé", categorie: "manteaux", prix: 560, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.beige],
    images: [W("1962933983281496528")], badge: null, nouveau: 112, bestseller: false,
    description: "Trench original beige et chocolat, grosse ceinture et col classique. Pour un look affirmé.",
    matiere: "Polyester et coton", entretien: "Nettoyage à sec." },

  { id: 43, nom: "Blouse jaune à volants", categorie: "blouses", prix: 199, ancienPrix: 249,
    tailles: ["S", "M", "L", "XL"], couleurs: [{ nom: "Jaune pastel", hex: "#F2E3A0" }],
    images: [W("2428149416104434852")], badge: "-20%", nouveau: 111, bestseller: false,
    description: "Blouse pastel ornée de volants sur le devant et d'un petit bijou au col. Romantique et lumineuse.",
    matiere: "Mousseline polyester", entretien: "Lavage à la main." },

  { id: 44, nom: "Blouse portefeuille crème", categorie: "blouses", prix: 199, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("274138618425530447")], badge: null, nouveau: 110, bestseller: false,
    description: "Blouse cache-cœur à nouer sur le côté. Elle se porte rentrée dans un pantalon taille haute.",
    matiere: "Viscose", entretien: "Lavage 30 °C." },

  { id: 45, nom: "Ensemble chemise & pantalon rose", categorie: "ensembles", prix: 329, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.rose],
    images: [W("3669901052077669688")], badge: "Nouveau", nouveau: 109, bestseller: false,
    description: "Chemise ceinturée et pantalon large rose poudré. Un ensemble frais et féminin.",
    matiere: "Viscose et lin", entretien: "Lavage 30 °C." },

  { id: 46, nom: "Robe en dentelle jaune pastel", categorie: "robes", prix: 349, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [{ nom: "Jaune pastel", hex: "#F2E3A0" }],
    images: [W("4032324895693880097")], badge: null, nouveau: 108, bestseller: false,
    description: "Robe longue boutonnée à col tailleur, manches en dentelle. Délicate et parfaite pour les fêtes de famille.",
    matiere: "Polyester et dentelle", entretien: "Lavage à la main à froid." },

  { id: 47, nom: "Blouson matelassé crème", categorie: "manteaux", prix: 390, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("4107667433307624382")], badge: null, nouveau: 107, bestseller: false,
    description: "Blouson court matelassé à col montant. Léger et chaud, il se porte avec un jean.",
    matiere: "Polyester, garnissage ouate", entretien: "Lavage 30 °C." },

  { id: 48, nom: "Pull col rond gris chiné", categorie: "mailles", prix: 179, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.gris],
    images: [W("4472174501951214597")], badge: null, nouveau: 106, bestseller: false,
    description: "Pull basique doux et chaud à col rond. Le pull qu'on porte tout l'hiver.",
    matiere: "Acrylique et laine", entretien: "Lavage 30 °C programme laine." },

  { id: 49, nom: "Ensemble t-shirt & jupe dentelle", categorie: "ensembles", prix: 299, ancienPrix: null,
    tailles: ["S", "M", "L"], couleurs: [C.bleu],
    images: [W("4983383182127082989")], badge: null, nouveau: 105, bestseller: false,
    description: "T-shirt blanc ajusté et jupe longue en dentelle bleu ciel. Doux, frais et élégant.",
    matiere: "Coton, jupe dentelle polyester", entretien: "Lavage à la main." },

  { id: 50, nom: "Gilet boutonné blanc cassé", categorie: "gilets", prix: 199, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.creme],
    images: [W("6031704820786705737")], badge: null, nouveau: 104, bestseller: false,
    description: "Gilet col V en maille fine avec boutons dorés. Le basique chic à superposer.",
    matiere: "Viscose et polyester", entretien: "Lavage 30 °C." },

  { id: 51, nom: "Trench long beige liseré", categorie: "manteaux", prix: 540, ancienPrix: null,
    tailles: ["S", "M", "L", "XL", "XXL"], couleurs: [C.beige],
    images: [W("8666337325778343892")], badge: null, nouveau: 103, bestseller: false,
    description: "Trench long beige avec liserés chocolat aux poignets et ceinture. Élégant au quotidien.",
    matiere: "Coton et polyester", entretien: "Lavage 30 °C ou nettoyage à sec." },

  { id: 52, nom: "Doudoune longue rose col fourrure", categorie: "manteaux", prix: 620, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.rose],
    images: [W("9075153218436302756")], badge: "Nouveau", nouveau: 102, bestseller: false,
    description: "Doudoune longue matelassée rose poudré, ceinturée, capuche en fausse fourrure. Chaude et ultra féminine.",
    matiere: "Polyester, garnissage ouate", entretien: "Lavage 30 °C programme doux." },

  { id: 53, nom: "Pull blanc col foulard", categorie: "mailles", prix: 199, ancienPrix: null,
    tailles: ["S", "M", "L", "XL"], couleurs: [C.blanc],
    images: [W("9094283891852015686")], badge: null, nouveau: 101, bestseller: false,
    description: "Pull fin blanc avec foulard noué au col. Une touche chic et rétro.",
    matiere: "Viscose", entretien: "Lavage 30 °C." }
);

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
