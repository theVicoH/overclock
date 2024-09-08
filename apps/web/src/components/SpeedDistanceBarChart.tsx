import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { colors } from "common/styles/colors";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

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
        label: "Vitesse (km/h)",
        data: speeds,
        backgroundColor: colors.primary500,
        stack: "stack1",
      },
      {
        label: "Distance (km)",
        data: distances,
        backgroundColor: colors.orange,
        stack: "stack2",
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
        text: "Vitesse et Distance au Fil du Temps",
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
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
          text: "Valeur",
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

  return <Bar data={data} options={options} />;
};

export default SpeedDistanceBarChart;
