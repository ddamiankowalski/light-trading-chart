import { OverlayView } from '../views/overlay';

export class OverlayRenderer {
  private _svgContainer: SVGSVGElement;
  private _svgElement: SVGCircleElement | null = null;
  private _lastMouseOverCol: number | null = null;

  constructor(private _view: OverlayView) {
    this._svgContainer = _view.svgContainer;
  }

  get dataSize(): number {
    return this._view.dataSource.size;
  }

  get colGap(): number {
    return this._view.width / (this._view.dataSource.size - 1);
  }

  get effectiveCanvasHeight(): number {
    return this._view.height - 2 * this._view.verticalMargin;
  }

  public render(): void {
    if (this._view.mouseOverCol === null || this._lastMouseOverCol === this._view.mouseOverCol) {
      return;
    }

    this._lastMouseOverCol = this._view.mouseOverCol;
    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    const yCoord =
      this._view.height -
      this._view.verticalMargin -
      (this._view.dataSource.source[this._view.mouseOverCol].y - min) * ratio;
    const xCoord = this._view.mouseOverCol * this.colGap;

    !this._svgElement ? this._createSvg(xCoord, yCoord) : this._updateSvg(xCoord, yCoord);
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  private _createSvg(x: number, y: number): void {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttribute('cx', x.toString());
    element.setAttribute('cy', y.toString());
    element.setAttribute('r', '4');
    element.setAttribute('fill', '#56B786');
    element.setAttribute('stroke', '#FFFFFF');
    element.setAttribute('stroke-width', '2');
    element.setAttribute('shape-rendering', 'geometricPrecision');
    element.classList.add('light-trading-chart__overlay-point');
    this._svgContainer.replaceChildren(element);
    this._svgElement = element;
  }

  private _updateSvg(x: number, y: number): void {
    if (!this._svgElement) {
      throw new Error('Could not update the svgCircleElement');
    }

    this._svgElement.setAttribute('cx', x.toString());
    this._svgElement.setAttribute('cy', y.toString());
  }
}
