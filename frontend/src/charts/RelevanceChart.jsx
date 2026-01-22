import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RelevanceChart = ({ data }) => {
  const getChartData = () => {
    if (!data || data.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Create bins for relevance scores (0-10)
    const bins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const counts = new Array(bins.length - 1).fill(0);

    data.forEach((item) => {
      const relevance = Math.floor(item.relevance || 0);
      if (relevance >= 0 && relevance <= 10) {
        counts[relevance]++;
      }
    });

    return {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [
        {
          label: 'Relevance Score Distribution',
          data: counts,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#f3f4f6',
          font: { size: 12, weight: 500 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Count: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...getChartData().datasets[0].data) * 1.1,
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return <Line data={getChartData()} options={options} />;
};

export default RelevanceChart;
