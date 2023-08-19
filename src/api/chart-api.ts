import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { DataLayerView } from '../views/data-layer';

export class ChartAPI {
  private _component: ChartComponent;
  private _view: DataLayerView;
  private _eventBus = new EventBus();

  constructor(private _container: HTMLElement) {
    this._component = new ChartComponent(this._container);
    this._view = new DataLayerView(this._component, this._eventBus);
  }

  public setData(source: RawDataSource): void {
    this._view.updateDataSource(source);
  }
}
