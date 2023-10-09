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
    if (this._view.verticalMargin * 2 > this._canvas.height) {
      return this._canvas.height;
    }
    return this._canvas.height - 2 * this._view.verticalMargin;
  }

  public render(color: string, rgbColor: string): void {
    this._resetCanvas();

    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    this._ctx.beginPath();
    this._ctx.lineWidth = 2.5;
    this._ctx.lineCap = 'round';
    this._ctx.lineJoin = 'round';
    this._ctx.strokeStyle = color;

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;
      let yCoord = this._canvas.height - this._shouldAddMargin() - (this._view.dataSource.source[i].y - min) * ratio;

      if (this._view.dataSource.size <= 2 && this._view.dataSource.source[0].y === this._view.dataSource.source[1].y) {
        yCoord = (this._view.height - this._view.verticalMargin) / 2;
      }

      if (i === 0) {
        this._ctx.moveTo(xCoord, yCoord);
        continue;
      }

      this._ctx.lineTo(xCoord + 0.5, yCoord + 0.5);
    }
    this._ctx.stroke();

    this._clipPath();
    this._createGradient(rgbColor);
  }

  private _resetCanvas(): void {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  private _shouldAddMargin(): number {
    return this._view.verticalMargin * 2 > this._canvas.height ? 0 : this._view.verticalMargin;
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  // private _getRgbaColor(): string {
  //   if (this._view.dataSource.size <= 2 && this._view.dataSource.source[0].y === this._view.dataSource.source[1].y) {
  //     return '74, 83, 103';
  //   }

  //   return this._view.dataSource.source[0].y < this._view.dataSource.source[this._view.dataSource.size - 1].y
  //     ? '86, 183, 134'
  //     : '226, 49, 66';
  // }

  private _clipPath(): void {
    this._ctx.save();
    this._ctx.lineTo(this._canvas.width, this._canvas.height);
    this._ctx.lineTo(0, this._canvas.height);
    this._ctx.clip();
  }

  private _createGradient(rgbColor: string): void {
    const gradient = this._ctx.createLinearGradient(
      this._canvas.width / 2,
      0,
      this._canvas.width / 2,
      this._canvas.height
    );

    gradient.addColorStop(0, `rgba(${rgbColor}, 0.5)`);
    gradient.addColorStop(1, `rgba(${rgbColor}, 0.0125)`);

    this._ctx.fillStyle = gradient;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.restore();
  }
}
