import { axiosInstance } from "../lib/axiosInstance";

export async function createTransaction(parameter: any) {
  const response = await axiosInstance.post(`/api/transaction`, parameter);

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
