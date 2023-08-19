export enum EventType {
  MouseEvent = 'MOUSE_EVENT',
  KeyboardEvent = 'KEYBOARD_EVENT'
}

export type EventHandlerType = 'mouseMove';

export type EventHandlers = {
  [key in EventHandlerType]: EventHandler;
};

export type EventHandler = (event: Event & MouseEvent) => void;
