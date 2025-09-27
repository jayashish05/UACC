'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, ExternalLink, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const DeadlineTracker = () => {
  const [selectedDeadline, setSelectedDeadline] = useState(null);

  const deadlines = [
    {
      id: 1,
      title: 'Project Demo Presentation',
      description: 'Final presentation for the hackathon project',
      dueDate: '2024-01-20',
      dueTime: '2:00 PM',
      priority: 'high',
      source: 'Call with Team Lead',
      status: 'pending',
      progress: 75,
      addedToCalendar: true,
      relatedCall: 'John Smith - Jan 15, 10:30 AM'
    },
    {
      id: 2,
      title: 'Submit Final Report',
      description: 'Complete project documentation and submit to committee',
      dueDate: '2024-01-22',
      dueTime: '11:59 PM',
      priority: 'high',
      source: 'Email notification',
      status: 'pending',
      progress: 45,
      addedToCalendar: false,
      relatedCall: null
    },
    {
      id: 3,
      title: 'Code Review Session',
      description: 'Review codebase with senior developer',
      dueDate: '2024-01-18',
      dueTime: '10:00 AM',
      priority: 'medium',
      source: 'Calendar invite',
      status: 'in-progress',
      progress: 90,
      addedToCalendar: true,
      relatedCall: 'Sarah Johnson - Jan 15, 09:15 AM'
    },
    {
      id: 4,
      title: 'Team Meeting Preparation',
      description: 'Prepare slides and agenda for weekly team sync',
      dueDate: '2024-01-19',
      dueTime: '9:00 AM',
      priority: 'low',
      source: 'Call with Manager',
      status: 'completed',
      progress: 100,
      addedToCalendar: true,
      relatedCall: null
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-500/50 bg-green-500/10';
      case 'in-progress': return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
      case 'pending': return 'text-gray-300 border-gray-600/50 bg-gray-800/30';
      default: return 'text-gray-300 border-gray-600/50 bg-gray-800/30';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const addToCalendar = async (deadline) => {
    // This would integrate with calendar API
    console.log('Adding to calendar:', deadline);
    // For demo purposes, we'll just update the UI
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
          <button className="bg-green-600/20 text-green-300 px-4 py-2 rounded-lg hover:bg-green-600/30 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Deadline
          </button>
          <button className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center">
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
          <p className="text-2xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Due Soon</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">2</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1</p>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <motion.div
            key={deadline.id}
            whileHover={{ scale: 1.01 }}
            className={`p-5 rounded-lg border cursor-pointer transition-all duration-200 ${getStatusColor(deadline.status)}`}
            onClick={() => setSelectedDeadline(selectedDeadline?.id === deadline.id ? null : deadline)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                  {deadline.priority.toUpperCase()}
                </div>
                <h3 className="text-white font-semibold">{deadline.title}</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${
                  getDaysUntilDue(deadline.dueDate) <= 1 ? 'text-red-400' :
                  getDaysUntilDue(deadline.dueDate) <= 3 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {getDaysUntilDue(deadline.dueDate) === 0 ? 'Due Today' :
                   getDaysUntilDue(deadline.dueDate) === 1 ? 'Due Tomorrow' :
                   getDaysUntilDue(deadline.dueDate) > 0 ? `${getDaysUntilDue(deadline.dueDate)} days left` :
                   `${Math.abs(getDaysUntilDue(deadline.dueDate))} days overdue`}
                </span>
                <span className="text-gray-400 text-sm">{deadline.dueDate} at {deadline.dueTime}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{deadline.description}</p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs text-gray-300">{deadline.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    deadline.status === 'completed' ? 'bg-green-500' :
                    deadline.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${deadline.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400">Source: {deadline.source}</span>
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
                      <button className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs hover:bg-blue-600/30">
                        Edit
                      </button>
                      <button className="bg-green-600/20 text-green-300 px-3 py-1 rounded text-xs hover:bg-green-600/30">
                        Mark Complete
                      </button>
                      <button className="bg-red-600/20 text-red-300 px-3 py-1 rounded text-xs hover:bg-red-600/30">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DeadlineTracker;