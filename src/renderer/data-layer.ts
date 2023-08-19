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
    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;
      this._ctx.beginPath();
      this._ctx.arc(xCoord, 75, 1, 0, 2 * Math.PI);
      this._ctx.stroke();
    }
  }
}
