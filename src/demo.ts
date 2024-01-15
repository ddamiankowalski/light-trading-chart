import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "LINE", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: true,
});

chart.setData([
  { x: "JANUARY", y: -1 },
  { x: "FEBRUARY", y: -2 },
  { x: "MARCH", y: -0.5 },
  { x: "MARCH", y: -0.1 },
  { x: "MARCH", y: -20 },
]);
