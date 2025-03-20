import { FC, useState } from "react";
import { Input } from "./ui/input";
import useProviderSearch from "@/hooks/useProviderSearch";
import { useProviders } from "@/contexts/providers.context";
import { Slider } from "./ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Check, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Range = {
  from?: number;
  to?: number;
};

const ProvidersFilters: FC = () => {
  const [nameSearch, setNameSearch] = useProviderSearch<string>("name");
  const [countrySearch, setCountrySearch] =
    useProviderSearch<string>("country");
  const [marketShareSearch, setMarketShareSearch] =
    useProviderSearch<Range>("marketShare");
  const [renewableEnergySearch, setRenewableEnergySearch] =
    useProviderSearch<Range>("renewableEnergyPercentage");
  const [yearlyRevenueSearch, setYearlyRevenueSearch] =
    useProviderSearch<Range>("yearlyRevenue");

  const [countryOpen, setCountryOpen] = useState(false);

  const { bounds, countries } = useProviders();

  return (
    <div className="">
      <h2 className="text-lg font-bold mb-2">Filters</h2>
      <div className="space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <Input
            value={nameSearch}
            placeholder="Search by company name..."
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Country</p>
          <div className="flex gap-1">
            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="flex-1 text"
                  variant="input"
                  role="combobox"
                  aria-expanded={countryOpen}
                >
                  <span
                    className={cn({
                      "text-muted-foreground": !countrySearch,
                    })}
                  >
                    {countrySearch || "Search by country..."}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          key={country}
                          value={country}
                          onSelect={(val) => {
                            setCountrySearch(val);
                            setCountryOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              countrySearch === country
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setCountrySearch("")}
              disabled={!countrySearch}
            >
              <XIcon />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Market share</p>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="number"
              placeholder="From"
              value={marketShareSearch?.from}
              onChange={(e) =>
                setMarketShareSearch({
                  from: e.target.value ? parseInt(e.target.value) : undefined,
                  to: marketShareSearch?.to,
                })
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="To"
              value={marketShareSearch?.to}
              onChange={(e) =>
                setMarketShareSearch({
                  from: marketShareSearch?.from,
                  to: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Slider
              value={[
                marketShareSearch?.from ?? 0,
                marketShareSearch?.to ?? 100,
              ]}
              min={bounds.marketShare?.from ?? 0}
              max={bounds.marketShare?.to ?? 100}
              onValueChange={([from, to]) => {
                setMarketShareSearch({ from, to });
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Renewable energy</p>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="number"
              placeholder="From"
              value={renewableEnergySearch?.from}
              onChange={(e) =>
                setRenewableEnergySearch({
                  from: e.target.value ? parseInt(e.target.value) : undefined,
                  to: renewableEnergySearch?.to,
                })
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="To"
              value={renewableEnergySearch?.to}
              onChange={(e) =>
                setRenewableEnergySearch({
                  from: renewableEnergySearch?.from,
                  to: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Slider
              value={[
                renewableEnergySearch?.from ?? 0,
                renewableEnergySearch?.to ?? 100,
              ]}
              min={bounds.marketShare?.from ?? 0}
              max={bounds.marketShare?.to ?? 100}
              onValueChange={([from, to]) => {
                setRenewableEnergySearch({ from, to });
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Yearly revenue</p>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="number"
              placeholder="From"
              value={
                (yearlyRevenueSearch
                  ? yearlyRevenueSearch.from
                  : bounds?.yearlyRevenue?.from) ?? "0"
              }
              onChange={(e) =>
                setYearlyRevenueSearch({
                  from: e.target.value ? parseInt(e.target.value) : undefined,
                  to: yearlyRevenueSearch?.to,
                })
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="To"
              value={
                (yearlyRevenueSearch
                  ? yearlyRevenueSearch.to
                  : bounds?.yearlyRevenue?.to) ?? "100"
              }
              onChange={(e) =>
                setYearlyRevenueSearch({
                  from: yearlyRevenueSearch?.from,
                  to: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Slider
              value={
                yearlyRevenueSearch
                  ? [
                      yearlyRevenueSearch.from ?? 0,
                      yearlyRevenueSearch.to ?? 100,
                    ]
                  : [
                      bounds.yearlyRevenue?.from ?? 0,
                      bounds.yearlyRevenue?.to ?? 100,
                    ]
              }
              min={bounds.yearlyRevenue?.from ?? 0}
              max={bounds.yearlyRevenue?.to ?? 100}
              onValueChange={([from, to]) => {
                setYearlyRevenueSearch({ from, to });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersFilters;
