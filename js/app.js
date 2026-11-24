/* =========================================================
   DOUJABOUTIQUE — SCRIPT PARTAGÉ PAR TOUTES LES PAGES
   1. Outils          5. Panier
   2. Mise en page    6. Commande COD (WhatsApp)
   3. Cartes produit  7. Rendu de chaque page
   4. Tiroirs/modales 8. Événements + initialisation
   Les données (produits, numéro WhatsApp…) sont dans js/donnees.js
   ========================================================= */

/* =========================================================
   1. OUTILS
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const dh = n => `${n.toLocaleString("fr-FR")} DH`;
const nomCategorie = id => (CATEGORIES.find(c => c.id === id) || {}).nom || "";
const trouverProduit = id => PRODUITS.find(p => p.id === Number(id));
const echapper = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const param = nom => new URLSearchParams(location.search).get(nom);
const PAGE = document.body.dataset.page; // accueil | boutique | produit | apropos | contact

// Liens vers les pages
const lienProduit = id => `produit.html?id=${id}`;
const lienCategorie = id => `boutique.html?cat=${id}`;

/* Image avec repli : bloc coloré + nom si la photo ne charge pas */
function media(src, alt, classe = "") {
  return `<div class="media ${classe}"><span class="ph">${echapper(alt)}</span>
    <img src="${src}" alt="${echapper(alt)}" loading="lazy" onerror="this.classList.add('ko')"></div>`;
}

/* Classe CSS du badge */
function classeBadge(b) {
  if (!b) return "";
  if (b.startsWith("-")) return "promo";
  if (b === "Stock limité") return "stock";
  return "";
}

/* Notification courte */
let minuteurToast;
function toast(texte) {
  const t = $("#toast");
  t.textContent = texte;
  t.classList.add("on");
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => t.classList.remove("on"), 2400);
}

/* Ouvre WhatsApp avec un message pré-rempli */
function ouvrirWhatsApp(message) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

const ICO_WA = `<svg viewBox="0 0 24 24" fill="currentColor"><use href="#ico-wa"/></svg>`;

/* =========================================================
   2. MISE EN PAGE COMMUNE (injectée dans chaque page)
   Barre d'annonce, header, menu mobile, footer, bouton WhatsApp,
   panier, modales et icônes SVG.
   ========================================================= */
