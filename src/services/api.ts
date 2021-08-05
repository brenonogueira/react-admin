import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  withCredentials: true
});

axios.defaults.withCredentials = true;

const api2 = axios.defaults.withCredentials = true;

export default api;