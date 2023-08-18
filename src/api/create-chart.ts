import { ChartAPI } from './chart-api'

export const createChart = (id: any): ChartAPI => {
  return new ChartAPI()
}
