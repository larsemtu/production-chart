export interface ProductionData {
  WellName: string;
  ProductionDay: string;
  AllocNetOilVolSm3: string;
  AllocGasVolSm3: string;
  AllocWaterVolM3: number;
  AllocNetOilVolTtdSm3: string;
  AllocGasVolTtdSm3: string;
  AllocWaterVolTtdM3: number;
}

export interface ProcessedProductionData {
  WellName: string;
  ProductionDay: string; // Consider converting this to a Date object if you need to perform date calculations
  AllocNetOilVolSm3: number;
  AllocGasVolSm3: number;
  AllocWaterVolM3: number;
  AllocNetOilVolTtdSm3: number;
  AllocGasVolTtdSm3: number;
  AllocWaterVolTtdM3: number;
}
