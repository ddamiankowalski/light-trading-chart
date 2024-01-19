import { EventHandler, EventHandlers } from "../interfaces/events";

export class MouseHandler {
  constructor(private _handlers: EventHandlers, private _target: HTMLElement) {
    this._parseHandlers();
  }

  private _parseHandlers(): void {
    this._target.addEventListener("mousemove", (event) => this._onMouseMove.call(this, event as MouseEvent & TouchEvent));
    this._target.addEventListener("mouseout", (event) => this._onMouseOut.call(this, event as MouseEvent & TouchEvent));
    this._target.addEventListener("touchmove", (event) => this._onTouchMove.call(this, event));
    this._target.addEventListener("touchend", (event) => this._onMouseOut.call(this, event as MouseEvent & TouchEvent));
  }

  private _onMouseMove(event: MouseEvent & TouchEvent): void {
    this._proceedEvent(event, this._handlers.mouseMove);
  }

  private _onTouchMove(event: TouchEvent): void {
    if (!event.target) {
      return;
    }

    // @ts-ignore
    let rect = event.target.getBoundingClientRect();
    let offsetX = event.targetTouches[0].clientX - rect.x;

    // @ts-ignore
    event.offsetX = offsetX;
    this._proceedEvent(event as MouseEvent & TouchEvent, this._handlers.mouseMove);
  }

  private _onMouseOut(event: MouseEvent & TouchEvent): void {
    this._proceedEvent(event, this._handlers.mouseOut);
  }

  private _proceedEvent(event: MouseEvent & TouchEvent, handler?: EventHandler): void {
    if (handler) {
      handler(event);
    }
  }
}
