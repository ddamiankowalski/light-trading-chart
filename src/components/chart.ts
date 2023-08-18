export class ChartComponent {
  constructor(private _container: HTMLElement) {
    this._createComponent();
  }

  private _createComponent(): void {
    const div = document.createElement('div');
    this.setStyleProperties(div);
    this._container.appendChild(div);
  }

  private setStyleProperties(div: HTMLDivElement): void {
    div.style.width = '100%';
    div.style.height = '100%';
  }
}
