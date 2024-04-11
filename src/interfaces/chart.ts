export type ChartType = "FULL" | "PREVIEW";

export type ChartDataType = "LINE" | "COLUMNS";

export interface ChartOptions {
  stopTimeScaleConvert: boolean;
  showPercentagePrefix: boolean;
  hideTimeAxis: boolean;
  showTooltipPercent?: boolean;
}
