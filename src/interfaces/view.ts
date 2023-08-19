import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";

export enum ViewType {
  DataLayer = 'DATA_LAYER'
}


export interface View {}

export interface ViewConstructor<T> {
  new (component: ChartComponent, eventBus: EventBus): T;
}