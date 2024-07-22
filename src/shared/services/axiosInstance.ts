import axios, { AxiosInstance } from 'axios';
import environments from '../../environments';



const API_URL = environments.API_URL;

const Axios: AxiosInstance = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


// Example interceptor for handling authentication or error responses
// Axios.interceptors.response.use(
//   (response) => {
//     // Handle responses here if needed
//     return response;
//   },
//   (error) => {
//     // Handle errors here
//     return Promise.reject(error);
//   }
// );

export default Axios;
