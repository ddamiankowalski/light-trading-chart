import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "COLUMNS", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: true,
});

chart.setData([
  { x: "JANUARY", y: 5 },
  { x: "FEBRUARY", y: 25 },
  { x: "MARCH", y: 15 },
  { x: "APRIL", y: 0 },
  { x: "MAY", y: 0 },
  { x: "JUNE", y: -350 },
  { x: "JULY", y: 5 },
  { x: "AUGUST", y: 2322 },
  { x: "SEPTEMBER", y: 1120 },
  { x: "OCTOBER", y: -10 },
  { x: "NOVEMBER", y: -20 },
  { x: "DECEMBER", y: 10 },
]);
