'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, FileText, Play, Download } from 'lucide-react';
import { useState } from 'react';

const CallHistory = () => {
  const [selectedCall, setSelectedCall] = useState(null);

  const callHistory = [
    {
      id: 1,
      contact: 'John Smith',
      type: 'incoming',
      duration: '12:34',
      timestamp: '2024-01-15 10:30 AM',
      summary: 'Discussed project timeline and deliverables. Meeting scheduled for next week.',
      transcript: 'Hi John, thanks for calling. I wanted to discuss the project timeline with you. We need to finalize the deliverables by next Friday...',
      actionItems: ['Schedule follow-up meeting', 'Send project proposal', 'Review budget allocation'],
      priority: 'high'
    },
    {
      id: 2,
      contact: 'Sarah Johnson',
      type: 'outgoing',
      duration: '8:45',
      timestamp: '2024-01-15 09:15 AM',
      summary: 'Client check-in call. Discussed progress and next steps.',
      transcript: 'Hello Sarah, I wanted to give you an update on the current progress. We are on track with the timeline...',
      actionItems: ['Send weekly report', 'Update project status'],
      priority: 'medium'
    },
    {
      id: 3,
      contact: 'Mike Wilson',
      type: 'missed',
      duration: '0:00',
      timestamp: '2024-01-14 04:20 PM',
      summary: 'Missed call - likely regarding urgent deadline.',
      transcript: 'N/A - Call was missed',
      actionItems: ['Call back urgently', 'Check email for context'],
      priority: 'high'
    }
  ];

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
        <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {callHistory.map((call) => (
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
                  call.type === 'incoming' ? 'bg-green-500/20 text-green-400' :
                  call.type === 'outgoing' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-medium">{call.contact}</p>
                  <p className="text-gray-400 text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {call.duration} • {call.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  call.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {call.priority}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{call.summary}</p>

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
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{call.transcript}</p>
                </div>

                {/* Action Items */}
                <div>
                  <h4 className="text-white font-medium mb-2">Action Items</h4>
                  <ul className="space-y-2">
                    {call.actionItems.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CallHistory;