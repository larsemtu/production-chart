import {
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { ProcessedProductionData } from "../utils/types";

interface AreaChartProps {
  // Define your props here
  data: ProcessedProductionData[];
  cumulative: boolean;
}

export const CustomAreaChart = ({ data, cumulative }: AreaChartProps) => {
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

  console.log(data);
  return (
    <div>
      {/*       <Button onClick={() => setShowOil(!showOil)}>Toggle Oil</Button>
      <Button onClick={() => setShowGas(!showGas)}>Toggle Gass</Button>
      <Button onClick={() => setShowWater(!showWater)}>Toggle Water</Button> */}
      <ResponsiveContainer height={750} width={1000}>
        <AreaChart data={data}>
          <XAxis
            dataKey="ProductionDay"
            stroke="grey"
            tickFormatter={(date) => new Date(date).toLocaleDateString("no-NO")}
            height={50}
          >
            <Label value="Production Date" position="insideBottom" />
          </XAxis>
          <YAxis
            stroke="grey"
            label={{
              value: "Volume Sm3",
              angle: -90,
              position: "insideLeft",
            }}
            tickCount={8}
            width={80}
          ></YAxis>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
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
          {areas.map((area) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              stroke={area.color}
              fill={`url(#color${area.name})`}
              name={area.name}
              strokeWidth={1.5}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
