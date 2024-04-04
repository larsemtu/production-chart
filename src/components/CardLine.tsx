import { ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { ProcessedProductionData } from "../utils/types";

interface CardLineProps {
  data: ProcessedProductionData[];
  keydata: string;
  kpi: string;
  title: string;
  color: string;
}

export default function CardLine({
  data,
  keydata,
  kpi,
  title,
  color,
}: CardLineProps) {
  const fillId = `url(#${title})`;
  const legendStyle = {
    color: color,
    fontSize: "25px",
    fontWeight: 400,
  };

  return (
    <ResponsiveContainer height={100} width="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 0,
          bottom: 10,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id={title} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          type="basis"
          dataKey={keydata}
          fill={fillId}
          stroke={color}
          strokeWidth={2}
        ></Area>
        <Legend
          payload={[{ value: kpi }]}
          iconSize={0}
          verticalAlign="center"
          align="center"
          wrapperStyle={legendStyle}
        ></Legend>
      </AreaChart>
    </ResponsiveContainer>
  );
}
