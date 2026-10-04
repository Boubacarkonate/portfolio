# Roadmap — Portfolio de Boubacar Konaté

> Suivi de ce qui est fait et de ce qui reste. Fichier **interne**, à ne pas publier (seul `dist/` est déployé).
> Dernière mise à jour : **2 octobre 2026**.

Légende : ✅ fait · ⬜ à faire · 🔄 en cours · ⚠️ dépend d'un préalable

---

## ✅ Fait

### Architecture & migration
- ✅ Migration du site statique vers **Astro** (générateur de site statique, build `npm run build`).
- ✅ **Bilingue** avec de vraies URLs : FR sur `/`, EN sur `/en/…`, + `canonical` et `hreflang`.
- ✅ **Layout partagé** (en-tête, menu, tiroir mobile, pied de page, scripts client) dans `src/layouts/Layout.astro`.
- ✅ **Pages par métier pilotées par données** : `src/data/niches.js` + gabarit `src/components/NichePage.astro`.
- ✅ Suppression des anciens fichiers racine devenus des doublons.
- ✅ `CLAUDE.md` mis à jour (Astro, nouvelle structure, commandes).
- ✅ Problème **Node 18 de VS Code** réglé (suppression d'un faux paquet `node` dans le dossier perso).

### Pages & contenu
- ✅ **Accueil** FR + EN (services, réalisations, méthode, compétences, à propos, FAQ, contact).
- ✅ **6 pages métier** (FR + EN) : restaurant, coach, wedding planner, photographe, **nettoyage pro (Coreham, vrai client)**, **technicien informatique (ADEI, vrai client)**.
- ✅ Menu déroulant **« Métiers »** (auto-alimenté par `niches.js`) + liste dans le tiroir mobile.
- ✅ **FAQ** sur l'accueil + une FAQ par page métier (lien de menu contextuel `#faq-niche`).
- ✅ Descriptions de réalisations réécrites (Coreham, ADEI, Assab Vision, So Beauty Soo, Rézosocial).
- ✅ Recadrage des captures de projets en **16:9**.
- ✅ Section **Témoignages** prête (en commentaire), à activer dès que tu auras de vrais avis.
- ✅ Carte de service **SEO/GEO** ajoutée (« Sur devis »).
- ✅ Maillage interne : cartes Coreham/ADEI → pages métier correspondantes.
- ✅ **Études de cas** : système réutilisable (`src/etudes-de-cas/*.md`) + 2 études **Coreham** et **ADEI France** (FR). Liens depuis les cartes Réalisations et le pied de page.

### Démos (fictives sauf Coreham/ADEI qui sont réels)
- ✅ **Orvelle** (restaurant fictif) — existant, **photos IA intégrées** (hero burrata, salle, galerie 4 plats ; remplacent les illustrations SVG).
- ✅ **Automatisation n8n** (étude de cas) — existant.
- ✅ **Coach** « Marc Delaunay » — bleu nuit + or, **vraies photos intégrées**, **planning de prise de rendez-vous** (choix jour + créneau, démo front-end qui n'enregistre rien).
- ✅ **Réseaux sociaux** (logos) ajoutés dans l'en-tête et le pied des 4 démos métier (comptes fictifs, liens inactifs).
- ✅ **Wedding planner** « Atelier Verveine » — crème/rose/sauge, illustrations SVG + couverture.
- ✅ **Photographe** « Élise Caron » — sombre/éditorial, **lightbox**, **vraies photos intégrées**.

### Animations & UX
- ✅ Apparition au défilement sur les démos.
- ✅ **Ken Burns** (zoom lent) + titre en fondu sur le hero photographe.
- ✅ Galerie en cascade (fondu + zoom).
- ✅ **Compteurs animés** (coach, wedding).
- ✅ FAQ : ouverture en douceur (CSS).
- ✅ **Transitions de page** (Astro ClientRouter).
- ✅ Soulignés animés (nav photographe).
- ✅ **Lightbox** galerie photographe (clavier, fermeture).
- ✅ Tout respecte `prefers-reduced-motion` et reste visible sans JS.

### SEO & technique
- ✅ **`sitemap.xml`** généré automatiquement (`@astrojs/sitemap`).
- ✅ JSON-LD : `ProfessionalService`, `FAQPage` (accueil + métiers), `BlogPosting` (articles).
- ✅ **Blog FR** (`/blog/`) : 3 articles en Markdown (`src/articles/`), lié au menu et au pied.
- ✅ Règle **zéro px** tenue partout.

---

## ⬜ À faire

### 🔴 Priorité 1 — Mise en ligne & crédibilité (surtout pas du code)
- ✅ **Témoignages** : section **activée** avec les avis réels de **Coreham** et **ADEI France** (accueil FR + EN ; Coreham aussi dans son étude de cas). Peut être étoffée avec d'autres avis plus tard.
- ✅ **Étude de cas ADEI France** (refonte WordPress : design, bugs, WhatsApp Business, SEO, blog).
- ⬜ **Traduire les études de cas en anglais** (actuellement FR seul, comme le blog).
- ⬜ **Acheter le domaine** (~10 €/an) et **déployer sur Vercel**.
- ⬜ Remplacer `boubacar-konate.fr` par le vrai domaine dans **`astro.config.mjs`** (`site`) et dans le workflow n8n.
- ⬜ **Brancher le formulaire** : installer/tester le workflow n8n (ou Formspree/Web3Forms), puis renseigner `CONFIG.formEndpoint` dans `src/layouts/Layout.astro`.
- ✅ **Vraies photos pour la démo photographe** (hero, galerie, à propos) — fait.
- ✅ **Vraies captures d'écran** des démos (orvelle, coach, wedding, photographe) pour les aperçus des pages métier (`/media/projects/*.jpg`, générées via Chrome headless, 16:9).
- ⬜ Ajouter `public/media/cv.pdf` et une photo HD (`profile`).

### 🟠 Priorité 2 — SEO/GEO (reste)
- ⚠️ **`robots.txt`** dans `public/` (dès que le domaine est connu).
- ⚠️ Finaliser **`canonical`** (déjà en place, dépend du `site` dans `astro.config.mjs`).
- ⬜ **Fiche Google Business** (à créer par toi).
- ⬜ Fixer un **prix** pour l'offre SEO/GEO quand tu seras à l'aise (remplace « Sur devis »).
- ⬜ **1 article de blog par mois** (déposer un `.md` dans `src/articles/`).

### 🟡 Priorité 3 — Finitions (code, impact moyen)
- ⬜ **Tester les transitions de page** en navigateur (menu, burger, formulaire après navigation).
- ⬜ **Mesure d'audience** sans cookie (Cloudflare Web Analytics ou Plausible) — emplacement prévu dans le `<head>`.
- ✅ **Page 404** soignée (`src/pages/404.astro`, `noindex`).
- ✅ Bloc **« Pourquoi moi »** (réactivité, prix clair, proximité) — accueil FR + EN.
- ⬜ Audit **Lighthouse** + **accessibilité** sur toutes les pages.
- ✅ Lien « Méthode » du menu contextuel sur les pages métier (comme la FAQ).

### ⚪ Priorité 4 — Acquisition (hors site, ton vrai goulot)
- ⬜ Optimiser le **profil LinkedIn** + poster 1-2×/semaine (partager les pages métier et les démos).
- ⬜ **Prospection locale ciblée** (TPE sans site ou site daté), en s'appuyant sur les démos.
- ⬜ Démarcher des **agences** (offre renfort).
- ⬜ Créer un profil **Malt** (+ Codeur.com, Comet).
- ⬜ Activer le **réseau chaud** (proches, anciens collègues, Coreham, ADEI) + demandes d'intro.

### 🧹 Dette / à surveiller
- ⬜ Supprimer le dossier de sauvegarde `public/media/projects/_originaux/` (serait déployé sinon).
- ⬜ Supprimer `public/demos/orvelle/img/_originaux/` (6 PNG Firefly, ~11 Mo) avant déploiement.
- ⬜ Idem pour les originaux conservés dans `public/demos/wedding/img/` (photos hautes résolutions).
- ⬜ Nettoyer les images inutilisées de l'ancien site dans `public/media/projects/`.
- ⬜ Remplacer les couvertures CSS d'Assab Vision et So Beauty Soo par des captures anonymisées (avec accord).
- ⬜ Mentions légales : SIRET, adresse, téléphone (`public/mentions-legales.html`).
- ⬜ Vérifier que Social ERP (`social-erp.vercel.app`) s'affiche bien (ne reste pas bloqué sur « Chargement… »).

---

## Rappels utiles

- **Lancer** : `npm run dev` (http://localhost:4321) · **Build** : `npm run build` (génère `dist/`). **Node 22+ requis.**
- **Ajouter un métier** : un objet dans `src/data/niches.js` (blocs `fr` + `en` + une démo) → les 2 pages + l'entrée de menu se génèrent seules.
- **Ajouter un article** : un `.md` dans `src/articles/` → apparaît dans `/blog/` et le sitemap.
- **Réservation coach → vrai client** : le planning de la démo est **front-end** (choix jour + créneau, mais n'enregistre rien). Pour un vrai site, deux options : (1) un **agenda réel** = backend + Google Calendar + e-mails de confirmation ; (2) intégrer **Cal.com** (open-source, auto-hébergeable, RGPD-friendly) ou **Calendly**.
- **Vérifs avant de publier** : voir la section dédiée du `CLAUDE.md`.
