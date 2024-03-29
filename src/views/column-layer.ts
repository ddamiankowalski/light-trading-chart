import { DataComponent } from "../components/data";
import { EventBus } from "../events/event-bus";
import { EventHandlers, EventType } from "../interfaces/events";
import { SourceView, View, ViewInvalidateMessage, ViewType } from "../interfaces/view";
import { ColumnLayerRenderer } from "../renderer/column-layer";
import { Notifier } from "../utils/notifier";
import { CommonLayerView } from "./common-layer";

export class ColumnLayerView extends CommonLayerView implements View, SourceView {
  private _renderer: ColumnLayerRenderer;

  constructor(
    protected _component: DataComponent,
    protected _eventBus: EventBus,
    protected _viewInvalidator: Notifier<ViewInvalidateMessage>
  ) {
    super(_component, _eventBus, _viewInvalidator);
    this._renderer = new ColumnLayerRenderer(this);

    const handlers: EventHandlers = {};

    _eventBus.registerEvents(ViewType.DataLayer, EventType.MouseEvent, handlers, this._component.element);
  }

  get width(): number {
    return this.canvas.width / devicePixelRatio;
  }

  get height(): number {
    return this.canvas.height / devicePixelRatio;
  }

  public render(): void {
    this._renderer.render(this._zeroColor as string, this._horizontalMargin);
  }
}
