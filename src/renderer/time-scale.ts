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

  public render(horizontalMargin: number): void {
    this._clearSvgElement();
    this._createSvg(horizontalMargin);
  }

  private _createSvg(horizontalMargin: number = 0, y: number = 0): void {
    const colQuantity = this._view.timestamps.length;
    const colDist = this._dataType === 'COLUMNS' ? (this._view.width - horizontalMargin) / (colQuantity - 1) : this._view.width / (this._view.timestamps.length - 1);

    let prevX = null;

    for (let i = 0; i < colQuantity; i++) {
      const currX = i * colDist + (this._dataType === "COLUMNS" ? horizontalMargin / 2 : 0);

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
      element.setAttribute("text-anchor", "end");
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);

      if (!this._view.straightLabels) {
        element.style.transformOrigin = `${currX}px ${0}px`;
        element.style.transform = "rotate(300deg)";
        this._svgContainer.style.transform = "translateY(1rem) translateX(0.5rem)";
      } else {
        const elWidth = element.getBBox().width
        element.style.transform = `translateY(1.25rem) translateX(${elWidth / 2}px)`;
      }
      prevX = currX;
    }
  }

  private _clearSvgElement(): void {
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }
}
