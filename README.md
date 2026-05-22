<p align="center">
  <img src="icon.svg" alt="MailFlow Logo" width="21%">
</p>

# MailFlow on StartOS

> **Upstream repo:** <https://github.com/maathimself/mailflow>

MailFlow is a modern, self-hosted webmail client that aggregates multiple inboxes — Gmail, iCloud, Outlook, Yahoo, and any IMAP server — into a single, clean interface. Features include a unified inbox, rich-text composer with font size/family picker and file attachments, multiple layouts, dark and light themes, real-time push notifications, full-text search across all accounts, local SSO providers with self-signed certificates, and an About tab displaying the running version and build SHA.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [License](#license)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Container | Source | Architectures |
| --------- | ------ | ------------- |
| Frontend (nginx) | See build modes below | x86_64, aarch64 |
| Backend (Node.js) | See build modes below | x86_64, aarch64 |
| Database | `postgres:16-alpine` | x86_64, aarch64 |
| Cache | `redis:7-alpine` | x86_64, aarch64 |

**Build modes** — controlled by the `USE_UPSTREAM` environment variable:

| Command | Image source | Use case |
| ------- | ------------ | -------- |
| `make x86` | Built from `../services/mailflow` source ([saiththerobo/mailflow](https://github.com/saiththerobo/mailflow)) | Development / unreleased changes |
| `make x86-upstream` | `ghcr.io/maathimself/mailflow-{frontend,backend}:vX.Y.Z` | Releases against official images |

The `upstreamVersion` constant in `startos/manifest/index.ts` controls which tag is pulled in upstream mode. The git SHA of the local source is baked into the images at build time and displayed in Settings → About (source builds only).

Startup order: **postgres** and **redis** start first (in parallel), then **backend** waits for both, then **frontend** waits for backend.

The nginx config baked into the frontend image is overridden at every startup to remove the HTTPS server block (StartOS terminates TLS) and replace the `backend` Docker DNS hostname with `127.0.0.1` (all subcontainers share the same network namespace).

---

## Volume and Data Layout

| Volume | Subpath | Container | Purpose |
| ------ | ------- | --------- | ------- |
| `main` | `postgres/` | postgres | PostgreSQL data directory |
| `main` | `redis/` | redis | Redis persistence (RDB snapshots) |
| `main` | `store.json` | SDK | Auto-generated secrets |

---

## Installation and First-Run Flow

1. Install the package — three secrets are generated automatically: `SESSION_SECRET`, `DB_PASSWORD`, and `ENCRYPTION_KEY`.
2. The service's LAN URL is detected and stored as `APP_URL` (required by the backend for WebSocket origin validation).
3. Start the service — postgres initialises its database on the first boot (takes ~10 seconds).
4. Open the web UI and create your account, then add your email accounts (Gmail, iCloud, Yahoo, IMAP, etc.).

---

## Configuration Management

No user-facing configuration form. All runtime settings are passed via environment variables derived from `store.json`:

| Variable | Source | Purpose |
| -------- | ------ | ------- |
| `SESSION_SECRET` | Generated on install | Express session signing |
| `DB_PASSWORD` | Generated on install | PostgreSQL `mailflow` user |
| `ENCRYPTION_KEY` | Generated on install | Encrypts stored IMAP credentials at rest |
| `APP_URL` | Detected from StartOS interface | WebSocket origin validation, OIDC redirect URIs |

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
| --------- | ---- | -------- | ------- |
| Web UI | 80 | HTTP | MailFlow webmail interface |

**Access methods:**

- `<hostname>.local` (LAN — WebSocket notifications work here)
- Tor `.onion` address (WebSocket limited — see Limitations)
- Custom clearnet domain (if configured via StartOS gateway)

---

## Actions (StartOS UI)

| Action | Description |
| ------ | ----------- |
| Reset Admin Password | Resets the password for the first registered (admin) account |

---

## Backups and Restore

**Included in backup:**

- `main` volume (contains postgres data, redis snapshots, and `store.json` with secrets)

**Restore behavior:** The full volume is restored before the service starts. The `ENCRYPTION_KEY` in `store.json` is essential — without it, stored email credentials become unreadable.

---

## Health Checks

| Check | Daemon | Method | Display |
| ----- | ------ | ------ | ------- |
| PostgreSQL | postgres | `pg_isready` | Hidden (internal) |
| Redis | redis | `redis-cli ping` | Hidden (internal) |
| API | backend | Port 3000 listening | Hidden (internal) |
| Web Interface | frontend | Port 80 listening | Shown to user |

---

## Dependencies

None. All required services (postgres, redis) run as internal sidecar containers.

---

## Limitations and Differences

1. **WebSocket notifications** work only when accessing MailFlow from the LAN `.local` address. Tor/clearnet access connects fine but real-time push is blocked by WebSocket origin validation (a future "Set Primary URL" action will fix this).
2. **Google OAuth** (sign in with Google) is not configured — add your Gmail account via IMAP/App Password instead.
3. **VAPID push notifications** are disabled.
4. **riscv64** is not supported — the upstream source does not target that architecture.

---

## License

MailFlow is dual-licensed: **AGPL-3.0** for open-source use, and a **commercial license** for proprietary/commercial use. See the [upstream repository](https://github.com/maathimself/mailflow) for commercial licensing options.

This StartOS packaging is licensed under AGPL-3.0 (matching upstream).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: mailflow
upstream_version: 1.2.0
architectures: [x86_64, aarch64]
containers:
  frontend: source build or ghcr.io/maathimself/mailflow-frontend  # nginx, port 80
  backend:  source build or ghcr.io/maathimself/mailflow-backend   # node, port 3000
  postgres: postgres:16-alpine                               # port 5432, bind 127.0.0.1
  redis:    redis:7-alpine                                   # port 6379, bind 127.0.0.1
volumes:
  main:
    postgres/: postgresql data directory
    redis/:    redis RDB snapshots
    store.json: auto-generated secrets
ports:
  ui: 80
startup_order: [postgres, redis] -> backend -> frontend
dependencies: none
actions: [reset-admin-password]
startos_managed_env_vars:
  - SESSION_SECRET
  - DB_PASSWORD
  - ENCRYPTION_KEY
  - APP_URL
  - FRONTEND_URL
```
