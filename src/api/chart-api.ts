import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { ViewController } from '../views/controller';
import { DataLayerView } from '../views/data-layer';

export class ChartAPI {
  private _component: ChartComponent;
  private _view: DataLayerView;
  private _eventBus = new EventBus();
  private _viewController = new ViewController();

  constructor(private _container: HTMLElement) {
    this._component = new ChartComponent(this._container);
    this._view = this._createDataLayerView();
  }

  public setData(source: RawDataSource): void {
    this._view.updateDataSource(source);
  }

  private _createDataLayerView(): DataLayerView {
    return this._viewController.addView(DataLayerView, this._component, this._eventBus);
  }
}
