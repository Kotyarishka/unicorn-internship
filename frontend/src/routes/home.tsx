import ProvidersList from "@/components/providersList";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/theme.context";
import useAuth from "@/hooks/useAuth";
import { MoonIcon, SunIcon, ZapIcon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-gradient-to-b from-background to-transparent">
        <div className="flex items-center justify-between py-4 max-w-[1300px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-primary-foreground">
                <ZapIcon size={16} />
              </div>
              WattWise
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="secondary"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>
            {user ? (
              <Link to="/dashboard" className={buttonVariants()}>
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className={buttonVariants()}>
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="my-5">
        <div className="max-w-[1300px] flex gap-2 mx-auto rounded-lg overflow-hidden">
          <aside className="bg-accent/50 dark:bg-accent/25 p-4 flex flex-col max-w-3xs">
            <h1 className="text-2xl font-bold">Energy Providers</h1>
            <p className="text-muted-foreground text-sm">
              Here you can find a list of energy providers and their details.
            </p>

            <div className="mt-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <div className="space-y-2 ">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <div className="flex items-center gap-2">
                    <Input type="number" className="" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <div className="flex items-center gap-2">
                    <Input type="number" className="" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market share</p>
                  <div className="flex items-center gap-2">
                    <Input type="number" className="" />
                    <span>-</span>
                    <Input type="number" className="" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Renewable energy
                  </p>
                  <div className="flex items-center gap-2">
                    <Input type="number" className="" />
                    <span>-</span>
                    <Input type="number" className="" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Yearly revenue
                  </p>
                  <div className="flex items-center gap-2">
                    <Input type="number" className="" />
                    <span>-</span>
                    <Input type="number" className="" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <ProvidersList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
