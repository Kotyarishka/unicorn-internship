import { useProviders } from "@/contexts/providers.context";
import { LeafIcon, LoaderPinwheelIcon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ProvidersList: FC = () => {
  const { providers, error, isLoading, isError } = useProviders();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-20 bg-accent/50 dark:bg-accent/25 rounded-lg">
        <LoaderPinwheelIcon size={48} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-20 bg-red-400/5 rounded-lg">
        {error?.message || "An error occurred. Try again later."}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-2">
        {providers?.map((provider) => (
          <div
            key={provider._id}
            className="bg-accent/50 dark:bg-accent/25 p-2 space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {provider.renewableEnergyPercentage >= 85 ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="size-8 flex items-center justify-center rounded-lg bg-green-600 text-primary-foreground">
                        <LeafIcon size={16} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The provider generates more than 85% of its power from
                        renewable energy.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ) : null}
                <h2 className="text-lg font-bold">{provider.name}</h2>
              </div>
              <div>
                <Link
                  to={`/providers/${provider._id}`}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  View
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 rounded-lg gap-2 overflow-hidden">
              <div className="bg-accent dark:bg-accent/50 p-2">
                <p className="text-sm text-muted-foreground">Country</p>
                <p className="text-lg font-semibold">
                  {provider.country || "Not available"}
                </p>
              </div>
              <div className="bg-accent dark:bg-accent/50 p-2">
                <p className="text-sm text-muted-foreground">Market share</p>
                <p className="text-lg font-semibold">
                  {provider.marketShare + "%" || "Not available"}
                </p>
              </div>
              <div className="bg-accent dark:bg-accent/50 p-2">
                <p className="text-sm text-muted-foreground">
                  Renewable energy
                </p>
                <p className="text-lg font-semibold">
                  {provider.renewableEnergyPercentage + "%" || "Not available"}
                </p>
              </div>
              <div className="bg-accent dark:bg-accent/50 p-2">
                <p className="text-sm text-muted-foreground">Yearly revenue</p>
                <p className="text-lg font-semibold">
                  {provider.yearlyRevenue + "$" || "Not available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default ProvidersList;
