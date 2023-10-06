import { createChart } from './api/create-chart';
export * as s from './api/create-chart';

const chart = createChart(document.getElementById('chart-container'));
console.log(chart);

chart.setData([
  {
    y: 3.017
  },
  {
    y: 3.021
  },
  {
    y: 3.054
  },
  {
    y: 3.052
  },
  {
    y: 3.05
  },
  {
    y: 3.06
  },
  {
    y: 3.053
  },
  {
    y: 3.01
  },
  {
    y: 3.065
  },
  {
    y: 3.069
  },
  {
    y: 3.07
  },
  {
    y: 3.07
  },
  {
    y: 3.068
  },
  {
    y: 3.067
  },
  {
    y: 3.079
  },
  {
    y: 3.091
  },
  {
    y: 3.075
  },
  {
    y: 3.098
  },
  {
    y: 3.1
  },
  {
    y: 3.1
  },
  {
    y: 3.092
  },
  {
    y: 3.097
  },
  {
    y: 3.107
  }
]);
