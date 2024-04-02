import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Brush,
  BarChart,
  Bar,
} from "recharts";
import { ProcessedProductionData, ProductionData } from "./utils/types";
import { Button } from "@tremor/react";
import { useState } from "react";

interface SuperchartsProps {
  // Define your props here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ProductionData[];
  cumulative: boolean;
}

const Supercharts = ({ data, cumulative }: SuperchartsProps) => {
  // Implement your component logic here

  const [showOil, setShowOil] = useState(true);
  const [showGas, setShowGas] = useState(true);
  const [showWater, setShowWater] = useState(false);

  const processData = (data: ProductionData[]): ProcessedProductionData[] =>
    data.map((item) => ({
      ...item,
      ProductionDay: item.ProductionDay.substring(0, 10),
      AllocNetOilVolSm3: parseFloat(item.AllocNetOilVolSm3.replace(/,/g, "")),
      AllocGasVolSm3: parseFloat(item.AllocGasVolSm3.replace(/,/g, "")),
      AllocWaterVolM3: item.AllocWaterVolM3,
      AllocNetOilVolTtdSm3: parseFloat(
        item.AllocNetOilVolTtdSm3.replace(/,/g, "")
      ),
      AllocGasVolTtdSm3: parseFloat(item.AllocGasVolTtdSm3.replace(/,/g, "")),
      AllocWaterVolTtdM3: item.AllocWaterVolTtdM3,
    }));

  const calculateCumulativeData = (
    data: ProcessedProductionData[]
  ): ProcessedProductionData[] => {
    let cumulativeOil = 0;
    let cumulativeGas = 0;
    let cumulativeWater = 0;

    return data.map((item) => ({
      ...item,
      AllocNetOilVolSm3: (cumulativeOil += item.AllocNetOilVolSm3),
      AllocGasVolSm3: (cumulativeGas += item.AllocGasVolSm3),
      AllocWaterVolM3: (cumulativeWater += item.AllocWaterVolM3),
    }));
  };

  const processedData: ProcessedProductionData[] = processData(data);

  const processedCumulativeData: ProcessedProductionData[] =
    calculateCumulativeData(processedData);

  console.log(data);
  if (cumulative) {
    return (
      <BarChart width={1500} height={750} data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ProductionDay" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="AllocNetOilVolSm3" fill="#8884d8" name="Net Oil Volume" />
        {/* Add other Bars as needed */}
        <Brush />
      </BarChart>
    );
  } else {
    return (
      <div>
        <Button onClick={() => setShowOil(!showOil)}>Toggle Oil</Button>
        <Button onClick={() => setShowGas(!showGas)}>Toggle Gass</Button>
        <Button onClick={() => setShowWater(!showWater)}>Toggle Water</Button>
        <LineChart
          width={1500}
          height={750}
          data={processedCumulativeData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ProductionDay" />
          <YAxis />
          <Tooltip />
          <Legend />
          {showOil && (
            <Line
              type="monotone"
              dataKey="AllocNetOilVolSm3"
              stroke="#8884d8"
              name="Cumulative Oil Volume"
            />
          )}
          {showGas && (
            <Line
              type="monotone"
              dataKey="AllocGasVolSm3"
              stroke="#82ca9d"
              name="Cumulative Gas Volume"
            />
          )}
          {showWater && (
            <Line
              type="monotone"
              dataKey="AllocWaterVolM3"
              stroke="#ffc658"
              name="Cumulative Water Volume"
            />
          )}

          <Brush />
        </LineChart>
      </div>
    );
  }
};

export default Supercharts;
