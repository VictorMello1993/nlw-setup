import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL,
})

http.defaults.headers['content-type'] = 'application/json';

export { http }