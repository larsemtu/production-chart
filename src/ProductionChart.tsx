import { ProductionData } from "./utils/types";
import { processData } from "./utils/dataHandler";
import { CustomProductionChart } from "./components/CustomProductionChart";

interface SuperchartsProps {
  // Define your props here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ProductionData[];
  cumulative: boolean;
}

const ProductionChart = ({ data, cumulative }: SuperchartsProps) => {
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
