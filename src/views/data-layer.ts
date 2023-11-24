import { DataComponent } from "../components/data";
import { EventBus } from "../events/event-bus";
import { ChartType } from "../interfaces/chart";
import { RawDataSource } from "../interfaces/data-source";
import { EventHandlers, EventType } from "../interfaces/events";
import { SourceView, View, ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { DataLayerRenderer } from "../renderer/data-layer";
import { DataSource } from "../source/data-source";
import { Notifier } from "../utils/notifier";

export class DataLayerView implements View, SourceView {
  private _canvas: HTMLCanvasElement;
  private _renderer: DataLayerRenderer;
  private _dataSource: DataSource = new DataSource([]);
  private _verticalMargin: number = 6;
  private _color?: string;
  private _rgbColor?: string;
  private _zeroColor?: string;
  private _hoverLineColor?: string;
  private _mouseOverCol: number | null = null;

  constructor(
    private _component: DataComponent,
    private _eventBus: EventBus,
    private _viewInvalidator: Notifier<ViewInvalidateMessage>,
    type: ChartType
  ) {
    this._canvas = this._createCanvas();
    this._renderer = new DataLayerRenderer(this, type);
    this._resizeHandler();

    const handlers: EventHandlers = {
      mouseMove: this._onMouseMove.bind(this),
    };

    _eventBus.registerEvents(ViewType.DataLayer, EventType.MouseEvent, handlers, this._component.element);
  }

  get eventBus(): EventBus {
    return this._eventBus;
  }

  get ctx(): CanvasRenderingContext2D {
    const context = this._canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get 2DContext");
    }

    return context;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get dataSource(): DataSource {
    return this._dataSource;
  }

  get width(): number {
    return this._canvas.width;
  }

  get height(): number {
    return this._canvas.height;
  }

  get mouseOverCol(): number | null {
    return this._mouseOverCol;
  }

  get verticalMargin(): number {
    return this._verticalMargin;
  }

  public render(): void {
    this._renderer.render(this._color as string, this._rgbColor as string, this._zeroColor as string, this._hoverLineColor as string);
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

  public invalidate(): void {
    this._invalidate();
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    this._invalidate();
  }

  private _invalidate(): void {
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
      this.canvas.width = width;
      this.canvas.height = height;
      this._invalidate();
    });
  }

  private _onMouseMove(event: MouseEvent): void {
    const cols = (this.dataSource.size - 1) * 2;
    this._mouseOverCol = Math.ceil(Math.floor(event.offsetX / (this.width / cols)) / 2);
  }
}
