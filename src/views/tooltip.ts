import { DataComponent } from "../components/data";
import { MinMaxSource, RawDataSource } from "../interfaces/data-source";
import { DataLine } from "../interfaces/lines";
import { DataSource } from "../source/data-source";
import { OverlayView } from "./overlay";

export class TooltipView {
  private _dataSource = new DataSource([]);
  private _tooltipContainer: HTMLElement;
  private _tooltipEl: HTMLElement | null = null;
  private _color?: string;
  private _valueColor?: string;
  private _dataLines: DataLine[] = [];

  private _dateValue?: HTMLElement;
  private _dateLabel?: HTMLElement;

  private _returnsValue?: HTMLElement;
  private _returnsLabel?: HTMLElement;
  private _lineBoxContainer: HTMLElement[] = [];

  constructor(private _component: DataComponent, private _view: OverlayView) {
    this._tooltipContainer = this._createTooltipContainer();
  }

  get minMax(): MinMaxSource {
    if (this._view.minMax) {
      return this._view.minMax;
    }

    return this._view.dataSource.minMax;
  }

  get effectiveCanvasHeight(): number {
    if (this._view.verticalMargin * 2 > this._view.height) {
      return this._view.height;
    }

    return this._view.height - 2 * this._view.verticalMargin;
  }

  public updateBgColor(color: string): void {
    this._color = color;
  }

  public updateValueColor(color: string): void {
    this._valueColor = color;
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    setTimeout(() => {
      this._createLinesSVG();
    }, 1000)
  }

  public notifyMouseOverCol(col: number): void {
    if (this._dataSource.size === 1) {
      return;
    }

    if (!this._tooltipEl) {
      this._tooltipEl = this._createTooltip(col);
    } else {
      this._updateTooltip(col);
    }
  }

  public addLines(lines: DataLine[]): void {
    this._dataLines = lines;
  }

  public notifyMouseOut(): void {
    this._tooltipEl?.remove();
    this._tooltipEl = null;
  }

  private _createTooltipContainer(): HTMLElement {
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.pointerEvents = "none";
    this._component.element.appendChild(container);
    return container;
  }

  private _createLinesSVG(): void {
    this._lineBoxContainer.forEach(container => container.remove());
    this._lineBoxContainer = [];


    this._dataLines.forEach(line => {
      const tooltip = document.createElement("div");
      tooltip.style.borderRadius = "0.25rem";
      tooltip.style.position = "absolute";
      tooltip.style.display = "flex";
      tooltip.style.height = "1.5rem";
      tooltip.style.width = "1.5rem";
      tooltip.classList.add("light-chart-tooltip");
      tooltip.style.backgroundColor = this._color ?? "black";
      this._tooltipContainer.appendChild(tooltip);

      const { min, max } = this._view.dataSource.minMax;
      const ratio = this._getYAxisRatio(min, max);

      const yCoord = this._view.height - this._shouldAddMargin() - (line.y - min) * ratio;
      tooltip.style.top = yCoord + "px";
    })
  }

  private _createTooltip(col: number): HTMLElement {
    const tooltip = document.createElement("div");
    this._assertTooltipSide(tooltip, col);
    tooltip.style.borderRadius = "0.25rem";
    tooltip.style.position = "absolute";
    tooltip.style.display = "flex";
    tooltip.style.height = "1.5rem";
    tooltip.style.backgroundColor = this._color ?? "black";
    tooltip.classList.add("light-chart-tooltip");
    this._tooltipContainer.appendChild(tooltip);
    this._animateTooltip(tooltip);
    this._createTooltipData(tooltip);
    this._createTooltipReturns(tooltip);
    this._updateTooltipData(col);
    return tooltip;
  }

  private _createTooltipReturns(tooltip: HTMLElement): void {
    const returns = document.createElement("div");
    returns.classList.add("light-chart-tooltip__returns");
    this._returnsValue = document.createElement("span");
    this._returnsValue.classList.add("light-chart-tooltip__value");

    if (this._valueColor) {
      this._returnsValue.style.color = this._valueColor;
    }

    this._returnsLabel = document.createElement("span");
    this._returnsLabel.classList.add("light-chart-tooltip__label");
    tooltip.appendChild(returns);
    returns.appendChild(this._returnsLabel);
    returns.appendChild(this._returnsValue);
  }

