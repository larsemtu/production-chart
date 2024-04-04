import { ProductionData, ProcessedProductionData } from "./types";

export const processData = (
  data: ProductionData[]
): ProcessedProductionData[] => {
  return data.map((item) => ({
    WellName: item.WellName,
    ProductionDay: item.ProductionDay.substring(0, 10), // Simplify the date format
    AllocNetOilVolSm3: Math.ceil(
      parseFloat(item.AllocNetOilVolSm3.replace(/,/, "."))
    ),
    AllocGasVolSm3: Math.ceil(
      parseFloat(item.AllocGasVolSm3.replace(/,/, "."))
    ),
    AllocWaterVolM3: Math.ceil(item.AllocWaterVolM3), // Assuming this is already a proper number
    AllocNetOilVolTtdSm3: Math.ceil(
      parseFloat(item.AllocNetOilVolTtdSm3.replace(/,/, "."))
    ),
    AllocGasVolTtdSm3: Math.ceil(
      parseFloat(item.AllocGasVolTtdSm3.replace(/,/, "."))
    ),
    AllocWaterVolTtdM3: Math.ceil(item.AllocWaterVolTtdM3), // Assuming this is already a proper number
  }));
};