function injecterMiseEnPage() {
  const liens = [
    ["index.html", "Accueil", "accueil"],
    ["boutique.html", "Boutique", "boutique"],
    ["boutique.html?tri=nouveautes", "Nouveautés", "nouveautes"],
    ["apropos.html", "À propos", "apropos"],
    ["contact.html", "Contact", "contact"]
  ];
  const actif = PAGE === "boutique" && param("tri") === "nouveautes" ? "nouveautes"
    : PAGE === "produit" ? "boutique" : PAGE;
  const nav = liens.map(([href, txt, id]) => `<a href="${href}" class="${id === actif ? "actif" : ""}">${txt}</a>`).join("");
  const annonce = ["🚚 Livraison partout au Maroc", "💵 Paiement à la livraison", "✨ Nouvel arrivage chaque semaine"]
    .map(a => `<span>${a}</span><span>•</span>`).join("").repeat(4);

  /* ----- Haut de page ----- */
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="annonce" aria-label="Annonces"><div class="annonce-piste">${annonce}</div></div>
    <header class="header">
      <div class="container header-inner">
        <button class="icon-btn burger" id="btnBurger" aria-label="Ouvrir le menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
        </button>
        <a href="index.html" class="logo">Douja<em>boutique</em></a>
        <nav class="nav" aria-label="Navigation principale">${nav}</nav>
        <div class="header-actions">
          <button class="icon-btn" id="btnPanier" aria-label="Ouvrir le panier">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
            <span class="compteur" id="compteurPanier">0</span>
          </button>
        </div>
      </div>
    </header>
    <div class="menu-mobile" id="menuMobile" aria-hidden="true">
      <div class="menu-mobile-top">
        <span class="logo">Douja<em>boutique</em></span>
        <button class="fermer" data-fermer-menu aria-label="Fermer le menu">×</button>
      </div>
      <nav>${liens.map(([href, txt]) => `<a href="${href}">${txt}</a>`).join("")}</nav>
      <div class="menu-bas">
        <button class="btn btn-wa btn-bloc" data-wa-info>${ICO_WA} Écrire sur WhatsApp</button>
        <a class="btn btn-contour btn-bloc" href="https://www.instagram.com/doujaboutique/" target="_blank" rel="noopener">@doujaboutique sur Instagram</a>
      </div>
    </div>`);

  /* ----- Bas de page ----- */
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer">
      <div class="container">
        <div class="footer-grille">
          <div class="footer-marque">
            <a href="index.html" class="logo">Douja<em>boutique</em></a>
            <p>Prêt-à-porter féminin à Fès. Robes, mailles, manteaux et ensembles, avec un nouvel arrivage chaque semaine.</p>
            <div class="reseaux">
              <a href="https://www.instagram.com/doujaboutique/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><use href="#ico-insta"/></svg></a>
              <a href="#" data-wa-info aria-label="WhatsApp"><svg viewBox="0 0 24 24"><use href="#ico-wa"/></svg></a>
              <a href="https://www.tiktok.com/@doujaboutique" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24"><use href="#ico-tiktok"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Liens rapides</h4>
            <ul>${liens.map(([href, txt]) => `<li><a href="${href}">${txt}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Catégories</h4>
            <ul>${CATEGORIES.map(c => `<li><a href="${lienCategorie(c.id)}">${c.nom}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Livraison & paiement</h4>
            <div class="paiement"><span>🚚 Amana</span><span>📦 CTM Messagerie</span><span>🛵 Livreur Fès</span><span>💵 Paiement à la livraison</span></div>
            <p style="margin-top:12px;font-size:13px">Livraison gratuite à Fès, ${FRAIS_LIVRAISON} DH ailleurs au Maroc.</p>
          </div>
        </div>
        <div class="footer-bas">© 2026 Doujaboutique – Fès, Maroc</div>
      </div>
    </footer>

    <!-- Bouton WhatsApp flottant + petit menu -->
    <div class="wa-menu" id="waMenu" role="menu">
      <div class="wa-menu-tete"><strong>Doujaboutique</strong><span>Réponse rapide sur WhatsApp 💬</span></div>
      <button data-wa-panier role="menuitem">🛍️ Commander mon panier</button>
      <button data-wa-info role="menuitem">✨ Infos sur les nouveautés</button>
    </div>
    <button class="wa-flottant" id="waFlottant" aria-label="WhatsApp">${ICO_WA}</button>

    <!-- Panier (tiroir latéral) -->
    <aside class="panier" id="panier" aria-label="Panier" aria-hidden="true">
      <div class="panier-tete"><h3>Mon panier</h3><button class="fermer" data-fermer-panier aria-label="Fermer le panier">×</button></div>
      <div class="panier-liste" id="panierListe"></div>
      <div class="panier-pied" id="panierPied">
        <div class="panier-total"><span>Sous-total</span><span id="panierTotal">0 DH</span></div>
        <small>Livraison gratuite à Fès, ${FRAIS_LIVRAISON} DH ailleurs. Paiement à la livraison.</small>
        <button class="btn btn-wa btn-bloc" id="btnCommanderPanier">${ICO_WA} Commander tout le panier sur WhatsApp</button>
      </div>
    </aside>

    <div class="voile" id="voile"></div>

    <!-- Modale : formulaire de commande COD -->
    <div class="modale" id="modaleCommande" role="dialog" aria-modal="true" aria-labelledby="titreCommande" aria-hidden="true">
      <div class="modale-boite">
        <div class="modale-tete">
          <div><h3 id="titreCommande">Finaliser ma commande</h3><p>💵 Paiement à la livraison • Aucun paiement en ligne</p></div>
          <button class="fermer" data-fermer-modale aria-label="Fermer">×</button>
        </div>
        <form id="formCommande" novalidate>
          <div class="form-grille">
            <div class="champ" id="champNom">
              <label for="fNom">Nom complet <b>*</b></label>
              <input id="fNom" type="text" autocomplete="name" placeholder="Ex. Salma Bennani" />
              <div class="msg-erreur">Merci d'indiquer votre nom complet.</div>
            </div>
            <div class="duo">
              <div class="champ" id="champTel">
                <label for="fTel">Téléphone <b>*</b></label>
                <input id="fTel" type="tel" inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78" />
                <div class="msg-erreur">Numéro marocain invalide (06 ou 07 + 8 chiffres).</div>
              </div>
              <div class="champ" id="champVille">
                <label for="fVille">Ville <b>*</b></label>
                <select id="fVille"><option value="">Choisir votre ville…</option>${VILLES.map(v => `<option>${v}</option>`).join("")}</select>
                <div class="msg-erreur">Merci de choisir votre ville.</div>
              </div>
            </div>
            <div class="champ" id="champAdresse">
              <label for="fAdresse">Adresse complète <b>*</b></label>
              <input id="fAdresse" type="text" autocomplete="street-address" placeholder="Quartier, rue, n° de maison / appartement" />
              <div class="msg-erreur">Merci d'indiquer votre adresse de livraison.</div>
            </div>
            <div class="trio" id="blocVariantes">
              <div class="champ"><label for="fTaille">Taille</label><select id="fTaille"></select></div>
              <div class="champ"><label for="fCouleur">Couleur</label><select id="fCouleur"></select></div>
              <div class="champ"><label for="fQte">Qté</label><input id="fQte" type="number" min="1" max="10" value="1" inputmode="numeric" /></div>
            </div>
            <div class="champ"><label for="fNote">Note (facultatif)</label><textarea id="fNote" placeholder="Ex. livrer après 18h, appeler avant…"></textarea></div>
          </div>
          <div class="recap" id="recapCommande"></div>
          <button type="submit" class="btn btn-wa btn-bloc" style="padding:16px">${ICO_WA} Confirmer ma commande sur WhatsApp</button>
          <p class="note-cod">Vous serez redirigée vers WhatsApp avec votre commande déjà rédigée. Il suffit d'appuyer sur « Envoyer ».</p>
        </form>
      </div>
    </div>

    <!-- Modale : guide des tailles -->
    <div class="modale" id="modaleTailles" role="dialog" aria-modal="true" aria-labelledby="titreTailles" aria-hidden="true">
      <div class="modale-boite">
        <div class="modale-tete">
          <div><h3 id="titreTailles">Guide des tailles</h3><p>Mesures du corps en centimètres</p></div>
          <button class="fermer" data-fermer-modale aria-label="Fermer">×</button>
        </div>
        <table class="table-tailles">
          <thead><tr><th>Taille</th><th>EU</th><th>Poitrine</th><th>Taille</th><th>Hanches</th></tr></thead>
          <tbody>
            <tr><td><b>S</b></td><td>36</td><td>82–86</td><td>64–68</td><td>90–94</td></tr>
            <tr><td><b>M</b></td><td>38</td><td>86–90</td><td>68–72</td><td>94–98</td></tr>
            <tr><td><b>L</b></td><td>40</td><td>90–96</td><td>72–78</td><td>98–104</td></tr>
            <tr><td><b>XL</b></td><td>42</td><td>96–102</td><td>78–84</td><td>104–110</td></tr>
            <tr><td><b>XXL</b></td><td>44</td><td>102–108</td><td>84–90</td><td>110–116</td></tr>
          </tbody>
        </table>
        <p style="font-size:13px;color:var(--gris);margin-top:14px">💡 Entre deux tailles ? Prenez la plus grande, ou écrivez-nous sur WhatsApp pour un conseil. L'échange de taille est toujours possible.</p>
      </div>
    </div>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>

    <!-- Icônes SVG réutilisables -->
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <symbol id="ico-wa" viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.86 9.86 0 0 1 2.16 12C2.16 6.55 6.6 2.11 12.06 2.11a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.89-9.89 9.89zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"/></symbol>
      <symbol id="ico-insta" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></symbol>
      <symbol id="ico-tiktok" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.04.86.13V9.4a6.34 6.34 0 0 0-.86-.06 6.33 6.33 0 1 0 6.34 6.33V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/></symbol>
    </svg>`);
}

/* =========================================================
   3. CARTE PRODUIT
   ========================================================= */
function carteProduit(p) {
  const badge = p.badge ? `<span class="badge ${classeBadge(p.badge)}">${p.badge}</span>` : "";
  const ancien = p.ancienPrix ? `<del>${dh(p.ancienPrix)}</del>` : "";
  return `
    <article class="carte">
      <a href="${lienProduit(p.id)}" style="position:relative;display:block">${badge}${media(p.images[0], p.nom)}</a>
      <div class="carte-corps">
        <span class="carte-cat">${nomCategorie(p.categorie)}</span>
        <h3 class="carte-nom" style="font-family:var(--texte)"><a href="${lienProduit(p.id)}">${p.nom}</a></h3>
        <div class="prix"><strong>${dh(p.prix)}</strong>${ancien}</div>
        <div class="carte-actions">
          <a class="btn btn-noir" href="${lienProduit(p.id)}">Voir le produit</a>
          <button class="btn-wa-mini" data-commande-rapide="${p.id}" aria-label="Commander ${echapper(p.nom)} sur WhatsApp">${ICO_WA}</button>
        </div>
      </div>
    </article>`;
}

/* =========================================================
   4. TIROIRS, MENU ET MODALES
   ========================================================= */
function majVoile() {
  const ouvert = $(".menu-mobile.ouvert, .panier.ouvert, .filtres.ouvert, .modale.ouvert");
  $("#voile").classList.toggle("on", !!ouvert && !$(".menu-mobile.ouvert"));
  document.body.classList.toggle("no-scroll", !!ouvert);
}
function basculer(el, ouvrir) {
  if (!el) return;
  el.classList.toggle("ouvert", ouvrir);
  el.setAttribute("aria-hidden", String(!ouvrir));
  majVoile();
}
function fermerTout() {
  $$(".menu-mobile, .panier, .filtres, .modale").forEach(el => basculer(el, false));
  $("#waMenu").classList.remove("ouvert");
}
function fermerModales() { $$(".modale").forEach(m => basculer(m, false)); }

/* =========================================================
   5. PANIER (sauvegardé dans le navigateur)
   ========================================================= */
let panier = chargerPanier();

function chargerPanier() {
  try { return JSON.parse(localStorage.getItem("douja_panier")) || []; }
  catch (e) { return []; }
}
function sauverPanier() {
  try { localStorage.setItem("douja_panier", JSON.stringify(panier)); } catch (e) { /* stockage indisponible */ }
}

function ajouterAuPanier(produitId, taille, couleur, qte) {
  const ligne = panier.find(l => l.id === produitId && l.taille === taille && l.couleur === couleur);
  if (ligne) ligne.qte = Math.min(10, ligne.qte + qte);
  else panier.push({ id: produitId, taille, couleur, qte });
  sauverPanier();
  rendrePanier();
  const c = $("#compteurPanier");
  c.classList.add("pop");
  setTimeout(() => c.classList.remove("pop"), 300);
}

const totalPanier = () => panier.reduce((s, l) => s + (trouverProduit(l.id)?.prix || 0) * l.qte, 0);

function rendrePanier() {
  panier = panier.filter(l => trouverProduit(l.id)); // retire les produits supprimés du catalogue
  $("#compteurPanier").textContent = panier.reduce((s, l) => s + l.qte, 0);

  if (!panier.length) {
    $("#panierListe").innerHTML = `<div class="panier-vide"><div>🛍️</div><p>Votre panier est vide.</p>
      <a href="boutique.html" class="btn btn-noir" style="margin-top:18px">Découvrir la boutique</a></div>`;
    $("#panierPied").style.display = "none";
    return;
  }
  $("#panierPied").style.display = "";
  $("#panierListe").innerHTML = panier.map((l, i) => {
    const p = trouverProduit(l.id);
    return `<div class="panier-article">
      ${media(p.images[0], p.nom)}
      <div>
        <div class="pa-nom">${p.nom}</div>
        <div class="pa-var">Taille ${l.taille} • ${echapper(l.couleur)}</div>
        <div class="pa-bas">
          <div class="qte">
            <button data-panier-qte="${i}" data-delta="-1" aria-label="Diminuer">−</button>
            <span>${l.qte}</span>
            <button data-panier-qte="${i}" data-delta="1" aria-label="Augmenter">+</button>
          </div>
          <strong>${dh(p.prix * l.qte)}</strong>
        </div>
        <button class="pa-suppr" data-panier-suppr="${i}">Supprimer</button>
      </div>
    </div>`;
  }).join("");
  $("#panierTotal").textContent = dh(totalPanier());
}

/* =========================================================
   6. FORMULAIRE DE COMMANDE COD → WHATSAPP
   ========================================================= */
let commande = null; // { mode: "produit" | "panier", produitId }
let selection = { taille: null, couleur: null, qte: 1 }; // choix sur la fiche produit

function selectionParDefaut(p) {
  return { taille: p.tailles.includes("M") ? "M" : p.tailles[0], couleur: p.couleurs[0].nom, qte: 1 };
}

function ouvrirCommande(mode, produitId) {
  commande = { mode, produitId };
  $("#waMenu").classList.remove("ouvert");
  basculer($("#panier"), false);

  if (mode === "produit") {
    const p = trouverProduit(produitId);
    const sel = PAGE === "produit" && Number(param("id")) === p.id ? selection : selectionParDefaut(p);
    $("#blocVariantes").style.display = "";
    $("#fTaille").innerHTML = p.tailles.map(t => `<option ${t === sel.taille ? "selected" : ""}>${t}</option>`).join("");
    $("#fCouleur").innerHTML = p.couleurs.map(c => `<option ${c.nom === sel.couleur ? "selected" : ""}>${echapper(c.nom)}</option>`).join("");
    $("#fQte").value = sel.qte;
    $("#titreCommande").textContent = "Commander ce produit";
  } else {
    $("#blocVariantes").style.display = "none";
    $("#titreCommande").textContent = "Commander mon panier";
  }
  $$(".champ.erreur").forEach(c => c.classList.remove("erreur"));
  rendreRecap();
  basculer($("#modaleCommande"), true);
  setTimeout(() => { if (window.innerWidth > 640) $("#fNom").focus(); }, 350);
}

function articlesCommande() {
  if (!commande) return [];
  if (commande.mode === "panier") {
    return panier.map(l => ({ produit: trouverProduit(l.id), taille: l.taille, couleur: l.couleur, qte: l.qte }));
  }
  const qte = Math.min(10, Math.max(1, parseInt($("#fQte").value, 10) || 1));
  return [{ produit: trouverProduit(commande.produitId), taille: $("#fTaille").value, couleur: $("#fCouleur").value, qte }];
}

function calculerTotaux() {
  const articles = articlesCommande();
  const sousTotal = articles.reduce((s, a) => s + a.produit.prix * a.qte, 0);
  const ville = $("#fVille").value;
  const livraison = ville === VILLE_LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON;
  return { articles, sousTotal, livraison, total: sousTotal + livraison, ville };
}

function rendreRecap() {
  const { articles, sousTotal, livraison, total, ville } = calculerTotaux();
  const lignes = articles.map(a => `
    <div class="recap-ligne"><span>${a.produit.nom}<br><small style="color:var(--gris)">${a.taille} • ${echapper(a.couleur)} • ${dh(a.produit.prix)} × ${a.qte}</small></span>
    <span>${dh(a.produit.prix * a.qte)}</span></div>`).join("");
  const texteLivraison = livraison === 0
    ? `<span class="gratuit">Gratuite à Fès</span>`
    : `<span>${dh(livraison)}${ville ? "" : " <small style='color:var(--gris)'>(gratuite à Fès)</small>"}</span>`;
  $("#recapCommande").innerHTML = `
    <h4>Récapitulatif</h4>
    <div class="recap-articles">${lignes}</div>
    <div class="recap-ligne" style="border-top:1px solid var(--gris-clair);margin-top:6px;padding-top:10px"><span>Sous-total</span><span>${dh(sousTotal)}</span></div>
    <div class="recap-ligne"><span>Frais de livraison</span>${texteLivraison}</div>
    <div class="recap-ligne recap-total"><span>Total à payer à la livraison</span><span>${dh(total)}</span></div>`;
}

/* Numéro marocain : 06 / 07 + 8 chiffres (accepte +212 / 00212 / 212) */
function normaliserTel(v) {
  let t = v.replace(/[\s.\-()]/g, "");
  if (t.startsWith("+212")) t = "0" + t.slice(4);
  else if (t.startsWith("00212")) t = "0" + t.slice(5);
  else if (t.startsWith("212")) t = "0" + t.slice(3);
  return t;
}
const telValide = v => /^0[67]\d{8}$/.test(normaliserTel(v));

function validerChamp(idChamp, valide) {
  $("#" + idChamp).classList.toggle("erreur", !valide);
  return valide;
}

function validerFormulaire() {
  const ok = [
    validerChamp("champNom", $("#fNom").value.trim().length >= 3),
    validerChamp("champTel", telValide($("#fTel").value)),
    validerChamp("champVille", !!$("#fVille").value),
    validerChamp("champAdresse", $("#fAdresse").value.trim().length >= 5)
  ];
  const premierKo = $(".champ.erreur input, .champ.erreur select");
  if (premierKo) premierKo.focus();
  return ok.every(Boolean);
}

/* Message WhatsApp formaté */
function genererMessage() {
  const { articles, total, livraison } = calculerTotaux();
  const tel = normaliserTel($("#fTel").value).replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  const l = ["Salam Doujaboutique 👋 Je veux commander :", ""];
  if (articles.length === 1) {
    const a = articles[0];
    l.push(`🛍️ Produit : ${a.produit.nom} (${dh(a.produit.prix)})`);
    l.push(`📏 Taille : ${a.taille} | 🎨 Couleur : ${a.couleur} | Qté : ${a.qte}`);
  } else {
    l.push("🛍️ Produits :");
    articles.forEach((a, i) => {
      l.push(`${i + 1}. ${a.produit.nom}`);
      l.push(`   📏 Taille : ${a.taille} | 🎨 Couleur : ${a.couleur} | Qté : ${a.qte} | ${dh(a.produit.prix * a.qte)}`);
    });
  }
  l.push(`🚚 Livraison : ${livraison === 0 ? "gratuite (Fès)" : dh(livraison)}`);
  l.push(`💰 Total : ${total} DH (paiement à la livraison)`, "");
  l.push(`👤 Nom : ${$("#fNom").value.trim()}`);
  l.push(`📞 Tél : ${tel}`);
  l.push(`🏙️ Ville : ${$("#fVille").value}`);
  l.push(`📍 Adresse : ${$("#fAdresse").value.trim()}`);
  l.push(`📝 Note : ${$("#fNote").value.trim() || "—"}`);
  return l.join("\n");
}

function soumettreCommande(e) {
  e.preventDefault();
  if (!validerFormulaire()) { toast("Merci de compléter les champs obligatoires"); return; }
  if (!articlesCommande().length) { toast("Votre panier est vide"); return; }
  ouvrirWhatsApp(genererMessage());
  if (commande.mode === "panier") { panier = []; sauverPanier(); rendrePanier(); }
  basculer($("#modaleCommande"), false);
  toast("Merci ! Envoyez le message sur WhatsApp pour confirmer 💕");
}

/* =========================================================
   7. RENDU DE CHAQUE PAGE
   ========================================================= */

/* ----- 7a. Accueil (index.html) ----- */
function pageAccueil() {
  $("#heroMedia").innerHTML = `<img src="${PHOTOS_PAGES.hero}" alt="Nouvelle collection Doujaboutique" onerror="this.classList.add('ko')">`;
  $("#heroMosaique").innerHTML = PHOTOS_PAGES.heroMosaique.map(src => media(src, "Doujaboutique")).join("");

  $("#grilleCategories").innerHTML = CATEGORIES.map(c => {
    const nb = PRODUITS.filter(p => p.categorie === c.id).length;
    return `<a class="cat-carte reveal" href="${lienCategorie(c.id)}">
      ${media(c.image, c.nom)}
      <span class="cat-nom">${c.nom}<small>${nb} article${nb > 1 ? "s" : ""} →</small></span>
    </a>`;
  }).join("");

  const nouveautes = [...PRODUITS].sort((a, b) => b.nouveau - a.nouveau).slice(0, 8);
  $("#grilleNouveautes").innerHTML = nouveautes.map(carteProduit).join("");
  $("#carrouselBest").innerHTML = PRODUITS.filter(p => p.bestseller).map(carteProduit).join("");

  $("#grilleAvis").innerHTML = AVIS.map(a => `
    <div class="avis reveal">
      <div class="etoiles" aria-label="${a.note} étoiles sur 5">${"★".repeat(a.note)}${"☆".repeat(5 - a.note)}</div>
      <p>« ${a.texte} »</p>
      <div class="avis-auteur"><div class="avatar">${a.prenom[0]}</div><div><strong>${a.prenom}</strong><span>${a.ville}</span></div></div>
    </div>`).join("");

  $("#grilleInsta").innerHTML = INSTA.map((src, i) => `
    <a href="https://www.instagram.com/doujaboutique/" target="_blank" rel="noopener" aria-label="Publication Instagram ${i + 1}">
      ${media(src, "@doujaboutique")}
    </a>`).join("");
}

/* ----- 7b. Boutique (boutique.html) ----- */
const PRIX_MIN = Math.min(...PRODUITS.map(p => p.prix));
const PRIX_MAX = Math.max(...PRODUITS.map(p => p.prix));
let filtres;

function pageBoutique() {
  const cat = param("cat");
  filtres = {
    categorie: CATEGORIES.some(c => c.id === cat) ? cat : "toutes",
    tailles: [], prixMax: PRIX_MAX, tri: param("tri") || "nouveautes"
  };
  const r = $("#filtrePrix");
  r.min = PRIX_MIN; r.max = PRIX_MAX;
  $("#prixMinLabel").textContent = dh(PRIX_MIN);
  rendreBoutique();
}

function rendreFiltres() {
  $("#filtreCategories").innerHTML = [{ id: "toutes", nom: "Toutes" }, ...CATEGORIES]
    .map(c => `<button class="puce ${filtres.categorie === c.id ? "on" : ""}" data-filtre-cat="${c.id}">${c.nom}</button>`).join("");
  $("#filtreTailles").innerHTML = TOUTES_TAILLES
    .map(t => `<button class="puce ${filtres.tailles.includes(t) ? "on" : ""}" data-filtre-taille="${t}">${t}</button>`).join("");
  $("#filtrePrix").value = filtres.prixMax;
  $("#prixMaxLabel").textContent = dh(filtres.prixMax);
  $("#triProduits").value = filtres.tri;
}

function rendreBoutique() {
  const f = filtres;
  const liste = PRODUITS.filter(p =>
    (f.categorie === "toutes" || p.categorie === f.categorie) &&
    (f.tailles.length === 0 || f.tailles.some(t => p.tailles.includes(t))) &&
    p.prix <= f.prixMax
  );
  if (f.tri === "prix-asc") liste.sort((a, b) => a.prix - b.prix);
  else if (f.tri === "prix-desc") liste.sort((a, b) => b.prix - a.prix);
  else liste.sort((a, b) => b.nouveau - a.nouveau);

  $("#titreBoutique").textContent = f.categorie === "toutes"
    ? (param("tri") === "nouveautes" ? "Nouveautés 🔥" : "La boutique")
    : nomCategorie(f.categorie);
  $("#nbResultats").textContent = `${liste.length} article${liste.length > 1 ? "s" : ""}`;
  $("#grilleBoutique").innerHTML = liste.length
    ? liste.map(carteProduit).join("")
    : `<div class="vide">Aucun article ne correspond à vos filtres.<br><button class="lien" data-reinit style="margin-top:10px">Réinitialiser les filtres</button></div>`;
  rendreFiltres();
}

function reinitialiserFiltres() {
  filtres = { categorie: "toutes", tailles: [], prixMax: PRIX_MAX, tri: "nouveautes" };
  rendreBoutique();
}

/* ----- 7c. Fiche produit (produit.html?id=…) ----- */
function pageProduit() {
  const p = trouverProduit(param("id")) || PRODUITS[0];
  selection = selectionParDefaut(p);
  document.title = `${p.nom} – Doujaboutique`;

  const badge = p.badge ? `<span class="badge-inline ${classeBadge(p.badge)}">${p.badge}</span>` : "";
  const ancien = p.ancienPrix ? `<del>${dh(p.ancienPrix)}</del>` : "";
  // Miniatures : 4 cases, on répète les photos disponibles si besoin
  const vignettes = Array.from({ length: 4 }, (_, i) => p.images[i % p.images.length]);

  $("#ficheProduit").innerHTML = `
    <nav class="fil"><a href="index.html">Accueil</a> / <a href="${lienCategorie(p.categorie)}">${nomCategorie(p.categorie)}</a> / ${p.nom}</nav>
    <div class="fiche">
      <div class="fiche-galerie">
        <div class="galerie-principale" id="galeriePrincipale">${media(p.images[0], p.nom)}</div>
        <div class="miniatures">
          ${vignettes.map((img, i) => `<button class="${i === 0 ? "on" : ""}" data-miniature="${i}" data-src="${img}" aria-label="Photo ${i + 1}">${media(img, p.nom)}</button>`).join("")}
        </div>
      </div>

      <div class="fiche-infos">
        <span class="carte-cat">${nomCategorie(p.categorie)}</span> ${badge}
        <h1>${p.nom}</h1>
        <div class="prix"><strong>${dh(p.prix)}</strong>${ancien}</div>
        <div class="bandeau-cod">💵 <span>Paiement à la livraison — vous payez en recevant votre colis</span></div>
        <p class="fiche-desc">${p.description}</p>

        <div class="option">
          <div class="option-titre">Taille : <span id="labelTaille" style="margin-left:6px">${selection.taille}</span>
            <button class="lien" id="btnGuideTailles" style="margin-left:auto">Guide des tailles</button></div>
          <div class="tailles">
            ${TOUTES_TAILLES.map(t => `<button class="taille ${t === selection.taille ? "on" : ""}" data-taille="${t}" ${p.tailles.includes(t) ? "" : "disabled"}>${t}</button>`).join("")}
          </div>
        </div>

        <div class="option">
          <div class="option-titre">Couleur : <span id="labelCouleur" style="margin-right:auto;margin-left:6px">${echapper(selection.couleur)}</span></div>
          <div class="couleurs">
            ${p.couleurs.map((c, i) => `<button class="pastille ${i === 0 ? "on" : ""}" style="background:${c.hex}" data-couleur="${echapper(c.nom)}" aria-label="${echapper(c.nom)}" title="${echapper(c.nom)}"></button>`).join("")}
          </div>
        </div>

        <div class="option">
          <div class="option-titre">Quantité</div>
          <div class="qte">
            <button data-qte="-1" aria-label="Diminuer">−</button>
            <input id="qteFiche" type="number" min="1" max="10" value="1" aria-label="Quantité" />
            <button data-qte="1" aria-label="Augmenter">+</button>
          </div>
        </div>

        <div class="fiche-btns">
          <button class="btn btn-noir" id="btnCommanderFiche">Commander maintenant – Paiement à la livraison</button>
          <button class="btn btn-wa" id="btnWaFiche">${ICO_WA} Commander sur WhatsApp</button>
          <button class="btn btn-contour" id="btnAjouterPanier">Ajouter au panier</button>
        </div>

        <div class="rassurance">
          <div>🚚 <span><b>Livraison 24-72h</b> selon la ville, partout au Maroc (gratuite à Fès)</span></div>
          <div>💵 <span><b>Paiement à la livraison</b>, aucun paiement en ligne</span></div>
          <div>🔁 <span><b>Échange de taille possible</b> si la taille ne convient pas</span></div>
        </div>

        <div class="details">
          <details open><summary>Matière</summary><p>${p.matiere}</p></details>
          <details><summary>Conseils d'entretien</summary><p>${p.entretien}</p></details>
          <details><summary>Livraison & échange</summary>
            <ul><li>Fès : livraison gratuite sous 24h</li><li>Autres villes : ${FRAIS_LIVRAISON} DH, 24 à 72h</li><li>Échange de taille sous 3 jours après réception</li></ul>
          </details>
        </div>
      </div>
    </div>`;

  // « Vous aimerez aussi » : même catégorie d'abord, puis best-sellers
  const similaires = [
    ...PRODUITS.filter(x => x.categorie === p.categorie && x.id !== p.id),
    ...PRODUITS.filter(x => x.categorie !== p.categorie && x.bestseller)
  ].slice(0, 4);
  $("#grilleSimilaires").innerHTML = similaires.map(carteProduit).join("");
}

function lireQteFiche() {
  const v = Math.min(10, Math.max(1, parseInt($("#qteFiche").value, 10) || 1));
  $("#qteFiche").value = v;
  selection.qte = v;
  return v;
}

/* ----- 7d. À propos ----- */
function pageApropos() {
  $("#photoBoutique").innerHTML = `<span class="ph">La boutique à Narjiss, Fès</span><img src="${PHOTOS_PAGES.apropos}" alt="Doujaboutique à Fès" loading="lazy" onerror="this.classList.add('ko')">`;
}

/* =========================================================
   ANIMATIONS AU SCROLL (fade-in des titres, catégories, avis…)
   ========================================================= */
function activerReveal() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(el => el.classList.add("visible")); return; }
  const obs = new IntersectionObserver(entrees => {
    entrees.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => obs.observe(el));
}

