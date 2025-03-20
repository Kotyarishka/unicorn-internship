import ProviderEnergyChart from "@/components/charts/providerEnergy";
import ProviderMarketShareChart from "@/components/charts/providerMarketshare";
import DeleteProviderButton from "@/components/providerDelete";
import { buttonVariants } from "@/components/ui/button";
import { getProvider } from "@/lib/api";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

const DashboardViewProvider: FC = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["provider", id],
    queryFn: () => getProvider(id),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-20 bg-accent/50 dark:bg-accent/25 rounded-lg">
        <LoaderPinwheelIcon size={48} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col min-h-20 gap-5 bg-red-400/5 rounded-lg">
        <p>{error?.message || "An error occurred. Try again later."}</p>
        <div>
          <Link to="/dashboard/providers" className={buttonVariants()}>
            Back to providers
          </Link>
        </div>
      </div>
    );
  }

  const provider = data?.provider;
  if (!provider) return <div>Provider not found.</div>;

  return (
    <div className="flex flex-col gap-5 h-full ">
      <div className="flex justify-between items-center">
        <div className="-space-y-1.5">
          <h1 className="text-lg font-bold">{provider.name}</h1>
          <p className="text-muted-foreground">at {provider.country}</p>
        </div>
        <div className="space-x-2">
          <Link
            to="/dashboard/providers"
            className={buttonVariants({ variant: "secondary" })}
          >
            Back to providers
          </Link>
          <DeleteProviderButton
            provider={provider}
            navigateTo="/dashboard/providers"
          />
          <Link to="edit" className={buttonVariants()}>
            Edit provider
          </Link>
        </div>
      </div>
      <ScrollArea className=" max-h-full rounded-lg overflow-hidden space-y-5">
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
            <p className="text-sm text-muted-foreground">Renewable energy</p>
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

        <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
          <div className="bg-accent dark:bg-accent/50 p-2">
            <ProviderEnergyChart data={provider} />
          </div>
          <div className="bg-accent dark:bg-accent/50 p-2">
            <ProviderMarketShareChart data={provider} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardViewProvider;
