import { assert } from 'chai';
import * as sinon from 'sinon';
import { ChartAPI } from '../../src/api/chart-api';

describe('ChartAPI', () => {
  let chartApi: ChartAPI;
  let containerEl: HTMLElement;

  beforeEach(() => {
    containerEl = new HTMLElement();
    chartApi = new ChartAPI(containerEl);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Smoke test', () => {
    assert.equal(true, true);
  });
});
