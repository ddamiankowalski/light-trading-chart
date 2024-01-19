import { DataComponent } from "../components/data";
import { EventBus } from "../events/event-bus";
import { RawDataSource } from "../interfaces/data-source";
import { ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { DataSource } from "../source/data-source";
import { Notifier } from "../utils/notifier";

export abstract class CommonLayerView {
  private _canvas: HTMLCanvasElement;
  private _dataSource: DataSource = new DataSource([]);

  protected _color?: string;
  protected _rgbColor?: string;
  protected _zeroColor?: string;
  protected _hoverLineColor?: string;
  protected _verticalMargin: number = 6;
  protected _horizontalMargin: number = 60;

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

  get height(): number {
    return this.canvas.height / devicePixelRatio;
  }

  get dataSource(): DataSource {
    return this._dataSource;
  }

  get horizontalMargin(): number {
    return this._horizontalMargin;
  }

  get ctx(): CanvasRenderingContext2D {
    const context = this._canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get 2DContext");
    }

    return context;
  }

  abstract render(): void;

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    this._invalidate();
  }

  public invalidate(): void {
    this._invalidate();
  }

  public updateHorizontalMargin(margin: number) {
    this._horizontalMargin = margin;
    this.render()
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
