import { ChartComponent } from '../components/chart';
import { DataLayerRenderer } from '../renderer/data-layer';

export class DataLayerView {
  private _canvas: HTMLCanvasElement;
  private _renderer: DataLayerRenderer;

  constructor(private _component: ChartComponent) {
    this._canvas = this.createCanvas();
    this._renderer = new DataLayerRenderer(this);
    this.resizeHandler();
  }

  get ctx(): CanvasRenderingContext2D {
    const context = this._canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get 2DContext');
    }

    return context;
  }

  get width(): number {
    return this._canvas.width;
  }

  get height(): number {
    return this._canvas.height;
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
      this._canvas.width = width;
      this._canvas.height = height;
    });
  }
}
