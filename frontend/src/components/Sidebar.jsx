import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen = true, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 13l-4-4m0 0l-4 4m4-4v4" />
        </svg>
      ),
      label: 'Dashboard',
      path: '/dashboard',
    },
  ];

  return (
    <motion.aside 
      className="fixed left-0 top-16 h-[calc(100vh-64px)] backdrop-blur-2xl bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/40 border-r border-white/10 shadow-xl overflow-y-auto"
      animate={{ width: isOpen ? '260px' : '80px' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 space-y-2">
        {/* Toggle Button */}
        <motion.button 
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          whileHover={{ scale: 1.05 }}
        >
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        {/* Menu Items */}
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button 
              key={index}
              onClick={() => navigate(item.path)}
              className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 text-white shadow-glow-cyan'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white hover:border hover:border-cyan-500/20'
              }`}
              whileHover={{ x: 4 }}
            >
              <span className="text-gray-300 group-hover:text-white transition-colors">{item.icon}</span>
              {isOpen && (
                <span className="text-sm font-medium tracking-wide group-hover:translate-x-0.5 transition-transform">
                  {item.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
