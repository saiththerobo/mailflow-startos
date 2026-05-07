## How the upstream version is pulled

- `mailflow-frontend` dockerTag in `startos/manifest/index.ts`: `ghcr.io/maathimself/mailflow-frontend:<version>`
- `mailflow-backend` dockerTag in `startos/manifest/index.ts`: `ghcr.io/maathimself/mailflow-backend:<version>`
- `postgres` and `redis` images are pinned to `postgres:16-alpine` and `redis:7-alpine`.

Upstream repo: https://github.com/maathimself/mailflow

## Architecture notes

MailFlow runs as 4 subcontainers with startup ordering:

```
postgres ──┐
           ├──▶ backend ──▶ frontend (port 80)
redis   ──┘
```

All subcontainers share the host network namespace (`127.0.0.1`). The nginx
config baked into the `mailflow-frontend` image is overridden at startup
(`startos/main.ts`) to replace `proxy_pass http://backend:3000` with
`http://127.0.0.1:3000` and to remove the HTTPS server block (StartOS
terminates TLS upstream).

## Secrets

Three secrets are generated on install and stored in `store.json` on the
`main` volume:

| Key | Length | Purpose |
|-----|--------|---------|
| `sessionSecret` | 64 hex chars (32 bytes) | Express session signing |
| `dbPassword` | 32 hex chars (16 bytes) | PostgreSQL `mailflow` user |
| `encryptionKey` | 64 hex chars (32 bytes) | Encrypts stored IMAP credentials |

`appUrl` (the service's LAN URL) is also stored in `store.json` and updated
on every init. It is required by the backend for WebSocket origin validation.

## Known limitations

- WebSocket real-time notifications work only when the user accesses MailFlow
  from the `APP_URL` (the LAN `.local` address). Tor/clearnet access requires
  a future "Set Primary URL" action.
- OAuth (Google sign-in) is not wired — leave `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` unset.
- Push notifications (VAPID) are disabled by default.
