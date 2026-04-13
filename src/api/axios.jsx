import axios from "axios";

const createApi = () =>
  axios.create({
    baseURL: "https://d62d27a1b6e54b05.mokky.dev",
    headers: {
      "Content-Type": "application/json",
    },
  });
const classicApi = createApi();

export const getProductById = async (id) => {
  const response = await classicApi.get(`/qwe/${id}`);
  return response.data;
};

export { classicApi };
