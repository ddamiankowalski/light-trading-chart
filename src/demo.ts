import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "LINE", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: false,
  hideTimeAxis: false,
  customValueTooltipLabel: 'pref',
  tooltipValueSuffix: 'suff'
});

//chart.setHorizontalMargin(100);

chart.setData([{ x: 'January', y: 0, xLabel: 'dupa' }, { x: 'sdasdasdasdasdsa', y: 0, xLabel: 'dupa2' }, { x: 'sadasdasdasdasdas', y: 10 }, { x: 'J', y: 20 }, { x: 'January', y: 30 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }]);

chart.setFixedYRange({ min: -100, max: 100 });
