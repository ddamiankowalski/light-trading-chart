import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { ViewController } from '../views/controller';
import { DataLayerView } from '../views/data-layer';
import { OverlayView } from '../views/overlay';
import { ViewType } from '../interfaces/view';

export class ChartAPI {
  private _component: ChartComponent;
  private _dataView: DataLayerView;
  private _overlayView: OverlayView;
  private _eventBus = new EventBus();
  private _viewController = new ViewController();

  constructor(private _container: HTMLElement) {
    this._component = new ChartComponent(this._container);
    this._dataView = this._createDataLayerView();
    this._overlayView = this._createOverlayView();
  }

  public setData(source: RawDataSource): void {
    this._dataView.updateDataSource(source);
    this._overlayView.updateDataSource(source);
  }

  private _createDataLayerView(): DataLayerView {
    return this._viewController.addView(DataLayerView, ViewType.DataLayer, this._component, this._eventBus);
  }

  private _createOverlayView(): OverlayView {
    return this._viewController.addView(OverlayView, ViewType.OverlayView, this._component, this._eventBus);
  }
}
