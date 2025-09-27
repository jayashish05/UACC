'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import CallHistory from '@/components/CallHistory';
import NotificationSummary from '@/components/NotificationSummary';
import DeadlineTracker from '@/components/DeadlineTracker';
import QuickStats from '@/components/QuickStats';
import AnalyticsPage from '@/components/AnalyticsPage';
import SettingsPage from '@/components/SettingsPage';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const videoRef = useRef(null);

  useEffect(() => {
    // Check authentication status
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to sign up if not authenticated
      window.location.href = '/signup';
      return;
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    let isReversing = false;
    let animationFrameId = null;

    const reverseVideo = () => {
      if (!video || !isReversing) return;

      if (video.currentTime <= 0.05) {
        isReversing = false;
        video.currentTime = 0;
        video.play();
        return;
      }

      video.currentTime = Math.max(0, video.currentTime - 0.033);
      animationFrameId = requestAnimationFrame(reverseVideo);
    };

    const handleTimeUpdate = () => {
      if (!video || isReversing) return;

      if (video.currentTime >= video.duration - 0.1) {
        isReversing = true;
        video.pause();
        reverseVideo();
      }
    };

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to sign up
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back! Here's your communication overview.</p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
              <QuickStats />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CallHistory />
              <NotificationSummary />
            </div>

            <div className="mt-6">
              <DeadlineTracker />
            </div>
          </>
        );
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30"></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 p-6 ml-64 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </main>
  );
}