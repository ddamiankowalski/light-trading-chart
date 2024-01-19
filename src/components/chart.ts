import { ChartOptions, ChartType } from "../interfaces/chart";
import { DataComponent } from "./data";
import { TimeScaleComponent } from "./timescale";
import { ValueScaleComponent } from "./valuescale";

export class ChartComponent {
  private _element: HTMLDivElement;
  private _sourceWrapper: HTMLDivElement;
  private _valueScale: ValueScaleComponent | null = null;
  private _timeScale: TimeScaleComponent | null = null;
  private _data: DataComponent;

  constructor(private _container: HTMLElement, private _type: ChartType, private _options: ChartOptions) {
    this._element = this._createComponent();
    this._sourceWrapper = this._createSourceWrapper();

    if (this._type === "FULL") {
      this._valueScale = this._createValueScale();

      if (!this._options.hideTimeAxis) {
        this._timeScale = this._createTimeScale();
      }
    }

    this._data = this._createDataComponent();
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
    return new ValueScaleComponent(this._sourceWrapper);
  }

  private _createTimeScale(): TimeScaleComponent {
    return new TimeScaleComponent(this.element);
  }

  private _createDataComponent(): DataComponent {
    return new DataComponent(this._sourceWrapper);
  }

  private _createSourceWrapper(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("light-trading-chart__source-wrapper");
    wrapper.style.position = "relative";
    wrapper.style.display = "flex";
    wrapper.style.height = "100%";
    wrapper.style.minWidth = "0";

    if (this._type === "FULL") {
      wrapper.style.minHeight = "24rem";
    }
    this._element.append(wrapper);
    return wrapper;
  }

  private _setStyleProperties(div: HTMLDivElement): void {
    div.style.width = "100%";
    div.style.height = "100%";

    if (this._type === "FULL") {
      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.gridTemplateColumns = "3rem 1fr";
      div.style.gridTemplateRows = "1fr 3rem";
    }
  }
}
