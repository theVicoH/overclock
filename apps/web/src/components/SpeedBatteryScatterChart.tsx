import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { colors } from 'common/styles/colors';

ChartJS.register(PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface SpeedBatteryScatterChartProps {
  speeds: number[];
  battery: number[];
}

const SpeedBatteryScatterChart: React.FC<SpeedBatteryScatterChartProps> = ({ speeds, battery }) => {
  const data = {
    datasets: [
      {
        label: 'Vitesse vs Batterie',
        data: speeds.map((speed, index) => ({ x: speed, y: battery[index] })),
        backgroundColor: colors.primary500,
        borderColor: colors.primary500,
        borderWidth: 1,
        pointRadius: 5,
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
        text: 'Vitesse vs Batterie',
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vitesse (km/h)',
          color: colors.neutral0,
        },
        ticks: {
          color: colors.neutral0,
        },
        grid: {
          color: colors.neutral700,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Niveau de Batterie (%)',
          color: colors.neutral0,
        },
        ticks: {
          color: colors.neutral0,
        },
        grid: {
          color: colors.neutral700,
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default SpeedBatteryScatterChart;