import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { Notifier } from '../utils/notifier';

export enum ViewType {
  DataLayer = 'DATA_LAYER',
  OverlayView = 'OVERLAY_VIEW'
}

export interface View {
  render(): void;
}

export interface ViewInvalidateMessage {
  viewType: ViewType;
}

export interface ViewConstructor<T = View> {
  new (component: ChartComponent, eventBus: EventBus, viewInvalidator: Notifier<ViewInvalidateMessage>): T;
}
