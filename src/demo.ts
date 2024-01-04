import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "COLUMNS", {
  stopTimeScaleConvert: true,
});

chart.setData([
  { x: "JANUARY", y: 5 },
  { x: "FEBRUARY", y: 25 },
  { x: "MARCH", y: 15 },
  { x: "APRIL", y: 0 },
  { x: "MAY", y: 0 },
  { x: "JUNE", y: -15 },
  { x: "JULY", y: 5 },
  { x: "AUGUST", y: 23 },
  { x: "SEPTEMBER", y: 11 },
  { x: "OCTOBER", y: -10 },
  { x: "NOVEMBER", y: -20 },
  { x: "DECEMBER", y: 10 },
]);

console.log(chart);
