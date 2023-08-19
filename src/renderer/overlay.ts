import { OverlayView } from '../views/overlay';

export class OverlayRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;
  private _svgContainer: SVGSVGElement;

  constructor(private _view: OverlayView) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
    this._svgContainer = this._createSvgContainer();
  }

  get dataSize(): number {
    return this._view.dataSource.size;
  }

  get colGap(): number {
    return this._view.canvas.width / (this._view.dataSource.size - 1);
  }

  get effectiveCanvasHeight(): number {
    return this._canvas.height - 2 * this._view.verticalMargin;
  }

  public render(): void {
    this._resetCanvas();

    if (!this._view.mouseOverCol) {
      return;
    }

    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    const yCoord =
      this._canvas.height -
      this._view.verticalMargin -
      (this._view.dataSource.source[this._view.mouseOverCol].y - min) * ratio;
    const xCoord = this._view.mouseOverCol * this.colGap;

    this._createSvg(xCoord, yCoord);
  }

  private _createSvgContainer(): SVGSVGElement {
    const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._canvas.appendChild(svgContainer);
    return svgContainer;
  }

  private _resetCanvas(): void {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  private _createSvg(x: number, y: number): void {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttribute('x', x.toString());
    element.setAttribute('y', y.toString());
    element.setAttribute('width', '100');
    element.setAttribute('height', '100');
    element.setAttribute('fill', '#5cceee');
    this._svgContainer.appendChild(element);
    console.log(element);
  }
}
