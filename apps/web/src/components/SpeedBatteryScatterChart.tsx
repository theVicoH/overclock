import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ScatterController, PointElement, LinearScale, Tooltip, Legend } from 'chart.js';
import { colors } from 'common/styles/colors';

ChartJS.register(ScatterController, PointElement, LinearScale, Tooltip, Legend);

interface SpeedBatteryScatterChartProps {
  speeds: number[];
  battery: number[];
}

const SpeedBatteryScatterChart: React.FC<SpeedBatteryScatterChartProps> = ({ speeds, battery }) => {
  const data = {
    datasets: [
      {
        label: 'Vitesse vs Batterie',
        data: speeds.map((speed, i) => ({ x: speed, y: battery[i] })),
        backgroundColor: colors.primary500,
        borderColor: colors.primary600,
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
        text: "Relation entre la Vitesse et l'Utilisation de la Batterie",
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vitesse',
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
          text: 'Batterie',
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