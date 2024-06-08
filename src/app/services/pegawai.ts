import { axiosInstance } from "../lib/axiosInstance";

export async function listPegawai() {
  try {
    const response = await axiosInstance.get("/api/pegawai");
    console.log(response);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPegawaiByID(id: any) {
  try {
    const response = await axiosInstance.get(`/api/pegawai/${id}`);
    console.log(response);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createPegawai(data: any) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    console.log(data);
    const response = await axiosInstance.post("/api/pegawai", data, config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
