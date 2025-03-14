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
export const getUser = async (validate?: boolean) =>
  api.get("/user", {
    validateStatus(status) {
      return validate ? status >= 200 && status < 300 : true;
    },
  }) as Promise<UserData>;

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

export type ProviderFilterValue = string | { from: number; to: number };
export type ProviderFilters = {
  name?: string;
  country?: string;
  marketShare?: { from?: number; to?: number };
  renewableEnergyPercentage?: { from?: number; to?: number };
  yearlyRevenue?: { from?: number; to?: number };
};

export const getProviders = async (filters?: ProviderFilters) =>
  api.get("/providers", {
    params: { filters },
  }) as Promise<ProvidersData>;
