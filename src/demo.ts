import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "PREVIEW");

chart.setData([
  { x: 1, y: 5 },
]);

console.log(chart);
