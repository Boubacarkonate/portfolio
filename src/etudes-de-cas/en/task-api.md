---
title: "Task API — a clean, tested REST API in Symfony"
description: "A task-management REST API in Symfony: clear architecture, validation, consistent JSON errors, PHPUnit tests and Docker containerisation."
date: 2026-10-05
type: "Personal project"
role: "Design and development (solo)"
secteur: "REST API"
techno: ["PHP", "Symfony", "Doctrine", "SQLite", "PHPUnit", "Docker"]
repo: "https://github.com/Boubacarkonate/symfony-apiRest"
repoLabel: "symfony-apiRest"
resultat: "Complete API, covered by 7 tests, ready to deploy via Docker"
---

## The goal

To provide **public proof** of my back-end skills in PHP/Symfony: a small but **clean, complete and tested** REST API that a recruiter can read and run in a few minutes. A task manager is a deliberate choice: a simple scope keeps the focus on **code quality** rather than business complexity.

## The architecture

A REST API over a single `Task` resource, with a clear separation of concerns:

- a **Doctrine entity** `Task` (title, description, "done" state, priority, creation date);
- an **input DTO** (`TaskInput`) kept separate from the entity: incoming data is validated on the DTO, which avoids exposing or polluting the database structure;
- a thin **controller** that orchestrates deserialization, validation, persistence and response;
- persistence in **SQLite** (zero configuration) with a versioned **Doctrine migration**.

## Technical highlights

- **Validation**: Symfony constraints on the DTO (required title, length limits, bounded priority). On failure, the API returns a **422** with per-field details.
- **Consistent JSON errors**: `400` (invalid JSON), `404` (missing resource), `422` (validation) — always the same shape, never an HTML error page.
- **Controlled serialization** via **groups** (the Serializer exposes only the intended fields).
- **Endpoints**: list (with a `?done=` filter), show, create, update, toggle state (`PATCH …/toggle`) and delete.

## The tests

The project is covered by **PHPUnit**, at two levels:

- **unit tests** on the entity (initial state, done/undone toggle);
- **functional tests** that actually call the API (create, failed validation, 404, toggle then delete), on a test SQLite database **recreated cleanly for each test**.

Result: **7 tests, 22 assertions, all green**.

## Deployment

A **Dockerfile** packages the application (PHP + extensions + dependencies) for an identical start-up anywhere: the API can be deployed for free as a container (Render, Fly.io, Koyeb), with the schema applied automatically at launch.

## What the project demonstrates

- Designing an **idiomatic REST API** in Symfony (attribute routing, dependency injection, Doctrine).
- Cleanly separating **input / domain / persistence** (DTO, validation, entity).
- **Testing** both the logic and the HTTP behaviour.
- Shipping a **reproducible** project (migrations, Docker) with a **readable** commit history.

## Next steps

**JWT** authentication to protect the endpoints, **pagination** and sorting on the list, and **OpenAPI / Swagger** documentation.
