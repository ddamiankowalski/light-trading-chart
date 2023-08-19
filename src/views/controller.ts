import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { RawDataSource } from '../interfaces/data-source';
import { View, ViewConstructor, ViewInvalidateMessage, ViewType } from '../interfaces/view';
import { ChartModel } from '../model/chart-model';
import { DataSource } from '../source/data-source';
import { Notifier } from '../utils/notifier';

export class ViewController {
  private _invalidationRunning: boolean = false;
  private _viewInvalidator: Notifier<ViewInvalidateMessage>;
  private _invalidateSet: Set<ViewType> = new Set();
  private _viewMap: Map<ViewType, View> = new Map();
  private _dataSource: DataSource = new DataSource([]);

  constructor() {
    this._viewInvalidator = this._setInvalidator();
    this._subscribeInvalidMessages();
  }

  public addView<T extends View>(
    viewConstructor: ViewConstructor<T>,
    viewType: ViewType,
    component: ChartComponent,
    eventBus: EventBus,
    chartModel: ChartModel
  ): T {
    const view = new viewConstructor(component, eventBus, chartModel, this._viewInvalidator);
    this._viewMap.set(viewType, view);
    return view;
  }

  private _setInvalidator(): Notifier<ViewInvalidateMessage> {
    return new Notifier<ViewInvalidateMessage>();
  }

  private _subscribeInvalidMessages(): void {
    this._viewInvalidator.subscribe((message) => this._handleInvalidView(message));
  }

  private _handleInvalidView(message: ViewInvalidateMessage): void {
    this._invalidateSet.add(message.viewType);

    if (!this._invalidationRunning) {
      this._invalidationRunning = true;

      requestAnimationFrame(() => {
        this._invalidateSet.forEach((viewType) => this._updateView(viewType));
        this._invalidationRunning = false;
      });
    }
  }

  private _updateView(type: ViewType): void {
    const view = this._viewMap.get(type);

    if (!view) {
      throw new Error('Could not find the view for a given viewType');
    }

    view.render();
  }
}
