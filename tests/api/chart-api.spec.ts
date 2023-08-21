import { assert } from 'chai';
import * as sinon from 'sinon';
import { ChartAPI } from '../../src/api/chart-api';
import { MockChartComponent } from '../mocks/chart-component.mock';

describe('ChartAPI', () => {
  let chartApi: ChartAPI;
  let createChartComponentStub: sinon.SinonStub;
  let createDataLayerViewStub: sinon.SinonStub;
  let createOverlayViewStub: sinon.SinonStub;

  beforeEach(() => {
    createChartComponentStub = sinon.stub(ChartAPI.prototype, <any>'_createChartComponent');
    createDataLayerViewStub = sinon.stub(ChartAPI.prototype, <any>'_createDataLayerView');
    createOverlayViewStub = sinon.stub(ChartAPI.prototype, <any>'_createOverlayView');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('successfully creates ChartAPI object', () => {
    chartApi = new ChartAPI({} as HTMLElement);
  });

  it('calls the ChartComponent constructor with containerHTMLElement', () => {
    const chartComponentMock = new MockChartComponent();
    createChartComponentStub.callsFake(() => chartComponentMock);
    chartApi = new ChartAPI({} as HTMLElement);
    assert.equal(chartApi['_component'], chartComponentMock);
  });
});
