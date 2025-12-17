import axios from 'axios';

export const api = axios.create({
  baseURL: (import.meta.env.VITE_MODE_ENV == "development") ? 'http://localhost:3000/api/v1' : import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
