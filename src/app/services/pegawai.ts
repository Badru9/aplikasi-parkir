import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API;

export async function listPegawai() {
  try {
    const url = `${BASEURL}/api/admin`;
    const response = await axios.get(url);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPegawaiByID(id: any) {
  try {
    const response = await axios.get(`${BASEURL}/api/admin/${id}`);
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

  const url = `${BASEURL}/api/admin`;

  try {
    console.log(data);
    const response = await axios.post(url, data, config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function updatePegawai(id: string, data: any) {
  try {
    const response = await axios.put(`${BASEURL}/api/admin/${id}`, data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function deletePegawai(id: any) {
  try {
    const response = await axios.delete(`${BASEURL}/api/admin/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
