import { ChartComponent } from "../components/chart";
import { RawDataSource } from "../interfaces/data-source";
import { DataSource } from "../source/data-source";

export class TooltipView {
    private _dataSource = new DataSource([]);
    private _tooltipContainer: HTMLElement;
    private _tooltipEl: HTMLElement | null = null;
    private _color?: string;

    constructor(private _component: ChartComponent) {
        this._tooltipContainer = this._createTooltipContainer();
    }

    public updateBgColor(color: string): void {
        this._color = color;
    }

    public updateDataSource(source: RawDataSource): void {
        this._dataSource = new DataSource(source);
    }

    public notifyMouseOverCol(col: number): void {
        if (!this._tooltipEl) {
            this._tooltipEl = this._createTooltip(col);
        } else {
            this._updateTooltip(col);
        }
    }

    public notifyMouseOut(): void {
        this._tooltipEl?.remove();
        this._tooltipEl = null;
    }

    private _createTooltipContainer(): HTMLElement {
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.pointerEvents = 'none';
        this._component.element.appendChild(container);
        return container;
    }

    private _createTooltip(col: number): HTMLElement {
        const tooltip = document.createElement('div');
        this._assertTooltipSide(tooltip, col);
        tooltip.style.position = 'absolute';
        tooltip.style.width = '100%';
        tooltip.style.height = '1.5rem';
        tooltip.style.backgroundColor = this._color ?? 'black';
        this._tooltipContainer.appendChild(tooltip);
        this._animateTooltip(tooltip);
        return tooltip;
    }

    private _assertTooltipSide(tooltip: HTMLElement, col: number): void {
        const dataPoint = this._dataSource.source[col];
        const midpoint = this._getMidpointStatus(dataPoint.y, this._dataSource.minMax.min, this._dataSource.minMax.max)
        if (midpoint === 'above') {
            tooltip.style.bottom = '0';
        } else {
            tooltip.style.bottom = 'unset';
        }
    }

    private _animateTooltip(tooltipEl: HTMLElement): void {
        const animation = [{ opacity: 0 }, { opacity: 1 }];
        const timing = { duration: 200 };
        tooltipEl.animate(animation, timing);
    }

    private _updateTooltip(col: number): void {
        this._assertTooltipSide(this._tooltipEl as HTMLElement, col);
    }

    private _getMidpointStatus(x: number, minValue: number, maxValue: number): 'above' | 'below' {
        const diff = maxValue - minValue;
        const midpoint = minValue + diff / 2;

        if (x >= midpoint) {
            return 'above';
        } else {
            return 'below';
        }
    }
}