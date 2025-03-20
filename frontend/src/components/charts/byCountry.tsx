import { useMemo, type FC } from "react";
import { Label, Pie, PieChart } from "recharts";
import { colorFromString } from "@/lib/utils";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Provider } from "@/lib/api";

interface ByCountryProps {
  data: Provider[];
  limit?: number;
}

interface CountByCountry {
  country: string;
  amount: number;
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const ChartByCountry: FC<ByCountryProps> = ({ data, limit = 5 }) => {
  const { chartData, chartConfig, totalCompanies } = useMemo(() => {
    const totalCompanies = data.reduce((acc) => acc + 1, 0);

    const chartData = Object.values(
      data.reduce<Record<string, CountByCountry>>((acc, { country }) => {
        const color =
          defaultColors[Object.keys(acc).length] || colorFromString(country);
        acc[country] = acc[country] || {
          country,
          amount: 0,
          fill: color,
        };
        acc[country].amount++;

        return acc;
      }, {})
    );

    chartData.sort((a, b) => b.amount - a.amount);
    chartData.splice(limit);

    const chartConfig = chartData.reduce<ChartConfig>((acc, { country }) => {
      if (!acc[country]) {
        acc[country] = {
          label: country,
        };
      }

      return acc;
    }, {});

    return { chartData, chartConfig, totalCompanies };
  }, [data, limit]);

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
          content={<ChartLegendContent nameKey="country" />}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="country"
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

export default ChartByCountry;
