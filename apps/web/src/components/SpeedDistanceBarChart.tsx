import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { colors } from 'common/styles/colors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SpeedDistanceBarChartProps {
  dates: string[];
  speeds: number[];
  distances: number[];
}

const SpeedDistanceBarChart: React.FC<SpeedDistanceBarChartProps> = ({ dates, speeds, distances }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Speed (km/h)',
        data: speeds,
        backgroundColor: colors.primary500,
        borderColor: colors.primary200,
        borderWidth: 1,
      },
      {
        label: 'Distance (km)',
        data: distances,
        backgroundColor: colors.orange,
        borderColor: colors.orange,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: colors.primary500,
        },
      },
      title: {
        display: true,
        text: 'Distance & Vitesse',
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: colors.neutral0,
        },
        grid: {
          color: colors.neutral700,
        },
      },
      y: {
        ticks: {
          color: colors.neutral0,
        },
        grid: {
          color: colors.neutral700,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SpeedDistanceBarChart;