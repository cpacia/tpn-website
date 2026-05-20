ENV Vars:
```
DATABASE_URL={postgres_url}
JWT_SECRET={random_string}
UPLOAD_DIR=/data/uploads
RESEND_API_KEY=
CONTACT_EMAIL=admin@texasphilanthropynetwork.org
FROM_EMAIL=contact@texasphilanthropynetwork.org
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

Deploy command (first startup):
npx prisma migrate deploy && npx prisma db seed && npm run start

Deplay (all other startups):
npx prisma migrate deploy && npm run start
```

Stripe setup:
1. In the Stripe dashboard, add a webhook endpoint pointing at
   `https://<your-domain>/api/webhooks/stripe` and subscribe to:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
2. `STRIPE_SECRET_KEY` is required server-side for Checkout.
3. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is not used by the current
   redirect-to-Checkout flow — keep it if you plan to embed Stripe Elements
   later.
4. Local webhook testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`