import { axiosInstance } from "../lib/axiosInstance";

export async function listUsers() {
  const response = await axiosInstance.get("/api/customers");
  if (response.status === 200) {
    return response.data;
  }
}

export async function getUserByPlatNo(plat_no: string) {
  const response = await axiosInstance.get(`/api/customers/${plat_no}`);
  if (response.status === 200) {
    return response.data;
  }
}

export async function insertBiaya(data: any) {
  const response = await axiosInstance.put(`/api/customers`, data);
  if (response.status === 201) {
    return response.data;
  }
}
