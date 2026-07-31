# CodeArc

Marketing website for [codearc.co.in](https://codearc.co.in) — software studio and product family (RestroSuite, StaySuite, MediSuite).

## Run locally

```bash
npm install
cp .env.example .env   # fill Razorpay keys
npm run dev
```

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript validation |
| `npm test` | Automated unit tests |
| `npm run check` | Full release check |

## Razorpay setup

1. Copy `.env.example` → `.env`.
2. Add **test** keys from the Razorpay dashboard:
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` (server)
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (browser — same key id)
3. For production, set `RAZORPAY_WEBHOOK_SECRET` and point Razorpay to
   `https://your-domain/api/razorpay-webhook` for `payment.captured` / `payment.failed`.

Checkout sends a **planId**, but the amount comes from `src/data/pricing.ts` on the server. Verification checks the signature and then fetches the order and payment directly from Razorpay to confirm the plan, amount, currency, order relationship, and provider status.

Razorpay is the durable payment system of record. The app emits structured payment events to the hosting logs for operational support; it does not write transaction records to an ephemeral application filesystem.

## Pay page

- `/pay` — all plans
- `/pay?plan=restrosuite-setup` — deep-link a plan
