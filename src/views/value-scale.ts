import { ValueScaleComponent } from "../components/valuescale";
import { RawDataSource } from "../interfaces/data-source";
import { SourceView, View, ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { ValueScaleRenderer } from "../renderer/value-scale";
import { Notifier } from "../utils/notifier";

export class ValueScaleView implements View, SourceView {
  private _svgContainer: SVGSVGElement;
  private _renderer: ValueScaleRenderer;

  constructor(private _component: ValueScaleComponent, private _viewInvalidator: Notifier<ViewInvalidateMessage>) {
    this._svgContainer = this._createSvgContainer();
    this._renderer = this._createRenderer();
  }

  get svgContainer(): SVGSVGElement {
    return this._svgContainer;
  }

  get width(): number {
    return this._component.element.offsetWidth;
  }

  get height(): number {
    return this._component.element.offsetHeight;
  }

  public invalidate(): void {
    this._invalidate();
  }

  public render(): void {
    this._renderer.render();
  }

  public updateDataSource(source: RawDataSource): void {
    console.log(source);
  }

  private _createRenderer(): ValueScaleRenderer {
    return new ValueScaleRenderer(this);
  }

  private _createSvgContainer(): SVGSVGElement {
    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgContainer.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
    svgContainer.style.width = "100%";
    svgContainer.style.height = "100%";
    svgContainer.style.top = "0";
    svgContainer.style.left = "0";
    svgContainer.style.overflow = "visible";
    svgContainer.style.position = "absolute";
    svgContainer.classList.add("light-trading-chart__overlay");
    svgContainer.style.pointerEvents = "none";
    this._component.element.appendChild(svgContainer);
    return svgContainer;
  }

  private _invalidate(): void {
    this._viewInvalidator.notify({ viewType: ViewType.ValueScaleView });
  }
}
