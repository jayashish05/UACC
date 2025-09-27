'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Phone, 
  Bell, 
  Brain, 
  Calendar, 
  Shield, 
  Smartphone, 
  MessageSquare, 
  Bot
} from 'lucide-react';

const FeatureCard = ({ feature, index }) => {
  return (
    <div className="card group hover:glow-blue perspective-1000">
      <div className="relative w-full h-64 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
          <div className="text-center">
            <div className="p-4 rounded-lg border border-blue-400/30 mb-4 inline-block" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)'}}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
            <p className="text-blue-400 mt-2">{feature.subtitle}</p>
          </div>
        </div>
        
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center p-6">
          <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
          <p className="text-gray-300 mb-4 leading-relaxed text-sm">{feature.description}</p>
          
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
      title: "AI Call Companion",
      subtitle: "Smart transcription & analysis",
      icon: <Phone className="w-6 h-6 text-blue-400" />,
      description: "Real-time transcription and summarization of your calls with contextual Q&A and automatic action item detection."
    },
    {
      title: "Notification Companion", 
      subtitle: "Intelligent prioritization",
      icon: <Bell className="w-6 h-6 text-purple-400" />,
      description: "Aggregates and prioritizes all incoming alerts, reducing clutter by filtering irrelevant messages."
    },
    {
      title: "Context Awareness",
      subtitle: "Learning your preferences", 
      icon: <Brain className="w-6 h-6 text-green-400" />,
      description: "Learns user preferences like DND modes and travel patterns, evolving into a proactive digital secretary."
    },
    {
      title: "Calendar Integration",
      subtitle: "Auto-scheduling magic",
      icon: <Calendar className="w-6 h-6 text-yellow-400" />,
      description: "Auto-extracts deadlines and meetings from communications and syncs with Google/Samsung Calendar."
    },
    {
      title: "Privacy First",
      subtitle: "On-device processing",
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      description: "On-device AI inference with TensorFlow Lite and end-to-end encryption ensures your data stays private."
    },
    {
      title: "Unified Dashboard",
      subtitle: "Single communication hub",
      icon: <Smartphone className="w-6 h-6 text-red-400" />,
      description: "Single interface for call summaries, notification digests, and communication management."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Core Capabilities <span className="text-gradient">Overview</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Key features for enhanced productivity - revolutionizing mobile communication with AI.
          </p>
        </div>

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
