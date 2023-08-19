import './styles.css';
import { createChart } from './api/create-chart';

const sampleData = [{ y: 123 }, { y: 220 }, { y: 12 }, { y: 125 }, { y: 600 }, { y: 20 }, { y: 330 }];

const chart = createChart(document.getElementById('chart-container') as HTMLElement);
chart.setData([{ y: 123 }, { y: 220 }, { y: 12 }, { y: 125 }, { y: 600 }, { y: 20 }, { y: 330 }]);
