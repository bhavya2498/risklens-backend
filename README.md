# RiskLens Backend

Node.js + Express + MongoDB Atlas. Serves two endpoints for the Android app:
- `GET /blocklist` -> `{ "domains": [...] }`
- `GET /verified-senders` -> `{ "senders": [...] }`

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and paste in your real MongoDB Atlas connection string:
   ```
   cp .env.example .env
   ```
   Then edit `.env` and replace `<username>` / `<password>` / cluster address with your
   actual Atlas values (Atlas dashboard -> Database -> Connect -> Drivers).

3. Seed the database with starter data (safe to re-run any time):
   ```
   npm run seed
   ```

4. Start the server:
   ```
   npm start
   ```
   You should see:
   ```
   Connected to MongoDB Atlas (risklens database)
   RiskLens backend running on http://localhost:3000
   ```

5. Test it in your browser or with curl:
   ```
   curl http://localhost:3000/blocklist
   curl http://localhost:3000/verified-senders
   curl http://localhost:3000/health
   ```

## Deploying for the demo

Pick one:
- **Render** (render.com) or **Railway** (railway.app) — free tier, connect your GitHub
  repo, set the `MONGODB_URI` environment variable in their dashboard, deploy. You get a
  public URL like `https://risklens-backend.onrender.com`.
- **ngrok** (quickest for a live demo) — run the server locally with `npm start`, then in
  a separate terminal run `ngrok http 3000`. It gives you a temporary public URL that
  tunnels to your laptop. Good enough for demo day, not for anything long-term.

Whichever you pick, hand the resulting base URL to Person B — that's what their Android
Retrofit/OkHttp client will call.
