import { ValueScaleView } from "../views/value-scale";

export class ValueScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: ValueScaleView) {
    this._svgContainer = _view.svgContainer;
    this._createSvg(10, 20, "black");
  }

  public render(): void {
    console.log("rendering!!");
  }

  private _createSvg(x: number, y: number, color: string): void {
    for (let i = 0; i < 10; i++) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      var textNode = document.createTextNode("100%");
      element.appendChild(textNode);
      element.setAttribute("x", x.toString());
      element.setAttribute("y", (y + i * 30).toString());
      element.setAttribute("fill", color);
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);
    }
  }
}
