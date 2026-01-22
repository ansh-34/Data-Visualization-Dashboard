import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LikelihoodChart = ({ data }) => {
  const processData = () => {
    const sectorMap = {};

    data.forEach((item) => {
      if (item.sector && item.sector.trim() !== '' && item.likelihood) {
        if (!sectorMap[item.sector]) {
          sectorMap[item.sector] = { total: 0, count: 0 };
        }
        sectorMap[item.sector].total += item.likelihood;
        sectorMap[item.sector].count += 1;
      }
    });

    // Calculate average and sort
    const sectorsWithAvg = Object.entries(sectorMap)
      .map(([sector, data]) => ({
        sector,
        avgLikelihood: data.total / data.count,
      }))
      .sort((a, b) => b.avgLikelihood - a.avgLikelihood)
      .slice(0, 10);

    return {
      sectors: sectorsWithAvg.map((item) => item.sector),
      likelihoods: sectorsWithAvg.map((item) => item.avgLikelihood),
    };
  };

  const { sectors, likelihoods } = processData();

  const chartData = {
    labels: sectors,
    datasets: [
      {
        label: 'Average Likelihood',
        data: likelihoods,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Likelihood by Sector (Top 10)',
        color: '#fff',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      y: {
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
        <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
        <h3 className="text-lg font-bold text-white">Sector Likelihood Analysis</h3>
      </div>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LikelihoodChart;
