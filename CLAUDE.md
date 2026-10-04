# CLAUDE.md : portfolio de Boubacar Konaté

Ce fichier dit comment travailler sur ce dépôt. Lis-le en entier avant toute modification.

## Comment travailler avec moi

- Je suis Boubacar Konaté, développeur web full stack freelance à Paris (micro-entreprise).
- Réponds en français.
- Sois honnête et direct. Si une idée est mauvaise, dis-le et explique pourquoi, sans ménagement.
- Pour une correction ciblée, fais-la directement.
- Pour un changement important (refonte, nouvelle section, nouvelle dépendance, changement de structure), propose d'abord un plan court et attends mon accord.
- À la fin de chaque tâche, dis :
  - ce qui a changé (fichiers et raisons) ;
  - ce que tu as vérifié ;
  - ce qui reste à faire de mon côté.
- Si une information manque, pose la question ou laisse un emplacement visible. Ne devine pas.

## Le projet

C'est un site vitrine construit avec **Astro** (générateur de site statique) : on écrit des composants et des données, Astro produit du HTML statique rapide. Il présente :

- mes services : sites vitrines, renfort pour les agences, automatisation, et bientôt SEO/GEO ;
- mes réalisations ;
- des pages d'atterrissage par métier (restaurant…), générées depuis des données ;
- un formulaire de demande de devis.

Bilingue : français par défaut (`/`), anglais sur ses propres URLs (`/en/…`).

```
src/pages/index.astro           accueil FR
src/pages/en/index.astro        accueil EN
src/pages/[niche].astro         pages métier FR (ex. /site-restaurant/)
src/pages/en/[niche].astro      pages métier EN
src/layouts/Layout.astro        <head>, en-tête, menu mobile, pied + script client (CONFIG en haut du <script>)
src/components/NichePage.astro   gabarit d'une page métier
src/data/niches.js               contenu des pages métier (un objet par métier, blocs fr + en)
astro.config.mjs                 config Astro : site, i18n (fr/en), sitemap
public/style.css                 styles du site, tokens dans :root (servi tel quel)
public/script.js                 copie du JS (utilisée par la démo automatisation)
public/media/                    favicon.svg, og-image.png (1200×630), profile.jpg, cv.pdf, projects/*
public/demos/orvelle/            démo restaurant fictif (CSS/JS propres, noindex)
public/demos/automatisation/     page de cas n8n (+ JSON, CSV, GUIDE.md)
public/mentions-legales.html     mentions légales et RGPD (statique, noindex)
dist/                            sortie du build (généré, non versionné)
A-LIRE-AVANT-DE-PUBLIER.md       notes internes, à ne pas publier
```

