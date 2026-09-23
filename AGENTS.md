# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

## This repo

### How the upstream version is pulled

- `mailflow-frontend` / `mailflow-backend` dockerTags in `startos/manifest/index.ts`:
  `ghcr.io/maathimself/mailflow-{frontend,backend}:<upstreamVersion>`
- `postgres` and `redis` are pinned to `postgres:16-alpine` and `redis:7-alpine`.
- `USE_UPSTREAM=1 make x86` pulls the official images; plain `make x86` builds from
  `../services/mailflow` (the [saiththerobo fork](https://github.com/saiththerobo/mailflow)).

Upstream repo: <https://github.com/maathimself/mailflow>

### Architecture

Four subcontainers with startup ordering:

```
postgres ──┐
           ├──▶ backend ──▶ frontend (port 80)
redis   ──┘
```

All subcontainers share one network namespace, so they reach each other on `127.0.0.1`.

### The nginx override

`startos/main.ts` writes `nginxConf` (from `startos/utils.ts`) over
`/etc/nginx/conf.d/default.conf` in the frontend subcontainer at every startup. It exists
because the image's own config terminates TLS (StartOS does that upstream) and resolves the
backend by the Docker DNS name `backend`, which does not exist here.

Upstream explicitly supports this: its config carries a `# mailflow-managed` marker on the
resolver line, and its `16-detect-resolver.sh` leaves any file without that marker untouched.

**When bumping the upstream version, diff the image's `default.conf` against `nginxConf` and
port over any new `location` blocks** — upstream adds them with route-specific timeouts that
the generic `/api/` block gets wrong:

```bash
podman run --rm --entrypoint sh ghcr.io/maathimself/mailflow-frontend:<ver> \
  -c 'cat /etc/nginx/conf.d/default.conf' | grep -n 'location'
```

Validate the result before shipping — mount the generated config into the real image and run
`nginx -t`. Note `nginxConf` is a TypeScript template literal: comments inside it are nginx
comments (`#`), never `//`, and every `\` needs escaping.

### Secrets

Generated on install into `store.json` on the `main` volume:

| Key | Length | Purpose |
|-----|--------|---------|
| `sessionSecret` | 64 hex chars (32 bytes) | Express session signing |
| `dbPassword` | 32 hex chars (16 bytes) | PostgreSQL `mailflow` user |
| `encryptionKey` | 64 hex chars (32 bytes) | Encrypts stored IMAP credentials |

`appUrl` is also stored there and refreshed on every init — the backend needs it for WebSocket
origin validation and OIDC redirect URIs. It is read off the `ui-multi` host's bindings via
`sdk.host.getOwn` (SDK 2.0 moved interfaces onto their binding).

### Known limitations

- WebSocket real-time notifications work only when the user reaches MailFlow at `APP_URL`
  (the LAN `.local` address). Tor/clearnet needs a future "Set Primary URL" action.
- Gmail OAuth exists upstream (3.4.0+) but needs `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`,
  which this package does not set — users connect Gmail with an app password.
- VAPID push notifications are disabled.
- riscv64 is unsupported; upstream does not target it.
