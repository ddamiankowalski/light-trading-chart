import { ChartType } from "../interfaces/chart";
import { DataLayerView } from "../views/data-layer";

export class DataLayerRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(private _view: DataLayerView, private _type: ChartType) {
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
    if (this._type === 'FULL') {
      return this._canvas.height * .8;
    }

    if (this._view.verticalMargin * 2 > this._canvas.height) {
      return this._canvas.height;
    }
    return this._canvas.height - 2 * this._view.verticalMargin;
  }

  private _drawGrid(color: string): void {
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.lineWidth = 1;
    this._ctx.strokeStyle = color;
    const rowDiff = this._calculateRowDiff();
    let prevX = null;

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;


      if (prevX !== null && (xCoord - prevX) < 50) {
        continue;
      }


      this._ctx.moveTo(xCoord + 1, rowDiff + 2);
      this._ctx.lineTo(xCoord + 1, this._view.height);

      prevX = xCoord;

      if (i === this.dataSize - 1) {
        /**
          * draw borders
          */
        this._ctx.moveTo(i * this.colGap - 1, rowDiff + 2);
        this._ctx.lineTo(i * this.colGap - 1, this._view.height);
      }
    }

    for (let i = 0; i < 10; i++) {
      this._ctx.moveTo(0, this._view.height - i * rowDiff - 1);
      this._ctx.lineTo(this._view.width, this._view.height - i * rowDiff - 1);
    }

    this._ctx.stroke();
    this._ctx.restore();
  }

  public render(color: string, rgbColor: string, zeroColor: string): void {
    this._resetCanvas();

    const { min, max } = this._view.dataSource.minMax;
    const ratio = this._getYAxisRatio(min, max);

    this._drawZeroLine(min, ratio, zeroColor);

    if (this._type === 'FULL') {
      this._drawGrid(zeroColor);
    }

    this._ctx.beginPath();

    this._ctx.lineWidth = 2;
    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";
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

    this._ctx.save();
    this._clipPath();
    this._createGradient(rgbColor);

    if (this._type === 'FULL') {
      this._drawHoverLine(zeroColor);
    }

    this._ctx.restore();
  }

  private _drawHoverLine(color: string): void {
    if (this._view.mouseOverCol) {
      const xCoord = this._view.mouseOverCol * this.colGap;
      const rowDiff = this._calculateRowDiff();
      this._ctx.strokeStyle = color;
      this._ctx.setLineDash([5, 5]);

      this._ctx.beginPath();
      this._ctx.moveTo(xCoord + 1, rowDiff + 3);
      this._ctx.lineTo(xCoord + 1, this._view.height);
      this._ctx.stroke();
    }
  }

  private _calculateRowDiff(): number {
    const rowQuantity = Math.floor(this._view.height / 10);
    return rowQuantity;
  }

  private _drawZeroLine(min: number, ratio: number, zeroColor: string): void {
    if (!zeroColor) {
      return;
    }

    let yCoord = this._canvas.height - this._shouldAddMargin() - (0 - min) * ratio - 1;
    if (yCoord > this._view.height - 2 - this._view.verticalMargin) {
      yCoord = this._view.height - 2;
    } else if (yCoord < 0) {
      yCoord = 0;
    }
    this._ctx.fillStyle = zeroColor;

    this._ctx.fillRect(0, yCoord, this._view.width, 2);
  }

  private _resetCanvas(): void {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  private _shouldAddMargin(): number {
    if (this._type === 'FULL') {
      return 0;
    }

    return this._view.verticalMargin * 2 > this._canvas.height ? 0 : this._view.verticalMargin;
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

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

    if (!rgbColor) {
      rgbColor = "74, 83, 103";
    }

    gradient.addColorStop(0, `rgba(${rgbColor}, 0.5)`);
    gradient.addColorStop(1, `rgba(${rgbColor}, 0.0125)`);

    this._ctx.fillStyle = gradient;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.restore();
  }
}
