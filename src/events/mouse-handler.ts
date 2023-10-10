import { EventHandler, EventHandlers } from '../interfaces/events';

export class MouseHandler {
  constructor(
    private _handlers: EventHandlers,
    private _target: HTMLElement
  ) {
    this._parseHandlers();
  }

  private _parseHandlers(): void {
    this._target.addEventListener('mousemove', (event) => this._onMouseMove.call(this, event));
    this._target.addEventListener('mouseout', (event) => this._onMouseOut.call(this, event));
  }

  private _onMouseMove(event: MouseEvent): void {
    this._proceedEvent(event, this._handlers.mouseMove);
  }

  private _onMouseOut(event: MouseEvent): void {
    this._proceedEvent(event, this._handlers.mouseOut);
  }

  private _proceedEvent(event: MouseEvent, handler?: EventHandler): void {
    if (handler) {
      handler(event);
    }
  }
}
