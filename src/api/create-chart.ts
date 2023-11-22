import { ChartType } from "../interfaces/chart";
import { ChartAPI } from "./chart-api";

export const createChart = (chartContainer: HTMLElement, type: ChartType = "PREVIEW"): ChartAPI => {
  return new ChartAPI(chartContainer, type);
};