**Lancer** : `npm run dev` (http://localhost:4321). **Build** : `npm run build` (génère `dist/`). **Node 22+ requis.**

Dépendances : `astro` et `@astrojs/sitemap` ; `node-html-parser` (dev). Externes : Google Fonts (Fraunces, Instrument Sans ; Gloock, Figtree pour Orvelle), Font Awesome 6.5.1 via cdnjs.

Pas de nouvelle grosse dépendance front sans mon accord.

## Règles absolues

1. **Aucune valeur en px, nulle part** : CSS, styles en ligne, chaînes JavaScript, media queries.
   - Utilise rem, em, %, vw, vh, ch ou cqi.
   - Media queries en em : `64em`, `60em`, `53.75em` et `37.5em` (max-width), `60.0625em` (min-width). Orvelle utilise aussi `50em`.
   - En JavaScript : `matchMedia` en em, `rootMargin` en %.
   - Seules exceptions : les attributs HTML `width`/`height` sans unité des `<img>`, et les attributs internes des SVG.
   - Vérification : `grep -rnE "[0-9.]px\b" --include=*.css --include=*.html --include=*.js --include=*.astro --exclude-dir=node_modules --exclude-dir=dist .` ne doit rien renvoyer.
2. **Jamais de contenu inventé.** Pas de faux client, faux projet, faux témoignage, faux logo, faux avis ni faux chiffre (visites, notes, taux de conversion). Si un contenu manque, laisse un emplacement bien visible et signale-le.
3. **Étiquettes honnêtes des réalisations** :
   - « Réalisation client » : uniquement **Coreham** et **ADEI France**.
   - « Projet professionnel » : **Assab Vision** (SaaS RH développé en mission freelance) et **So Beauty Soo** (application mobile interne). Ces applications sont privées : pas de lien, et une couverture illustrée en CSS tant que je n'ai pas de capture autorisée.
   - « Site de démonstration » ou « Démonstration » : **Orvelle** et le **suivi des devis n8n**. Chaque page de démo reste signalée comme telle.
   - « Projet personnel » : Social ERP et The Travel Blog. « Mon produit » : CSSForge.
   - Ordre des cartes : clients, projets pros, démos, projets perso, produit.
4. **Ne remplis jamais à ma place** : SIRET, adresse, téléphone, domaine définitif, prix, dates d'expérience ou de formation. `[à compléter]` et `boubacar-konate.fr` sont des emplacements provisoires.
5. **Bilingue FR/EN** : suis le système décrit plus bas. Aucun texte visible sans sa traduction anglaise.
6. **Accessibilité au niveau AA** : suis la section Accessibilité plus bas.

## Bilingue (FR / EN)

- **URLs séparées** : FR par défaut sur `/`, anglais sur `/en/…` (config `i18n` dans `astro.config.mjs`). Le sélecteur de langue du Layout relie les deux versions, avec `hreflang`.
- **Pages métier** : tout le contenu, FR **et** EN, vit dans `src/data/niches.js` — un objet par métier avec un bloc `fr` et un bloc `en`. C'est l'endroit unique à éditer pour une niche.
- **Accueil** : deux fichiers à garder synchronisés, `src/pages/index.astro` (FR) et `src/pages/en/index.astro` (EN).
- **Libellés communs** (menu, pied de page, méthode, arguments) : dans `src/layouts/Layout.astro` et l'objet `shared` de `src/data/niches.js`.
- Aucun texte visible sans sa version anglaise.
- Les messages du formulaire (erreurs, confirmations) sont injectés par langue dans chaque page via `window.__FORM_MSG`.
- Les démos et les mentions légales restent en français uniquement.

## Ajouter une page métier (niche)

1. Dans `src/data/niches.js`, copie un objet de `niches` et remplis :
   - `slug` (ex. `site-coach`) → donne les URLs `/site-coach/` et `/en/site-coach/` ;
   - `demo` : une **vraie** démo (image dans `public/media/projects/`, lien) — pas de niche sans preuve ;
   - les blocs `fr` et `en` (hero, why, inclus, exemple, prix, faq, cta).
2. C'est tout : Astro génère les deux pages (FR + EN) avec FAQ, JSON-LD `FAQPage` et bascule de langue, via `src/components/NichePage.astro`.
3. Ajoute un lien de maillage si tu veux (voir « Sites pour restaurants » dans l'accueil).
4. Jamais de page métier sans contenu réel ni démo (règle 2 : rien d'inventé).

## Design

- **Couleurs et mesures** : utilise les tokens de `:root` dans style.css.
  - Fonds : `--paper`, `--paper-deep`, `--card`.
  - Texte : `--ink`, `--ink-soft`, `--muted`.
  - Accent terracotta : `--accent`, `--accent-deep`, `--accent-ink`, `--accent-tint`.
  - Vert : `--sage`, `--sage-tint`.
  - Rayons : `--radius*`. Marges : `--gutter`, `--section-y`, `--maxw`.
  - Pas de nouvelle couleur en dur sans raison. Toute couleur de texte ajoutée doit passer le contraste AA.
- **Polices** : Fraunces pour les titres (graisse 450–460, `font-variation-settings: 'opsz' 48` à `60`), Instrument Sans pour le texte.
- **Composants à réutiliser plutôt qu'à recréer** :
  - mise en page : `.container`, `.section`, `.section--tint`, `.section--dark`, `.section-head` ;
  - titres : `.kicker` + `.kicker-num`, `.section-title` ;
  - boutons : `.btn` avec `.btn-accent`, `.btn-ink` ou `.btn-ghost` ;
  - divers : `.chips`, `.frame` + `.frame-bar`, `.project-card`, `.step`.
- **Animations** : la classe `.reveal` n'agit que si `<html>` a la classe `.js`. Le contenu doit rester visible sans JavaScript. `prefers-reduced-motion` coupe les animations et les effets de survol.

## Accessibilité

- Lien d'évitement, `:focus-visible` visible, navigation complète au clavier.
- Menu mobile : `inert` sur le reste de la page quand il est ouvert, Échap le ferme et rend le focus au bouton.
- Un seul `<h1>` par page, niveaux de titres dans l'ordre.
- Les icônes décoratives portent `aria-hidden="true"`. Les images décoratives ont `alt=""`.
- Les champs de formulaire ont un `<label>`, avec les erreurs reliées par `aria-describedby` et `aria-invalid`.

## Carte de réalisation (modèle)

```html
<article class="project-card reveal">
  <a href="URL" class="project-img-wrap" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
    <span class="frame-bar"><i></i><i></i><i></i></span>
    <img src="/media/projects/nom.png" alt="" width="640" height="360" loading="lazy">
  </a>
  <div class="project-body">
    <span class="project-kind project-kind--client" data-i18n="work.kind.client">Réalisation client</span>
    <h3>Nom du projet</h3>
    <p data-i18n="work.cle">Description en une ou deux phrases.</p>
    <div class="project-tags"><span>Techno</span></div>
    <div class="project-links">
      <a href="URL" target="_blank" rel="noopener noreferrer" class="project-link"><span data-i18n="work.visit">Voir le site</span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </div>
  </div>
</article>
```

- Variantes d'étiquette :
  - `project-kind--client` (vert) ;
  - `project-kind--pro` (bleu) ;
  - `project-kind--product` (terracotta) ;
  - sans modificateur (gris) pour les démos et les projets perso.
- Pour un projet privé, remplace le lien image par `<div class="project-cover ...">` et mets `<p class="project-private">` à la place des liens.
- Images : dans `public/media/projects/`, en 16:9, 1280×720, PNG ou JPG, idéalement moins de 250 Ko.

## Formulaire de contact et workflow n8n

- La configuration est en haut du `<script>` de `src/layouts/Layout.astro` : `CONFIG.email` et `CONFIG.formEndpoint`.
  - Si `formEndpoint` est vide, le formulaire ouvre la messagerie du visiteur avec le message pré-rempli.
  - **Ne renseigne pas `formEndpoint`** tant que je n'ai pas confirmé que le workflow est installé et testé.
- Champs envoyés : `name`, `email`, `service` (libellé), `budget` (libellé), `message`, `service_id`, `budget_id`, `lang`, et `_gotcha` (champ piège anti-robots, qui doit rester caché).
- Le workflow `demos/automatisation/suivi-devis-n8n.json` dépend de ces valeurs :
  - `service_id` : `vitrine`, `renfort`, `automatisation`, `autre` ;
  - `budget_id` : `inconnu`, `moins-1000`, `1000-3000`, `plus-3000`, `journee`.
  - Si tu changes une option d'un `<select>`, préviens-moi : il faut mettre à jour les listes `BESOINS` et `BUDGETS` du nœud « Vérifier la demande », sinon la valeur devient « Autre ».
- Les règles de validation sont les mêmes dans le navigateur et dans n8n : nom d'au moins 2 caractères, e-mail valide, message d'au moins 15 caractères. Garde-les identiques des deux côtés.
- Le JSON du workflow contient du JavaScript dans des chaînes. Il vaut mieux le modifier dans l'éditeur n8n puis le réexporter. Si tu le modifies à la main, vérifie qu'il reste un JSON valide et préviens-moi qu'il faut le retester.

## Démos

- **public/demos/orvelle/** : restaurant fictif, avec ses propres couleurs, polices et fichiers CSS/JS, en `noindex, nofollow`.
  - Le bandeau « Site de démonstration » reste en haut de chaque page.
  - L'adresse est marquée « (adresse fictive) ». Le numéro 01 99 00 42 17 appartient à la plage réservée à la fiction. Le domaine est `orvelle.example`.
  - Horaires et créneaux : objet `OPENING` dans orvelle.js, heure de Paris.
- **public/demos/automatisation/** : page de cas qui réutilise `/style.css`, plus `automatisation.css`.
  - `img/workflow-n8n.png` est une vraie capture de l'éditeur n8n 2.41.
  - Les chiffres affichés (4 e-mails, 2 déclencheurs, 16 scénarios testés) correspondent à des tests réellement faits. Ne les modifie pas sans refaire les tests.

## Mentions légales

`mentions-legales.html` doit décrire ce que le site fait réellement : données collectées, prestataires, e-mails automatiques. Si tu ajoutes une mesure d'audience, un nouveau formulaire ou un script tiers :

- mets à jour cette page, y compris la partie cookies ;
- dis-le-moi.

Aucun traceur ne s'ajoute sans bandeau de consentement.

## SEO du site

Le site sert aussi de vitrine à mes offres SEO/GEO : il doit être exemplaire.

- Chaque page a un `<title>` unique, une meta description, un `lang` correct, des balises Open Graph et un `canonical` (gérés par `Layout.astro`).
- Le JSON-LD `ProfessionalService` reste cohérent avec le contenu visible. **Pas de note ni d'avis** (`AggregateRating`, `Review`) tant que je n'ai pas de vrais avis. Les pages avec FAQ portent un JSON-LD `FAQPage`.
- Le `sitemap.xml` est généré automatiquement par `@astrojs/sitemap` (pages FR + EN indexables). Les démos et les mentions légales restent en `noindex` et hors sitemap. La page de cas automatisation peut être indexée.
- `canonical` et `hreflang` sont en place. Quand le domaine sera connu : remplacer `boubacar-konate.fr` dans `astro.config.mjs` (`site`) et ajouter un `robots.txt` dans `public/` (autorisant Googlebot, Bingbot, OAI-SearchBot, PerplexityBot).
- Pas de `llms.txt` : aucun moteur ne confirme l'utiliser.
- Performance : images compressées, `loading="lazy"` hors du premier écran, pas de JavaScript inutile.

## Vérifications avant de dire « c'est fini »

1. Lance le serveur : `npm run dev` (http://localhost:4321). Pour la prod : `npm run build`, puis contrôle `dist/`.
2. Vérifie l'absence de px avec le `grep` de la règle 1 (inclut `*.astro`).
3. Bilingue : l'accueil existe en FR (`src/pages/index.astro`) et EN (`src/pages/en/index.astro`) ; chaque métier de `src/data/niches.js` a ses blocs `fr` et `en` complets. Aucun texte visible sans sa version anglaise.
4. Teste en FR et en EN, en largeur 375, 768 et 1440. Il ne doit y avoir ni défilement horizontal ni erreur dans la console.
5. Teste au clavier : Tab dans toute la page, ouverture du menu mobile et fermeture avec Échap.
6. Vérifie que les liens internes fonctionnent et que les images référencées existent (après `npm run build`, contrôle les liens vers `dist/`).
7. Si tu as touché au formulaire : erreurs affichées, puis envoi en mode messagerie (`formEndpoint` vide).
8. Si tu as touché à Orvelle : statut ouvert ou fermé, filtres de la carte, dimanche refusé, créneaux du midi et du soir.

## Git

- Commits petits, messages courts en français, au présent (« Ajoute la carte Orvelle »).
- Ne pousse rien et ne crée pas de branche distante sans me le demander.
- `node_modules/`, `dist/` et `.astro/` sont ignorés (voir `.gitignore`).
- Aucun secret dans le dépôt : pas d'identifiant, pas de clé d'API. L'URL publique du webhook n8n n'en est pas un.
- Seul `dist/` est publié : `A-LIRE-AVANT-DE-PUBLIER.md`, ce fichier et les sources ne sont pas servis en ligne.

## À faire (état au 30 septembre 2026)

- [ ] Remplacer `boubacar-konate.fr` par le vrai domaine dans `astro.config.mjs` (`site`) ; et dans le workflow n8n (nœuds Code, Allowed Origins, adresse d'expédition).
- [ ] Mentions légales : SIRET, adresse, téléphone (`public/mentions-legales.html`).
- [ ] Ajouter `public/media/cv.pdf` et une photo HD.
- [ ] Remplacer les couvertures CSS d'Assab Vision et So Beauty Soo par des captures anonymisées, une fois leur accord obtenu.
- [ ] Ajouter les autres métiers (coach, wedding planner, artisan…) dans `src/data/niches.js`, chacun avec une vraie démo.
- [ ] Ajouter `robots.txt` dans `public/` dès que le domaine est connu (sitemap + canonical déjà en place).
- [ ] Ajouter une offre SEO/GEO aux services, avec des prix que je fixerai moi-même.
- [ ] Installer et tester le workflow n8n, puis renseigner `formEndpoint` (dans `src/layouts/Layout.astro`).
- [ ] Ajouter de vrais témoignages de Coreham et ADEI. Ne jamais en inventer.
- [ ] Supprimer les anciens fichiers racine devenus des doublons (`index.html`, `style.css`, `script.js`, `translations.js`, `site-internet-restaurant.html`, `mentions-legales.html` racine, `demos/`) — après validation du site Astro.
