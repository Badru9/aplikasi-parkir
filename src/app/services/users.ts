import { axiosInstance } from "../lib/axiosInstance";

export async function listUsers() {
  const response = await axiosInstance.get("/api/customers");

  if (response.status === 200) {
    return response.data;
  }
}

export async function getUserByPlatNo(data: any) {
  const response = await axiosInstance.get(`/api/customers/${data.plat_no}`);

  console.log(data);

  console.log(response);

  if (response) {
    return response.data;
  }
}

export async function insertBiaya(data: any) {
  const response = await axiosInstance.put(`/api/customers`, data);
  if (response) {
    return response.data;
  }
}

export async function insertCustomer(data: any) {
  const response = await axiosInstance.post("/api/customers", data);

  console.log(data);
  if (response) {
    return response.data;
  }
}
