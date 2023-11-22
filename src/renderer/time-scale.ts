import { TimeScaleView } from "../views/time-scale";

export class TimeScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: TimeScaleView) {
    this._svgContainer = _view.svgContainer;
    this._createSvg(10, 20, "black");
  }

  public render(): void {
    console.log("rendering!!");
  }

  private _createSvg(x: number, y: number, color: string): void {
    for (let i = 0; i < 10; i++) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      var textNode = document.createTextNode("milind morey");
      element.appendChild(textNode);
      element.setAttribute("x", (x + i * 80).toString());
      element.setAttribute("y", y.toString());
      element.setAttribute("fill", color);
      element.classList.add("light-trading-chart__text");
      this._svgContainer.append(element);
    }
  }
}
