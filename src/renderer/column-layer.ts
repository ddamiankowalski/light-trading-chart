import { MinMaxSource } from "../interfaces/data-source";
import { ColumnLayerView } from "../views/column-layer";

export class ColumnLayerRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(private _view: ColumnLayerView) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
  }

  get dataSize(): number {
    return this._view.dataSource.size;
  }

  get effectiveCanvasHeight(): number {
    return this._view.height * (this._view.minMax ? 0.9 : 0.8);
  }

  get minMax(): MinMaxSource {
    if (this._view.minMax) {
      return this._view.minMax;
    }

    return this._view.dataSource.minMax;
  }


  public render(zeroColor: string, horizontalMargin: number) {
    this._ctx.save();
    this._ctx.scale(devicePixelRatio, devicePixelRatio);

    const { min, max } = this.minMax;
    const ratio = this._getYAxisRatio(min, max);

    this._resetCanvas();
    this._drawGrid(zeroColor);

    for (let i = 0; i < this.dataSize; i++) {
      const value = this._view.dataSource.source[i].y;
      const xCoord = i * this._getColGap(horizontalMargin);
      let yCoord = this._view.height - (value - min) * ratio;
      let deltaYCoord = this._view.height - (0 - min) * ratio;

      this._drawBox(xCoord, yCoord, deltaYCoord, value, horizontalMargin);
    }

    this._ctx.restore();
  }

  private _getColGap(horizontalMargin: number): number {
    return (this._view.width - horizontalMargin) / (this._view.dataSource.size - 1);
  }

  private _drawBox(xCoord: number, yCoord: number, deltaYCoord: number, value: number, horizontalMargin: number): void {
    const colWidth = Math.min((this._view.width - horizontalMargin) / (this._view.dataSource.size - 1) / 2, 20);

    if (value === 0) {
      this._ctx.fillStyle = "#979FB5";
      this._ctx.strokeStyle = "#979FB5";

      this._ctx.beginPath();
      this._ctx.arc(
        Math.abs(xCoord + horizontalMargin / 2),
        Math.abs(yCoord),
        Math.abs(colWidth / 2),
        0,
        2 * Math.PI
      );
      this._ctx.stroke();
      this._ctx.fill();
    } else {
      this._ctx.fillStyle = deltaYCoord > yCoord ? "#56B786" : "#EA4D58";
      this._ctx.strokeStyle = deltaYCoord > yCoord ? "#56B786" : "#EA4D58";

      if (Math.abs(deltaYCoord - yCoord) < colWidth / 2) {
        this._ctx.beginPath();
        this._ctx.arc(
          Math.abs(xCoord + horizontalMargin / 2),
          Math.abs(yCoord + colWidth / 6),
          Math.abs(colWidth / 2),
          0,
          2 * Math.PI
        );
        this._ctx.stroke();
        this._ctx.fill();
      } else {
        this._ctx.beginPath();

        if (deltaYCoord >= yCoord) {
          this._ctx.roundRect(
            Math.abs(xCoord + horizontalMargin / 2 - colWidth / 2),
            Math.abs(yCoord),
            Math.abs(colWidth),
            Math.abs(deltaYCoord - yCoord),
            30
          );
        } else {
          this._ctx.roundRect(
            Math.abs(xCoord + horizontalMargin / 2 - colWidth / 2),
            Math.abs(deltaYCoord),
            Math.abs(colWidth),
            Math.abs(yCoord - deltaYCoord),
            30
          );
        }
        this._ctx.stroke();
        this._ctx.fill();
      }
    }
  }

  private _drawGrid(color: string): void {
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.lineWidth = 0.5;
    this._ctx.strokeStyle = color;
    const rowDiff = this._calculateRowDiff();

    for (let i = 0; i < 9; i++) {
      this._ctx.moveTo(0, this._view.height - i * rowDiff - 1);
      this._ctx.lineTo(this._view.width, this._view.height - i * rowDiff - 1);
    }

    this._ctx.stroke();
    this._ctx.restore();
  }

  private _calculateRowDiff(): number {
    const rowQuantity = Math.ceil(this._view.height / 9);
    return rowQuantity;
  }

  private _resetCanvas(): void {
    this._ctx.clearRect(0, 0, this._canvas.width * devicePixelRatio, this._canvas.height * devicePixelRatio);
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }
}
