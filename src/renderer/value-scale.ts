import { ValueScaleView } from "../views/value-scale";

export class ValueScaleRenderer {
  private _svgContainer: SVGSVGElement;
  private _svgElement: SVGTextElement | null = null;

  constructor(private _view: ValueScaleView) {
    this._svgContainer = _view.svgContainer;
    this._createSvg(10, 100, "black");
  }

  public render(): void {
    console.log("rendering!!");
  }

  private _createSvg(x: number, y: number, color: string): void {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var textNode = document.createTextNode("milind morey");
    element.appendChild(textNode);
    element.setAttribute("x", x.toString());
    element.setAttribute("y", y.toString());
    element.setAttribute("fill", color);
    element.classList.add("light-trading-chart__text");
    this._svgContainer.replaceChildren(element);
    this._svgElement = element;
  }
}
