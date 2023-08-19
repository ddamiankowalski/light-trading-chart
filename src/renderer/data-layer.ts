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

  get effectiveCanvasHeight(): number {
    return this._canvas.height - 2 * this._view.verticalMargin;
  }

  public render(): void {
    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    this._ctx.beginPath();
    this._ctx.lineWidth = 2;
    this._ctx.lineCap = 'round';
    this._ctx.strokeStyle = '#56B786';

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;
      const yCoord =
        this._canvas.height - this._view.verticalMargin - (this._view.dataSource.source[i].y - min) * ratio;

      if (i === 0) {
        this._ctx.moveTo(xCoord, yCoord);
        continue;
      }

      this._ctx.lineTo(xCoord + 0.5, yCoord + 0.5);
    }
    this._ctx.stroke();

    this._clipPath();
    this._createGradient();
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  private _clipPath(): void {
    this._ctx.lineTo(this._canvas.width, this._canvas.height);
    this._ctx.lineTo(0, this._canvas.height);
    this._ctx.clip();
  }

  private _createGradient(): void {
    const gradient = this._ctx.createLinearGradient(
      this._canvas.width / 2,
      0,
      this._canvas.width / 2,
      this._canvas.height
    );

    gradient.addColorStop(0, 'rgba(86, 183, 134, 0.5)');
    gradient.addColorStop(1, 'rgba(86, 183, 134, 0.0125)');

    this._ctx.fillStyle = gradient;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}
