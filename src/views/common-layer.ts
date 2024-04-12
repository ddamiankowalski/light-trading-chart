import { DataComponent } from "../components/data";
import { EventBus } from "../events/event-bus";
import { RawDataSource } from "../interfaces/data-source";
import { DataLine } from "../interfaces/lines";
import { ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { DataSource } from "../source/data-source";
import { Notifier } from "../utils/notifier";

export abstract class CommonLayerView {
  private _canvas: HTMLCanvasElement;
  private _dataSource: DataSource = new DataSource([]);
  private _dataLines: DataLine[] = [];
  private _tooltipBgColor: string | null = null;
  private _customGradientColors: string[] | null = null;

  protected _color?: string;
  protected _rgbColor?: string;
  protected _zeroColor?: string;
  protected _hoverLineColor?: string;
  protected _verticalMargin: number = 6;
  protected _horizontalMargin: number = 60;
  protected _minMax: { min: number; max: number } | null = null;

  constructor(
    protected _component: DataComponent,
    protected _eventBus: EventBus,
    protected _viewInvalidator: Notifier<ViewInvalidateMessage>
  ) {
    this._canvas = this._createCanvas();
    this._resizeHandler();
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get width(): number {
    return this.canvas.width / devicePixelRatio;
  }

  get tooltipBgColor(): string | null {
    return this._tooltipBgColor;
  }

  get height(): number {
    return this.canvas.height / devicePixelRatio;
  }

  get dataSource(): DataSource {
    return this._dataSource;
  }

  get lines(): DataLine[] {
    return this._dataLines;
  }

  get horizontalMargin(): number {
    return this._horizontalMargin;
  }

  get minMax(): { min: number; max: number } | null {
    return this._minMax;
  }

  get ctx(): CanvasRenderingContext2D {
    const context = this._canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get 2DContext");
    }

    return context;
  }

  get customGradient(): string[] | null {
    return this._customGradientColors;
  }

  abstract render(): void;

  public addLines(lines: DataLine[]): void {
    this.dataSource.lineMinMax(lines);
    this._dataLines = lines;
  }

  public setTooltipBgColor(color: string): void {
    this._tooltipBgColor = color;
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    this._invalidate();
  }

  public setGradientColors(colors: string[]): void {
    this._customGradientColors = colors;
  }

  public invalidate(): void {
    this._invalidate();
  }

  public updateHorizontalMargin(margin: number) {
    this._horizontalMargin = margin;
    this.render()
  }

  public setRange(range: { min: number, max: number }): void {
    this._minMax = range;
    this.render();
  }

  public updateColor(color: string) {
    this._color = color;
    this.render();
  }

  public setMargin(value: number): void {
    this._verticalMargin = value;
    this.render();
  }

  public updateRgbColor(color: string): void {
    this._rgbColor = color;
    this.render();
  }

  public updateZeroColor(color: string): void {
    this._zeroColor = color;
    this.render();
  }

  public updateHoverLineColor(color: string): void {
    this._hoverLineColor = color;
    this.render();
  }

  protected _invalidate(): void {
    this._viewInvalidator.notify({ viewType: ViewType.DataLayer });
  }

  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    this._component.element.appendChild(canvas);
    return canvas;
  }

  private _resizeHandler(): void {
    this._component.observerNotifier.subscribe(({ width, height }) => {
      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;

      this._canvas.style.width = width + "px";
      this._canvas.style.height = height + "px";

      this._invalidate();
    });
  }
}
