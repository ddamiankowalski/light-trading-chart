import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { View, ViewConstructor, ViewType } from "../interfaces/view";
import { Notifier } from "../utils/notifier";

export class ViewController {
    private _invalidationRunning: boolean = false;
    private _viewInvalidators: Map<ViewType, Notifier<boolean>> = new Map(); 

    constructor() {}

    public addView<T extends View>(viewConstructor: ViewConstructor<T>, viewType: ViewType, component: ChartComponent, eventBus: EventBus): T {
        const view = new viewConstructor(component, eventBus);
        this._viewInvalidators.set(viewType, view.notifier);
        return view;
    }
}