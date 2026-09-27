# Suneeta E Mobility: EV Bike Website

Modern, responsive single-page website for the Suneeta E Mobility electric bike brand. It is built with Next.js 16 and Tailwind CSS 4, and the contact form sends email through [Resend](https://resend.com).

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Contact form email setup (Resend, free plan)

1. Sign up at https://resend.com (free plan: 3,000 emails/month, 100/day).
2. Create an API key at https://resend.com/api-keys.
3. In `.env.local`:
   - `RESEND_API_KEY`: your key (`re_...`)
   - `CONTACT_TO_EMAIL`: the inbox that should receive enquiries. Until you verify a domain,
     Resend only delivers to the email address you signed up with.
4. Optional: verify your own domain in Resend, then set
   `CONTACT_FROM_EMAIL="Suneeta E Mobility <hello@yourdomain.com>"`.

Restart `npm run dev` after changing env values. When you deploy to Vercel or another host, add the same variables in its environment settings.

## Where to edit content

| What | File |
|---|---|
| Colours (sky blue theme) | `src/app/globals.css` (`@theme` block) |
| Bike models, prices, testimonials, nav links | `src/lib/data.ts` |
| Phone, email, address | `src/components/Contact.tsx`, `src/components/Footer.tsx` |
| Bike illustration | `src/components/EVBike.tsx` |
| Email template | `src/app/api/contact/route.ts` |

### Using real bike photos

Put your photos in `public/images/` (for example `suneeta-pro.jpg`) and replace `<EVBike ... />` in
`Hero.tsx` or `Models.tsx` with:

```tsx
import Image from "next/image";
<Image src="/images/suneeta-pro.jpg" alt="Suneeta Pro" width={800} height={480} className="w-full" />
```

## Deploy to Cloudflare (Workers)

The site runs on Cloudflare Workers through the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare), so the contact form API works there too.

```bash
npx wrangler login                          # one time: opens the browser to sign in to Cloudflare
npx wrangler secret put RESEND_API_KEY      # one time: paste your Resend API key
npm run deploy                              # build + deploy, prints your *.workers.dev URL
```

- `CONTACT_TO_EMAIL` is set in `wrangler.jsonc` under `vars`.
- Local Cloudflare preview: copy `.dev.vars.example` to `.dev.vars`, fill in the key, then `npm run preview` (http://localhost:8787).
- Custom domain: Cloudflare dashboard → Workers & Pages → `sunitamobility` → Settings → Domains & Routes.
