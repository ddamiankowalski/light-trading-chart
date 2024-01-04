import { ChartDataType, ChartOptions } from "../interfaces/chart";
import { TimeScaleView } from "../views/time-scale";

export class TimeScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: TimeScaleView, private _dataType: ChartDataType, private _chartOptions: ChartOptions) {
    this._svgContainer = _view.svgContainer;
  }

  get view(): TimeScaleView {
    return this._view;
  }

  get horizontalMargin(): number {
    return this._dataType === "COLUMNS" ? 25 : 0;
  }

  public render(): void {
    this._clearSvgElement();
    this._createSvg(0);
  }

  private _createSvg(y: number): void {
    const colQuantity = this._view.timestamps.length;
    const colDist = (this._view.width - this.horizontalMargin) / (colQuantity - 1);

    let prevX = null;

    for (let i = 0; i < colQuantity; i++) {
      const currX = i * colDist + (this._dataType === "COLUMNS" ? this.horizontalMargin / 2 : 0);

      if (prevX !== null && currX - prevX < 50 && this._dataType !== "COLUMNS") {
        continue;
      }

      let text = this._chartOptions?.stopTimeScaleConvert
        ? this._view.timestamps[i].toString()
        : new Date(this._view.timestamps[i]).toLocaleDateString("en-GB");

      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      let textNode = document.createTextNode(text);
      element.appendChild(textNode);
      element.setAttribute("x", currX.toString());
      element.setAttribute("y", y.toString());
      element.setAttribute("fill", "rgb(151, 159, 181)");
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);

      element.style.transformOrigin = `${currX}px`;
      element.style.transform = "translateY(2.75rem) translateX(-1rem) rotate(320deg)";
      prevX = currX;
    }
  }

  private _clearSvgElement(): void {
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }
}
