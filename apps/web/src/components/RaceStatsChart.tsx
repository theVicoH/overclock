import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import { colors } from "common/styles/colors"

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend)

interface RaceStatsChartProps {
  distance: number
  maxSpeed: number
  averageSpeed: number
  batteryMax: number
  batteryMin: number
  time: number
}

export default function RaceStatsChart({
  distance,
  maxSpeed,
  averageSpeed,
  batteryMax,
  batteryMin,
  time,
}: RaceStatsChartProps) {
  const data = {
    labels: ["Distance", "Max Speed", "Average Speed", "Battery Max", "Battery Min", "Time"],
    datasets: [
      {
        label: "Stats",
        data: [distance, maxSpeed / 10, averageSpeed / 10, batteryMax, batteryMin, time],
        borderColor: colors.primary500,
        backgroundColor: `${colors.primary500}40`,
        borderWidth: 2,
      },
    ],
  }

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
        text: "Statistiques Globales de la Course",
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
  }

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
      <Line data={data} options={options} />
    </div>
  )
}
