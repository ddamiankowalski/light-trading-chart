import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { RawDataSource } from "../interfaces/data-source";
import { ViewController } from "../views/controller";
import { DataLayerView } from "../views/data-layer";
import { OverlayView } from "../views/overlay";
import { ViewType } from "../interfaces/view";
import { ValueScaleView } from "../views/value-scale";
import { TimeScaleView } from "../views/time-scale";

export class ChartAPI {
  private _component: ChartComponent;
  private _dataView: DataLayerView;
  private _overlayView: OverlayView;
  private _valueScaleView: ValueScaleView;
  private _timeScaleView: TimeScaleView;
  private _eventBus = new EventBus();
  private _viewController = new ViewController();

  constructor(private _container: HTMLElement) {
    this._component = this._createChartComponent();
    this._dataView = this._createDataLayerView();
    this._overlayView = this._createOverlayView();
    this._valueScaleView = this._createValueScaleView();
    this._timeScaleView = this._createTimeScaleView();
  }

  public setData(source: RawDataSource): void {
    this._dataView.updateDataSource(source);
    this._overlayView.updateDataSource(source);
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

  private _createChartComponent(): ChartComponent {
    return new ChartComponent(this._container);
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
    return this._viewController.addValueScaleView(this._component.valueScaleComponent);
  }

  private _createTimeScaleView(): TimeScaleView {
    return this._viewController.addTimeScaleView(this._component.timeScaleComponent);
  }
}
