import api from "@/config/apiClient";
import { LoginInput, RegisterInput } from "@/validators/auth";
import { CreateProviderInput, EditProviderInput } from "@/validators/provider";
import { TokenInput } from "@/validators/token";

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

export const getProvider = async (id: string) => {
  return api.get(`/providers/${id}`) as Promise<{ provider: Provider }>;
};

export const createProvider = async (data: CreateProviderInput) =>
  api.post("/providers", data) as Promise<{
    provide: Provider;
    message: string;
  }>;

export const editProvider = async (id: string, data: EditProviderInput) =>
  api.put(`/providers/${id}`, data) as Promise<{
    provider: Provider;
    message: string;
  }>;

export const deleteProvider = async (id: string) =>
  api.delete(`/providers/${id}`) as Promise<{
    message: string;
  }>;

export type Token = {
  _id: string;
  description?: string;
  createdAt: string;
  expiresAt: string;
};
export type TokensData = {
  tokens: Token[];
  count: number;
};

export const getTokens = async () => api.get("/tokens") as Promise<TokensData>;
export const createToken = async (data: TokenInput) =>
  api.post("/tokens", data) as Promise<{ token: string; message: string }>;
export const deleteToken = async (id: string) =>
  api.delete(`/tokens/${id}`) as Promise<{ message: string }>;
