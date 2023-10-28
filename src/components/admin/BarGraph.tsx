"use client";
import React, { FC } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
interface BarGraphProps {
  data: GraphData[];
}

interface GraphData {
  day: string;
  date: string;
  totalAmout: number;
}

const BarGraph: FC<BarGraphProps> = ({ data }) => {
  console.log(data);
  const labels = data.map((item) => item.day);
  const amount = data.map((item) => item.totalAmout);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sale Amount",
        data: amount,
        backgroundColor: "rgba(75, 192, 132, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options} />;
};

export default BarGraph;
