import { ChartDataType, ChartOptions, ChartType } from "../interfaces/chart";
import { ChartAPI } from "./chart-api";

export const createChart = (
  chartContainer: HTMLElement,
  type: ChartType = "PREVIEW",
  dataType: ChartDataType,
  options: ChartOptions
): ChartAPI => {
  return new ChartAPI(chartContainer, type, dataType, options);
};
