import { DataComponent } from "../components/data";
import { EventBus } from "../events/event-bus";
import { ChartType } from "../interfaces/chart";
import { EventHandlers, EventType } from "../interfaces/events";
import { SourceView, View, ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { DataLayerRenderer } from "../renderer/data-layer";
import { Notifier } from "../utils/notifier";
import { CommonLayerView } from "./common-layer";

export class DataLayerView extends CommonLayerView implements View, SourceView {
  private _renderer: DataLayerRenderer;
  private _verticalMargin: number = 6;
  private _color?: string;
  private _rgbColor?: string;
  private _zeroColor?: string;
  private _hoverLineColor?: string;
  private _mouseOverCol: number | null = null;

  constructor(
    protected _component: DataComponent,
    protected _eventBus: EventBus,
    protected _viewInvalidator: Notifier<ViewInvalidateMessage>,
    type: ChartType
  ) {
    super(_component, _eventBus, _viewInvalidator, type);
    this._renderer = new DataLayerRenderer(this, type);

    const handlers: EventHandlers = {
      mouseMove: this._onMouseMove.bind(this),
      mouseOut: this._onMouseOut.bind(this),
    };

    _eventBus.registerEvents(ViewType.DataLayer, EventType.MouseEvent, handlers, this._component.element);
  }

  get eventBus(): EventBus {
    return this._eventBus;
  }

  get mouseOverCol(): number | null {
    return this._mouseOverCol;
  }

  get verticalMargin(): number {
    return this._verticalMargin;
  }

  public render(): void {
    this._renderer.render(
      this._color as string,
      this._rgbColor as string,
      this._zeroColor as string,
      this._hoverLineColor as string
    );
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

  private _onMouseMove(event: MouseEvent): void {
    const cols = (this.dataSource.size - 1) * 2;
    this._mouseOverCol = Math.ceil(Math.floor(event.offsetX / (this.width / cols)) / 2);
    this.render();
  }

  private _onMouseOut(): void {
    this._mouseOverCol = null;
    this.render();
  }
}
