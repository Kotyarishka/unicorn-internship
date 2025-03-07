import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (isAxiosError(err)) {
      const { status, response: data } = err;

      return Promise.reject({
        status,
        data,
      });
    }
  }
);

export default api;
