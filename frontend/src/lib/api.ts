import api from "@/config/apiClient";
import { LoginInput, RegisterInput } from "@/validators/auth";

export const login = async (data: LoginInput) => api.post("/auth/login", data);
export const register = async (data: RegisterInput) =>
  api.post("/auth/register", data);

export type User = {
  _id: string;
  email: string;
};
export type UserData = {
  user: User;
};
export const getUser = async () => api.get("/user") as Promise<UserData>;

export type Provider = {
  _id: string;
  name: string;
  country: string;
  marketShare: number;
  renewableEnergyPercentage: number;
  yearlyRevenue: number;
};
export type ProvidersData = {
  providers: Provider[];
  count: number;
};
export const getProviders = async () =>
  api.get("/providers") as Promise<ProvidersData>;
