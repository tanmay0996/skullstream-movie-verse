require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const axios   = require('axios');

const app  = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
  console.error('❌ TMDB_API_KEY missing in .env');
  process.exit(1);
}
app.use(cors({ origin: 'http://localhost:5173' }));

async function fetchFromTMDB(path, params = {}) {
  const url = `https://api.themoviedb.org/3/${path}`;
  try {
    const res = await axios.get(url, {
      params: { api_key: TMDB_API_KEY, ...params },
      timeout: 15000,
    });
    return res.data;
  } catch (err) {
    console.error('🔴 TMDB proxy error:', err.stack || err);
    throw err;
  }
}

// Specific route (optional)
app.get('/api/discover/movie', async (req, res) => {
  try {
    const data = await fetchFromTMDB('discover/movie', req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dynamic catch-all
app.get('/api/:category/:resource', async (req, res) => {
  try {
    const { category, resource } = req.params;
    const data = await fetchFromTMDB(`${category}/${resource}`, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;