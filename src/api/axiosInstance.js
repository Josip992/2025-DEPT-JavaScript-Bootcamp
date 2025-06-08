import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bootcamp2025.depster.me/",
});

export const createAuthAxios = (token) => {
  const authAxios = axios.create({
    baseURL: "https://bootcamp2025.depster.me/",
  });

  authAxios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return authAxios;
};

export default axiosInstance;
