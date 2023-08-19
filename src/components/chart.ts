export class ChartComponent {
  private _observer: ResizeObserver;
  private _width: number = 0;
  private _height: number = 0;

  constructor(private _container: HTMLElement) {
    this._createComponent();
    this._observer = this._setResizeObserver();
    this._observer.observe(this._container);
  }

  private _createComponent(): void {
    const div = document.createElement('div');
    div.classList.add('light-trading-chart__wrapper');
    this.setStyleProperties(div);
    this._container.appendChild(div);
  }

  private setStyleProperties(div: HTMLDivElement): void {
    div.style.width = '100%';
    div.style.height = '100%';
  }

  private _setResizeObserver(): ResizeObserver {
    return new ResizeObserver((entries) => {
      const [e] = entries;
      const { width, height } = e.contentRect;
      this._width = width;
      this._height = height;
    });
  }
}
