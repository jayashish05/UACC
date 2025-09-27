'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  Phone, 
  Bell, 
  Calendar, 
  BarChart3, 
  Settings, 
  User,
  LogOut,
  Bot,
  FileText
} from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: Home, label: 'Overview', id: 'overview' },
    { icon: BarChart3, label: 'Analytics', id: 'analytics' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 p-6"
    >
      {/* User Profile */}
      <div className="flex items-center space-x-3 mb-8 p-3 rounded-lg bg-gray-800/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-medium">Code Smiths</p>
          <p className="text-gray-400 text-sm">VIT Vellore</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === item.id 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 mt-8 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </motion.button>
    </motion.div>
  );
};

export default DashboardSidebar;