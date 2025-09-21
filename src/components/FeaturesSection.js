'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Bell, 
  Users, 
  TrendingUp, 
  Gauge, 
  BarChart3, 
  Rocket, 
  User, 
  Clock 
} from 'lucide-react';

const FeatureCard = ({ feature, index }) => {
  return (
    <div className="card group hover:glow-blue perspective-1000">
      <div className="relative w-full h-64 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front of card - Feature name only */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
          <div className="text-center">
            <div className="p-4 rounded-lg border border-blue-400/30 mb-4 inline-block" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)'}}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
            <p className="text-blue-400 mt-2">{feature.subtitle}</p>
          </div>
        </div>
        
        {/* Back of card - Feature details */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center p-6">
          <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
          <p className="text-gray-300 mb-4 leading-relaxed text-sm">{feature.description}</p>
          
          {/* Feature specific content */}
          {feature.content && (
            <div className="mb-4">
              {feature.content}
            </div>
          )}
          
          <div className="text-blue-400 text-sm font-medium">
            Learn more →
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Notifications",
      subtitle: "Real-time alerts",
      icon: <Bell className="w-6 h-6 text-blue-400" />,
      description: "Get intelligent notifications about user behavior, system performance, and growth opportunities in real-time.",
      content: (
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-gray-300">3 new alerts today</span>
        </div>
      )
    },
    {
      title: "Easy Collaborations",
      subtitle: "Team profiles with avatars",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      description: "Seamlessly collaborate with your team members through integrated profiles and real-time communication tools.",
      content: (
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className={`w-8 h-8 rounded-full border-2 border-slate-800 ${
                i === 0 ? 'bg-blue-500' : 
                i === 1 ? 'bg-purple-500' : 
                i === 2 ? 'bg-green-500' : 'bg-orange-500'
              }`}
            />
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-xs text-gray-300">
            +5
          </div>
        </div>
      )
    },
    {
      title: "Fuel Your Growth",
      subtitle: "Data-driven insights",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      description: "Leverage powerful analytics and insights to drive user acquisition, retention, and revenue growth.",
      content: (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Growth Rate</span>
            <span className="text-green-400 font-semibold">+24.5%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      )
    },
    {
      title: "Performance Metrics",
      subtitle: "Gauge-style monitoring",
      icon: <Gauge className="w-6 h-6 text-yellow-400" />,
      description: "Monitor your application's performance with beautiful gauge-style metrics and comprehensive dashboards.",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">CPU Usage</span>
            <span className="text-yellow-400">68%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Memory</span>
            <span className="text-blue-400">4.2GB</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Response Time</span>
            <span className="text-green-400">124ms</span>
          </div>
        </div>
      )
    },
    {
      title: "Analytics Dashboard",
      subtitle: "Bar chart visualization",
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      description: "Visualize your data with interactive charts, graphs, and comprehensive analytics dashboards.",
      content: (
        <div className="space-y-2">
          <div className="flex items-end space-x-1 h-16">
            {[40, 60, 80, 45, 70, 55, 85].map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t flex-1"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-400 text-center">Weekly Analytics</div>
        </div>
      )
    },
    {
      title: "Advanced Automation",
      subtitle: "AI-powered workflows",
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      description: "Automate complex workflows and processes using AI-powered tools to increase efficiency and reduce manual work.",
      content: (
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 text-pink-400 mr-2" />
            <span className="text-gray-300">5 workflows active</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 text-pink-400 mr-2" />
            <span className="text-gray-300">234 tasks completed</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Key Features <span className="text-gradient">Overview</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the comprehensive features that set Arise apart in web design excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;