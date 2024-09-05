import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { colors } from 'common/styles/colors';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BatteryOverTimeChartProps {
  dates: string[];
  battery: number[];
}

const BatteryOverTimeChart: React.FC<BatteryOverTimeChartProps> = ({ dates, battery }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Niveau de Batterie (%)',
        data: battery,
        borderColor: colors.primary500,
        backgroundColor: `${colors.primary500}40`,
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: colors.primary500,
        },
      },
      title: {
        display: true,
        text: 'Évolution du Niveau de Batterie au Fil du Temps',
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: colors.neutral0,
        },
        grid: {
          color: colors.neutral700,
        },
        ticks: {
          color: colors.neutral0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Niveau de Batterie (%)',
          color: colors.neutral0,
        },
        grid: {
          color: colors.neutral700,
        },
        ticks: {
          color: colors.neutral0,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BatteryOverTimeChart;