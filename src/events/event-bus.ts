import { EventHandlers, EventType } from '../interfaces/events';
import { ViewType } from '../interfaces/view';
import { MouseHandler } from './mouse-handler';

export class EventBus {
  private _busMap: Map<ViewType, MouseHandler> = new Map();

  public registerEvents(viewType: ViewType, eventType: EventType, handlers: EventHandlers, target: HTMLElement): void {
    switch (eventType) {
      case EventType.MouseEvent:
        this._busMap.set(viewType, new MouseHandler(handlers, target));
        break;
    }
  }
}
