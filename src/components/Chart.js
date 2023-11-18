import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ forecastData }) => {
  const calculateAverage = arr =>
    arr.reduce((sum, value) => sum + value, 0) / arr.length;

  const data = {
    labels: forecastData.map(item => item.date),
    datasets: [
      {
        label: 'Temperature °C',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: forecastData.map(item => calculateAverage(item.temps)),
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    },
  };

  return (
    <div className='mt-6 flex justify-center'>
      <Line data={data} options={config} />
    </div>
  );
};

export default Chart;
