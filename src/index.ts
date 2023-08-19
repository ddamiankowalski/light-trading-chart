import './styles.css';
import { createChart } from './api/create-chart';

const chart = createChart(document.getElementById('chart-container') as HTMLElement);
chart.setData([{ y: 123 }, { y: 220 }]);
