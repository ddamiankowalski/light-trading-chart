export enum EventType {
  MouseEvent = 'MOUSE_EVENT',
  KeyboardEvent = 'KEYBOARD_EVENT'
}

export type EventHandlerType = 'mouseMove' | 'mouseOut';

export type EventHandlers = Partial<{
  [key in EventHandlerType]: EventHandler;
}>;

export type EventHandler = (event: Event & MouseEvent) => void;
