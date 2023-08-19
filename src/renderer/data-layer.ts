import { DataLayerView } from '../views/data-layer';

export class DataLayerRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(_view: DataLayerView) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
  }

  public render(): void {
    this._ctx.fillStyle = 'blue';
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}
