import { FC } from "react";
import ChartByCountry from "./charts/byCountry";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "@/lib/api";
import ChartByEnergy from "./charts/byGreenEnergy";

const DashboardCharts: FC = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border p-2 rounded-md relative">
        <ChartByCountry data={data?.providers || []} />
      </div>
      <div className="border p-2 rounded-md relative">
        <ChartByEnergy data={data?.providers || []} />
      </div>
    </div>
  );
};

export default DashboardCharts;
