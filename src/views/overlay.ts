import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { EventHandlers, EventType } from '../interfaces/events';
import { SourceView, View, ViewInvalidateMessage, ViewType } from '../interfaces/view';
import { ChartModel } from '../model/chart-model';
import { OverlayRenderer } from '../renderer/overlay';
import { DataSource } from '../source/data-source';
import { Notifier } from '../utils/notifier';

export class OverlayView implements View, SourceView {
  private _canvas: HTMLCanvasElement;
  private _svgContainer: SVGSVGElement;
  private _renderer: OverlayRenderer;
  private _dataSource: DataSource = new DataSource([]);
  private _verticalMargin: number = 20;
  private _mouseOverCol: number | null = null;

  constructor(
    private _component: ChartComponent,
    private _eventBus: EventBus,
    private _chartModel: ChartModel,
    private _viewInvalidator: Notifier<ViewInvalidateMessage>
  ) {
    this._canvas = this._createCanvas();
    this._svgContainer = this._createSvgContainer();
    this._renderer = new OverlayRenderer(this);
    this._resizeHandler();

    const handlers: EventHandlers = {
      mouseMove: this._onMouseMove.bind(this)
    };

    _eventBus.registerEvents(ViewType.DataLayer, EventType.MouseEvent, handlers, this._component.element);
  }

  get ctx(): CanvasRenderingContext2D {
    const context = this._canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get 2DContext');
    }

    return context;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
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

  public render(): void {
    this._renderer.render();
  }

  public invalidate(): void {
    this._invalidate();
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    this._invalidate();
  }

  private _invalidate(): void {
    this._viewInvalidator.notify({ viewType: ViewType.OverlayView });
  }

  private _createSvgContainer(): SVGSVGElement {
    const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgContainer.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svgContainer.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
    svgContainer.style.width = '100%';
    svgContainer.style.height = '100%';
    svgContainer.style.top = '0';
    svgContainer.style.left = '0';
    svgContainer.style.position = 'absolute';
    this._component.element.appendChild(svgContainer);
    return svgContainer;
  }

  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
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
    this._mouseOverCol = Math.ceil(Math.floor(event.offsetX / (this.canvas.width / cols)) / 2);
    this._viewInvalidator.notify({ viewType: ViewType.OverlayView });
  }
}
