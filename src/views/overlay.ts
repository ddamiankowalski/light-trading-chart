import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { RawDataSource } from "../interfaces/data-source";
import { EventHandlers, EventType } from "../interfaces/events";
import { SourceView, View, ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { OverlayRenderer } from "../renderer/overlay";
import { DataSource } from "../source/data-source";
import { Notifier } from "../utils/notifier";
import { TooltipView } from "./tooltip";

export class OverlayView implements View, SourceView {
  private _svgContainer: SVGSVGElement;
  private _renderer: OverlayRenderer;
  private _dataSource: DataSource = new DataSource([]);
  private _tooltipView: TooltipView;
  private _verticalMargin: number = 3;
  private _mouseOverCol: number | null = null;
  private _color?: string;
  private _tooltipBgColor?: string;

  constructor(
    private _component: ChartComponent,
    private _eventBus: EventBus,
    private _viewInvalidator: Notifier<ViewInvalidateMessage>
  ) {
    this._svgContainer = this._createSvgContainer();
    this._renderer = new OverlayRenderer(this);
    this._tooltipView = new TooltipView(this._component);

    const handlers: EventHandlers = {
      mouseMove: this._onMouseMove.bind(this),
      mouseOut: this._onMouseOut.bind(this),
    };

    _eventBus.registerEvents(ViewType.DataLayer, EventType.MouseEvent, handlers, this._component.element);
  }

  get eventBus(): EventBus {
    return this._eventBus;
  }

  get svgContainer(): SVGSVGElement {
    return this._svgContainer;
  }

  get dataSource(): DataSource {
    return this._dataSource;
  }

  get verticalMargin(): number {
    return this._verticalMargin;
  }

  get mouseOverCol(): number | null {
    return this._mouseOverCol;
  }

  get width(): number {
    return this._component.element.offsetWidth;
  }

  get height(): number {
    return this._component.element.offsetHeight;
  }

  public render(): void {
    this._renderer.render(this._color as string, this._tooltipBgColor as string);
  }

  public updateColor(color: string): void {
    this._color = color;
    this._tooltipView.updateValueColor(color);
    this.render();
  }

  public setTooltipBgColor(color: string): void {
    this._tooltipBgColor = color;
    this._tooltipView.updateBgColor(color);
    this.render();
  }

  public invalidate(): void {
    this._invalidate();
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    this._tooltipView.updateDataSource(source);
    this._invalidate();
  }

  private _invalidate(): void {
    this._viewInvalidator.notify({ viewType: ViewType.OverlayView });
  }

  private _createSvgContainer(): SVGSVGElement {
    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgContainer.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
    svgContainer.style.width = "100%";
    svgContainer.style.height = "100%";
    svgContainer.style.top = "0";
    svgContainer.style.left = "0";
    svgContainer.style.overflow = "visible";
    svgContainer.style.position = "absolute";
    svgContainer.classList.add("light-trading-chart__overlay");
    svgContainer.style.pointerEvents = "none";
    this._component.element.appendChild(svgContainer);
    return svgContainer;
  }

  private _onMouseMove(event: MouseEvent): void {
    const cols = (this.dataSource.size - 1) * 2;
    this._mouseOverCol = Math.ceil(Math.floor(event.offsetX / (this.width / cols)) / 2);
    this._tooltipView.notifyMouseOverCol(this._mouseOverCol);
    this._viewInvalidator.notify({ viewType: ViewType.OverlayView });
  }

  private _onMouseOut(): void {
    this._mouseOverCol = null;
    this._tooltipView.notifyMouseOut();
    this._viewInvalidator.notify({ viewType: ViewType.OverlayView });
  }
}
