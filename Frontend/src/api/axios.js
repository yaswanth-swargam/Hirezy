import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: 'https://hirezy-production.up.railway.app/api',
  withCredentials: true  // sends cookie automatically with every request
});

export default api;