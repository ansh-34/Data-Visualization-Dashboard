import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IntensityChart = ({ data }) => {
  const processData = () => {
    // Filter data with valid years and intensity
    const validData = data.filter(
      (item) => item.end_year && item.end_year !== '' && item.intensity
    );

    // Group by year and calculate average intensity
    const yearMap = {};
    validData.forEach((item) => {
      const year = item.end_year;
      if (!yearMap[year]) {
        yearMap[year] = { total: 0, count: 0 };
      }
      yearMap[year].total += item.intensity;
      yearMap[year].count += 1;
    });

    // Sort years and calculate averages
    const years = Object.keys(yearMap).sort();
    const intensities = years.map(
      (year) => yearMap[year].total / yearMap[year].count
    );

    return { years, intensities };
  };

  const { years, intensities } = processData();

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Average Intensity',
        data: intensities,
        borderColor: 'rgba(34, 211, 238, 1)',
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgba(34, 211, 238, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Intensity vs Year',
        color: '#fff',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
        <h3 className="text-lg font-bold text-white">Intensity Trends</h3>
      </div>
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IntensityChart;
