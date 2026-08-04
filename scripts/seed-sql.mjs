import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN || 'YOUR_SUPABASE_ACCESS_TOKEN';
const REF = 'swwcblmsymbwshsxqhag';
const API_URL = `https://api.supabase.com/v1/projects/${REF}/database/query`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');

// Split by semicolons and filter empty lines
const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);

async function run() {
  for (const stmt of statements) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: stmt + ';' }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`Error on statement: ${stmt.slice(0, 80)}... -> ${res.status} ${text}`);
    } else {
      console.log(`OK: ${stmt.slice(0, 60)}...`);
    }
  }
  console.log('Seed complete');
}

run();
