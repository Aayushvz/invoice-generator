# Invoice Generator - aayushvz

A free, browser-based invoice generator. Fill in a form, pick a template,
get a real PDF. No account, no subscription, and nothing about your
clients sent to a server.

Part of the tools on [aayushvisuals.com](https://aayushvisuals.com), built
to the same design language as the
[contract generator](https://aayushvisuals.com/contract).

## Credit

This is a fork of [al1abb/invoify](https://github.com/al1abb/invoify) by
Ali Abbasov, MIT licensed. The invoice engine, the PDF pipeline and the
eighteen locales are that project's work. What this fork adds is a
different interface: the shell, panels, controls and type are rebuilt on
the design system the rest of the site's tools use.

If you want the original, go to the upstream repo — it is actively
maintained and this fork is not a replacement for it.

## What your data does

Nothing leaves your browser except when you ask for a PDF.

- The draft you are typing, your saved senders and your saved clients live
  in `localStorage` and IndexedDB, on your machine.
- Generating a PDF posts the invoice to an API route that renders it and
  sends the file back. It is not stored.
- Emailing a PDF is the one feature that needs credentials, and it is off
  unless you configure them.

## Running it

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build     # production build
npm run test:e2e  # Playwright suite
```

### Environment variables

None are required to run the app locally. For a deployment:

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, OG image | Without it these resolve against the wrong origin |
| `NODEMAILER_EMAIL` | Emailing a PDF | Feature is simply unavailable without it |
| `NODEMAILER_PW` | Emailing a PDF | An app password, not your account password |
| `GOOGLE_SC_VERIFICATION` | Search Console | Optional |

### PDFs in production

PDF generation runs headless Chrome. Locally that is `puppeteer`; on a
serverless host it is `puppeteer-core` with `@sparticuz/chromium`, which
is already a dependency and is selected at runtime. Nothing to configure.

## Built with

Next.js 15, TypeScript, React, Tailwind, shadcn/ui, react-hook-form with
Zod, next-intl, and Puppeteer for the PDF.

## Licence

MIT, inherited from the upstream project. See [LICENSE](LICENSE), which
keeps Ali Abbasov's copyright notice as the licence requires.
