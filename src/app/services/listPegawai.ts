import { axiosInstance } from "../lib/axiosInstance";

export async function listPegawai() {
  const response = await axiosInstance.get("/pegawai");
  console.log(response);
  if (response.status === 200) {
    return response.data;
  }
}
