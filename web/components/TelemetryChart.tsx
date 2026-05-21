"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface TelemetryChartProps {
  temperatureData: number[];
  timeLabels: string[];
}

export default function TelemetryChart({ temperatureData, timeLabels }: TelemetryChartProps) {
  // Opsi Chart sesuai panduan DESIGN.md
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#14532D", // Taniga Pine
        padding: 10,
        titleFont: { family: "Poppins", size: 13 },
        bodyFont: { family: "Inter", size: 12 },
        callbacks: {
          label: function(context: any) {
            return `Suhu: ${context.parsed.y}°C`;
          }
        }
      },
      // Plugin untuk garis batas wajar 18°C
      annotation: {
        // (Bisa ditambahkan chartjs-plugin-annotation untuk garis dashed merah,
        // namun untuk native chart.js, kita bisa menggambar garis batas manual atau via data tambahan)
      }
    },
    scales: {
      y: {
        min: 10,
        max: 30,
        grid: {
          color: "#f3f4f6", // gray-100
        },
        ticks: {
          font: { family: "Inter" },
          callback: function(value: any) {
            return value + "°C";
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: "Inter" },
          maxTicksLimit: 5,
        }
      }
    },
    elements: {
      line: {
        tension: 0.4 // Curve mulus
      }
    }
  };

  const data = {
    labels: timeLabels,
    datasets: [
      {
        fill: true,
        label: "Suhu Kargo",
        data: temperatureData,
        borderColor: "#16A34A", // Taniga Emerald
        backgroundColor: "rgba(22, 163, 74, 0.2)", // Transparan Emerald untuk Area
        borderWidth: 2,
        pointBackgroundColor: "#16A34A",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      // Garis Batas Kritis Merah (Mock sebagai dataset agar lebih mudah)
      {
        fill: false,
        label: "Batas Maksimal",
        data: Array(timeLabels.length).fill(18),
        borderColor: "#DC2626", // Taniga Danger
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ],
  };

  return (
    <div className="w-full h-full relative">
      <Line options={options} data={data} />
    </div>
  );
}
