import React from 'react';
import { motion } from 'framer-motion';

const FilterPanel = ({ filters, availableFilters, onFilterChange }) => {
  const handleChange = (filterName, value) => {
    onFilterChange({ ...filters, [filterName]: value });
  };

  const handleReset = () => {
    onFilterChange({ 
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
  };

  const filterConfig = [
    { name: 'end_year', label: 'End Year', options: availableFilters?.endYears || [] },
    { name: 'region', label: 'Region', options: availableFilters?.regions || [] },
    { name: 'topic', label: 'Topic', options: availableFilters?.topics || [] },
    { name: 'sector', label: 'Sector', options: availableFilters?.sectors || [] },
    { name: 'pestle', label: 'PESTLE', options: availableFilters?.pestles || [] },
    { name: 'source', label: 'Source', options: availableFilters?.sources || [] },
    { name: 'swot', label: 'SWOT', options: availableFilters?.swots || [] },
    { name: 'country', label: 'Country', options: availableFilters?.countries || [] },
    { name: 'city', label: 'City', options: availableFilters?.cities || [] },
  ];

  return (
    <motion.div 
      className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] rounded-2xl border border-white/10 shadow-xl p-6 sm:p-8 overflow-hidden group lg:sticky lg:top-24 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl -ml-48 -mb-48" />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50 flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Filter Data</h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Refine your analytics view</p>
            </div>
          </div>
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group/btn relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Reset All</span>
              <span className="sm:hidden">Reset</span>
            </span>
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {filterConfig.map((filter, index) => (
            <motion.div 
              key={filter.name} 
              className="flex flex-col group/filter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <label className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mr-2 animate-pulse"></span>
                {filter.label}
              </label>
              <select
                value={Array.isArray(filters[filter.name]) ? filters[filter.name][0] || '' : ''}
                onChange={(e) => handleChange(filter.name, e.target.value ? [e.target.value] : [])}
                className="px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-white text-sm cursor-pointer shadow-lg hover:bg-white/10 hover:border-cyan-500/30 group-hover/filter:border-cyan-500/20"
              >
                <option value="" className="bg-gray-900 text-white">All {filter.label}</option>
                {filter.options && Array.isArray(filter.options) && filter.options.length > 0 ? (
                  filter.options.map((option) => (
                    <option key={option} value={option} className="bg-gray-900 text-white">
                      {option}
                    </option>
                  ))
                ) : (
                  <option disabled className="bg-gray-900 text-gray-500">No options available</option>
                )}
              </select>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
