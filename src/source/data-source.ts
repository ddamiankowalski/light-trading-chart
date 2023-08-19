import { MinMaxDataInfo, RawDataSource } from '../interfaces/data-source';

export class DataSource {
  private _minMax: MinMaxDataInfo = {};
  private _source: RawDataSource;
  private _dataSize: number = 0;

  constructor(source: RawDataSource) {
    this._source = source;
    this._setDataSource(source);
  }

  get size(): number {
    return this._dataSize;
  }

  get source(): RawDataSource {
    return this._source;
  }

  private _setDataSource(source: RawDataSource): void {
    this._dataSize = source.length;
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
