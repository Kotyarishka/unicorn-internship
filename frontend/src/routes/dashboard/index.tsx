import DashboardCharts from "@/components/dashboardCharts";
import { buttonVariants } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";

const DashboardHome: FC = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 items-start">
        {/* quick actions */}
        <div className="border p-2 rounded-md relative">
          <p className="absolute bg-secondary-background -top-3 text-sm px-2 text-muted-foreground">
            Quick actions
          </p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Link
              to={"providers"}
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              All providers
            </Link>
            <Link
              to={"providers/add"}
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              Create provider
            </Link>
          </div>
        </div>
        <div className="border p-2 rounded-md relative">
          <p className="absolute bg-secondary-background -top-3 text-sm px-2 text-muted-foreground">
            API keys
          </p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Link
              to={"api"}
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              All API keys
            </Link>
            <Link
              to={"api/add"}
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              Create new API key
            </Link>
          </div>
        </div>
      </div>

      <DashboardCharts />
    </div>
  );
};

export default DashboardHome;
