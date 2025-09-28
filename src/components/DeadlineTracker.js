'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, ExternalLink, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';

const DeadlineTracker = () => {
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const { stats, tasks, loading } = useDashboardData();

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No due date';
    return new Date(timestamp).toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString();
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-400 border-green-500/50 bg-green-500/10';
      case 'in-progress': return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
      case 'pending': return 'text-gray-300 border-gray-600/50 bg-gray-800/30';
      default: return 'text-gray-300 border-gray-600/50 bg-gray-800/30';
    }
  };

  const addToCalendar = async (deadline) => {
    // This would integrate with calendar API
    console.log('Adding to calendar:', deadline);
    // For demo purposes, we'll just update the UI
  };

  const handleAddDeadline = () => {
    console.log('Opening add deadline modal...');
    // TODO: Open modal to add new deadline
  };

  const handleSyncCalendar = () => {
    console.log('Syncing with calendar...');
    // TODO: Sync with Google Calendar or other calendar APIs
  };

  const handleEditDeadline = (deadline) => {
    console.log('Editing deadline:', deadline);
    // TODO: Open edit modal
  };

  const handleMarkComplete = (deadline) => {
    console.log('Marking deadline as complete:', deadline);
    // TODO: Update Firebase with completion status
  };

  const handleDeleteDeadline = (deadline) => {
    console.log('Deleting deadline:', deadline);
    // TODO: Delete from Firebase
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-green-400" />
          Deadline Tracker
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleAddDeadline}
            className="bg-green-600/20 text-green-300 px-4 py-2 rounded-lg hover:bg-green-600/30 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Deadline
          </button>
          <button 
            onClick={handleSyncCalendar}
            className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Sync Calendar
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Overdue</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.overdueTasks || 0}</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Due Soon</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.dueSoonTasks || 0}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.inProgressTasks || 0}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.completedTasks || 0}</p>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No tasks found</p>
          </div>
        ) : (
          tasks.map((deadline) => (
          <motion.div
            key={deadline.id}
            whileHover={{ scale: 1.01 }}
            className={`p-5 rounded-lg border cursor-pointer transition-all duration-200 ${getStatusColor(deadline.status)}`}
            onClick={() => setSelectedDeadline(selectedDeadline?.id === deadline.id ? null : deadline)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                  {(deadline.priority || 'medium').toUpperCase()}
                </div>
                <h3 className="text-white font-semibold">{deadline.title || deadline.taskName || 'Untitled Task'}</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${
                  deadline.dueDate && getDaysUntilDue(deadline.dueDate) !== null ?
                    (getDaysUntilDue(deadline.dueDate) <= 1 ? 'text-red-400' :
                     getDaysUntilDue(deadline.dueDate) <= 3 ? 'text-yellow-400' : 'text-green-400') :
                    'text-gray-400'
                }`}>
                  {deadline.dueDate && getDaysUntilDue(deadline.dueDate) !== null ? (
                    getDaysUntilDue(deadline.dueDate) === 0 ? 'Due Today' :
                    getDaysUntilDue(deadline.dueDate) === 1 ? 'Due Tomorrow' :
                    getDaysUntilDue(deadline.dueDate) > 0 ? `${getDaysUntilDue(deadline.dueDate)} days left` :
                    `${Math.abs(getDaysUntilDue(deadline.dueDate))} days overdue`
                  ) : (
                    deadline.status || 'No due date'
                  )}
                </span>
                <span className="text-gray-400 text-sm">
                  {deadline.dueDate ? 
                    `${deadline.dueDate} ${deadline.dueTime || ''}` : 
                    (deadline.createdAt?.seconds ? 
                     new Date(deadline.createdAt.seconds * 1000).toLocaleDateString() : 
                     'No date set')
                  }
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{deadline.description || deadline.details || 'No description available'}</p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs text-gray-300">{deadline.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    deadline.status === 'completed' ? 'bg-green-500' :
                    deadline.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${deadline.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400">Source: {deadline.source || 'System'}</span>
                {deadline.relatedCall && (
                  <span className="text-xs text-blue-400">📞 {deadline.relatedCall}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {deadline.addedToCalendar ? (
                  <span className="text-xs text-green-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    In Calendar
                  </span>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCalendar(deadline);
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Calendar
                  </button>
                )}
              </div>
            </div>

            {selectedDeadline?.id === deadline.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-600/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Additional Details</h4>
                    <p className="text-gray-300 text-sm">This deadline was automatically extracted from your communications and added to your tracker.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Quick Actions</h4>
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditDeadline(deadline);
                        }}
                        className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs hover:bg-blue-600/30"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkComplete(deadline);
                        }}
                        className="bg-green-600/20 text-green-300 px-3 py-1 rounded text-xs hover:bg-green-600/30"
                      >
                        Mark Complete
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDeadline(deadline);
                        }}
                        className="bg-red-600/20 text-red-300 px-3 py-1 rounded text-xs hover:bg-red-600/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )))}
      </div>
    </motion.div>
  );
};

export default DeadlineTracker;