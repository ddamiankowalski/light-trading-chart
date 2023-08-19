export class DataSource {
  constructor(private _source: { x?: number; y: number }[]) {}

  updateDataSource(source: { x?: number; y: number }[]): void {}
}
