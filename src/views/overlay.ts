import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { EventHandlers, EventType } from '../interfaces/events';
import { SourceView, View, ViewInvalidateMessage, ViewType } from '../interfaces/view';
import { OverlayRenderer } from '../renderer/overlay';
import { DataSource } from '../source/data-source';
import { Notifier } from '../utils/notifier';

export class OverlayView implements View, SourceView {
  private _canvas: HTMLCanvasElement;
  private _renderer: OverlayRenderer;
  private _dataSource: DataSource = new DataSource([]);
  private _verticalMargin: number = 20;

  constructor(
    private _component: ChartComponent,
    private _eventBus: EventBus,
    private _viewInvalidator: Notifier<ViewInvalidateMessage>
  ) {
    this._canvas = this._createCanvas();
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

  get dataSource(): DataSource {
    return this._dataSource;
  }

  get verticalMargin(): number {
    return this._verticalMargin;
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
    const mouseOverCol = Math.ceil(Math.floor(event.offsetX / (this.canvas.width / cols)) / 2);

    // WE HAVE THE INDEX OF DATA TO BE CURRENTLY HIGHLIGHTED, WE CAN RENDER IT
    console.log(this.dataSource.source[mouseOverCol]);
  }
}
