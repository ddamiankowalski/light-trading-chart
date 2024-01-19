import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { RawDataSource } from "../interfaces/data-source";
import { ViewController } from "../views/controller";
import { DataLayerView } from "../views/data-layer";
import { OverlayView } from "../views/overlay";
import { ViewType } from "../interfaces/view";
import { ValueScaleView } from "../views/value-scale";
import { TimeScaleView } from "../views/time-scale";
import { ChartDataType, ChartOptions, ChartType } from "../interfaces/chart";
import { ColumnLayerView } from "../views/column-layer";
import { CommonLayerView } from "../views/common-layer";

export class ChartAPI {
  private _component: ChartComponent;
  private _dataView: CommonLayerView;
  private _overlayView: OverlayView | null = null;
  private _valueScaleView: ValueScaleView | null = null;
  private _timeScaleView: TimeScaleView | null = null;
  private _eventBus = new EventBus();
  private _viewController = new ViewController();

  constructor(
    private _container: HTMLElement,
    private _type: ChartType,
    private _dataType: ChartDataType,
    private _chartOptions: ChartOptions
  ) {
    this._component = this._createChartComponent(_type);
    this._dataView = this._createDataLayerView();

    if (this._dataType === "LINE") {
      this._overlayView = this._createOverlayView();
    }

    if (_type === "FULL") {
      this._valueScaleView = this._createValueScaleView();
      this._timeScaleView = this._createTimeScaleView();
    }
  }

  public setData(source: RawDataSource): void {
    this._dataView.updateDataSource(source);
    this._overlayView && this._overlayView.updateDataSource(source);

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
    this._overlayView && this._overlayView.updateColor(color);
  }

  public setHorizontalMargin(margin: number): void {
    if (this._dataType !== 'COLUMNS') {
      throw new Error('Cannot set horizontal margin for this type of chart');
    }

    this._dataView.updateHorizontalMargin(margin);
  }

  public setRgbColor(color: string): void {
    this._dataView.updateRgbColor(color);
  }

  public setTooltipBgColor(color: string): void {
    this._overlayView && this._overlayView.setTooltipBgColor(color);
  }

  public setZeroLineColor(color: string): void {
    this._dataView.updateZeroColor(color);
  }

  public setHoverLineColor(color: string): void {
    this._dataView.updateHoverLineColor(color);
  }

  private _createChartComponent(type: ChartType): ChartComponent {
    return new ChartComponent(this._container, type);
  }

  private _createDataLayerView(): CommonLayerView {
    const viewConstructor = this._dataType === "LINE" ? DataLayerView : ColumnLayerView;

    return this._viewController.addView<CommonLayerView>(
      viewConstructor,
      ViewType.DataLayer,
      this._component.dataComponent,
      this._eventBus,
      this._type
    );
  }

  private _createOverlayView(): OverlayView {
    return this._viewController.addView(
      OverlayView,
      ViewType.OverlayView,
      this._component.dataComponent,
      this._eventBus,
      this._type
    );
  }

  private _createValueScaleView(): ValueScaleView {
    if (!this._component.valueScaleComponent) {
      throw new Error("Cannot create value scale view");
    }

    return this._viewController.addValueScaleView(this._component.valueScaleComponent, this._chartOptions);
  }

  private _createTimeScaleView(): TimeScaleView {
    if (!this._component.timeScaleComponent) {
      throw new Error("Cannot create time scale view");
    }

    return this._viewController.addTimeScaleView(
      this._component.timeScaleComponent,
      this._dataType,
      this._chartOptions
    );
  }
}
