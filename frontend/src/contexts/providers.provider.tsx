import { getProviders, ProviderFilters, ProviderFilterValue } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ProvidersContext } from "./providers.context";
import { useSearchParams } from "react-router-dom";

const updateNestedFilter = (
  filters: ProviderFilters,
  key: string,
  value?: ProviderFilterValue
): ProviderFilters => {
  const keys = key.split(".");
  const updatedFilters = { ...filters };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = updatedFilters;

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!current[k]) current[k] = {};

    current = current[k];
  }

  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    delete current[keys[keys.length - 1]];
    return updatedFilters;
  }

  current[keys[keys.length - 1]] = value;

  return updatedFilters;
};

export function ProvidersProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<ProviderFilters>({
    marketShare: { from: 0, to: 100 },
    renewableEnergyPercentage: { from: 0, to: 100 },
  });
  const {
    data: providers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["providers", filters],
    queryFn: () => getProviders(filters),
  });

  const updateFilter = useCallback(
    (key: string, value?: ProviderFilterValue) => {
      setFilters((prevFilters) => updateNestedFilter(prevFilters, key, value));
    },
    []
  );

  const [bounds, setBounds] = useState<ProviderFilters>({});
  // calculate max and min yearly revenue
  useEffect(() => {
    if (!providers) return;
    if (bounds.yearlyRevenue) return;

    const yearlyRevenues = providers.providers.map((p) => p.yearlyRevenue);
    const max = Math.max(...yearlyRevenues);
    const min = Math.min(...yearlyRevenues);

    setFilters((prevFilters) => ({
      ...prevFilters,
      yearlyRevenue: { from: min, to: max },
    }));
    setBounds((prevBounds) => ({
      ...prevBounds,
      yearlyRevenue: { from: min, to: max },
    }));
  }, [providers, bounds]);

  return (
    <ProvidersContext.Provider
      value={{
        filters,
        bounds,
        setFilters,
        updateFilter,
        providers: providers?.providers ?? [],
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
}
