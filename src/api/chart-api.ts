import { ChartComponent } from '../components/chart';

export class ChartAPI {
  private _component: ChartComponent;

  constructor(private _container: HTMLElement) {
    this._component = new ChartComponent(this._container);
  }
}
