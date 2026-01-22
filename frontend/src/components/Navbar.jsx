import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.nav 
      className="sticky top-0 z-40 backdrop-blur-2xl bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-white/[0.08] border-b border-white/10 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">DataViz Pro</h1>
            <p className="text-xs text-gray-400 leading-none">Analytics</p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">DataViz</h1>
          </div>
        </motion.div>

        {/* User Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.div 
            className="relative"
            onHoverStart={() => setShowDropdown(true)}
            onHoverEnd={() => setShowDropdown(false)}
          >
            <motion.button 
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <span className="text-xs font-bold text-white">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white hidden sm:block">{user?.name}</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>

            {/* Dropdown */}
            {showDropdown && (
              <motion.div 
                className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-4 border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-900/30">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Signed in as</p>
                  <p className="text-sm font-semibold text-white mt-1 truncate">{user?.email}</p>
                </div>
                <motion.button 
                  onClick={() => { logout(); setShowDropdown(false); }}
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-3 group/logout"
                >
                  <svg className="w-4 h-4 group-hover/logout:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
