import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import KPICard from './KPICard';
import FilterPanel from './FilterPanel';
import IntensityChart from '../charts/IntensityChart';
import TopicsChart from '../charts/TopicsChart';
import RegionChart from '../charts/RegionChart';
import LikelihoodChart from '../charts/LikelihoodChart';
import RelevanceChart from '../charts/RelevanceChart';
import YearChart from '../charts/YearChart';
import CityChart from '../charts/CityChart';
import LoadingSkeleton from './LoadingSkeleton';
import { fetchData, fetchFilters } from '../api/api';

const Dashboard = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    end_year: [],
    region: [], 
    topic: [],
    sector: [],
    pestle: [],
    source: [],
    swot: [],
    country: [],
    city: []
  });
  const [availableFilters, setAvailableFilters] = useState({ 
    endYears: [],
    regions: [], 
    topics: [],
    sectors: [],
    pestles: [],
    sources: [],
    swots: [],
    countries: [],
    cities: []
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fetchedData, filterOptions] = await Promise.all([
          fetchData(),
          fetchFilters(),
        ]);
        
        // Handle data response
        const dataRecords = Array.isArray(fetchedData) 
          ? fetchedData 
          : (Array.isArray(fetchedData.data) ? fetchedData.data : []);
        
        setData(dataRecords);
        setFilteredData(dataRecords);
        
        // Handle filter options response - they come directly in the response
        const filters = {
          endYears: filterOptions?.endYears || [],
          regions: filterOptions?.regions || [],
          topics: filterOptions?.topics || [],
          sectors: filterOptions?.sectors || [],
          pestles: filterOptions?.pestles || [],
          sources: filterOptions?.sources || [],
          swots: filterOptions?.swots || [],
          countries: filterOptions?.countries || [],
          cities: filterOptions?.cities || []
        };
        setAvailableFilters(filters);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    
    // Call API with selected filters
    fetchData(newFilters)
      .then((response) => {
        // Extract data from API response
        const filteredRecords = Array.isArray(response) 
          ? response 
          : (Array.isArray(response.data) ? response.data : []);
        setFilteredData(filteredRecords);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
        setFilteredData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Normalize records for rendering (API returns { success, count, data })
  const records = Array.isArray(filteredData)
    ? filteredData
    : (filteredData && Array.isArray(filteredData.data) ? filteredData.data : []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex relative z-10">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 pt-20 pb-8 ${sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[80px]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Real-time data visualization and analytics</p>
            </motion.div>

            {/* Filter Panel */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FilterPanel
                filters={filters}
                availableFilters={availableFilters}
                onFilterChange={handleFilterChange}
              />
            </motion.div>

            {/* KPI Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <KPICard
                index={0}
                label="Total Records"
                value={records.length.toLocaleString()}
                icon="📊"
                gradient="from-cyan-500/20 to-blue-600/20"
              />
              <KPICard
                index={1}
                label="Avg Intensity"
                value={(records.reduce((sum, item) => sum + (item.intensity || 0), 0) / (records.length || 1)).toFixed(1)}
                icon="⚡"
                gradient="from-purple-500/20 to-pink-600/20"
              />
              <KPICard
                index={2}
                label="Avg Likelihood"
                value={(records.reduce((sum, item) => sum + (item.likelihood || 0), 0) / (records.length || 1)).toFixed(1)}
                icon="🎯"
                gradient="from-emerald-500/20 to-green-600/20"
              />
              <KPICard
                index={3}
                label="Avg Relevance"
                value={(records.reduce((sum, item) => sum + (item.relevance || 0), 0) / (records.length || 1)).toFixed(1)}
                icon="📈"
                gradient="from-orange-500/20 to-red-600/20"
              />
              <KPICard
                index={4}
                label="Regions Covered"
                value={new Set(records.map((item) => item.region)).size}
                icon="🌍"
                gradient="from-pink-500/20 to-rose-600/20"
              />
              <KPICard
                index={5}
                label="Countries"
                value={new Set(records.map((item) => item.country)).size}
                icon="🗺️"
                gradient="from-indigo-500/20 to-purple-600/20"
              />
            </motion.div>

            {/* Charts Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Intensity Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-cyan overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">Intensity Distribution</h3>
                  <p className="text-sm text-gray-400">Across all records</p>
                </div>
                {loading ? <LoadingSkeleton /> : <IntensityChart data={records} />}
              </motion.div>

              {/* Topics Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-purple overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">Topics Overview</h3>
                  <p className="text-sm text-gray-400">Top topics in data</p>
                </div>
                {loading ? <LoadingSkeleton /> : <TopicsChart data={records} />}
              </motion.div>

              {/* Region Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-emerald overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">Regional Analysis</h3>
                  <p className="text-sm text-gray-400">Distribution by region</p>
                </div>
                {loading ? <LoadingSkeleton /> : <RegionChart data={records} />}
              </motion.div>

              {/* Likelihood Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-cyan overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">Likelihood Metrics</h3>
                  <p className="text-sm text-gray-400">Probability distribution</p>
                </div>
                {loading ? <LoadingSkeleton /> : <LikelihoodChart data={records} />}
              </motion.div>

              {/* Relevance Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-purple overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">Relevance Analysis</h3>
                  <p className="text-sm text-gray-400">Score distribution</p>
                </div>
                {loading ? <LoadingSkeleton /> : <RelevanceChart data={records} />}
              </motion.div>

              {/* Year Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-emerald overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">Timeline Distribution</h3>
                  <p className="text-sm text-gray-400">Records by year</p>
                </div>
                {loading ? <LoadingSkeleton /> : <YearChart data={records} />}
              </motion.div>

              {/* City Chart */}
              <motion.div
                className="group backdrop-blur-2xl bg-glass border border-glass-border rounded-2xl p-6 hover:bg-glass-hover transition-all duration-300 shadow-xl hover:shadow-glow-cyan overflow-hidden relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                </div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white">City Breakdown</h3>
                  <p className="text-sm text-gray-400">Top cities (Top 10)</p>
                </div>
                {loading ? <LoadingSkeleton /> : <CityChart data={records} />}
              </motion.div>
            </motion.div>

            {/* Empty State */}
            {!loading && records.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center py-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-white mb-2">No data found</h3>
                <p className="text-gray-400">Try adjusting your filters</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
