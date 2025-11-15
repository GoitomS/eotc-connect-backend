🧠 Agents.md — EOTConnect Project Context 📘 Project Overview

EOTConnect is a large-scale religious mobile application built to support spiritual growth, education, and community engagement within the Orthodox tradition. It includes three core pillars:

Daily Spiritual Life — Liturgical calendar, prayers, Psalms, journals, Bible with commentary, study plans, and devotions.

Educational and Knowledge Resources — Dogma and canon texts, moral/ethical discussions, media center for sermons, and liturgy guides.

Community and Service — Church directories, GPS-integrated locations, prayer requests, moderated forums, volunteer/donation tools, historical media, and kids' learning sections.

The platform will serve high volumes of users globally, focusing on scalability, modularity, and smooth user experience.

⚙️ Technical Overview 🏗️ Architecture

Backend Application

Contains:

This application — Node.js + Express API using Sequelize ORM with PostgreSQL

📦 Core Stack Layer Technology Purpose Database PostgreSQL Persistent structured data ORM Sequelize (TypeScript) Database modeling & migrations Backend Express.js REST API with JWT auth Storage DigitalOcean Spaces Media uploads (images, audio, video) Deployment DigitalOcean App Platform Managed infrastructure API Docs Swagger (planned) Auto-generated API documentation Version Control GitHub (Turborepo structure) Code organization and CI/CD integration 🔐 Authentication

Uses JWT-based authentication.

Endpoints:

POST /auth/register → Create user account

POST /auth/login → Return JWT + user profile

Tokens are verified via middleware on protected routes.

🧱 Database Entities (MVP) Table Description Key Fields users Registered users id, name, email, password, role prayers Predefined prayer texts id, title, content, category bible_passages Bible content segmented by book/chapter/verse id, book, chapter, verse, text journals User-created reflections id, user_id, title, content, created_at churches Church directory id, name, address, latitude, longitude, contact_info media Videos, sermons, images id, type, title, url, category 🚀 Development Setup

Clone repo

git clone <repo_url> && cd EOTC-CONNECT_BACKEND

Install dependencies

npm install

Setup database

Create a PostgreSQL DB.

Copy .env.example → .env and update DB credentials.

Run Sequelize migrations:

npm run migrate

Run backend

npm run dev

🤖 AI Agent Guidelines Goals

Agents should:

Maintain data consistency between backend, and DB models.

Follow TypeScript strictness.

Generate modular, testable code.

Create PR-ready changes (documented, linted, typed).

When adding new models → update Sequelize.

Coding Conventions

Language: TypeScript for all code.

Linting: Use ESLint + Prettier.

Style: Use async/await syntax only.

Commits: Conventional commits (e.g., feat(auth): add refresh token endpoint).

Branching: main, dev, feature branches per task.

Environment Variables

Agents must handle:

PORT=4000 DB_HOST=localhost DB_USER=postgres DB_PASS=postgres DB_NAME=eotconnect JWT_SECRET=supersecret DIGITALOCEAN_SPACES_KEY= DIGITALOCEAN_SPACES_SECRET= DIGITALOCEAN_SPACES_BUCKET=

Phase 1:

User registration & login

Daily prayers, Psalms, journals

Bible viewer (read-only)

Church directory (static seed)

Phase 2:

Media center (videos, sermons)

Study and devotion plans

Community features (forum, prayer requests)

Phase 3:

Donations & volunteering

Advanced Bible tools (search, annotations)

Gamified quiz for youth section

🧑‍💻 Ownership and Permissions

Primary Maintainer: Goitom Kassaye

AI Collaborators: factory.ai agents

Human-AI Code Ownership: All AI-generated code must include a header comment:

/**
 * AI-generated code by factory.ai Droid
 * [Brief description of the file's purpose]
 */
