import DashboardUserMenu from "@/components/dashboardUserMenu";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon, KeyRoundIcon, ZapIcon } from "lucide-react";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const DASHBOARD_LINKS = [
  {
    name: "Home",
    href: "",

    Icon: HomeIcon,
  },
  {
    name: "Providers",
    href: "providers",

    Icon: ZapIcon,
  },
  {
    name: "API Keys",
    href: "api",

    Icon: KeyRoundIcon,
  },
];

const DashboardLayout: FC = () => {
  return (
    <main className="max-h-screen min-h-screen flex py-5">
      <div className="max-w-[1300px] flex gap-2 mx-auto rounded-lg overflow-hidden w-full">
        <aside className="bg-accent/50 dark:bg-accent/25 p-4 flex flex-col max-w-3xs w-full">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-primary-foreground">
                <ZapIcon size={16} />
              </div>
              <div className="-space-y-1.5">
                <h1>WattWise</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </Link>
          </div>
          <div className="w-full h-px bg-accent my-5" />
          <div className="space-y-1">
            {DASHBOARD_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start",
                })}
              >
                <link.Icon /> {link.name}
              </Link>
            ))}
          </div>
          <div className=" mt-auto">
            <DashboardUserMenu />
          </div>
        </aside>
        <div className="flex-1 bg-secondary-background p-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
