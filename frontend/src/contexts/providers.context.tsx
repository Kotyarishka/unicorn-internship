import { Provider, ProviderFilters, ProviderFilterValue } from "@/lib/api";
import { createContext, useContext } from "react";

interface ProvidersContext {
  // Filters stuff
  filters?: ProviderFilters;
  bounds: ProviderFilters;
  setFilters: (filters: ProviderFilters) => void;
  updateFilter: (key: string, value?: ProviderFilterValue) => void;

  // Providers stuff
  providers: Provider[];
  countries: string[];

  // Query stuff
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
}

export const ProvidersContext = createContext<ProvidersContext | undefined>(
  undefined
);

export const useProviders = () => {
  const context = useContext(ProvidersContext);

  if (context === undefined)
    throw new Error("useProviders must be used within a ProvidersProvider");

  return context;
};
