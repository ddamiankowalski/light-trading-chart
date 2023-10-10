export class Subscriber<T> {
  constructor(private _callback: (value: T) => void) {}

  get callback(): (value: T) => void {
    return this._callback;
  }
}
