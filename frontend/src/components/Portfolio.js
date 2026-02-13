import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getApiUrl } from '../utils/apiConfig';

const FlowCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer relative mb-3 md:mb-4 lg:mb-5"
    >
      <a
        href={project.url || '#'}
        target={project.url ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="block h-full"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 to-black aspect-[3/2] shadow-2xl">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Border Ring */}
          <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-300" />
        </div>

        {/* Title Below Card */}
        <div className="mt-3 md:mt-4 text-center">
          <motion.h3
            className="text-white/60 text-xs md:text-sm font-medium tracking-widest uppercase group-hover:text-white transition-colors duration-300"
          >
            {project.title}
          </motion.h3>
        </div>
      </a>
    </motion.div>
  );
};

const ScrollingColumn = ({ projects, direction = 'up', speed = 40 }) => {
  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div className="overflow-hidden h-full">
      <motion.div
        animate={{
          y: direction === 'down' ? ['0%', '-66.66%'] : ['-66.66%', '0%']
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <FlowCard key={`${project._id}-${index}`} project={project} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/portfolio`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("Portfolio Fetch Success:", data);

        const processedData = data.map((item, idx) => {
          console.log(`Processing Portfolio Item ${idx}:`, item);
          return {
            ...item,
            imageUrl: `${apiUrl}${item.images[0]}`,
            description: item.description || ""
          };
        });

        setProjects(processedData);
      } catch (error) {
        console.error("DEBUG: Portfolio Fetch Error:", error);
        // Fallback data
        const fallbackProjects = [
          { _id: '1', title: 'ZOO BREAK', imageUrl: 'https://picsum.photos/seed/zoo1/800/600', url: '#' },
          { _id: '2', title: 'MICROVERSE', imageUrl: 'https://picsum.photos/seed/micro2/800/600', url: '#' },
          { _id: '3', title: 'WINDOW SEAT', imageUrl: 'https://picsum.photos/seed/window3/800/600', url: '#' },
          { _id: '4', title: 'DESERT WALK', imageUrl: 'https://picsum.photos/seed/desert4/800/600', url: '#' },
          { _id: '5', title: 'URBAN NIGHTS', imageUrl: 'https://picsum.photos/seed/urban5/800/600', url: '#' },
          { _id: '6', title: 'CYBER DREAMS', imageUrl: 'https://picsum.photos/seed/cyber6/800/600', url: '#' },
          { _id: '7', title: 'NEON CITY', imageUrl: 'https://picsum.photos/seed/neon7/800/600', url: '#' },
          { _id: '8', title: 'SPACE ODYSSEY', imageUrl: 'https://picsum.photos/seed/space8/800/600', url: '#' },
          { _id: '9', title: 'DIGITAL REALM', imageUrl: 'https://picsum.photos/seed/digital9/800/600', url: '#' },
        ];
        setProjects(fallbackProjects);
      }
    };
    fetchProjects().catch(err => console.error("Unhandled fetchProjects error:", err));
  }, []);

  const column1 = projects.filter((_, i) => i % 3 === 0);
  const column2 = projects.filter((_, i) => i % 3 === 1);
  const column3 = projects.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative h-screen bg-black overflow-hidden py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-12 lg:px-16 h-full flex flex-col">
        {/* Header Removed */}

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5 h-full">
            <ScrollingColumn projects={column1} direction="up" speed={50} />
            <ScrollingColumn projects={column2} direction="down" speed={50} />
            <ScrollingColumn projects={column3} direction="up" speed={50} />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[35vh] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Portfolio;
