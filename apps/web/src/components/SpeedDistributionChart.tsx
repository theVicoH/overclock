import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js"
import { colors } from "common/styles/colors"

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

interface SpeedDistributionChartProps {
  speeds: number[]
}

export default function SpeedDistributionChart({ speeds }: SpeedDistributionChartProps) {
  const data = {
    labels: Array.from({ length: 10 }, (_, i) => `${i * 10}-${(i + 1) * 10} km/h`),
    datasets: [
      {
        label: "Distribution de la Vitesse",
        data: Array(10).fill(0).map((_, i) => speeds.filter(s => s >= i * 10 && s < (i + 1) * 10).length),
        backgroundColor: `${colors.primary500}50`,
        borderColor: colors.primary500,
        borderWidth: 1,
      },
    ],
  }

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
        text: "Distribution de la Vitesse",
        color: colors.primary500,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Plage de Vitesse (km/h)",
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
          text: "Fréquence",
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
  }

  return <Bar data={data} options={options} />
}
