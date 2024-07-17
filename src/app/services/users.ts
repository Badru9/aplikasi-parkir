import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API;

export async function listUsers(trash?: number) {
  const response = await axios.get(
    `${BASEURL}/api/customers?trash=${trash ?? 0}`
  );

  console.log(response);

  if (response.status === 200) {
    return response.data;
  }
}

export async function getUserByLicensePlate(data: any) {
  const response = await axios.get(
    `${BASEURL}/api/customers?licensePlate=${data.licensePlate}`
  );

  console.log(response);

  if (response) {
    return response.data;
  }
}

export async function insertBiaya(data: any) {
  const response = await axios.put(`${BASEURL}/api/customers`, data);
  if (response) {
    return response.data;
  }
}

export async function insertCustomer(data: any) {
  const response = await axios.post(`${BASEURL}/api/customers`, data);

  console.log(response);

  // console.log(data);

  if (response.status === 201) {
    return response.data;
  }
}

export async function deleteCustomer(data: any) {
  const response = await axios.delete(
    `${BASEURL}/api/customers?licensePlate=${data.licensePlate}`
  );
  console.log(response);

  return response;
}
