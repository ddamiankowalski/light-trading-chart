import { ChartComponent } from '../components/chart';
import { DataLayerView } from '../views/data-layer';

export class ChartAPI {
  private _component: ChartComponent;
  private _view: DataLayerView;

  constructor(private _container: HTMLElement) {
    this._component = new ChartComponent(this._container);
    this._view = new DataLayerView(this._component);
  }

  public setData(source: { x?: number; y: number }[]): void {
    this._view.updateDataSource(source);
  }
}
