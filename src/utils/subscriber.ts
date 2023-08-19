export class Subscriber {
  constructor(private _callback: () => void) {}

  get callback(): () => void {
    return this._callback;
  }
}
