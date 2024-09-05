import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, RadarController, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { colors } from 'common/styles/colors';

ChartJS.register(RadialLinearScale, RadarController, PointElement, LineElement, Title, Tooltip, Legend);

interface PerformanceRadarChartProps {
  maxSpeed: number;
  averageSpeed: number;
  distance: number;
  batteryUsage: number;
  time: number;
}

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({ maxSpeed, averageSpeed, distance, batteryUsage, time }) => {
  const data = {
    labels: ['Max Speed (km/h)', 'Average Speed (km/h)', 'Distance (km)', 'Battery Usage (%)', 'Time (s)'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [maxSpeed, averageSpeed, distance, batteryUsage, time],
        backgroundColor: colors.primary200,
        borderColor: colors.primary500,
        borderWidth: 2,
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
        text: 'Performance Radar',
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: colors.neutral700,
        },
        grid: {
          color: colors.neutral700,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(maxSpeed, averageSpeed, distance, batteryUsage, time),
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default PerformanceRadarChart;