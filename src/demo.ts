import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "COLUMNS", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: true,
});

chart.setHorizontalMargin(100);

chart.setData([
  { x: "JANUARY", y: -100 },
  { x: "MARCH", y: -200 },
  { x: "April", y: -200 },
  { x: "may", y: -200 },
]);
