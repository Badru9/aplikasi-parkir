import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API;

export async function createTransaction(parameter: any) {
  const url = `${BASEURL}/api/transaction`;

  const response = await axios.post(url, parameter);

  return response;

  //   return await axiosInstance
  //     .post(`/api/transaction`, parameter)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
}
