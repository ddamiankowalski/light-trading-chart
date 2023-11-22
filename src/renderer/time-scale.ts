import { TimeScaleView } from "../views/time-scale";

export class TimeScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: TimeScaleView) {
    this._svgContainer = _view.svgContainer;
  }

  get view(): TimeScaleView {
    return this._view;
  }

  public render(): void {
    this._clearSvgElement();
    this._createSvg(10, 20, "black");
  }

  private _createSvg(x: number, y: number, color: string): void {
    const marginLeft = 16 * 3;
    const width = this._view.width - marginLeft;
    const colQuantity = Math.floor(width / 50);
    const colDist = width / colQuantity;

    for (let i = 0; i < colQuantity; i++) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      var textNode = document.createTextNode("|");
      element.appendChild(textNode);
      element.setAttribute("x", (x + i * colDist).toString());
      element.setAttribute("y", y.toString());
      element.setAttribute("fill", color);
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);
    }
  }

  private _clearSvgElement(): void {
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }
}
