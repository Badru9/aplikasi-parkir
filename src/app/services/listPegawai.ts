import { axiosInstance } from "../lib/axiosInstance";

export async function listPegawai() {
  const APIVersion = "/api";

  try {
    const response = await axiosInstance.get("/api/pegawai");
    console.log(response);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {}
}
