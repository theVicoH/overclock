import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, Title, Tooltip, Legend } from "chart.js";
import { colors } from "common/styles/colors";

ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, Title, Tooltip, Legend);

interface PerformanceRadarChartProps {
  maxSpeed: number;
  averageSpeed: number;
  distance: number;
  batteryUsage: number;
  time: number;
}

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({
  maxSpeed,
  averageSpeed,
  distance,
  batteryUsage,
  time,
}) => {
  const data = {
    labels: ["Vitesse Max", "Vitesse Moyenne", "Distance", "Utilisation de la Batterie", "Temps"],
    datasets: [
      {
        label: "Performance",
        data: [maxSpeed, averageSpeed, distance, batteryUsage, time],
        backgroundColor: colors.primary500,
        borderColor: colors.primary500,
        borderWidth: 1,
        pointBackgroundColor: colors.primary500,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: colors.primary500,
        },
      },
      title: {
        display: true,
        text: "Performance du Véhicule",
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
        ticks: {
          color: colors.neutral700,
        },
        pointLabels: {
          color: colors.neutral0,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default PerformanceRadarChart;