'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const videoRef = useRef(null);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Sign In Data:', formData);
      
      // For demo purposes, accept any email/password
      localStorage.setItem('user', JSON.stringify({
        name: formData.email.split('@')[0],
        email: formData.email,
        isAuthenticated: true
      }));
      
      alert('Sign in successful!');
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
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
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Back Button */}
      <motion.a
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.a>

      {/* Sign In Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 glass-container-auth max-w-md w-full p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-3xl font-bold text-gradient">UACC</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your AI companion</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                required
                className="input-field-floating pl-10"
                placeholder=""
              />
              <label className={`floating-label ${formData.email || focusedField === 'email' ? 'active' : ''}`}>
                Email Address
              </label>
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                required
                className="input-field-floating pl-10 pr-12"
                placeholder=""
              />
              <label className={`floating-label ${formData.password || focusedField === 'password' ? 'active' : ''}`}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-right"
          >
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Forgot password?
            </a>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-6"
        >
          <p className="text-gray-300">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign Up
            </a>
          </p>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg"
        >
          <p className="text-blue-300 text-sm text-center mb-2 font-medium">
            🎯 Demo Credentials
          </p>
          <p className="text-gray-300 text-xs text-center">
            Use any email and password for demo access
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}