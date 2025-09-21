'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="text-center relative z-20">
          {/* Launch Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-transparent border border-blue-400/30 backdrop-blur-sm mb-8"
          >
            <span className="text-blue-300 text-sm font-medium">🚀 Launching 2025</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">Grow your users.</span>
            <br />
            <span className="text-gradient">Smarter.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Powerful, self-serve product and growth analytics to help you convert, 
            engage, and retain more users. Trusted by over 4,000 startups.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <motion.button
              className="btn-primary text-lg px-8 py-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
            <motion.button
              className="btn-secondary text-lg px-8 py-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Floating Analytics Cards positioned with 50px padding from edges */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute left-[50px] top-1/2 transform -translate-y-1/2 w-64 hidden md:block glass-container p-6 floating z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-300 text-sm font-medium">Monthly Revenue</h3>
          <DollarSign className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-2">$24,500</div>
        <div className="flex items-center text-green-400 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          +12.5% from last month
        </div>
      </motion.div>

      <div
        className="absolute right-[50px] top-1/2 transform -translate-y-1/2 w-64 hidden md:block glass-container p-6 floating z-10"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-300 text-sm font-medium">Active Users</h3>
          <Users className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-2">8,429</div>
        <div className="flex items-center text-blue-400 text-sm">
          <BarChart3 className="w-4 h-4 mr-1" />
          +8.2% this week
        </div>
      </div>
    </section>
  );
};

export default HeroSection;