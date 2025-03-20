import NavBar from "@/components/navbar";
import ProvidersFilters from "@/components/providersFilters";
import ProvidersList from "@/components/providersList";
import { ProvidersProvider } from "@/contexts/providers.provider";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="my-5">
        <div className="max-w-[1300px] flex gap-2 mx-auto rounded-lg overflow-hidden">
          <ProvidersProvider>
            <aside className="bg-accent/50 dark:bg-accent/25 p-4 flex flex-col max-w-3xs">
              <h1 className="text-2xl font-bold">Energy Providers</h1>
              <p className="text-muted-foreground text-sm mb-5">
                Here you can find a list of energy providers and their details.
              </p>

              <ProvidersFilters />
            </aside>
            <div className="flex-1">
              <ProvidersList />
            </div>
          </ProvidersProvider>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
