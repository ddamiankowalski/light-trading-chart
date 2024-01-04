import { ChartOptions } from "../interfaces/chart";
import { ValueScaleView } from "../views/value-scale";

export class ValueScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: ValueScaleView, private _chartOptions: ChartOptions) {
    this._svgContainer = _view.svgContainer;
  }

  public render(): void {
    this._clearSvgElement();
    const rowDiff = this._calculateRowDiff();
    this._createSvg(this._chartOptions?.showPercentagePrefix ? 40 : 55, rowDiff);
  }

  private _calculateRowDiff(): number {
    const rowQuantity = Math.floor(this._view.height / 10);
    return rowQuantity;
  }

  private _createSvg(x: number, rowDiff: number): void {
    const minMax = this._view.minMax;
    const { min, max } = minMax;
    const diff = Math.abs(max - min) / 8;

    for (let i = 0; i < 10; i++) {
      const text = (min + diff * i).toFixed(2).toString() + (this._chartOptions?.showPercentagePrefix ? "%" : "");

      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      let textNode = document.createTextNode(text);
      element.appendChild(textNode);
      element.setAttribute("x", x.toString());
      element.setAttribute("y", (this._view.height - i * rowDiff + 2).toString());
      element.setAttribute("fill", "rgb(151, 159, 181)");
      element.setAttribute("text-anchor", "end");
      element.classList.add("light-trading-chart__text");
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);
    }
  }

  private _clearSvgElement(): void {
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }
}
