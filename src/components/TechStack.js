'use client';

import { motion } from 'framer-motion';

const TechStack = () => {
  const techItems = [
    { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
    { name: 'Discord', icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png' },
    { name: 'Slack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
    { name: 'Trello', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedTechItems = [...techItems, ...techItems];

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Left blur gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none"></div>
      
      {/* Right blur gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling container */}
      <div className="relative">
        <motion.div
          className="flex items-center space-x-12"
          animate={{
            x: [0, -50 * techItems.length * 2] // Move by the width of all items
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Adjust speed here
              ease: "linear",
            },
          }}
          style={{
            width: `${duplicatedTechItems.length * 200}px` // Ensure enough width
          }}
        >
          {duplicatedTechItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center space-x-3 px-6 min-w-fit"
            >
              <img 
                src={tech.icon} 
                alt={tech.name}
                className="w-6 h-6 object-contain"
              />
              <span className="text-gray-300 text-base font-medium whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;