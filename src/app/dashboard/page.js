'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logOut } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import CallHistory from '@/components/CallHistory';
import NotificationSummary from '@/components/NotificationSummary';
import DeadlineTracker from '@/components/DeadlineTracker';
import QuickStats from '@/components/QuickStats';
import AnalyticsPage from '@/components/AnalyticsPage';
import SettingsPage from '@/components/SettingsPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const videoRef = useRef(null);
  const { user, userData } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <>
            {/* Header with User Info */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  {userData?.photoURL ? (
                    <img 
                      src={userData.photoURL} 
                      alt={`${userData.firstName} ${userData.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-white">
                      {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    Welcome back, {userData?.firstName || 'User'}!
                  </h1>
                  <p className="text-gray-400">Here's your communication overview.</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>📧 {userData?.email}</span>
                    {userData?.phoneNumber && <span>📱 {userData.phoneNumber}</span>}
                    <span>👤 {userData?.firstName} {userData?.lastName}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
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
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
}