import { DataLayerView } from '../views/data-layer';

export class DataLayerRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(private _view: DataLayerView) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
  }

  public render(): void {
    console.log(this._view.dataSource);
    const gradient = this._ctx.createLinearGradient(20, 0, 220, 0);

    // Add three color stops
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(0.5, 'cyan');
    gradient.addColorStop(1, 'green');

    // Set the fill style and draw a rectangle
    this._ctx.fillStyle = gradient;
    this._ctx.fillRect(20, 20, 200, 100);
  }
}
