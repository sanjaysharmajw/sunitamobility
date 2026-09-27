# Suneeta E Mobility: EV Bike Website

Marketing website for **Suneeta E Mobility**, an electric two-wheeler brand. It is a responsive single-page site with a sky blue theme. It covers the model line-up, charging and a savings calculator, and has a contact form that emails enquiries through [Resend](https://resend.com).

**Live:** https://suneetaevmobility.com · **Worker URL:** https://sunitamobility.suneetaenterprise.workers.dev

---

## Contents

1. [Tech stack](#tech-stack)
2. [Project structure](#project-structure)
3. [Local development](#local-development)
4. [Environment variables](#environment-variables)
5. [Deploying to Cloudflare](#deploying-to-cloudflare)
6. [Connecting a custom domain](#connecting-a-custom-domain)
7. [Sending email from your own domain (Resend)](#sending-email-from-your-own-domain-resend)
8. [Editing content](#editing-content)
9. [Troubleshooting](#troubleshooting)
10. [Security notes](#security-notes)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Styling | [Tailwind CSS 4](https://tailwindcss.com), [lucide-react](https://lucide.dev) icons |
| Email | [Resend](https://resend.com) (free plan: 3,000 emails/month, 100/day) |
| Hosting | [Cloudflare Workers](https://developers.cloudflare.com/workers/) via the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare) |
| CI/CD | Cloudflare Workers Builds, connected to this GitHub repository |

## Project structure

```
src/
  app/
    page.tsx              # Page layout: assembles all sections
    layout.tsx            # Fonts, <head> metadata
    globals.css           # Theme colours (@theme), animations
    api/contact/route.ts  # POST /api/contact: validates the form and sends email via Resend
  components/             # Navbar, Hero, Features, Models, Charging, Calculator, Testimonials, Contact, Footer
  lib/data.ts             # Bike models, testimonials, navigation links
public/images/            # Bike photos
wrangler.jsonc            # Cloudflare Worker configuration (name, vars, assets)
open-next.config.ts       # OpenNext adapter configuration
```

## Local development

Requires **Node.js 20.9+**.

```bash
npm install
cp .env.example .env.local     # fill in the values (see below)
npm run dev                    # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Next.js dev server with hot reload |
| `npm run lint` | ESLint |
| `npm run preview` | Build for Cloudflare and run it locally in the Workers runtime (http://localhost:8787) |
| `npm run deploy` | Build for Cloudflare and deploy from your machine |

For `npm run preview`, copy `.dev.vars.example` to `.dev.vars` and add your Resend key. Wrangler reads that file instead of `.env.local`.

## Environment variables

| Name | Required | Where it is set in production | Description |
|---|---|---|---|
| `RESEND_API_KEY` | Yes | Cloudflare **Secret** (dashboard or `wrangler secret put`) | Resend API key (`re_...`) |
| `CONTACT_TO_EMAIL` | Yes | `wrangler.jsonc` → `vars` | Inbox that receives enquiries. Separate multiple addresses with commas |
| `CONTACT_FROM_EMAIL` | No | `wrangler.jsonc` → `vars` | Sender, e.g. `Suneeta E Mobility <hello@suneetaevmobility.com>`. Defaults to `onboarding@resend.dev` |

> Until a domain is verified in Resend, emails can only be delivered to the address the Resend account was created with.

Local values go in `.env.local` (for `npm run dev`) and `.dev.vars` (for `npm run preview`). Git ignores both files. `.env.example` and `.dev.vars.example` are committed, so they must only ever contain placeholders.

---

## Deploying to Cloudflare

The app is compiled for Cloudflare Workers by `@opennextjs/cloudflare`. Pages and images are served as static assets, and `/api/contact` runs in the Worker.

### Option A: Automatic deploys from GitHub (current setup)

The Worker `sunitamobility` is connected to this repository through **Cloudflare Workers Builds**. Every push to `main` builds and deploys automatically.

**One-time setup** (already done for this project; listed here for reference):

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository**, then select this GitHub repo.
2. Under **Settings → Build → Build configuration**, set:

   | Setting | Value |
   |---|---|
   | Build command | `npx opennextjs-cloudflare build` |
   | Deploy command | `npx opennextjs-cloudflare deploy` |
   | Root directory | `/` |
   | Production branch | `main` |

3. Under **Settings → Variables and Secrets**, click **Add**, choose **Type: Secret**, and create `RESEND_API_KEY`.

> **Important:** The Worker name in `wrangler.jsonc` (`"name": "sunitamobility"`) must match the Worker name in the dashboard. Otherwise builds fail.

**Day-to-day workflow:**

```bash
git add -A
git commit -m "Describe your change"
git push origin main
```

Track progress under **Workers & Pages → sunitamobility → Deployments → Recent builds**. If a build fails, open it to see the log, fix the issue, and push again (or choose **Retry build**).

### Option B: Manual deploy from your machine

```bash
npx wrangler login                        # one time: authorise Wrangler in the browser
npx wrangler secret put RESEND_API_KEY    # one time: paste the key when prompted
npm run deploy                            # build + deploy
```

### Configuration notes

- **Plain variables** (such as `CONTACT_TO_EMAIL`) belong in `wrangler.jsonc`. Every deploy overwrites plain-text variables that were added in the dashboard, so change them in the file, not the dashboard.
- **Secrets** persist across deploys and must never be written to `wrangler.jsonc`. Ignore the dashboard banner that suggests copying variables into your Wrangler config when those variables are secrets.
- **Images:** Workers has no built-in Next.js image optimiser, so `images.unoptimized` is enabled in `next.config.ts`. Compress images (WebP/AVIF, around 1,200 px wide) before adding them to `public/images/`.

---

## Connecting a custom domain

This walkthrough follows how `suneetaevmobility.com` (registered at GoDaddy) was connected. The steps are the same for other registrars.

### Step 1: Add the domain to Cloudflare

1. Cloudflare dashboard → **Account Home → Add a domain**, enter the domain, and choose the **Free** plan.
2. Review the DNS records that Cloudflare imports. **Delete** any records that point the root domain or `www` to the old host, so the Worker can claim those hostnames:

   | Record | Action |
   |---|---|
   | `A` for the root domain (e.g. GoDaddy parking IPs `15.197.148.33`, `3.33.130.190`) | Delete |
   | `CNAME` for `www` | Delete (it is recreated in Step 3) |
   | `TXT` / `MX` records used for email (e.g. `_dmarc`) | Keep |

3. Click **Continue to activation**. Cloudflare assigns two nameservers, for example `brian.ns.cloudflare.com` and `lovisa.ns.cloudflare.com`.

### Step 2: Point the registrar to Cloudflare

At GoDaddy: **My Products → Domains → *your domain* → DNS → Nameservers → Change Nameservers → "I'll use my own nameservers"**. Enter both Cloudflare nameservers exactly as shown, and save.

Then click **Check nameservers now** in Cloudflare. Activation usually takes 15 minutes to 2 hours (at most 24 hours), and Cloudflare sends an email when the domain is **Active**.

To verify from a terminal:

```bash
whois suneetaevmobility.com | grep -i "name server"   # should list *.ns.cloudflare.com
dig +short NS suneetaevmobility.com @1.1.1.1
```

### Step 3: Attach the domain to the Worker

1. **Workers & Pages → sunitamobility → Domains → + Add Domain**.
2. Add `suneetaevmobility.com`.
3. Repeat for `www.suneetaevmobility.com`.

Cloudflare creates the DNS records and issues the SSL certificate automatically. HTTPS is usually live within 5 to 15 minutes.

```bash
curl -I https://suneetaevmobility.com        # expect HTTP/2 200
curl -I https://www.suneetaevmobility.com
```

---

## Sending email from your own domain (Resend)

Without a verified domain, enquiries are sent from `onboarding@resend.dev` and can only reach the Resend account owner. Verifying the domain improves deliverability and allows a branded sender.

1. Resend dashboard → **Domains → Add Domain** → `suneetaevmobility.com`.
2. Choose **Auto configure** (Cloudflare integration), or copy the MX, SPF (TXT) and DKIM records into Cloudflare → **DNS → Records**. Set them to **DNS only** (grey cloud).
3. Once the domain shows **Verified**, add this to `wrangler.jsonc`:

   ```jsonc
   "vars": {
     "CONTACT_TO_EMAIL": "suneetaenterprise@gmail.com",
     "CONTACT_FROM_EMAIL": "Suneeta E Mobility <hello@suneetaevmobility.com>"
   }
   ```

4. Commit and push. The next deploy picks up the change.

---

## Editing content

| What | File |
|---|---|
| Theme colours | `src/app/globals.css` (`@theme` block) |
| Bike models, specs and photos | `src/lib/data.ts` (`MODELS`), images in `public/images/` |
| Testimonials, navigation | `src/lib/data.ts` |
| Hero headline and stats | `src/components/Hero.tsx` |
| Features, charging specs | `src/components/Features.tsx`, `src/components/Charging.tsx` |
| Phone, email, address | `src/components/Contact.tsx`, `src/components/Footer.tsx` |
| SEO title and description | `src/app/layout.tsx` |
| Enquiry email template | `src/app/api/contact/route.ts` |

A model with `featured: true` in `MODELS` is shown as the large card below the others. Optional specs (`topSpeed`, `charge`) are hidden when they are omitted.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Build fails after adding `wrangler.jsonc` | Build settings still run a plain `next build` | Set the build and deploy commands shown in [Option A](#option-a-automatic-deploys-from-github-current-setup) |
| Build fails with a name mismatch | `name` in `wrangler.jsonc` differs from the dashboard Worker | Make them identical (`sunitamobility`) |
| Form shows "Email service is not configured" | `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing | Add the secret in the dashboard, check `vars`, and redeploy |
| Form shows "Could not send your message" | Resend rejected the send | Open **Observability → Logs**. Usually the recipient is not the Resend account email and no domain is verified |
| `ERR_SSL_UNRECOGNIZED_NAME_ALERT` in the browser right after switching nameservers | Your router or computer still caches the old DNS | Test on mobile data, set DNS to `1.1.1.1`, flush the cache (`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`), and clear Chrome's cache at `chrome://net-internals/#dns` |
| `www` does not load | No custom domain was added for `www` | Add `www.<domain>` under **Domains** |
| GitHub rejects the push ("Push cannot contain secrets") | A real API key was committed | Replace it with a placeholder, amend the commit, and rotate the key |

---

## Security notes

- Never commit real keys or tokens. Keep them in `.env.local`, `.dev.vars` and Cloudflare Secrets only. GitHub push protection blocks commits that contain Resend keys.
- If a key or token is ever shared (chat, screenshot, commit), **rotate it**: create a new key in Resend or GitHub, update the Cloudflare Secret, and delete the old key.
- The contact API validates input server-side, escapes HTML in emails, limits field lengths, and uses a hidden honeypot field to filter bots.
