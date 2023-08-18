import { ChartAPI } from './chart-api';

export const createChart = (id: any): ChartAPI => {
  return new ChartAPI(document.getElementById('chart-container') as HTMLElement);
};
