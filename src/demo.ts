import { createChart } from ".";

const chart = createChart(document.getElementById("app") as HTMLElement, "FULL", "LINE", {
  stopTimeScaleConvert: true,
  showPercentagePrefix: false,
  hideTimeAxis: false,
  customValueTooltipLabel: 'pref',
  tooltipValueSuffix: 'suff',
  straightLabels: true
});

//chart.setHorizontalMargin(100);

chart.setData([{ x: 'January', y: 0, xLabel: 'dupa' }, { x: 'sdasdasdasdasdsa', y: 0, xLabel: 'dupa2' }, { x: 'sadasdasdasdasdas', y: 10 }, { x: 'J', y: 20 }, { x: 'January', y: 30 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }, { x: 'January', y: 0 }]);

chart.setHorizontalLines([{ label: 'dupa', y: 20, color: 'red', labelValue: 'dupavalue' }, { label: 'dupa', y: 10, color: 'red', labelValue: 'dupavalue' }]);
chart.setGradient('rgba(86, 183, 134, 0.25)', 'rgba(235, 78, 92, 0.25)');

// chart.setFixedYRange({ min: -100, max: 100 });
