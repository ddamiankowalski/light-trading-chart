export class TimeScaleComponent {
  private _element: HTMLDivElement;

  constructor(private _container: HTMLElement) {
    this._element = this._createElement();
  }

  get element(): HTMLDivElement {
    return this._element;
  }

  private _createElement(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("light-trading-chart__time-scale");
    this._setStyleProperties(div);
    this._container.append(div);
    return div;
  }

  private _setStyleProperties(element: HTMLDivElement): void {
    element.style.gridArea = "time-scale";
    element.style.position = "relative";
    element.style.fontSize = '0.625rem';
    element.style.fontFamily = 'Barlow';
    element.style.height = "100%";
    element.style.width = "100%";
  }
}
