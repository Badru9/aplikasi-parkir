import { axiosInstance } from "../lib/axiosInstance";

export async function login(data: any) {
  const response = await axiosInstance.post("/api/login-pegawai", data);
  console.log(response);

  return response;
}
