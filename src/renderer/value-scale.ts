import { MinMaxSource } from "../interfaces/data-source";
import { ValueScaleView } from "../views/value-scale";

export class ValueScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: ValueScaleView) {
    this._svgContainer = _view.svgContainer;
  }

  public render(): void {
    this._clearSvgElement();
    const rowDiff = this._calculateRowDiff();
    this._createSvg(5, 30, rowDiff);
  }

  private _calculateRowDiff(): number {
    const rowQuantity = Math.floor(this._view.height / 10);
    return rowQuantity;
  }

  private _createSvg(x: number, y: number, rowDiff: number): void {
    const minMax = this._view.minMax;
    const { min, max } = minMax;
    const diff = Math.abs(max - min);

    for (let i = 0; i < 10; i++) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      var textNode = document.createTextNode((max - diff * i).toString());
      element.appendChild(textNode);
      element.setAttribute("x", x.toString());
      element.setAttribute("y", (y + i * rowDiff).toString());
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);
    }
  }

  private _clearSvgElement(): void {
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }
}
