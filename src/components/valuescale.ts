export class ValueScaleComponent {
  private _element: HTMLDivElement;

  constructor(private _container: HTMLElement) {
    this._element = this._createComponent();
  }

  get element(): HTMLDivElement {
    return this._element;
  }

  private _createComponent(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("light-trading-chart__value-scale");
    this._setStyleProperties(div);
    this._container.prepend(div);
    return div;
  }

  private _setStyleProperties(element: HTMLDivElement): void {
    element.style.gridArea = "value-scale";
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.background = "red";
  }
}
