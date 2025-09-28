'use client';

import { motion } from 'framer-motion';
import AppPreview from './AppPreview';

const HeroSection = () => {
  return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="text-center relative z-20">

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">Unified AI <br />Communication</span>
            <br />
            <span className="text-gradient">Companion</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Revolutionizing Mobile Communication with AI. An intelligent system that transcribes calls, 
            summarizes notifications, and evolves into your proactive digital secretary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <motion.a
              href="/signup"
              className="btn-primary text-lg px-8 py-4 cursor-pointer inline-block text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try App for Free
            </motion.a>
            <motion.a
              href="/signin"
              className="btn-secondary text-lg px-8 py-4 cursor-pointer inline-block text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.a>
          </motion.div>

          {/* Interactive App Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <AppPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;