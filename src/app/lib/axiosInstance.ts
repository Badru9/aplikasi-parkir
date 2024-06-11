import axios from "axios";

const API = process.env.API;

export const axiosInstance = axios.create({
  baseURL: API,
});
