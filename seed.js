// Run with: npm run seed
// Populates the 'blocklist' and 'verified-senders' collections with starter data.
// Safe to re-run — it clears each collection first, then re-inserts.

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

const blocklistDomains = [
  'amaz0n-secure.com',
  'payp1a-secure.net',
  'sbi-kyc-update.tk',
  'aadhar-kyc-verify.tk',
  'wa-verify-account.info',
  'netflix-billing-update.xyz',
  'freeiphone-claim.info',
  'cryptoreturns-fast.io',
  'track-parcel-fee.com',
  'payroll-verify-portal.com',
  'secure-bankverify.co'
];

const verifiedSenders = [
  'AMAZON',
  'PAYPAL',
  'NETFLIX',
  'GOOGLE',
  'MICROSOFT',
  'SBIBNK',
  'HDFCBK',
  'ICICIB',
  'SWIGGY',
  'ZOMATO',
  'UBER',
  'AIRTEL'
];

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('risklens');

    const blocklistCol = db.collection('blocklist');
    await blocklistCol.deleteMany({});
    await blocklistCol.insertMany(blocklistDomains.map((domain) => ({ domain })));
    console.log(`Inserted ${blocklistDomains.length} domains into blocklist`);

    const sendersCol = db.collection('verified-senders');
    await sendersCol.deleteMany({});
    await sendersCol.insertMany(verifiedSenders.map((sender) => ({ sender })));
    console.log(`Inserted ${verifiedSenders.length} senders into verified-senders`);

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await client.close();
  }
}

seed();
