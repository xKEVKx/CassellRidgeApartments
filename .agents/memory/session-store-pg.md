---
name: connect-pg-simple session store driver
description: Why the session store needs its own node-postgres pool, not the Neon serverless pool
---

# connect-pg-simple must use a dedicated node-postgres (`pg`) pool

Admin sessions persist in PostgreSQL via `connect-pg-simple` (configured in `server/routes.ts`) so logins survive restarts/publishes. It runs on its own `pg.Pool`, NOT the app's `@neondatabase/serverless` pool.

**Why:** `@neondatabase/serverless` uses an HTTP fetch transport (`poolQueryViaFetch`) that throws `Cannot read properties of null (reading 'map')` on the DDL (`createTableIfMissing`) and DELETE-without-RETURNING queries `connect-pg-simple` issues. A dedicated `pg` pool uses the normal wire protocol and works.

**How to apply:** If touching session storage or swapping DB drivers, keep the separate `pg.Pool` for the session store. Don't "consolidate" it into the Neon pool — it will break session table creation/pruning.
