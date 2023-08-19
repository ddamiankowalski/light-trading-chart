import './styles.css';
import { createChart } from './api/create-chart';

const chart = createChart(document.getElementById('chart-container') as HTMLElement);