  private _createTooltipData(tooltip: HTMLElement): void {
    const date = document.createElement("div");
    date.classList.add("light-chart-tooltip__date");
    this._dateValue = document.createElement("span");
    this._dateValue.classList.add("light-chart-tooltip__value");
    this._dateLabel = document.createElement("span");
    this._dateLabel.classList.add("light-chart-tooltip__label");
    tooltip.appendChild(date);
    date.appendChild(this._dateLabel);
    date.appendChild(this._dateValue);
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  private _updateTooltipData(col: number): void {
    if (!this._dataSource.source[col]) {
      return;
    }

    if (this._dateLabel && this._dateValue && this._dataSource.source[col].x) {
      this._dateLabel.textContent = "Date: ";
      this._dateValue.innerHTML = new Date(this._dataSource.source[col].x ?? 0).toLocaleDateString('en-GB') as string;
    }

    if (this._returnsLabel && this._returnsValue) {
      const valuePrefix = this._view.chartOptions.customValueTooltipLabel !== undefined ? this._view.chartOptions.customValueTooltipLabel : "Returns: ";
      this._returnsLabel.innerHTML = valuePrefix;

      const valueSuffix = this._view.chartOptions.tooltipValueSuffix !== undefined ? this._view.chartOptions.tooltipValueSuffix : '%';
      this._returnsValue.innerHTML = this._dataSource.source[col].y.toFixed(2).toString() + valueSuffix;
    }

    if (this._tooltipEl) {
      this._tooltipEl.style.right = "unset";
      this._tooltipEl.style.left = "unset";
      this._tooltipEl.style.transform = "unset";
      this._tooltipEl.style.left = (col * this._component.width) / (this._dataSource.size - 1) + "px";
      this._tooltipEl.style.transform = "translate(-50%)";

      const rect = this._tooltipEl.getBoundingClientRect();
      const parentRect = this._tooltipContainer.getBoundingClientRect();
      if (rect.x + rect.width >= parentRect.x + parentRect.width) {
        this._tooltipEl.style.right = "0";
        this._tooltipEl.style.left = "unset";
        this._tooltipEl.style.transform = "unset";
      }

      if (rect.x <= parentRect.x) {
        this._tooltipEl.style.right = "unset";
        this._tooltipEl.style.left = "0";
        this._tooltipEl.style.transform = "unset";
      }
    }
  }

  private _assertTooltipSide(tooltip: HTMLElement, col: number): void {
    const dataPoint = this._dataSource.source[col];
    if (!dataPoint) {
      this.notifyMouseOut();
      return;
    } else {
      const midpoint = this._getMidpointStatus(dataPoint.y, this._dataSource.minMax.min, this._dataSource.minMax.max);
      this._setYCoord(midpoint, col, tooltip);
    }
  }

  private _setYCoord(midpoint: "above" | "below", col: number, tooltip: HTMLElement): void {
    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    const yCoord = this._view.height - this._shouldAddMargin() - (this._view.dataSource.source[col].y - min) * ratio;
    tooltip.style.top = yCoord + "px";

    if (midpoint === "above") {
      tooltip.style.top = yCoord + 16 + "px";
    } else {
      tooltip.style.top = yCoord - 40 + "px";
    }
  }

  private _shouldAddMargin(): number {
    return this._view.verticalMargin * 2 > this._view.height ? 0 : this._view.verticalMargin;
  }

  private _animateTooltip(tooltipEl: HTMLElement): void {
    const animation = [{ opacity: 0 }, { opacity: 0.8 }];
    const timing = { duration: 200 };
    tooltipEl.animate(animation, timing);
  }

  private _updateTooltip(col: number): void {
    this._assertTooltipSide(this._tooltipEl as HTMLElement, col);
    this._updateTooltipData(col);
  }

  private _getMidpointStatus(x: number, minValue: number, maxValue: number): "above" | "below" {
    const diff = maxValue - minValue;
    const midpoint = minValue + diff / 2;

    if (x >= midpoint) {
      return "above";
    } else {
      return "below";
    }
  }
}
