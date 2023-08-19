import { Subscriber } from './subscriber';

export class Notifier<T> {
  private _subscribers: Subscriber<T>[] = [];

  constructor(private _value: T | null = null) {}

  get value(): T | null {
    return this._value;
  }

  public subscribe(callback: (value: T) => void): Subscriber<T> {
    this._subscribers.push(new Subscriber(callback));
    return this._subscribers[this._subscribers.length - 1];
  }

  public notify(value: T): void {
    this._value = value;
    this._subscribers.forEach((subscriber) => subscriber.callback(value));
  }
}
