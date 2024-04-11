import { DataComponent } from "../components/data";
import { EventBus } from "../events/event-bus";
import { Notifier } from "../utils/notifier";
import { ChartOptions, ChartType } from "./chart";
import { RawDataSource } from "./data-source";

export enum ViewType {
  DataLayer = "DATA_LAYER",
  OverlayView = "OVERLAY_VIEW",
  HoverView = "HOVER_VIEW",
  ValueScaleView = "VALUE_SCALE_VIEW",
  TimeScaleView = "TIME_SCALE_VIEW",
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
  new(component: DataComponent, eventBus: EventBus, viewInvalidator: Notifier<ViewInvalidateMessage>, type: ChartType, chartOptions: ChartOptions): T;
}
