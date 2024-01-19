import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "LINE", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: true,
});

//chart.setHorizontalMargin(100);

chart.setData([
  { x: "JANUARY", y: 100 },
  { x: "MARCH", y: 0 },
  { x: "may", y: -100 },
]);

chart.setFixedYRange({ min: -100, max: 100 });
