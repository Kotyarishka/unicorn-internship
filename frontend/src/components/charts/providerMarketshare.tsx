import { Provider } from "@/lib/api";
import { FC } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface ProviderMarketShareProps {
  data: Provider;
}

const ProviderMarketShareChart: FC<ProviderMarketShareProps> = ({ data }) => {
  const chartConfig = {
    myShare: {
      label: `Market share of ${data.name}`,
      color: "var(--chart-4)",
    },
    othersShare: {
      label: "Others",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      name: "myShare",
      value: data.marketShare,
      fill: "var(--color-myShare)",
    },
    {
      name: "othersShare",
      value: 100 - data.marketShare,
      fill: "var(--color-othersShare)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[200px] min-h-[100px] w-full "
    >
      <PieChart className="flex justify-between">
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55}>
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
                      {data.marketShare.toLocaleString()} %
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      market share
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

export default ProviderMarketShareChart;
