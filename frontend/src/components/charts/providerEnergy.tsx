import { Provider } from "@/lib/api";
import { FC } from "react";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { LeafIcon } from "lucide-react";

interface ProviderEnergyProps {
  data: Provider;
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

const ProviderEnergyChart: FC<ProviderEnergyProps> = ({ data }) => {
  const chartData = [
    {
      energy: "greenEnergy",
      value: data.renewableEnergyPercentage,
      fill: "var(--color-greenEnergy)",
    },
    {
      energy: "nonGreenEnergy",
      value: 100 - data.renewableEnergyPercentage,
      fill: "var(--color-nonGreenEnergy)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[200px] min-h-[100px] w-full "
    >
      <PieChart className="flex justify-between">
        <ChartTooltip content={<ChartTooltipContent nameKey="energy" />} />
        <Pie data={chartData} dataKey="value" nameKey="energy" innerRadius={55}>
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
                      {data.renewableEnergyPercentage.toLocaleString()} %
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      green energy
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

export default ProviderEnergyChart;
