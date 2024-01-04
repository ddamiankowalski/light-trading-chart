import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL");

chart.setData([
  { x: 1, y: 5 },
  { x: 1, y: 25 },
  { x: 1, y: 15 },
  { x: 1, y: -15 },
  { x: 1, y: 65 },
]);

console.log(chart);
