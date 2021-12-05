import Axios from "axios";

const url = `${process.env.API_BASE_URL}`;

export const getWearList = () =>
  Axios.get(`${url}/prendas`).then(({ data }) => data);
