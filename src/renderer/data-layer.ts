import { DataLayerView } from '../views/data-layer';

export class DataLayerRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(private _view: DataLayerView) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
  }

  get colGap(): number {
    return this._view.canvas.width / (this._view.dataSource.size - 1);
  }

  get dataSize(): number {
    return this._view.dataSource.size;
  }

  public render(): void {
    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;
      const yCoord = this._canvas.height - (this._view.dataSource.source[i].y - min) * ratio;

      this._ctx.beginPath();
      this._ctx.arc(xCoord, yCoord, 10, 0, 2 * Math.PI);
      this._ctx.stroke();
    }
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this._canvas.height / (max - min);
  }
}
