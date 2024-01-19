import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "COLUMNS", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: true,
  hideTimeAxis: true
});

chart.setHorizontalMargin(100);

chart.setData([{ x: 'test', y: 0 }, { x: 'test', y: 0 }]);

chart.setFixedYRange({ min: -100, max: 100 });
