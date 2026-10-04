# Portfolio — Boubacar Konaté

Portfolio de **Boubacar Konaté**, développeur web full stack à Paris.
Site vitrine bilingue (FR / EN) présentant mon parcours, mes compétences et mes réalisations.

🔗 **En ligne : [boubacarkonate.github.io/portfolio](https://boubacarkonate.github.io/portfolio/)**

---

## Aperçu

- **Bilingue FR / EN** avec URLs séparées (`/` et `/en/`) et balises `hreflang`.
- **Accessible** (niveau AA) : navigation clavier complète, menu mobile avec `inert`, focus visible, `prefers-reduced-motion`.
- **SEO soigné** : titres et descriptions uniques, Open Graph, `canonical`, données structurées JSON-LD, `sitemap.xml` généré automatiquement.
- **Responsive**, sans aucune valeur en `px` (unités relatives : `rem`, `em`, `%`, unités de fenêtre).
- **100 % statique** : HTML/CSS/JS générés par Astro, zéro dépendance côté serveur.

## Stack

- [Astro](https://astro.build/) — générateur de site statique
- HTML, CSS (design system avec tokens), JavaScript
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- Polices : Fraunces & Instrument Sans · Icônes : Font Awesome
- Hébergement : GitHub Pages (déploiement automatique via GitHub Actions)

## Lancer en local

Prérequis : **Node.js ≥ 22**.

```bash
npm install      # installer les dépendances
npm run dev      # serveur de développement : http://localhost:4321
npm run build    # générer le site dans dist/
npm run preview  # prévisualiser le build
```

## Structure

```
src/
  layouts/Layout.astro        en-tête, pied de page, <head>, scripts client
  pages/
    index.astro               accueil FR
    en/index.astro            accueil EN
    etudes-de-cas/            études de cas (liste + détail, en Markdown)
    404.astro
  etudes-de-cas/*.md          contenu des études de cas
public/
  style.css                   styles du site (tokens dans :root)
  media/                      images, CV, favicon, og-image
  demos/orvelle/              démo (restaurant fictif), site autonome
astro.config.mjs              config Astro : site, base, i18n, sitemap
.github/workflows/deploy.yml  build + déploiement GitHub Pages
```

## Déploiement

Chaque `git push` sur `main` déclenche le workflow [GitHub Actions](.github/workflows/deploy.yml) :
build Astro puis publication sur GitHub Pages. Aucune étape manuelle.

## Contact

- ✉️ boubacar.konate@outlook.fr
- 💼 [LinkedIn](https://www.linkedin.com/in/boubacar-konaté-a87531261)
- 🐙 [GitHub](https://github.com/Boubacarkonate)
