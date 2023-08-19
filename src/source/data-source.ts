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
        const result = { min: 0, max: 0 };
        const { y: currentY } = curr;
        result.min = acc.min < currentY ? acc.min : currentY;
        result.max = acc.max > currentY ? acc.max : currentY;
        return result;
      },
      { min: Infinity, max: -Infinity }
    );
  }
}
