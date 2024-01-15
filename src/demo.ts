import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "LINE", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: true,
});

chart.setData([
  { x: "JANUARY", y: -100 },
  { x: "MARCH", y: -200 },
]);
