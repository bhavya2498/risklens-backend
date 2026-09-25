require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env — copy .env.example to .env and fill it in.');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db('risklens'); // database name — matches seed.js
  console.log('Connected to MongoDB Atlas (risklens database)');
}

// GET /blocklist -> { "domains": [...] }
// Field name "domains" is fixed — Person B's Android networking code hardcodes it.
app.get('/blocklist', async (req, res) => {
  try {
    const docs = await db.collection('blocklist').find({}).toArray();
    const domains = docs.map((d) => d.domain);
    res.json({ domains });
  } catch (err) {
    console.error('Error fetching blocklist:', err);
    res.status(500).json({ error: 'Failed to fetch blocklist' });
  }
});

// GET /verified-senders -> { "senders": [...] }
// Field name "senders" is fixed — Person B's Android networking code hardcodes it.
app.get('/verified-senders', async (req, res) => {
  try {
    const docs = await db.collection('verified-senders').find({}).toArray();
    const senders = docs.map((d) => d.sender);
    res.json({ senders });
  } catch (err) {
    console.error('Error fetching verified senders:', err);
    res.status(500).json({ error: 'Failed to fetch verified senders' });
  }
});

// Simple health check — useful to confirm the server + DB connection are alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`RiskLens backend running on http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/blocklist`);
    console.log(`Try: http://localhost:${PORT}/verified-senders`);
  });
}

start();
