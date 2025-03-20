import ProvidersFilters from "@/components/providersFilters";
import ProvidersList from "@/components/providersList";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { FC } from "react";
import { Link } from "react-router-dom";

const DashboardProviders: FC = () => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <div className="-space-y-1.5">
          <h1 className="text-lg font-bold">Electricity Providers</h1>
          <p className="text-muted-foreground">
            Add, edit or delete electricity providers from here.
          </p>
        </div>
        <div className="space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Filters</Button>
            </PopoverTrigger>
            <PopoverContent>
              <ProvidersFilters />
            </PopoverContent>
          </Popover>
          <Link to="add" className={buttonVariants()}>
            Add provider
          </Link>
        </div>
      </div>
      <ScrollArea className=" max-h-full rounded-lg overflow-hidden">
        <ProvidersList dashboard />
        {/* penis */}
      </ScrollArea>
    </div>
  );
};

export default DashboardProviders;
