ENV Vars:
```
DATABASE_URL={postgres_url}
JWT_SECRET={random_string}
UPLOAD_DIR=/data/uploads
RESEND_API_KEY=
CONTACT_EMAIL=admin@texasphilanthropynetwork.org
FROM_EMAIL=contact@texasphilanthropynetwork.org

Deploy command (first startup):
npx prisma migrate deploy && npx prisma db seed && npm run start

Deplay (all other startups):
npx prisma migrate deploy && npm run start
```