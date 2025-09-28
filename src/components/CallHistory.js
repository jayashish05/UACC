'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, FileText, Play, Download } from 'lucide-react';
import { useState } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';

const CallHistory = () => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [showAllCalls, setShowAllCalls] = useState(false);
  const { stats, callTranscripts, loading } = useDashboardData();

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleViewAll = () => {
    setShowAllCalls(!showAllCalls);
  };

  const handlePlayRecording = (call) => {
    console.log('Playing recording for call:', call);
    // TODO: Implement audio playback functionality
  };

  const handleViewTranscript = (call) => {
    console.log('Viewing transcript for call:', call);
    // TODO: Open transcript viewer modal
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    try {
      let date;
      if (timestamp.seconds) {
        // Firebase timestamp
        date = new Date(timestamp.seconds * 1000);
      } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        date = new Date(timestamp);
      } else {
        return 'Invalid date';
      }
      
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getCallType = (callType) => {
    switch (callType?.toLowerCase()) {
      case 'outgoing': return 'outgoing';
      case 'incoming': return 'incoming';
      default: return 'unknown';
    }
  };

  const getPriority = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Phone className="w-5 h-5 mr-2 text-blue-400" />
          Call History
        </h2>
        <button 
          onClick={handleViewAll}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          {showAllCalls ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading call history...</p>
          </div>
        ) : (showAllCalls ? callTranscripts : stats.recentCalls).length === 0 ? (
          <div className="text-center py-8">
            <Phone className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No call history available</p>
          </div>
        ) : (
          (showAllCalls ? callTranscripts : stats.recentCalls).map((call) => (
          <motion.div
            key={call.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedCall?.id === call.id 
                ? 'border-blue-500/50 bg-blue-500/10' 
                : 'border-gray-700/50 bg-gray-800/30 hover:border-blue-500/30'
            }`}
            onClick={() => setSelectedCall(selectedCall?.id === call.id ? null : call)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  getCallType(call.call_type) === 'incoming' ? 'bg-green-500/20 text-green-400' :
                  getCallType(call.call_type) === 'outgoing' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-medium">{call.contact_name || 'Unknown Contact'}</p>
                  <p className="text-gray-400 text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDuration(call.duration_seconds)} • {formatTimestamp(call.exported_at)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  getPriority(call.priority) === 'high' ? 'bg-red-500/20 text-red-400' :
                  getPriority(call.priority) === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {getPriority(call.priority)}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">
              {call.key_points?.slice(0, 3).join(' • ') || 'No summary available'}
            </p>

            {selectedCall?.id === call.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                {/* Transcript */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Transcript
                    </h4>
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayRecording(call);
                        }}
                        className="p-1 text-gray-400 hover:text-white"
                        title="Play recording"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewTranscript(call);
                        }}
                        className="p-1 text-gray-400 hover:text-white"
                        title="Download transcript"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{call.transcript || 'No transcript available'}</p>
                </div>

                {/* Action Items */}
                <div>
                  <h4 className="text-white font-medium mb-2">Action Items</h4>
                  {(call.actionItems || call.action_items || []).length > 0 ? (
                    <ul className="space-y-2">
                      {(call.actionItems || call.action_items || []).map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">No action items identified</p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )))}
      </div>
    </motion.div>
  );
};

export default CallHistory;