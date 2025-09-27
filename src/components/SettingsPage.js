'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Bot,
  Volume2,
  Moon,
  Wifi,
  Database,
  Key,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'Code Smiths',
    email: 'team@codesmiths.dev',
    
    // AI Settings
    aiEnabled: true,
    autoTranscription: true,
    smartSummarization: true,
    contextLearning: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    soundAlerts: false,
    priorityFilter: true,
    
    // Privacy Settings
    dataEncryption: true,
    onDeviceProcessing: true,
    shareAnalytics: false,
    
    // App Settings
    darkMode: true,
    autoSync: true,
    backgroundSync: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        enabled ? 'bg-blue-600' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your UACC experience</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-container p-6"
        >
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Profile Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Update Profile
            </button>
          </div>
        </motion.div>

        {/* AI Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-container p-6"
        >
          <div className="flex items-center mb-6">
            <Bot className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">AI Features</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">AI Assistant</div>
                <div className="text-gray-400 text-sm">Enable AI-powered assistance</div>
              </div>
              <ToggleSwitch 
                enabled={settings.aiEnabled} 
                onToggle={() => handleToggle('aiEnabled')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Auto Transcription</div>
                <div className="text-gray-400 text-sm">Automatically transcribe calls</div>
              </div>
              <ToggleSwitch 
                enabled={settings.autoTranscription} 
                onToggle={() => handleToggle('autoTranscription')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Smart Summarization</div>
                <div className="text-gray-400 text-sm">Generate intelligent summaries</div>
              </div>
              <ToggleSwitch 
                enabled={settings.smartSummarization} 
                onToggle={() => handleToggle('smartSummarization')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Context Learning</div>
                <div className="text-gray-400 text-sm">Learn from your preferences</div>
              </div>
              <ToggleSwitch 
                enabled={settings.contextLearning} 
                onToggle={() => handleToggle('contextLearning')} 
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-container p-6"
        >
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Email Notifications</div>
                <div className="text-gray-400 text-sm">Receive email alerts</div>
              </div>
              <ToggleSwitch 
                enabled={settings.emailNotifications} 
                onToggle={() => handleToggle('emailNotifications')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Push Notifications</div>
                <div className="text-gray-400 text-sm">Show push notifications</div>
              </div>
              <ToggleSwitch 
                enabled={settings.pushNotifications} 
                onToggle={() => handleToggle('pushNotifications')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Sound Alerts</div>
                <div className="text-gray-400 text-sm">Play notification sounds</div>
              </div>
              <ToggleSwitch 
                enabled={settings.soundAlerts} 
                onToggle={() => handleToggle('soundAlerts')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Priority Filter</div>
                <div className="text-gray-400 text-sm">Only show important notifications</div>
              </div>
              <ToggleSwitch 
                enabled={settings.priorityFilter} 
                onToggle={() => handleToggle('priorityFilter')} 
              />
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-container p-6"
        >
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-cyan-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Privacy & Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Data Encryption</div>
                <div className="text-gray-400 text-sm">Encrypt all data end-to-end</div>
              </div>
              <ToggleSwitch 
                enabled={settings.dataEncryption} 
                onToggle={() => handleToggle('dataEncryption')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">On-Device Processing</div>
                <div className="text-gray-400 text-sm">Process data locally</div>
              </div>
              <ToggleSwitch 
                enabled={settings.onDeviceProcessing} 
                onToggle={() => handleToggle('onDeviceProcessing')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Share Analytics</div>
                <div className="text-gray-400 text-sm">Help improve UACC</div>
              </div>
              <ToggleSwitch 
                enabled={settings.shareAnalytics} 
                onToggle={() => handleToggle('shareAnalytics')} 
              />
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* App Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-container p-6"
      >
        <div className="flex items-center mb-6">
          <Smartphone className="w-6 h-6 text-yellow-400 mr-3" />
          <h3 className="text-xl font-semibold text-white">App Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Dark Mode</div>
              <div className="text-gray-400 text-sm">Use dark theme</div>
            </div>
            <ToggleSwitch 
              enabled={settings.darkMode} 
              onToggle={() => handleToggle('darkMode')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Auto Sync</div>
              <div className="text-gray-400 text-sm">Sync across devices</div>
            </div>
            <ToggleSwitch 
              enabled={settings.autoSync} 
              onToggle={() => handleToggle('autoSync')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Background Sync</div>
              <div className="text-gray-400 text-sm">Sync when app is closed</div>
            </div>
            <ToggleSwitch 
              enabled={settings.backgroundSync} 
              onToggle={() => handleToggle('backgroundSync')} 
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-700">
          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Data
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
            Reset to Defaults
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;