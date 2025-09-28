'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const AppPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: '/image1.jpeg',
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics with real-time data visualization'
    },
    {
      src: '/image2.jpeg',
      title: 'Performance Metrics',
      description: 'Track your key performance indicators and growth metrics'
    },
    {
      src: '/image3.jpeg',
      title: 'Traffic Analytics',
      description: 'Monitor traffic sources and user engagement patterns'
    },
    {
      src: '/image4.jpeg',
      title: 'Revenue Tracking',
      description: 'Monitor revenue streams and financial performance'
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Preview Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-12 flex justify-center"
      >
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <span className="relative z-10 flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Preview App Interface</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/95 backdrop-blur-md rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">App Interface Preview</h2>
                  <p className="text-gray-400">Explore our powerful analytics dashboard</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Image */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <Image
                        src={images[currentImage].src}
                        alt={images[currentImage].title}
                        width={800}
                        height={500}
                        className="rounded-2xl shadow-2xl object-contain w-full h-[500px] bg-gray-900"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{images[currentImage].title}</h3>
                        <p className="text-gray-200">{images[currentImage].description}</p>
                      </div>
                    </motion.div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4">All Interfaces</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`relative group rounded-xl overflow-hidden transition-all ${
                          currentImage === index 
                            ? 'ring-2 ring-blue-500 scale-105' 
                            : 'hover:scale-105'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          width={200}
                          height={120}
                          className="object-cover w-full h-24"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-sm font-medium">{image.title}</p>
                        </div>
                        {currentImage === index && (
                          <div className="absolute inset-0 bg-blue-500/20"></div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImage === index 
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppPreview;