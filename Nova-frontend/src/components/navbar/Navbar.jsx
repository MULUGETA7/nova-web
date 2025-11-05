import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion";

// Updated Dropdown card data with icons and descriptions
const navDropdowns = {
  products: {
    title: "Products",
    image: "/images/navbar/1.png",
    links: [
      { icon: "ph:rocket-launch-bold", text: "Nova Creative", description: "AI-driven creative tools.", url: "/" },
      { icon: "ph:graph-bold", text: "Nova Flow", description: "Streamlined workflow automation.", url: "/" },
      { icon: "ph:robot-bold", text: "Agent 7", description: "Intelligent AI assistant.", url: "/" },
    ]
  },
  works: {
    title: "Our Works",
    image: "/images/navbar/2.png",
    links: [
      { icon: "ph:presentation-chart-bold", text: "Case Studies", description: "See our success stories.", url: "/works/case-studies" },
      { icon: "ph:image-bold", text: "Portfolio", description: "Explore our featured projects.", url: "/works/portfolio" },
      { icon: "ph:trophy-bold", text: "Achievements", description: "Our milestones and awards.", url: "/works/achievements" },
    ]
  },
  services: {
    title: "Services",
    image: "/images/navbar/3.png",
    links: [
      { icon: "ph:code-bold", text: "Web And Mobile App Dev", description: "Modern web solutions.", url: "#" },
      { icon: "ph:paint-brush-bold", text: "UI/UX Design & Blockchain", description: "UI/UX designs and Decentralized solutions.", url: "#" },
      { icon: "ph:robot-bold", text: "Artificial Intelligence", description: "AI solutions.", url: "#" },
      { icon: "akar-icons:vr-ar", text: "Immersive Technologies", description: "AR, VR and XR solutions.", url: "#" },
    ]
  },
  ecosystem: {
    title: "Ecosystem",
    image: "/images/navbar/4.png",
    links: [
      { icon: "ph:handshake-bold", text: "Partners", description: "Collaborate with industry leaders.", url: "#" },
      { icon: "ph:plugs-connected-bold", text: "Integrations", description: "Connect your favorite tools.", url: "#" },
      { icon: "ph:atom-bold", text: "Technology", description: "Our tech stack and innovations.", url: "#" },
    ]
  },
  community: {
    title: "Community",
    image: "/images/navbar/6.jpg",
    links: [
      { icon: "ph:calendar-blank-bold", text: "Events", description: "Join our workshops & meetups.", url: "#" },
      { icon: "ph:medal-bold", text: "Hackathons", description: "Compete and innovate.", url: "#" },
      { icon: "ph:git-branch-bold", text: "Open Source", description: "Contribute to our projects.", url: "#" },
    ]
  },
  about: {
    title: "About Us",
    image: "/images/navbar/5.png",
    links: [
      { icon: "ph:users-three-bold", text: "Our Team", description: "Meet the minds behind Nova.", url: "/about-us" },
      { icon: "ph:buildings-bold", text: "Company", description: "Our mission and values.", url: "/about-us" },
      { icon: "ph:envelope-simple-bold", text: "Contact", description: "Get in touch with us.", url: "/about-us" },
    ]
  }
};

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle hover effects with small delay
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
    setIsCardVisible(true);
  };

  const handleMouseLeave = () => {
    setIsCardVisible(false);
  };

  return (
    <header className="mt-2 fixed top-0 left-0 bg-transparent w-full z-50">
      <div className="md:w-[90%] w-full bg-[#0a131a] mx-auto px-6 py-2 rounded-[36px] md:rounded-full relative">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-[36px] md:rounded-full border-2 border-transparent" 
             style={{ 
               background: 'linear-gradient(#0a131a, #0a131a) padding-box, linear-gradient(to bottom, #FF1CF7, #00F0FF) border-box'
             }}>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Matrix Logo" 
                className="h-8 w-auto" 
              />
              {/* <span className="text-xl font-medium text-cyan-400">MATRIX</span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 w-full justify-end">
            <ul className="flex space-x-6">
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/#" className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
                  Products
                </Link>
                {/* Dropdown Card */}
                <AnimatePresence>
                  {isCardVisible && hoveredItem === 'products' && (
                    <DropdownCard 
                      data={navDropdowns.products}
                      onMouseEnter={() => setIsCardVisible(true)}
                      onMouseLeave={handleMouseLeave}
                      imageClass="object-cover"
                      isCommunity={false}
                    />
                  )}
                </AnimatePresence>
              </li>
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('works')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/works" className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
                  Works
                </Link>
                <AnimatePresence>
                  {isCardVisible && hoveredItem === 'works' && (
                    <DropdownCard 
                      data={navDropdowns.works}
                      onMouseEnter={() => setIsCardVisible(true)}
                      onMouseLeave={handleMouseLeave}
                      imageClass="object-contain"
                      isCommunity={false}
                    />
                  )}
                </AnimatePresence>
              </li>
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
                imageClass="object-cover"
              >
                <Link to="/#" className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
                  Service
                </Link>
                <AnimatePresence>
                  {isCardVisible && hoveredItem === 'services' && (
                    <DropdownCard 
                      data={navDropdowns.services}
                      onMouseEnter={() => setIsCardVisible(true)}
                      onMouseLeave={handleMouseLeave}
                      imageClass="object-cover"
                      isCommunity={false}
                    />
                  )}
                </AnimatePresence>
              </li>
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('ecosystem')}
                onMouseLeave={handleMouseLeave}
                imageClass="object-cover"
              >
                <Link to="/#" className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
                  Ecosystem
                </Link>
                <AnimatePresence>
                  {isCardVisible && hoveredItem === 'ecosystem' && (
                    <DropdownCard 
                      data={navDropdowns.ecosystem}
                      onMouseEnter={() => setIsCardVisible(true)}
                      onMouseLeave={handleMouseLeave}
                      imageClass="object-cover"
                      isCommunity={false}
                    />
                  )}
                </AnimatePresence>
              </li>
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('community')}
                onMouseLeave={handleMouseLeave}
                imageClass="object-cover"
              >
                <Link to="/#" className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
                  Community
                </Link>
                <AnimatePresence>
                  {isCardVisible && hoveredItem === 'community' && (
                    <DropdownCard 
                      data={navDropdowns.community}
                      onMouseEnter={() => setIsCardVisible(true)}
                      onMouseLeave={handleMouseLeave}
                      imageClass="object-cover"
                      isCommunity={true}
                    />
                  )}
                </AnimatePresence>
              </li>
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
                imageClass="object-cover"
              >
                <Link to="/about-us" className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
                  About
                </Link>
                <AnimatePresence>
                  {isCardVisible && hoveredItem === 'about' && (
                    <DropdownCard 
                      data={navDropdowns.about}
                      onMouseEnter={() => setIsCardVisible(true)}
                      onMouseLeave={handleMouseLeave}
                      imageClass="object-cover"
                      isCommunity={false}
                    />
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <Icon 
              icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"} 
              width="24" 
              height="24" 
            />
          </button>
        </div>

        {/* Mobile Menu - Only show on mobile AND when menu is open */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 relative z-20">
            <ul className="flex flex-col space-y-4 px-2">
              <li>
                <Link 
                  to="/products" 
                  className="block text-white hover:text-cyan-400 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/works" 
                  className="block text-white hover:text-cyan-400 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="block text-white hover:text-cyan-400 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/ecosystem" 
                  className="block text-white hover:text-cyan-400 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ecosystem
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="block text-white hover:text-cyan-400 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/about-us" 
                  className="block text-white hover:text-cyan-400 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

const DropdownCard = ({ data, onMouseEnter, onMouseLeave, imageClass, isCommunity }) => {
  return (
    <motion.div
      className="fixed top-16 left-[45%] -translate-x-[45%] w-[720px] bg-[#0a131a] rounded-lg shadow-xl overflow-hidden z-50 border border-gray-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Pointer Arrow */}
      <div className="absolute -top-2 left-[45%] -translate-x-[45%] w-8 h-8 bg-[#0a131a] transform rotate-45 border-t border-l border-gray-800" />
      
      <div className="flex">
        {/* Left Side: Image */}
        <div className="w-[55%] h-96 overflow-visible">
          <img
            src={data.image}
            alt={data.title}
            className={`w-full h-full ${imageClass}`}
          />
        </div>

        {/* Right Side: Links */}
        <div className="w-[45%] rounded-lg m-4 bg-gray-700 p-6">
          <h3 className="text-white font-bold mb-4 text-xl">{data.title}</h3>
          <ul className="grid grid-cols-1 gap-4">
            {data.links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-900 transition-colors group"
                >
                  <Icon icon={link.icon} className="mr-3 mt-1 text-xl text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-white group-hover:text-cyan-400">
                      {link.text}
                    </span>
                    <span className="block text-xs text-gray-400 mt-1">
                      {link.description}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              {
                isCommunity && (
                  
                  <div className="flex flex-col gap-4 w-[80%]">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300 text-sm">Connect</span>
                      <a 
                        href="#" 
                        className="text-gray-100 hover:text-white transition-colors flex items-center text-sm"
                      >
                        Official Channels
                        <Icon icon="mdi:arrow-top-right" width="16" height="16" />
                      </a>
                    </div>
                    <div className="flex gap-4 items-center">
                      
                      <a href="https://linkedin.com/company/nova-labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Icon icon="mdi:linkedin" width="30" height="30" />
                      </a>
                      <a href="https://twitter.com/nova-labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Icon icon="line-md:twitter-x" width="30" height="30" />
                      </a>
                      <a href="https://instagram.com/nova_labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Icon icon="mdi:instagram" width="30" height="30" />
                      </a>
                      <a href="https://discord.gg/nova-labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Icon icon="ic:twotone-discord" width="30" height="30" />
                      </a>
                      <a href="https://facebook.com/nova-labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Icon icon="mdi:facebook" width="30" height="30" />
                      </a>  
                    </div>
                  </div>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;