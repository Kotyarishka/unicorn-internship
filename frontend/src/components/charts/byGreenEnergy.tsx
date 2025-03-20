import { Provider } from "@/lib/api";
import { useMemo, type FC } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { LeafIcon } from "lucide-react";

interface ByEnergyProps {
  data: Provider[];
  limit?: number;
}

const chartConfig = {
  greenEnergy: {
    label: "Green Energy",
    color: "var(--chart-2)",
    icon: LeafIcon,
  },
  nonGreenEnergy: {
    label: "Non-Green Energy",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const ChartByEnergy: FC<ByEnergyProps> = ({ data }) => {
  const { chartData, totalCompanies } = useMemo(() => {
    const totalCompanies = data.reduce((acc) => acc + 1, 0);

    // if company has more then 85% of renewable energy it is considered green
    const chartData = [
      {
        energy: "greenEnergy",
        amount: data.filter(
          (provider) => provider.renewableEnergyPercentage >= 85
        ).length,
        fill: "var(--color-greenEnergy)",
      },
      {
        energy: "nonGreenEnergy",
        amount: data.filter(
          (provider) => provider.renewableEnergyPercentage < 85
        ).length,
        fill: "var(--color-nonGreenEnergy)",
      },
    ];

    return { chartData, totalCompanies };
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[200px] min-h-[100px] w-full "
    >
      <PieChart className="flex justify-between">
        <ChartLegend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          className="flex-col items-end"
          content={<ChartLegendContent />}
        />
        <ChartTooltip content={<ChartTooltipContent nameKey="energy" />} />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="energy"
          innerRadius={55}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalCompanies.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Companies
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default ChartByEnergy;
