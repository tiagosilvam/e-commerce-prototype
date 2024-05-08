import axios from "axios";

export const fetcher = async (url: string) => {
  return axios.get(url).then(({ data }) => data);
};
