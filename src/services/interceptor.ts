import axios from "axios";

const interceptor = axios.create({
  baseURL: "http://localhost:3000",
});

interceptor.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default interceptor;
