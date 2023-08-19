import { EventType } from '../interfaces/events';
import { ViewType } from '../interfaces/view';

export class EventBus {
  public static id: number = 0;
  constructor() {}

  public registerEvents(viewType: ViewType, eventType: EventType): void {}
}
