import { MinMaxSource, RawDataSource } from '../interfaces/data-source';
import { DataLine } from '../interfaces/lines';

export class DataSource {
  private _minMax: MinMaxSource = { min: Infinity, max: -Infinity };
  private _tooltipMinMax: MinMaxSource = { min: Infinity, max: -Infinity };
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

  get minMax(): MinMaxSource {
    return this._minMax;
  }

  get tooltipMinMax(): MinMaxSource {
    return this._tooltipMinMax;
  }

  public lineMinMax(lines: DataLine[]): void {
    lines.forEach(line => {
      if (line.y > this.minMax.max) {
        this.minMax.max = line.y
      }

      if (line.y < this.minMax.min) {
        this.minMax.min = line.y;
      }
    })
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

    this._tooltipMinMax = source.reduce(
      (acc, curr) => {
        acc.min = acc.min < curr.y ? acc.min : curr.y;
        acc.max = acc.max > curr.y ? acc.max : curr.y;
        return acc;
      },
      { min: Infinity, max: -Infinity }
    );
  }
}
