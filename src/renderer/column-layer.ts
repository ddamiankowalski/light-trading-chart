import { ChartType } from "../interfaces/chart";
import { ColumnLayerView } from "../views/column-layer";

export class ColumnLayerRenderer {
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;

  constructor(private _view: ColumnLayerView, private _type: ChartType) {
    this._ctx = _view.ctx;
    this._canvas = _view.canvas;
  }

  public render() {
    console.log("RENDERING");
  }
}
