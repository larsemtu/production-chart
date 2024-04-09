import * as react_jsx_runtime from 'react/jsx-runtime';

interface ProductionData {
    WellName: string;
    ProductionDay: string;
    AllocNetOilVolSm3: string;
    AllocGasVolSm3: string;
    AllocWaterVolM3: number;
    AllocNetOilVolTtdSm3: string;
    AllocGasVolTtdSm3: string;
    AllocWaterVolTtdM3: number;
}

interface ProductionChartProps {
    data: ProductionData[];
    cumulative: boolean;
}
declare const ProductionChart: ({ data, cumulative }: ProductionChartProps) => react_jsx_runtime.JSX.Element;

export { ProductionChart as default };
