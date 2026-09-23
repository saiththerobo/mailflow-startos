# MailFlow

## Documentation

- [MailFlow README](https://github.com/maathimself/mailflow/blob/main/README.md) — the upstream project documentation

## What you get on StartOS

MailFlow runs as a single service with its own database and job queue, so there is nothing to
configure before it starts. It exposes one interface, **Web UI**, which is the webmail client
itself — you connect your existing mail accounts to it rather than receiving mail on your
server.

Your mail accounts' credentials are encrypted at rest with a key generated on your server at
install time, and the message cache lives on the service's volume, so both are included in your
StartOS backups.

## Getting set up

1. Open **Web UI** from the service's Dashboard.
2. Register an account. **The first account you register becomes the administrator** — do this
   before sharing the address with anyone else.
3. Sign in, then add a mailbox from the app's account settings. MailFlow connects to Gmail,
   iCloud, Outlook, and any IMAP server; you supply the mail account's own credentials.
4. Repeat for each mailbox you want to see. The unified inbox merges them into one view.

If you forget the administrator password, run the **Reset Admin Password** action from the
service's Actions tab and sign in with the password it sets.

## Using the available features

Everything happens in the **Web UI**: a unified inbox across every connected mailbox, full-text
search spanning all of them at once, multiple layouts, and light and dark themes.

One action is available:

- **Reset Admin Password** — sets a new password for the administrator account. Use it if you
  are locked out; it does not affect the credentials of the mail accounts you connected.

## Important limitations

**Real-time message notifications follow one address.** MailFlow validates live-update
connections against the address it was set up with — your server's `.local` LAN address. Reach
it over Tor or a public domain and mail still loads correctly, but new messages appear on
refresh rather than arriving on their own.

**Connect Gmail with an app password.** MailFlow can also connect Gmail over Google sign-in, but
that route needs Google Cloud credentials this package does not set up, so the app-password
route is the one to use here.
