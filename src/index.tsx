import { ProductionData } from "./utils/types";
import { processData } from "./utils/dataHandler";
import "./global.css";
import { CustomProductionChart } from "./components/CustomProductionChart";

interface ProductionChartProps {
  // Define your props here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ProductionData[];
  cumulative: boolean;
}

const ProductionChart = ({ data, cumulative }: ProductionChartProps) => {
  // Implement your component logic here

  const processedData = processData(data);

  if (cumulative) {
    return (
      <div>
        <CustomProductionChart data={processedData} cumulative={cumulative} />
      </div>
    );
  } else {
    return (
      <div>
        <CustomProductionChart data={processedData} cumulative={cumulative} />
      </div>
    );
  }
};

export default ProductionChart;
