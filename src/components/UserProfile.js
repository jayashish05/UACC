'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserData } from '@/lib/firebase';
import { User, Mail, Phone, Calendar, Camera, Save, Edit } from 'lucide-react';
import Image from 'next/image';

export default function UserProfile() {
  const { user, userData, setUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    dateOfBirth: userData?.dateOfBirth || ''
  });

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserData(user.uid, {
        ...editForm,
        profileCompleted: true
      });
      
      // Update local userData state
      setUserData({
        ...userData,
        ...editForm,
        profileCompleted: true
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not provided';
    return new Date(timestamp).toLocaleDateString();
  };

  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20"
      >
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {userData.photoURL ? (
                <Image 
                  src={userData.photoURL} 
                  alt={`${userData.firstName} ${userData.lastName}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-3xl font-bold text-white">
                  {userData.firstName?.charAt(0)}{userData.lastName?.charAt(0)}
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-gray-400">{userData.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">
                Joined {formatDate(userData.createdAt)}
              </span>
              {userData.isGoogleUser && (
                <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">
                  Google Account
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-white/5 px-3 py-2 rounded-lg">{userData.firstName || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-white/5 px-3 py-2 rounded-lg">{userData.lastName || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <p className="text-white bg-white/5 px-3 py-2 rounded-lg">{userData.email}</p>
                <span className="text-xs text-gray-500">Email cannot be changed</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editForm.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-white/5 px-3 py-2 rounded-lg">{userData.phoneNumber || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editForm.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-white/5 px-3 py-2 rounded-lg">
                    {userData.dateOfBirth ? formatDate(userData.dateOfBirth) : 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Login</label>
                <p className="text-white bg-white/5 px-3 py-2 rounded-lg">{formatDate(userData.lastLoginAt)}</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Auto Summarize</span>
                <span className={`px-2 py-1 rounded text-xs ${userData.settings?.autoSummarize ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {userData.settings?.autoSummarize ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Profile Completed</span>
                <span className={`px-2 py-1 rounded text-xs ${userData.profileCompleted ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                  {userData.profileCompleted ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <motion.button
              onClick={handleSave}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}