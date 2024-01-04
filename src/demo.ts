import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "PREVIEW");

chart.setData([
  { x: 1, y: 5 },
  { x: 1, y: 25 },
  { x: 1, y: 15 },
]);

console.log(chart);
