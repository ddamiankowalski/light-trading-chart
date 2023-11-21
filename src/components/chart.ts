import { DataComponent } from "./data";
import { TimeScaleComponent } from "./timescale";
import { ValueScaleComponent } from "./valuescale";

export class ChartComponent {
  private _element: HTMLDivElement;
  private _valueScale: ValueScaleComponent;
  private _timeScale: TimeScaleComponent;
  private _data: DataComponent;

  constructor(private _container: HTMLElement) {
    this._element = this._createComponent();
    this._valueScale = this._createValueScale();
    this._timeScale = this._createTimeScale();
    this._data = this._createDataComponent();
  }

  get element(): HTMLDivElement {
    return this._element;
  }

  get dataComponent(): DataComponent {
    return this._data;
  }

  private _createComponent(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("light-trading-chart__wrapper");
    this._setStyleProperties(div);
    this._container.appendChild(div);
    return div;
  }

  private _createValueScale(): ValueScaleComponent {
    return new ValueScaleComponent(this.element);
  }

  private _createTimeScale(): TimeScaleComponent {
    return new TimeScaleComponent(this.element);
  }

  private _createDataComponent(): DataComponent {
    return new DataComponent(this.element)
  }

  private _setStyleProperties(div: HTMLDivElement): void {
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.display = 'grid';
    div.style.gridTemplateAreas = `
      "value-scale source"
      "time-scale time-scale"
    `
    div.style.gridTemplateColumns = '3rem 1fr';
    div.style.gridTemplateRows = '1fr 3rem';
  }
}
