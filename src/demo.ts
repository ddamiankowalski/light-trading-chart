import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL");

chart.setData([
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -13 },
  { x: 1, y: 2 },
  { x: 1, y: 2 },
  { x: 1, y: 2 },
  { x: 1, y: 75.2 },
  { x: 1, y: 2 },
  { x: 1, y: 0 },


]);

console.log(chart);
