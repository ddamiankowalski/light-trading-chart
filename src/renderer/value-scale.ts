import { ValueScaleView } from "../views/value-scale";

export class ValueScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: ValueScaleView) {
    this._svgContainer = _view.svgContainer;
  }

  public render(): void {
    console.log("rendering!!");
  }
}
