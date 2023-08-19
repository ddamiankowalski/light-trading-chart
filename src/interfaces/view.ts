import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { Notifier } from "../utils/notifier";

export enum ViewType {
  DataLayer = 'DATA_LAYER',
  OverlayView = 'OVERLAY_VIEW'
}


export interface View {
  invalidate(): void;
  render(): void;
  notifier: Notifier<boolean>;
}

export interface ViewConstructor<T = View> {
  new (component: ChartComponent, eventBus: EventBus): T;
}