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
    this._createSvg(0);
  }

  private _createSvg(y: number): void {
    const colQuantity = this._view.timestamps.length;
    const colDist = this._view.width / (colQuantity - 1);

    const childElements = []

    for (let i = 0; i < colQuantity; i++) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
      var textNode = document.createTextNode(new Date(this._view.timestamps[i]).toLocaleDateString('en-GB'));
      element.appendChild(textNode);
      element.setAttribute("x", (i * colDist).toString());
      element.setAttribute("y", y.toString());
      element.setAttribute('fill', 'rgb(151, 159, 181)');
      element.classList.add("light-trading-chart__text");
      childElements.push(element);
      this._svgContainer.append(element);

      element.style.transformOrigin = `${i * colDist}px`;
      element.style.transform = 'translateY(2.5rem) translateX(0.25rem) rotate(-60deg)';
    }
  }

  private _clearSvgElement(): void {
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }
}
