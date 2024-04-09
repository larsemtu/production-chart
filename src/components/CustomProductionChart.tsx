/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Brush,
} from "recharts";
import { ProcessedProductionData } from "../utils/types";
import { useState } from "react";
import useDebouncedRange from "../hooks/useDebouncedRange";
import { Button } from "./ui/Button";

interface ProductionChartProps {
  // Define your props here
  data: ProcessedProductionData[];
  cumulative: boolean;
}

export const CustomProductionChart = ({
  data,
  cumulative,
}: ProductionChartProps) => {
  const areas = cumulative
    ? [
        { key: "AllocGasVolTtdSm3", color: "red", name: "Gas" },
        { key: "AllocNetOilVolTtdSm3", color: "green", name: "Oil" },
        { key: "AllocWaterVolTtdM3", color: "blue", name: "Water" },
      ]
    : [
        { key: "AllocGasVolSm3", color: "red", name: "Gas" },
        { key: "AllocNetOilVolSm3", color: "green", name: "Oil" },
        { key: "AllocWaterVolM3", color: "blue", name: "Water" },
      ];

  const [visibleSeries, setVisibleSeries] = useState({
    AllocGasVolSm3: true,
    AllocNetOilVolSm3: true,
    AllocWaterVolM3: true,
    AllocGasVolTtdSm3: true,
    AllocNetOilVolTtdSm3: true,
    AllocWaterVolTtdM3: true,
  });

  const { handleBrushChange, tickInterval } = useDebouncedRange(data.length);

  const toggleSeriesVisibility = (dataKey: string) => {
    setVisibleSeries((prevState) => ({
      ...prevState,
      [dataKey]: !prevState[dataKey as keyof typeof prevState],
    }));
  };

  return (
    <div className="w-full flex min-h-full flex-col">
      <div className="flex flex-row justify-end space-x-2 pr-10">
        {areas.map((area) => (
          <Button
            key={area.key}
            onClick={() => toggleSeriesVisibility(area.key)}
            className="w-20"
            style={{
              backgroundColor: visibleSeries[
                area.key as keyof typeof visibleSeries
              ]
                ? area.color
                : "grey",
              color: "white",
            }}
          >
            {area.name}
          </Button>
        ))}
      </div>
      <ResponsiveContainer height={750} width={"100%"}>
        <AreaChart data={data}>
          <XAxis
            dataKey="ProductionDay"
            stroke="grey"
            tickFormatter={(date) => new Date(date).toLocaleDateString("no-NO")}
            height={50}
            tickCount={1}
            interval={tickInterval}
            dy={5}
          >
            <Label value="Production Date" position="insideBottom" />
          </XAxis>
          <YAxis
            stroke="grey"
            label={{
              value: "Volume Sm3",
              angle: -90,
              position: "left",
              offset: -10,
            }}
            tickCount={8}
            width={80}
            tickFormatter={(value) =>
              new Intl.NumberFormat("en", {
                notation: "compact",
                minimumSignificantDigits: 3,
              }).format(value)
            }
          ></YAxis>
          <Tooltip />

          <defs>
            <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorOil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="green" stopOpacity={0.8} />
              <stop offset="95%" stopColor="green" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
              <stop offset="95%" stopColor="blue" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          {areas.map(
            (area) =>
              visibleSeries[area.key as keyof typeof visibleSeries] && (
                <Area
                  key={area.key}
                  type="monotone"
                  dataKey={area.key}
                  stroke={area.color}
                  fill={`url(#color${area.name})`}
                  name={area.name}
                  strokeWidth={1.5}
                />
              )
          )}
          <Brush onChange={handleBrushChange} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
