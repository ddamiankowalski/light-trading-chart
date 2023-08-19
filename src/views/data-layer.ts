import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { EventHandlers, EventType } from '../interfaces/events';
import { ViewType } from '../interfaces/view';
import { DataLayerRenderer } from '../renderer/data-layer';
import { DataSource } from '../source/data-source';

export class DataLayerView {
  private _canvas: HTMLCanvasElement;
  private _renderer: DataLayerRenderer;
  private _dataSource: DataSource = new DataSource([]);
  private _verticalMargin: number = 20;

  constructor(
    private _component: ChartComponent,
    eventBus: EventBus
  ) {
    this._canvas = this.createCanvas();
    this._renderer = new DataLayerRenderer(this);
    this.resizeHandler();

    const handlers: EventHandlers = {
      mouseMove: this._onMouseMove.bind(this)
    };

    eventBus.registerEvents(ViewType.DataLayer, EventType.MouseEvent, handlers, this._component.element);
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

  get width(): number {
    return this._canvas.width;
  }

  get height(): number {
    return this._canvas.height;
  }

  get verticalMargin(): number {
    return this._verticalMargin;
  }

  public updateDataSource(source: RawDataSource): void {
    this._dataSource = new DataSource(source);
    this._renderer.render();
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this._component.element.appendChild(canvas);
    return canvas;
  }

  private resizeHandler(): void {
    this._component.observerNotifier.subscribe(({ width, height }) => {
      this.canvas.width = width;
      this.canvas.height = height;
      this._renderer.render();
    });
  }

  private _onMouseMove(event: MouseEvent): void {
    const cols = (this.dataSource.size - 1) * 2;
    const mouseOverCol = Math.ceil(Math.floor(event.offsetX / (this.canvas.width / cols)) / 2);

    // WE HAVE THE INDEX OF DATA TO BE CURRENTLY HIGHLIGHTED, WE CAN RENDER IT
    console.log(this.dataSource.source[mouseOverCol]);
  }
}
