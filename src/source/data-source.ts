import { MinMaxDataInfo, RawDataSource } from '../interfaces/data-source';

export class DataSource {
  private _minMax: MinMaxDataInfo = {};

  constructor(source: RawDataSource) {
    this._setDataSource(source);
  }

  private _setDataSource(source: RawDataSource): void {
    this._calcMinMax(source);
  }

  private _calcMinMax(source: RawDataSource): void {
    this._minMax = source.reduce(
      (acc, curr) => {
        acc.min = acc.min < curr.y ? acc.min : curr.y;
        acc.max = acc.max > curr.y ? acc.max : curr.y;
        return acc;
      },
      { min: Infinity, max: -Infinity }
    );
  }
}
