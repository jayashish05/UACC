'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Phone, 
  Bell, 
  Calendar, 
  Users, 
  Clock,
  Activity,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';

const AnalyticsPage = () => {
  const stats = [
    {
      title: 'Total Calls',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Phone,
      color: 'blue'
    },
    {
      title: 'Avg Call Duration',
      value: '8.4 min',
      change: '+2.1%',
      trend: 'up',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Notifications Processed',
      value: '18,932',
      change: '+8.7%',
      trend: 'up',
      icon: Bell,
      color: 'purple'
    },
    {
      title: 'AI Accuracy',
      value: '94.2%',
      change: '+1.3%',
      trend: 'up',
      icon: Target,
      color: 'cyan'
    }
  ];

  const weeklyData = [
    { day: 'Mon', calls: 45, notifications: 234 },
    { day: 'Tue', calls: 38, notifications: 198 },
    { day: 'Wed', calls: 52, notifications: 267 },
    { day: 'Thu', calls: 41, notifications: 223 },
    { day: 'Fri', calls: 59, notifications: 289 },
    { day: 'Sat', calls: 33, notifications: 156 },
    { day: 'Sun', calls: 28, notifications: 134 }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 border-blue-400/30',
      green: 'from-green-500 to-green-600 border-green-400/30',
      purple: 'from-purple-500 to-purple-600 border-purple-400/30',
      cyan: 'from-cyan-500 to-cyan-600 border-cyan-400/30'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Track your AI communication performance and insights</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            className={`glass-container p-6 border bg-gradient-to-br ${getColorClasses(stat.color)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${getColorClasses(stat.color)} bg-opacity-20`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-300 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-container p-6"
        >
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-400 font-medium">{day.day}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.calls / 60) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-blue-400 w-8">{day.calls}</span>
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.notifications / 300) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-purple-400 w-12">{day.notifications}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Calls</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Notifications</span>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-container p-6"
        >
          <div className="flex items-center mb-6">
            <Activity className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">AI Performance</h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Transcription Accuracy</span>
                <span className="text-green-400 font-semibold">96.8%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '96.8%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Smart Summarization</span>
                <span className="text-blue-400 font-semibold">94.2%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '94.2%' }}
                  transition={{ duration: 1.5, delay: 1.0 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Context Understanding</span>
                <span className="text-purple-400 font-semibold">91.5%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '91.5%' }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Action Item Detection</span>
                <span className="text-cyan-400 font-semibold">89.3%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '89.3%' }}
                  transition={{ duration: 1.5, delay: 1.4 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-container p-6"
      >
        <div className="flex items-center mb-6">
          <PieChart className="w-6 h-6 text-yellow-400 mr-3" />
          <h3 className="text-xl font-semibold text-white">Recent Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-400/20 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-1">Peak Call Hours</div>
            <div className="text-white text-lg font-semibold">2:00 PM - 4:00 PM</div>
            <div className="text-gray-400 text-xs">Most productive period</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-400/20 rounded-lg p-4">
            <div className="text-green-400 text-sm font-medium mb-1">Top Notification Type</div>
            <div className="text-white text-lg font-semibold">Work Emails</div>
            <div className="text-gray-400 text-xs">45% of total notifications</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-400/20 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium mb-1">AI Learning Rate</div>
            <div className="text-white text-lg font-semibold">+3.2% / week</div>
            <div className="text-gray-400 text-xs">Continuously improving</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;