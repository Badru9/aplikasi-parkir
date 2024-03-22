import { axiosInstance } from "../lib/axiosInstance";

export async function listUsers() {
  const response = await axiosInstance.get("/customers");
  if (response.status === 200) {
    return response.data;
  }
}
