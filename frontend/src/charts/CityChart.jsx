import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CityChart = ({ data }) => {
  const getChartData = () => {
    if (!data || data.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Group by city and count
    const cityCounts = {};
    data.forEach((item) => {
      const city = item.city || 'Unknown';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    // Get top 10 cities
    const topCities = Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = topCities.map(([city]) => city.length > 15 ? city.substring(0, 12) + '...' : city);
    const counts = topCities.map(([, count]) => count);

    return {
      labels,
      datasets: [
        {
          label: 'Records by City',
          data: counts,
          backgroundColor: [
            'rgba(34, 197, 94, 0.6)',
            'rgba(16, 185, 129, 0.6)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(139, 92, 246, 0.6)',
            'rgba(236, 72, 153, 0.6)',
            'rgba(249, 115, 22, 0.6)',
            'rgba(244, 63, 94, 0.6)',
            'rgba(168, 85, 247, 0.6)',
            'rgba(20, 184, 166, 0.6)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(6, 182, 212, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(244, 63, 94, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(20, 184, 166, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(255, 255, 255, 0.15)',
          hoverBorderWidth: 3,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y', // Horizontal bar chart for better readability with city names
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#f3f4f6',
          font: { size: 12, weight: 500 },
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(34, 197, 94, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Count: ${context.parsed.x}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: Math.max(...getChartData().datasets[0].data) * 1.2,
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
      },
      y: {
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

  return <Bar data={getChartData()} options={options} />;
};

export default CityChart;
