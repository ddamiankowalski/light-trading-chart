import { OverlayView } from '../views/overlay';

export class OverlayRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(private _view: OverlayView) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
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

    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;
      const yCoord =
        this._canvas.height - this._view.verticalMargin - (this._view.dataSource.source[i].y - min) * ratio;
    }
  }

  private _resetCanvas(): void {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }
}
