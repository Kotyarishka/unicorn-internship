import { useProviders } from "@/contexts/providers.context";
import { ProviderFilters, ProviderFilterValue } from "@/lib/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const isFilterValue = (val: unknown): val is ProviderFilterValue => {
  if (typeof val === "string") return true;
  if (typeof val === "object" && val !== null) {
    return "from" in val && "to" in val;
  }

  return false;
};

const useProviderSearch = <T = ProviderFilterValue>(
  key: keyof ProviderFilters
): [T, Dispatch<SetStateAction<T>>, T] => {
  const { updateFilter, filters } = useProviders();
  const [searchTerm, setSearchTerm] = useState((filters?.[key] ?? "") as T);
  const debouncedValue = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedValue == null) return;
    if (!isFilterValue(debouncedValue)) return;

    updateFilter(key, debouncedValue);
  }, [key, debouncedValue, updateFilter]);

  return [searchTerm, setSearchTerm, (filters?.[key] ?? "") as T];
};

export default useProviderSearch;
