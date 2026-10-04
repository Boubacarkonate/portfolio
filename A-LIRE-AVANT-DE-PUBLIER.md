# À lire avant de publier

Ce fichier est pour toi. Ne le mets pas en ligne.

## Ce qui a changé

- **4 nouvelles réalisations**, dans cet ordre : clients, projets pros, démos, projets perso, produit.
  - **Assab Vision** et **So Beauty Soo** : étiquette « Projet professionnel ». Couverture illustrée en CSS, puisque ces applications ne sont pas publiques. Aucun lien.
  - **Orvelle** : site de démonstration pour un restaurant fictif, dans `demos/orvelle/`.
  - **Suivi automatique des devis** : démo n8n avec sa page de cas (`demos/automatisation/`), le workflow à importer, le modèle de tableau et un guide.
- **Haut de page** : le cadre arrière montre maintenant Orvelle.
- **Formulaire** : il envoie aussi `service_id`, `budget_id` et `lang`, utilisés par le workflow n8n. Sans n8n, rien ne change.
- **Mentions légales** : ajout des prestataires techniques et de la relance unique.

## À faire de ton côté

1. **Images existantes** : le zip ne contient que les images nouvelles ou modifiées. Garde dans `public/media/projects/` celles que tu as déjà : flashnet75.png, heritage.png, socialErp.png, travel.jpg, ccsforge.png. Ajoute adei-france.png si ce n'est pas fait.
2. **Assab Vision et So Beauty Soo** : demande l'accord pour publier une capture anonymisée (données fictives, logo masqué). Une vraie capture vaut mieux qu'une illustration.
3. **Automatisation** : suis `demos/automatisation/GUIDE.md`. Ton adresse outlook.fr ne peut pas envoyer d'e-mails depuis n8n (voir l'étape 4 du guide).
4. **Formulaire** : tant que le workflow n'est pas installé **et testé**, laisse `formEndpoint` vide dans `script.js`. Le formulaire ouvre alors la messagerie du visiteur.
5. **Encore à compléter** :
   - SIRET, adresse et téléphone dans les mentions légales ;
   - domaine `boubacar-konate.fr`, à remplacer par le vrai dans `index.html` et dans le workflow n8n ;
   - `cv.pdf` ;
   - photo HD.
