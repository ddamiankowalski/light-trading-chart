import { createChart } from './api/create-chart';
export * from './api/create-chart';

const chart = createChart(document.getElementById('chart-container'));
console.log(chart);

chart.setData([
  {
    y: 4.1
  },
  {
    y: 8.2
  },
  {
    y: 12.3
  },
  {
    y: 59.3
  },
  {
    y: 106.3
  },
  {
    y: 153.3
  }
]);
