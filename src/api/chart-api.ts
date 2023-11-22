import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { RawDataSource } from "../interfaces/data-source";
import { ViewController } from "../views/controller";
import { DataLayerView } from "../views/data-layer";
import { OverlayView } from "../views/overlay";
import { ViewType } from "../interfaces/view";
import { ValueScaleView } from "../views/value-scale";
import { TimeScaleView } from "../views/time-scale";
import { ChartType } from "../interfaces/chart";

export class ChartAPI {
  private _component: ChartComponent;
  private _dataView: DataLayerView;
  private _overlayView: OverlayView;
  private _valueScaleView: ValueScaleView | null = null;
  private _timeScaleView: TimeScaleView | null = null;
  private _eventBus = new EventBus();
  private _viewController = new ViewController();

  constructor(private _container: HTMLElement, type: ChartType) {
    this._component = this._createChartComponent(type);
    this._dataView = this._createDataLayerView();
    this._overlayView = this._createOverlayView();

    if (type === "FULL") {
      this._valueScaleView = this._createValueScaleView();
      this._timeScaleView = this._createTimeScaleView();
    }
  }

  public setData(source: RawDataSource): void {
    this._dataView.updateDataSource(source);
    this._overlayView.updateDataSource(source);

    if (this._valueScaleView && this._timeScaleView) {
      this._valueScaleView.updateDataSource(source);
      this._timeScaleView.updateDataSource(source);
    }
  }

  public setMargin(marginValue: number): void {
    this._dataView.setMargin(marginValue);
  }

  public setColor(color: string): void {
    this._dataView.updateColor(color);
    this._overlayView.updateColor(color);
  }

  public setRgbColor(color: string): void {
    this._dataView.updateRgbColor(color);
  }

  public setTooltipBgColor(color: string): void {
    this._overlayView.setTooltipBgColor(color);
  }

  public setZeroLineColor(color: string): void {
    this._dataView.updateZeroColor(color);
  }

  private _createChartComponent(type: ChartType): ChartComponent {
    return new ChartComponent(this._container, type);
  }

  private _createDataLayerView(): DataLayerView {
    return this._viewController.addView(
      DataLayerView,
      ViewType.DataLayer,
      this._component.dataComponent,
      this._eventBus
    );
  }

  private _createOverlayView(): OverlayView {
    return this._viewController.addView(
      OverlayView,
      ViewType.OverlayView,
      this._component.dataComponent,
      this._eventBus
    );
  }

  private _createValueScaleView(): ValueScaleView {
    if (!this._component.valueScaleComponent) {
      throw new Error("Cannot create value scale view");
    }

    return this._viewController.addValueScaleView(this._component.valueScaleComponent);
  }

  private _createTimeScaleView(): TimeScaleView {
    if (!this._component.timeScaleComponent) {
      throw new Error("Cannot create time scale view");
    }

    return this._viewController.addTimeScaleView(this._component.timeScaleComponent);
  }
}
