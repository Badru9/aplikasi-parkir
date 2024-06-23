import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API;

export async function updateImage(data: any, id: string) {
  console.log("check", data, id);

  const response = await axios.post(`${BASEURL}/api/admin/${id}`, data, {
    headers: {
      Accept: "multipart/form-data",
    },
  });

  console.log(response);

  return response;
}
