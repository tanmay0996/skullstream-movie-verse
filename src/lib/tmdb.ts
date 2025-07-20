import axios from 'axios';
// Use real API in dev (via Vite proxy) and production (same domain)
const BASE = import.meta.env.PROD ? '/api' : '/api';

export const tmdb = axios.create({
  baseURL: BASE,
  params: { language: 'en-US' },
});