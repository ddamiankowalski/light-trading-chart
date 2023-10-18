import { createChart } from ".";

const chart = createChart(document.getElementById('app') as HTMLElement);

chart.setData([{ x: 1, y: -21 }, { x: 1, y: 1 }, { x: 1, y: -13 }, { x: 1, y: 2 }])

console.log(chart)
