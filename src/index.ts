import './styles.css';
import { createChart } from './api/create-chart';

const chart = createChart(document.getElementById('chart-container') as HTMLElement);
chart.setData([
  {
    y: -120.0
  },
  {
    y: -120.18
  },
  {
    y: -120.95
  },
  {
    y: -124.25
  },
  {
    y: -116.25
  },
  {
    y: -123.75
  },
  {
    y: -140.75
  },
  {
    y: -148.35
  },
  {
    y: -149.2
  },
  {
    y: -156.6
  },
  {
    y: -158.7
  },
  {
    y: -158.779
  },
  {
    y: -162.379
  },
  {
    y: -181.379
  },
  {
    y: -180.499
  },
  {
    y: -225.499
  },
  {
    y: -238.499
  },
  {
    y: -239.199
  },
  {
    y: -300.199
  },
  {
    y: -288.199
  },
  {
    y: -304.199
  },
  {
    y: -315.199
  },
  {
    y: -338.199
  },
  {
    y: -358.199
  },
  {
    y: -360.999
  },
  {
    y: -366.099
  },
  {
    y: -256.099
  },
  {
    y: -316.099
  },
  {
    y: -316.113
  }
]);

const chart1 = createChart(document.getElementById('chart-container1') as HTMLElement);
chart1.setData([
  {
    y: -100.0
  },
  {
    y: -100.8
  },
  {
    y: -100.11
  },
  {
    y: -97.61
  },
  {
    y: -96.41
  },
  {
    y: -266.41
  }
]);

const chart2 = createChart(document.getElementById('chart-container2') as HTMLElement);
chart2.setData([
  {
    y: 0.87
  },
  {
    y: -11.13
  },
  {
    y: -19.13
  },
  {
    y: -30.13
  },
  {
    y: -50.13
  },
  {
    y: -63.13
  },
  {
    y: -83.13
  },
  {
    y: -108.13
  },
  {
    y: -135.13
  },
  {
    y: -191.13
  },
  {
    y: -218.13
  }
]);

const chart3 = createChart(document.getElementById('chart-container3') as HTMLElement);
chart3.setData([{ y: 123 }, { y: 220 }, { y: 12 }, { y: 125 }, { y: 600 }, { y: 20 }, { y: 330 }]);
