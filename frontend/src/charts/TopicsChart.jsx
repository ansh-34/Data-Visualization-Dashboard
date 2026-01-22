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

const TopicsChart = ({ data }) => {
  const processData = () => {
    const topicMap = {};

    data.forEach((item) => {
      if (item.topic && item.topic.trim() !== '') {
        topicMap[item.topic] = (topicMap[item.topic] || 0) + 1;
      }
    });

    // Sort by count and take top 10
    const sortedTopics = Object.entries(topicMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      topics: sortedTopics.map((entry) => entry[0]),
      counts: sortedTopics.map((entry) => entry[1]),
    };
  };

  const { topics, counts } = processData();

  const chartData = {
    labels: topics,
    datasets: [
      {
        label: 'Number of Records',
        data: counts,
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top 10 Topics by Count',
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
        <div className="w-3 h-3 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
        <h3 className="text-lg font-bold text-white">Popular Topics</h3>
      </div>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TopicsChart;
