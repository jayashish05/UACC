'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

const TeamSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const teamMembers = [
    {
      name: "Chethan",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      name: "Jayashish",
      role: "Frontend Architect", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      skills: ["React", "TypeScript", "Tailwind"],
    },
    {
      name: "Sriram",
      role: "Backend Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      skills: ["Python", "PostgreSQL", "Docker"],
    },
    {
      name: "Krishna",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      skills: ["Kubernetes", "Jenkins", "Azure"],
    },
    {
      name: "Karthik",
      role: "AI/ML Engineer",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      skills: ["Python", "TensorFlow", "PyTorch"],
    }
  ];

  // Duplicate the array for seamless infinite scroll like TechStack
  const duplicatedTeamMembers = [...teamMembers, ...teamMembers];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet the Team – <span className="text-gradient">Code Smiths</span>
          </h2>
          <p className="text-lg text-gray-300">VIT Vellore, Theme 4: AI for Core Applications</p>
        </div>
      </div>

      {/* Left blur gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none"></div>
      
      {/* Right blur gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling container - exactly like TechStack */}
      <div className="relative">
        <div
          className="flex items-center space-x-8"
          style={{
            width: `${duplicatedTeamMembers.length * 400}px`, // Ensure enough width
            animation: `scroll-left 25s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedTeamMembers.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="card p-8 h-80 flex flex-col items-center justify-center text-center min-w-fit cursor-pointer"
              style={{ minWidth: '350px' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex flex-col items-center mb-6">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-blue-400/30"
                />
                <div>
                  <h4 className="text-white font-semibold text-base">{member.name}</h4>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              </div>

              <div className="flex-grow flex items-center mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 border rounded-full text-xs"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                        borderColor: 'rgba(59, 130, 246, 0.3)',
                        color: '#38BDF8'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <a href="#" className="p-2 rounded-lg bg-transparent border border-slate-700 hover:border-blue-400 transition-colors cursor-pointer">
                  <Github className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-transparent border border-slate-700 hover:border-blue-400 transition-colors cursor-pointer">
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-transparent border border-slate-700 hover:border-blue-400 transition-colors cursor-pointer">
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
