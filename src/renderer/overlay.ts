import { ChartType } from "../interfaces/chart";
import { MinMaxSource } from "../interfaces/data-source";
import { OverlayView } from "../views/overlay";

export class OverlayRenderer {
  private _svgContainer: SVGSVGElement;
  private _svgElement: SVGCircleElement | null = null;
  private _lastMouseOverCol: number | null = null;

  constructor(private _view: OverlayView, private _type: ChartType) {
    this._svgContainer = _view.svgContainer;
  }

  get dataSize(): number {
    return this._view.dataSource.size;
  }

  get colGap(): number {
    return this._view.width / (this._view.dataSource.size - 1);
  }

  get effectiveCanvasHeight(): number {
    if (this._type === 'FULL') {
      return this._view.height * (this._view.minMax ? .9 : .8);
    }

    if (this._view.verticalMargin * 2 > this._view.height) {
      return this._view.height;
    }

    return this._view.height - 2 * this._view.verticalMargin;
  }

  get minMax(): MinMaxSource {
    if (this._view.minMax) {
      return this._view.minMax;
    }

    return this._view.dataSource.minMax;
  }

  public render(color: string, tooltipBgColor: string): void {
    if (this._view.dataSource.size === 1) {
      return;
    }

    if (this._lastMouseOverCol === this._view.mouseOverCol) {
      return;
    }

    if (this._view.mouseOverCol === null) {
      this._clearSvgElement();
      return;
    }

    this._lastMouseOverCol = this._view.mouseOverCol;
    const { min, max } = this.minMax;
    const ratio = this._getYAxisRatio(min, max);

    if (!this._view.dataSource.source[this._view.mouseOverCol]) {
      return
    }

    const yCoord =
      this._view.height -
      this._shouldAddMargin() -
      (this._view.dataSource.source[this._view.mouseOverCol].y - min) * ratio;
    const xCoord = this._view.mouseOverCol * this.colGap;

    !this._svgElement ? this._createSvg(xCoord, yCoord, color, tooltipBgColor) : this._updateSvg(xCoord, yCoord);
  }

  private _shouldAddMargin(): number {
    if (this._type === 'FULL') {
      return 0;
    }

    return this._view.verticalMargin * 2 > this._view.height ? 0 : this._view.verticalMargin;
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  private _createSvg(x: number, y: number, color: string, tooltipBgColor: string): void {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.setAttribute("cx", x.toString());
    element.setAttribute("cy", y.toString());
    element.setAttribute("r", "6");
    element.setAttribute("fill", color);
    element.setAttribute("stroke", tooltipBgColor);
    element.setAttribute("stroke-width", "3");
    element.setAttribute("shape-rendering", "geometricPrecision");
    element.classList.add("light-trading-chart__overlay-point");
    this._svgContainer.replaceChildren(element);
    this._svgElement = element;
  }

  private _clearSvgElement(): void {
    this._svgElement = null;
    this._lastMouseOverCol = null;
    Array.from(this._svgContainer.children).forEach((c) => c.remove());
  }

  private _updateSvg(x: number, y: number): void {
    if (!this._svgElement) {
      throw new Error("Could not update the svgCircleElement");
    }

    this._svgElement.setAttribute("cx", x.toString());
    this._svgElement.setAttribute("cy", y.toString());
  }
}
