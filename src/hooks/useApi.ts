import axios from "axios";

const apiClient = (token?: string) =>
  axios.create({
    baseURL: process.env.REACT_APP_LOGIN_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const api = (token?: string) => {
  return {
    get: async (url: string) => {
      return apiClient(token)
        .get(url)
        .then(({ data }) => data);
    },
    post: async (url: string, data: object) => {
      return apiClient(token)
        .post(url, data)
        .then(({ data }) => data);
    },
  };
};

export default function useApi() {
  return { api };
}
