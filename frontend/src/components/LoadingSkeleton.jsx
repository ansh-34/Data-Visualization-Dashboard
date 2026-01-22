import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="space-y-4"
    >
      {/* Header skeleton */}
      <motion.div 
        className="h-6 sm:h-8 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg w-1/3 shimmer"
        style={{
          backgroundSize: '1000px 100%',
        }}
        animate={{
          backgroundPosition: ['-1000px 0', '1000px 0']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Chart skeleton */}
      <motion.div 
        className="h-80 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl shimmer"
        style={{
          backgroundSize: '1000px 100%',
        }}
        animate={{
          backgroundPosition: ['-1000px 0', '1000px 0']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default LoadingSkeleton;
