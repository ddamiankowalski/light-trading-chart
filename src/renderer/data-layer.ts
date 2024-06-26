import { ChartType } from "../interfaces/chart";
import { MinMaxSource } from "../interfaces/data-source";
import { DataLayerView } from "../views/data-layer";

export class DataLayerRenderer {
  private _ctx: CanvasRenderingContext2D;

  constructor(private _view: DataLayerView, private _type: ChartType) {
    this._ctx = _view.ctx;
  }

  get colGap(): number {
    return this._view.width / (this._view.dataSource.size - 1);
  }

  get dataSize(): number {
    return this._view.dataSource.size;
  }

  get minMax(): MinMaxSource {
    if (this._view.minMax) {
      return this._view.minMax;
    }

    return this._view.dataSource.minMax;
  }

  get effectiveCanvasHeight(): number {
    if (this._type === "FULL") {
      return this._view.height * (this._view.minMax ? 0.9 : 0.8);
    }

    if (this._view.verticalMargin * 2 > this._view.height) {
      return this._view.height;
    }
    return this._view.height - 2 * this._view.verticalMargin;
  }

  private _drawGrid(color: string): void {
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.lineWidth = 0.5;
    this._ctx.strokeStyle = color;
    const rowDiff = this._calculateRowDiff();
    let prevX = null;

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;

      if (prevX !== null && xCoord - prevX < 50) {
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

  public render(
    color: string,
    rgbColor: string,
    zeroColor: string,
    hoverLineColor: string,
    customGradientColors: string[] = []
  ): void {
    this._ctx.save();
    this._resetCanvas();

    this._ctx.scale(devicePixelRatio, devicePixelRatio);

    const { min, max } = this.minMax;
    const ratio = this._getYAxisRatio(min, max);

    this._drawZeroLine(min, ratio, zeroColor);

    if (this._type === "FULL") {
      this._drawGrid(zeroColor);
    }

    this._ctx.beginPath();

    this._ctx.lineWidth = 2;
    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";
    this._ctx.strokeStyle = color;

    let maxYCoord = Infinity;

    for (let i = 0; i < this.dataSize; i++) {
      const xCoord = i * this.colGap;
      let yCoord = this._view.height - this._shouldAddMargin() - (this._view.dataSource.source[i].y - min) * ratio;

      if (this._view.dataSource.size === 1) {
        if (this._type === "PREVIEW") {
          yCoord = (this._view.height - this._view.verticalMargin) / 2;
        }

        this._ctx.moveTo(0, yCoord);
        this._ctx.lineTo(this._view.width, yCoord);
        continue;
      }

      if (i === 0) {
        this._ctx.moveTo(xCoord, yCoord);
        continue;
      }

      this._ctx.lineTo(xCoord, yCoord);

      if (yCoord < maxYCoord) {
        maxYCoord = yCoord;
      }
    }

    this._ctx.stroke();

    this._clipPath();
    this._createGradient(rgbColor, customGradientColors, maxYCoord);

    if (this._type === "FULL") {
      this._drawHoverLine(hoverLineColor);
    }

    this._ctx.restore();
    this._drawLines();
  }

  private _drawLines(): void {
    this._view.clearLinesTooltip();
    const lines = this._view.lines;
    const { min, max } = this.minMax;
    const ratio = this._getYAxisRatio(min, max);

    lines.forEach((line) => {
      this._ctx.save();
      this._ctx.beginPath();

      this._ctx.lineWidth = line.width || 2;
      this._ctx.strokeStyle = line.color;
      let yCoord = this._view.height - this._shouldAddMargin() - (line.y - min) * ratio;
      this._ctx.moveTo(0, yCoord * devicePixelRatio);
      this._ctx.lineTo(this._view.width * devicePixelRatio, yCoord * devicePixelRatio);
      this._ctx.stroke();
      this._view.drawTooltip(yCoord, line);

      this._ctx.restore();
    });
  }

  private _drawHoverLine(color: string): void {
    if (this._view.mouseOverCol) {
      const xCoord = this._view.mouseOverCol * this.colGap;
      const rowDiff = this._calculateRowDiff();
      this._ctx.strokeStyle = color;
      this._ctx.lineWidth = 0.5;
      this._ctx.setLineDash([4, 6]);

      this._ctx.beginPath();
      this._ctx.moveTo(Math.round(xCoord), rowDiff + 3);
      this._ctx.lineTo(Math.round(xCoord), this._view.height);
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

    let yCoord = this._view.height - this._shouldAddMargin() - (0 - min) * ratio - 1;
    if (yCoord > this._view.height - 2 - this._view.verticalMargin) {
      yCoord = this._view.height - 2;
    } else if (yCoord < 0) {
      yCoord = this._type === "FULL" ? -100 : 0;
    }
    this._ctx.fillStyle = zeroColor;

    this._ctx.fillRect(0, yCoord, this._view.width, 2);
  }

  private _resetCanvas(): void {
    this._ctx.clearRect(0, 0, this._view.width * devicePixelRatio, this._view.height * devicePixelRatio);
  }

  private _shouldAddMargin(): number {
    if (this._type === "FULL") {
      return 0;
    }

    return this._view.verticalMargin * 2 > this._view.height ? 0 : this._view.verticalMargin;
  }

  private _getYAxisRatio(min: number, max: number): number {
    return this.effectiveCanvasHeight / (max - min);
  }

  private _clipPath(): void {
    this._ctx.save();
    this._ctx.lineTo(this._view.width, this._view.height);
    this._ctx.lineTo(0, this._view.height);
    this._ctx.clip();
  }

  private _createGradient(rgbColor: string, customColors: string[], yCoord: number): void {
    if (customColors.length === 2) {
      const parsedYCoord = isFinite(yCoord) ? yCoord : 0;
      const gradient = this._ctx.createLinearGradient(
        this._view.width / 2,
        parsedYCoord,
        this._view.width / 2,
        this._view.height
      );

      if (!rgbColor) {
        rgbColor = "74, 83, 103";
      }

      if (customColors.length === 2) {
        gradient.addColorStop(0, customColors[0]);
        gradient.addColorStop(1, customColors[1]);
      } else {
        gradient.addColorStop(0, `rgba(${rgbColor}, 0.25)`);
        gradient.addColorStop(1, `rgba(${rgbColor}, 0)`);
      }

      this._ctx.fillStyle = gradient;

      if (isFinite(yCoord)) {
        this._ctx.fillRect(0, parsedYCoord, this._view.width, this._view.height - parsedYCoord);
      } else {
        this._ctx.fillRect(0, 0, this._view.width, this._view.height);
      }

      this._ctx.restore();
    } else {
      const gradient = this._ctx.createLinearGradient(this._view.width / 2, 0, this._view.width / 2, this._view.height);

      if (!rgbColor) {
        rgbColor = "74, 83, 103";
      }

      gradient.addColorStop(0, `rgba(${rgbColor}, 0.5)`);
      gradient.addColorStop(1, `rgba(${rgbColor}, 0.0125)`);

      this._ctx.fillStyle = gradient;
      this._ctx.fillRect(0, 0, this._view.width, this._view.height);
      this._ctx.restore();
    }
  }
}
