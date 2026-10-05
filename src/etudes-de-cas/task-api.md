---
title: "Task API — une API REST propre et testée en Symfony"
description: "API REST de gestion de tâches en Symfony : architecture claire, validation, erreurs JSON cohérentes, tests PHPUnit et conteneurisation Docker."
date: 2026-10-05
type: "Projet personnel"
role: "Conception et développement (solo)"
secteur: "API REST"
techno: ["PHP", "Symfony", "Doctrine", "SQLite", "PHPUnit", "Docker"]
repo: "https://github.com/Boubacarkonate/symfony-apiRest"
repoLabel: "symfony-apiRest"
resultat: "API complète, couverte par 7 tests, prête à déployer via Docker"
---

## L'objectif

Disposer d'une **preuve publique** de mes compétences back-end en PHP/Symfony : une API REST petite mais **propre, complète et testée**, qu'un recruteur peut lire et exécuter en quelques minutes. Le choix d'un gestionnaire de tâches est volontaire : un périmètre simple permet de se concentrer sur la **qualité du code** plutôt que sur la complexité métier.

## L'architecture

Une API REST sur une ressource `Task`, avec une séparation claire des responsabilités :

- une **entité Doctrine** `Task` (titre, description, état « fait », priorité, date de création) ;
- un **DTO d'entrée** (`TaskInput`) distinct de l'entité : les données reçues du client sont validées sur le DTO, ce qui évite d'exposer ou de polluer la structure de la base ;
- un **contrôleur** fin, qui orchestre désérialisation, validation, persistance et réponse ;
- la persistance en **SQLite** (zéro configuration) avec une **migration Doctrine** versionnée.

## Les points techniques

- **Validation** : contraintes Symfony sur le DTO (titre obligatoire, longueurs, priorité bornée). En cas d'erreur, l'API renvoie un **422** avec le détail par champ.
- **Erreurs JSON cohérentes** : `400` (JSON invalide), `404` (ressource absente), `422` (validation) — toujours au même format, jamais de page d'erreur HTML.
- **Sérialisation** maîtrisée via des **groupes** (le composant Serializer n'expose que les champs voulus).
- **Endpoints** : lister (avec filtre `?done=`), voir, créer, modifier, basculer l'état (`PATCH …/toggle`) et supprimer.

## Les tests

Le projet est couvert par **PHPUnit**, à deux niveaux :

- **tests unitaires** sur l'entité (état initial, bascule fait / à faire) ;
- **tests fonctionnels** qui appellent réellement l'API (création, validation en erreur, 404, toggle puis suppression), sur une base SQLite de test **recréée proprement à chaque test**.

Résultat : **7 tests, 22 assertions, tout au vert**.

## Le déploiement

Un **Dockerfile** empaquette l'application (PHP + extensions + dépendances) pour un démarrage identique partout : l'API peut être déployée gratuitement en conteneur (Render, Fly.io, Koyeb), schéma appliqué automatiquement au lancement.

## Ce que le projet démontre

- Concevoir une **API REST idiomatique** en Symfony (routing par attributs, injection de dépendances, Doctrine).
- Séparer proprement **entrée / domaine / persistance** (DTO, validation, entité).
- **Tester** à la fois la logique et le comportement HTTP.
- Livrer un projet **reproductible** (migrations, Docker) et **lisible** (historique de commits clair).

## Pistes d'évolution

Authentification **JWT** pour protéger les endpoints, **pagination** et tri sur la liste, et documentation **OpenAPI / Swagger**.
