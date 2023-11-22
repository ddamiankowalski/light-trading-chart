import { TimeScaleView } from "../views/time-scale";

export class TimeScaleRenderer {
  private _svgContainer: SVGSVGElement;

  constructor(private _view: TimeScaleView) {
    this._svgContainer = _view.svgContainer;
  }

  public render(): void {
    console.log("rendering!!");
  }
}