/* =========================================================
   8. ÉVÉNEMENTS + INITIALISATION
   ========================================================= */
function brancherEvenements() {
  document.addEventListener("click", e => {
    const cible = e.target.closest("button, a");
    if (!e.target.closest("#waMenu, #waFlottant")) $("#waMenu").classList.remove("ouvert");
    if (!cible) return;
    const d = cible.dataset;

    if (d.commandeRapide) { ouvrirCommande("produit", Number(d.commandeRapide)); return; }

    if (cible.hasAttribute("data-wa-info")) { e.preventDefault(); $("#waMenu").classList.remove("ouvert"); ouvrirWhatsApp(MESSAGE_INFO); return; }
    if (cible.hasAttribute("data-wa-panier")) {
      if (panier.length) ouvrirCommande("panier");
      else { $("#waMenu").classList.remove("ouvert"); toast("Votre panier est vide : choisissez d'abord un article 🛍️"); }
      return;
    }

    if (cible.hasAttribute("data-fermer-menu")) { basculer($("#menuMobile"), false); return; }
    if (cible.hasAttribute("data-fermer-panier")) { basculer($("#panier"), false); return; }
    if (cible.hasAttribute("data-fermer-filtres")) { basculer($("#panneauFiltres"), false); return; }
    if (cible.hasAttribute("data-fermer-modale")) { fermerModales(); return; }

    // Boutique : filtres
    if (d.filtreCat) { filtres.categorie = d.filtreCat; rendreBoutique(); return; }
    if (d.filtreTaille) {
      const t = d.filtreTaille;
      filtres.tailles = filtres.tailles.includes(t) ? filtres.tailles.filter(x => x !== t) : [...filtres.tailles, t];
      rendreBoutique(); return;
    }
    if (cible.hasAttribute("data-reinit")) { reinitialiserFiltres(); return; }

    // Fiche produit : photos, taille, couleur, quantité
    if (d.miniature) {
      $("#galeriePrincipale").innerHTML = media(d.src, $("h1").textContent);
      $$("[data-miniature]").forEach(b => b.classList.toggle("on", b === cible));
      return;
    }
    if (d.taille) {
      selection.taille = d.taille;
      $$("[data-taille]").forEach(b => b.classList.toggle("on", b === cible));
      $("#labelTaille").textContent = d.taille; return;
    }
    if (d.couleur) {
      selection.couleur = d.couleur;
      $$("[data-couleur]").forEach(b => b.classList.toggle("on", b === cible));
      $("#labelCouleur").textContent = d.couleur; return;
    }
    if (d.qte) { $("#qteFiche").value = (parseInt($("#qteFiche").value, 10) || 1) + Number(d.qte); lireQteFiche(); return; }

    // Panier : quantités et suppression
    if (d.panierQte !== undefined) {
      const i = Number(d.panierQte);
      panier[i].qte = Math.min(10, panier[i].qte + Number(d.delta));
      if (panier[i].qte < 1) panier.splice(i, 1);
      sauverPanier(); rendrePanier(); return;
    }
    if (d.panierSuppr !== undefined) { panier.splice(Number(d.panierSuppr), 1); sauverPanier(); rendrePanier(); return; }

    // Carrousel (flèches desktop)
    if (d.carrousel) { const c = $("#carrouselBest"); c.scrollBy({ left: Number(d.carrousel) * c.clientWidth * 0.75, behavior: "smooth" }); return; }

    switch (cible.id) {
      case "btnBurger": basculer($("#menuMobile"), true); break;
      case "btnPanier": basculer($("#panier"), true); break;
      case "btnOuvrirFiltres": basculer($("#panneauFiltres"), true); break;
      case "btnReinitFiltres": reinitialiserFiltres(); break;
      case "btnCommanderPanier": ouvrirCommande("panier"); break;
      case "waFlottant": $("#waMenu").classList.toggle("ouvert"); break;
      case "btnGuideTailles": basculer($("#modaleTailles"), true); break;
      case "btnCommanderFiche":
      case "btnWaFiche": lireQteFiche(); ouvrirCommande("produit", Number(param("id")) || PRODUITS[0].id); break;
      case "btnAjouterPanier":
        lireQteFiche();
        ajouterAuPanier(Number(param("id")) || PRODUITS[0].id, selection.taille, selection.couleur, selection.qte);
        toast("Ajouté au panier ✓"); break;
    }
  });

  $("#voile").addEventListener("click", fermerTout);
  $$(".modale").forEach(m => m.addEventListener("click", e => { if (e.target === m) fermerModales(); }));
  document.addEventListener("keydown", e => { if (e.key === "Escape") fermerTout(); });
  document.addEventListener("change", e => { if (e.target.id === "qteFiche") lireQteFiche(); });

  // Boutique : prix et tri
  if (PAGE === "boutique") {
    $("#filtrePrix").addEventListener("input", e => { filtres.prixMax = Number(e.target.value); rendreBoutique(); });
    $("#triProduits").addEventListener("change", e => { filtres.tri = e.target.value; rendreBoutique(); });
  }

  // Formulaire COD : récap en direct + validation
  $("#formCommande").addEventListener("submit", soumettreCommande);
  ["fVille", "fTaille", "fCouleur", "fQte"].forEach(id => { $("#" + id).addEventListener("input", rendreRecap); $("#" + id).addEventListener("change", rendreRecap); });
  $("#fTel").addEventListener("blur", () => { if ($("#fTel").value) validerChamp("champTel", telValide($("#fTel").value)); });
  ["fNom", "fTel", "fAdresse", "fVille"].forEach(id => $("#" + id).addEventListener("input", () => $("#" + id).closest(".champ").classList.remove("erreur")));
}

/* Démarrage */
injecterMiseEnPage();
({ accueil: pageAccueil, boutique: pageBoutique, produit: pageProduit, apropos: pageApropos }[PAGE] || (() => {}))();
rendrePanier();
brancherEvenements();
activerReveal();
