'use client';

import { motion } from 'framer-motion';
import { Phone, Bell, Clock, CheckCircle } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    {
      icon: Phone,
      label: 'Total Calls',
      value: '47',
      change: '+12%',
      changeType: 'positive',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Bell,
      label: 'Notifications',
      value: '234',
      change: '+8%',
      changeType: 'positive',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      label: 'Pending Tasks',
      value: '12',
      change: '-4%',
      changeType: 'negative',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: '89',
      change: '+23%',
      changeType: 'positive',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;