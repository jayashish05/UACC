'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCallTranscripts, getEvents, getTasks, getUserMetadata, getNotifications } from '@/lib/firebase';

export const useDashboardData = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    callTranscripts: [],
    events: [],
    tasks: [],
    userMetadata: [],
    notifications: [],
    loading: true,
    error: null
  });

  const fetchDashboardData = useCallback(async () => {
    if (!user?.uid) return;

    try {
      setDashboardData(prev => ({ ...prev, loading: true, error: null }));

      const [callTranscripts, events, tasks, userMetadata, notifications] = await Promise.all([
        getCallTranscripts(user.uid),
        getEvents(user.uid),
        getTasks(user.uid),
        getUserMetadata(user.uid),
        getNotifications(user.uid)
      ]);

      setDashboardData({
        callTranscripts,
        events,
        tasks,
        userMetadata,
        notifications,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Helper function to check if a task is overdue
  const isOverdue = (task) => {
    if (!task.due_date) return false;
    return new Date(task.due_date) < new Date();
  };

  // Helper function to check if a task is due soon (within 3 days)
  const isDueSoon = (task) => {
    if (!task.due_date) return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  // Computed statistics
  const stats = {
    totalCalls: dashboardData.callTranscripts.length,
    totalEvents: dashboardData.events.length,
    totalNotifications: dashboardData.notifications.length,
    unreadNotifications: dashboardData.notifications.filter(notif => !notif.is_read).length,
    highPriorityNotifications: dashboardData.notifications.filter(notif => notif.priority === 'high').length,
    completedTasks: dashboardData.tasks.filter(task => task.is_completed).length,
    pendingTasks: dashboardData.tasks.filter(task => !task.is_completed).length,
    overdueTasks: dashboardData.tasks.filter(task => !task.is_completed && isOverdue(task)).length,
    dueSoonTasks: dashboardData.tasks.filter(task => !task.is_completed && isDueSoon(task)).length,
    inProgressTasks: dashboardData.tasks.filter(task => !task.is_completed && task.status === 'in-progress').length,
    recentCalls: dashboardData.callTranscripts
      .sort((a, b) => new Date(b.exported_at) - new Date(a.exported_at))
      .slice(0, 5),
    upcomingEvents: dashboardData.events
      .filter(event => new Date(event.start_time) > new Date())
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .slice(0, 5),
    urgentTasks: dashboardData.tasks
      .filter(task => !task.is_completed && task.priority === 'high')
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
      .slice(0, 5),
    recentNotifications: dashboardData.notifications
      .sort((a, b) => new Date(b.timestamp?.seconds * 1000) - new Date(a.timestamp?.seconds * 1000))
      .slice(0, 10)
  };

  return {
    ...dashboardData,
    stats,
    refetch: fetchDashboardData
  };
};