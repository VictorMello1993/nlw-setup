import axios from 'axios';


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL
})