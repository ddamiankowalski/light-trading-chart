import { Notifier } from "../utils/notifier";

export class DataComponent {
  private _element: HTMLDivElement;
  private _observer: ResizeObserver;
  private _width: number = 0;
  private _height: number = 0;
  private _observerNotifier: Notifier<{ width: number; height: number }> = new Notifier();

  constructor(private _container: HTMLElement) {
    this._element = this._createElement();
    this._observer = this._setResizeObserver();
    this._observer.observe(this._element);
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get element(): HTMLDivElement {
    return this._element;
  }

  get observerNotifier(): Notifier<{ width: number; height: number }> {
    return this._observerNotifier;
  }

  private _createElement(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("light-trading-chart__data");
    div.style.position = "relative";
    div.style.overflow = 'hidden';
    div.style.width = "100%";
    div.style.minWidth = "0";
    this._container.append(div);
    return div;
  }

  private _setResizeObserver(): ResizeObserver {
    return new ResizeObserver((entries) => {
      const [e] = entries;
      const { width, height } = e.contentRect;
      this._width = width;
      this._height = height;
      this._observerNotifier.notify({ width, height });
    });
  }
}
