import { ChartComponent } from '../components/chart';
import { EventBus } from '../events/event-bus';
import { ChartModel } from '../model/chart-model';
import { Notifier } from '../utils/notifier';
import { RawDataSource } from './data-source';

export enum ViewType {
  DataLayer = 'DATA_LAYER',
  OverlayView = 'OVERLAY_VIEW'
}

export interface View {
  render(): void;
  invalidate(): void;
  width: number;
  height: number;
}

export interface SourceView {
  updateDataSource(source: RawDataSource): void;
}

export interface ViewInvalidateMessage {
  viewType: ViewType;
}

export interface ViewConstructor<T = View> {
  new (
    component: ChartComponent,
    eventBus: EventBus,
    chartModel: ChartModel,
    viewInvalidator: Notifier<ViewInvalidateMessage>
  ): T;
}
