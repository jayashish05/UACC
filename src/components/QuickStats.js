'use client';

import { motion } from 'framer-motion';
import { Phone, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

const QuickStats = () => {
  const { stats, loading } = useDashboardData();

  const handleStatClick = (statType) => {
    switch (statType) {
      case 'calls':
        alert('Opening Call History Details...');
        break;
      case 'events':
        alert('Opening Events Calendar...');
        break;
      case 'pending':
        alert('Opening Pending Tasks Manager...');
        break;
      case 'completed':
        alert('Opening Completed Tasks Archive...');
        break;
      default:
        console.log('Stat clicked:', statType);
    }
  };

  const quickStats = [
    {
      icon: Phone,
      label: 'Total Calls',
      value: loading ? '...' : stats.totalCalls.toString(),
      change: '+12%',
      changeType: 'positive',
      color: 'from-blue-500 to-blue-600',
      action: () => handleStatClick('calls')
    },
    {
      icon: Calendar,
      label: 'Events',
      value: loading ? '...' : stats.totalEvents.toString(),
      change: '+8%',
      changeType: 'positive',
      color: 'from-purple-500 to-purple-600',
      action: () => handleStatClick('events')
    },
    {
      icon: Clock,
      label: 'Pending Tasks',
      value: loading ? '...' : stats.pendingTasks.toString(),
      change: '-4%',
      changeType: 'negative',
      color: 'from-orange-500 to-orange-600',
      action: () => handleStatClick('pending')
    },
    {
      icon: CheckCircle,
      label: 'Completed Tasks',
      value: loading ? '...' : stats.completedTasks.toString(),
      change: '+23%',
      changeType: 'positive',
      color: 'from-green-500 to-green-600',
      action: () => handleStatClick('completed')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="card p-6 cursor-pointer hover:border-blue-500/50 transition-all duration-200"
          onClick={stat.action}
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