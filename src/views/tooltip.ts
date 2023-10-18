import { ChartComponent } from "../components/chart";
import { RawDataSource } from "../interfaces/data-source";
import { DataSource } from "../source/data-source";

export class TooltipView {
  private _dataSource = new DataSource([]);
  private _tooltipContainer: HTMLElement;
  private _tooltipEl: HTMLElement | null = null;
  private _color?: string;
  private _valueColor?: string;

  private _dateValue?: HTMLElement;
  private _dateLabel?: HTMLElement;

  private _returnsValue?: HTMLElement;
  private _returnsLabel?: HTMLElement;

  constructor(private _component: ChartComponent) {
    this._tooltipContainer = this._createTooltipContainer();
  }

  public updateBgColor(color: string): void {
    this._color = color;
  }

  public updateValueColor(color: string): void {
    this._valueColor = color;
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
  }

  public notifyMouseOverCol(col: number): void {
    if (this._dataSource.size <= 2 && this._dataSource.source[0].y === this._dataSource.source[1].y) {
      return;
    }

    if (!this._tooltipEl) {
      this._tooltipEl = this._createTooltip(col);
    } else {
      this._updateTooltip(col);
    }
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

  private _createTooltip(col: number): HTMLElement {
    const tooltip = document.createElement("div");
    this._assertTooltipSide(tooltip, col);
    tooltip.style.position = "absolute";
    tooltip.style.display = "flex";
    tooltip.style.height = "1.5rem";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translate(-50%)";
    tooltip.style.backgroundColor = this._color ?? "black";
    tooltip.classList.add("light-chart-tooltip");
    this._tooltipContainer.appendChild(tooltip);
    this._animateTooltip(tooltip);
    this._createTooltipData(tooltip);
    this._createTooltipReturns(tooltip);
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

  private _updateTooltipData(col: number): void {
    if (this._dateLabel && this._dateValue) {
      this._dateLabel.textContent = "Date: ";
      this._dateValue.innerHTML = this._dataSource.source[col]?.x?.toString() as string;
    }

    if (this._returnsLabel && this._returnsValue) {
      this._returnsLabel.innerHTML = "Returns: ";
      this._returnsValue.innerHTML = this._dataSource.source[col].y.toFixed(2).toString() + "%";
    }
  }

  private _assertTooltipSide(tooltip: HTMLElement, col: number): void {
    const dataPoint = this._dataSource.source[col];
    const midpoint = this._getMidpointStatus(dataPoint.y, this._dataSource.minMax.min, this._dataSource.minMax.max);
    if (midpoint === "above") {
      tooltip.style.bottom = "0";
      tooltip.style.top = "unset";
      tooltip.style.borderRadius = "0.25rem 0.25rem 0 0";
    } else {
      tooltip.style.bottom = "unset";
      tooltip.style.top = "0";
      tooltip.style.borderRadius = "0 0 0.25rem 0.25rem";
    }
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
