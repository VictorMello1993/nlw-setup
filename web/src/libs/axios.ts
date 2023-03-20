import { getAuth, removeToken } from './../utils/storage';
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL
})

http.defaults.headers['content-type'] = 'application/json';

// if (getAuth()) {
//   const { token } = getAuth();
//   http.defaults.headers['authorization'] = token;
// }

// http.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     switch (error.response.status) {
//       case 401:
//         removeToken();
//         navigate('/signin')
//         break;
//       default:
//         return Promise.reject(error)
//     }
//   }
// )

export { http }