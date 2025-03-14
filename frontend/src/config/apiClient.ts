import axios, { isAxiosError } from "axios";
import queryClient from "./queryClient";
import { navigate } from "@/lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const tokenRefresh = axios.create(options);
tokenRefresh.interceptors.response.use((res) => res.data);

const api = axios.create(options);

api.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    if (isAxiosError(err)) {
      const { config, response } = err;
      const { status, data } = response || {};

      console.log(data);

      if (status === 401 && data?.errorCode === "InvalidAccessToken") {
        try {
          await tokenRefresh.get("/auth/refresh");
          return config ? tokenRefresh(config) : Promise.reject(err);
        } catch {
          queryClient.clear();
          navigate("/login", {
            state: {
              redirectUrl: window.location.pathname,
            },
          });
        }
      }

      return Promise.reject({
        status,
        ...data,
      });
    }
  }
);

export default api;
