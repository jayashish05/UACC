'use client';

import { motion } from 'framer-motion';
import { Bell, Filter, Archive, Star, CheckCircle, X } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useState, useEffect } from 'react';

const NotificationSummary = () => {
  const { stats, notifications, loading } = useDashboardData();
  const [filter, setFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const getAppIcon = (appName) => {
    const icons = {
      'com.instagram.android': '📸',
      'com.whatsapp': '💬',
      'com.google.android.gm': '📧'
    };
    return icons[appName] || '📱';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const displayNotifications = notifications.length > 0 ? 
    notifications.slice(0, showAllNotifications ? notifications.length : 8).map(notif => ({
      id: notif.id,
      app: notif.app_name || 'Unknown App',
      priority: notif.priority || 'medium',
      summary: notif.ai_summary || notif.body || 'No summary available',
      fullMessage: notif.body || notif.big_text || notif.sub_text || 'No message content available',
      icon: getAppIcon(notif.app_name),
      timestamp: formatTimestamp(notif.timestamp),
      isRead: notif.is_read || false,
      category: notif.category,
      sentiment: notif.sentiment,
      packageName: notif.package_name,
      title: notif.title || 'Notification'
    })) : [{
      id: 1,
      app: 'System',
      priority: 'medium',
      summary: 'No recent notifications available',
      fullMessage: 'No recent notifications available',
      icon: '📱',
      timestamp: 'Now',
      isRead: false,
      title: 'System'
    }];

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowMessageModal(true);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showMessageModal) {
        setShowMessageModal(false);
        setSelectedNotification(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showMessageModal]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-gray-600/50 bg-gray-800/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-purple-400" />
          Notification Summary
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              filter === 'all' 
                ? 'bg-purple-600/30 text-purple-300' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              filter === 'unread' 
                ? 'bg-purple-600/30 text-purple-300' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
            }`}
          >
            Unread
          </button>
          <button 
            onClick={() => setShowAllNotifications(!showAllNotifications)}
            className="text-blue-400 hover:text-blue-300 text-sm px-3 py-1 rounded hover:bg-blue-600/20"
          >
            {showAllNotifications ? 'Show Less' : 'View More'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
        <div>
          <p className="text-2xl font-bold text-white">
            {loading ? '...' : stats.totalNotifications || 0}
          </p>
          <p className="text-gray-400 text-sm">Total Notifications</p>
        </div>
        <div>
          <p className="text-lg font-bold text-red-400">
            {loading ? '...' : stats.highPriorityNotifications || 0}
          </p>
          <p className="text-gray-400 text-sm">High Priority</p>
        </div>
        <div>
          <p className="text-lg font-bold text-yellow-400">
            {loading ? '...' : stats.unreadNotifications || 0}
          </p>
          <p className="text-gray-400 text-sm">Unread</p>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading notifications...</p>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleNotificationClick(notification)}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${getPriorityColor(notification.priority)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{notification.icon}</span>
                  <div>
                    <p className="text-white font-medium">{notification.app}</p>
                    <p className="text-gray-400 text-xs">{notification.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                  <Archive className="w-4 h-4 text-gray-400 hover:text-blue-400 cursor-pointer" />
                </div>
              </div>
              <p className="text-gray-300 text-sm">{notification.summary}</p>
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-6 flex space-x-3">
        <button 
          onClick={() => {
            // In a real app, this would update Firebase
            alert(`Marking ${stats.unreadNotifications || 0} notifications as read...`);
            console.log('Mark all notifications as read');
          }}
          className="flex-1 bg-purple-600/20 text-purple-300 py-2 px-4 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center justify-center"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark All Read
        </button>
        <button 
          onClick={() => {
            const filterOptions = ['All', 'Unread', 'High Priority', 'Today', 'Work', 'Personal'];
            alert(`Smart Filter Options:\n\n${filterOptions.map((option, i) => `${i + 1}. ${option}`).join('\n')}\n\nCurrent: All notifications`);
          }}
          className="flex-1 bg-blue-600/20 text-blue-300 py-2 px-4 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center justify-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Smart Filter
        </button>
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedNotification && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            setShowMessageModal(false);
            setSelectedNotification(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-gray-700 rounded-xl max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedNotification.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedNotification.app}</h3>
                  <p className="text-gray-400 text-sm">{selectedNotification.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setSelectedNotification(null);
                }}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Content */}
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Message:</h4>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedNotification.fullMessage}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4">
                {selectedNotification.category && (
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white text-sm">{selectedNotification.category}</p>
                  </div>
                )}
                {selectedNotification.sentiment && (
                  <div>
                    <p className="text-gray-400 text-sm">Sentiment</p>
                    <p className="text-white text-sm">{selectedNotification.sentiment}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-sm">Priority</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selectedNotification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    selectedNotification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedNotification.priority}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-white text-sm">
                    {selectedNotification.isRead ? 'Read' : 'Unread'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    console.log('Marking notification as read:', selectedNotification.id);
                    alert('Notification marked as read!');
                  }}
                  className="flex-1 bg-green-600/20 text-green-300 py-2 px-4 rounded-lg hover:bg-green-600/30 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Read
                </button>
                <button
                  onClick={() => {
                    console.log('Archiving notification:', selectedNotification.id);
                    alert('Notification archived!');
                    setShowMessageModal(false);
                    setSelectedNotification(null);
                  }}
                  className="flex-1 bg-blue-600/20 text-blue-300 py-2 px-4 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center justify-center"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationSummary;
