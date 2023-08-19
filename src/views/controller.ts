import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { View, ViewConstructor, ViewInvalidateMessage, ViewType } from '../interfaces/view';
import { Notifier } from '../utils/notifier';

export class ViewController {
  private _invalidationRunning: boolean = false;
  private _viewInvalidator: Notifier<ViewInvalidateMessage>;

  constructor() {
    this._viewInvalidator = this._setInvalidator();
    this._subscribeInvalidMessages();
  }

  public addView<T extends View>(
    viewConstructor: ViewConstructor<T>,
    viewType: ViewType,
    component: ChartComponent,
    eventBus: EventBus
  ): T {
    return new viewConstructor(component, eventBus, this._viewInvalidator);
  }

  private _setInvalidator(): Notifier<ViewInvalidateMessage> {
    return new Notifier<ViewInvalidateMessage>();
  }

  private _subscribeInvalidMessages(): void {
    this._viewInvalidator.subscribe((message) => this._handleInvalidView(message));
  }

  private _handleInvalidView(message: ViewInvalidateMessage): void {
    console.log(message);
  }
}
