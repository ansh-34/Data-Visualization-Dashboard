import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ icon, label, value, gradient, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`group relative backdrop-blur-2xl bg-gradient-to-br ${gradient} rounded-2xl p-6 border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg`}
    >
      {/* Animated background element */}
      <motion.div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl -mr-12 -mt-12 bg-gradient-to-br"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-300 text-sm font-semibold tracking-wide">{label}</div>
          {icon && <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>}
        </div>
        <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</p>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default KPICard;
