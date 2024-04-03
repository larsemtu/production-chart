import { ProductionData } from "./utils/types";
import { CustomAreaChart } from "./components/CustomAreaChart";
import { processData } from "./utils/dataHandler";

interface SuperchartsProps {
  // Define your props here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ProductionData[];
  cumulative: boolean;
}

const Supercharts = ({ data, cumulative }: SuperchartsProps) => {
  // Implement your component logic here
  const processedData = processData(data);

  if (cumulative) {
    return (
      <div>
        <CustomAreaChart data={processedData} cumulative={cumulative} />
      </div>
    );
  } else {
    return (
      <div>
        <CustomAreaChart data={processedData} cumulative={cumulative} />
      </div>
    );
  }
};

export default Supercharts;
