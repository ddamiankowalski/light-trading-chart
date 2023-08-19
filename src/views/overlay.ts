import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { View } from "../interfaces/view";
import { OverlayRenderer } from "../renderer/overlay";
import { DataSource } from "../source/data-source";

export class OverlayView implements View {
    private _invalidated = false;
    private _canvas: HTMLCanvasElement;
    private _renderer: OverlayRenderer;
    private _dataSource: DataSource = new DataSource([]);
    private _verticalMargin: number = 20;

    constructor(private _component: ChartComponent, eventBus: EventBus) {
        this._canvas = this._createCanvas();
        this._renderer = new OverlayRenderer(this);
        this._resizeHandler();
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public invalidate(): void {
        this._invalidated = true;
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
          this._renderer.render();
        });
      }
}