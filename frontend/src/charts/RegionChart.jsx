import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const RegionChart = ({ data }) => {
  const processData = () => {
    const regionMap = {};

    data.forEach((item) => {
      if (item.region && item.region.trim() !== '') {
        regionMap[item.region] = (regionMap[item.region] || 0) + 1;
      }
    });

    return {
      regions: Object.keys(regionMap),
      counts: Object.values(regionMap),
    };
  };

  const { regions, counts } = processData();

  const backgroundColors = [
    'rgba(34, 211, 238, 0.8)',
    'rgba(168, 85, 247, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(251, 146, 60, 0.8)',
    'rgba(59, 130, 246, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(20, 184, 166, 0.8)',
  ];

  const chartData = {
    labels: regions,
    datasets: [
      {
        label: 'Records by Region',
        data: counts,
        backgroundColor: backgroundColors.slice(0, regions.length),
        borderColor: backgroundColors
          .slice(0, regions.length)
          .map((color) => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#f3f4f6',
          font: {
            size: 12,
            weight: 500,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(34, 211, 238, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
        <h3 className="text-lg font-bold text-white">Regional Distribution</h3>
      </div>
      <div style={{ height: '400px', position: 'relative' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RegionChart;
