'use client';

import { motion } from 'framer-motion';
import { Bell, Filter, Archive, Star } from 'lucide-react';

const NotificationSummary = () => {
  const notifications = [
    {
      id: 1,
      app: 'WhatsApp',
      count: 12,
      priority: 'high',
      summary: 'Important messages from work group and family chat',
      icon: '💬',
      timestamp: '5 min ago'
    },
    {
      id: 2,
      app: 'Email',
      count: 8,
      priority: 'medium',
      summary: 'Meeting invites and project updates',
      icon: '📧',
      timestamp: '15 min ago'
    },
    {
      id: 3,
      app: 'Calendar',
      count: 3,
      priority: 'high',
      summary: 'Upcoming meetings and deadlines today',
      icon: '📅',
      timestamp: '30 min ago'
    },
    {
      id: 4,
      app: 'Slack',
      count: 24,
      priority: 'low',
      summary: 'Team updates and casual conversations',
      icon: '💼',
      timestamp: '1 hour ago'
    },
    {
      id: 5,
      app: 'Instagram',
      count: 45,
      priority: 'low',
      summary: 'Social media updates and stories',
      icon: '📸',
      timestamp: '2 hours ago'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-gray-600/50 bg-gray-800/30';
      default: return 'border-gray-600/50 bg-gray-800/30';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-purple-400" />
          Notification Summary
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50">
            <Archive className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
        <div>
          <p className="text-2xl font-bold text-white">92</p>
          <p className="text-gray-400 text-sm">Total Notifications</p>
        </div>
        <div>
          <p className="text-lg font-bold text-red-400">15</p>
          <p className="text-gray-400 text-sm">High Priority</p>
        </div>
        <div>
          <p className="text-lg font-bold text-yellow-400">23</p>
          <p className="text-gray-400 text-sm">Medium Priority</p>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${getPriorityColor(notification.priority)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{notification.icon}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-medium">{notification.app}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(notification.priority)}`}>
                      {notification.priority}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{notification.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {notification.count}
                </span>
                <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 cursor-pointer" />
              </div>
            </div>
            <p className="text-gray-300 text-sm">{notification.summary}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-purple-600/20 text-purple-300 py-2 px-4 rounded-lg hover:bg-purple-600/30 transition-colors">
          Mark All Read
        </button>
        <button className="flex-1 bg-blue-600/20 text-blue-300 py-2 px-4 rounded-lg hover:bg-blue-600/30 transition-colors">
          Smart Filter
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationSummary;