import axiosInstance from "./axiosInstance";
const API_BASE = "https://bootcamp2025.depster.me/";

export const registerUser = async (email, password) => {
  const response = await axiosInstance.post(API_BASE + "registration", {
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post(API_BASE + "login", {
    email,
    password,
  });
  return response.data;
};
