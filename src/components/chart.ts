import { ChartType } from "../interfaces/chart";
import { DataComponent } from "./data";
import { TimeScaleComponent } from "./timescale";
import { ValueScaleComponent } from "./valuescale";

export class ChartComponent {
  private _element: HTMLDivElement;
  private _valueScale: ValueScaleComponent | null = null;
  private _timeScale: TimeScaleComponent | null = null;
  private _data: DataComponent;

  constructor(private _container: HTMLElement, private _type: ChartType) {
    this._element = this._createComponent();
    this._data = this._createDataComponent();

    if (this._type === "FULL") {
      this._valueScale = this._createValueScale();
      this._timeScale = this._createTimeScale();
    }
  }

  get element(): HTMLDivElement {
    return this._element;
  }

  get dataComponent(): DataComponent {
    return this._data;
  }

  get valueScaleComponent(): ValueScaleComponent | null {
    return this._valueScale;
  }

  get timeScaleComponent(): TimeScaleComponent | null {
    return this._timeScale;
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
    return new DataComponent(this.element);
  }

  private _setStyleProperties(div: HTMLDivElement): void {
    div.style.width = "100%";
    div.style.height = "100%";

    if (this._type === "FULL") {
      div.style.display = "grid";
      div.style.gridTemplateAreas = `
      "value-scale source"
      "null time-scale"
    `;
      div.style.gridTemplateColumns = "3rem 1fr";
      div.style.gridTemplateRows = "1fr 3rem";
    }
  }
}
