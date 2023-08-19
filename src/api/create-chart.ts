import { ChartAPI } from './chart-api';

export const createChart = (chartContainer: HTMLElement): ChartAPI => {
  return new ChartAPI(chartContainer);
};
