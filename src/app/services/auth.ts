import { axiosInstance } from "../lib/axiosInstance";
import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API;

export async function login(data: any) {
  console.log(data);
  console.log(BASEURL);

  const url = `${BASEURL}/api/login-pegawai`;

  const response = await axios.post(url, data);
  console.log(response);

  return response;
}
