import { DataComponent } from "../components/data";
import { TimeScaleComponent } from "../components/timescale";
import { ValueScaleComponent } from "../components/valuescale";
import { EventBus } from "../events/event-bus";
import { View, ViewConstructor, ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { DataSource } from "../source/data-source";
import { Notifier } from "../utils/notifier";
import { TimeScaleView } from "./time-scale";
import { ValueScaleView } from "./value-scale";

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

  get dataSource(): DataSource {
    return this._dataSource;
  }

  public addView<T extends View>(
    viewConstructor: ViewConstructor<T>,
    viewType: ViewType,
    component: DataComponent,
    eventBus: EventBus
  ): T {
    const view = new viewConstructor(component, eventBus, this._viewInvalidator);
    this._viewMap.set(viewType, view);
    return view;
  }

  public addValueScaleView(component: ValueScaleComponent): ValueScaleView {
    const view = new ValueScaleView(component, this._viewInvalidator);
    this._viewMap.set(ViewType.ValueScaleView, view);
    return view;
  }

  public addTimeScaleView(component: TimeScaleComponent): TimeScaleView {
    const view = new TimeScaleView(component, this._viewInvalidator);
    this._viewMap.set(ViewType.TimeScaleView, view);
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
      throw new Error("Could not find the view for a given viewType");
    }

    view.render();
  }
}
