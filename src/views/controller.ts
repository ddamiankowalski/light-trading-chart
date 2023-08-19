import { ChartComponent } from "../components/chart";
import { EventBus } from "../events/event-bus";
import { View, ViewConstructor, ViewType } from "../interfaces/view";

export class ViewController {
    private _invalidationRunning: boolean = false;
    private _viewMap: Map<ViewType, View> = new Map(); 

    constructor() {}

    public addView<T>(view: ViewConstructor<T>, component: ChartComponent, eventBus: EventBus): T {
        return new view(component, eventBus);
    }
}