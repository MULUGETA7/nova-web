import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle touch gestures for sidebar
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 50) { // Min swipe distance
        if (swipeDistance > 0 && !isSidebarOpen) {
          // Swipe right, open sidebar
          setIsSidebarOpen(true);
        } else if (swipeDistance < 0 && isSidebarOpen) {
          // Swipe left, close sidebar
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-[#B537F5]/30">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300
          ${isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-2' : 'bg-transparent py-4'}
          safe-top md:safe-top-0`}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-6 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            <h1 className="text-lg font-bold text-white md:hidden">
              NOVA <span className="text-gray-500 font-light">ADMIN</span>
            </h1>

            {/* Breadcrumbs or Page Title */}
            <div className="hidden md:flex items-center text-sm text-gray-500 gap-2 ml-[240px]">
              <span className="hover:text-white cursor-pointer transition-colors">Admin</span>
              <span>/</span>
              <span className="text-white font-medium capitalize">
                {location.pathname.split('/').filter(x => x).pop()?.replace(/-/g, ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF1CF7] rounded-full nova-glow" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[260px] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          safe-top safe-bottom`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main
        className={`min-h-screen transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isSidebarOpen || window.innerWidth >= 768 ? 'md:ml-[260px]' : 'ml-0'}
          pt-24 pb-12 px-6
        `}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1600px] mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
