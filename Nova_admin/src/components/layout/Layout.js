import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
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
    <div className="relative">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 bg-white z-30 transition-all duration-200
          ${isScrolled ? 'shadow-md' : 'border-b border-gray-200'}
          safe-top md:safe-top-0`}
      >
        <div className="flex items-center h-14 md:h-16 px-3 md:px-4">
          {/* Mobile menu button with larger touch target */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden -ml-1 p-2 touch-manipulation rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          
          {/* Title - only show on mobile */}
          <h1 className="ml-2 text-lg font-semibold text-gray-900 md:hidden">
            Nova Admin
          </h1>
        </div>
      </header>

      {/* Sidebar - hidden on mobile by default */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed top-0 left-0 z-40 h-full w-[240px] transition-transform duration-300 ease-in-out
        md:top-0 safe-top safe-bottom touch-manipulation`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Backdrop with smooth fade */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main 
        className={`min-h-screen bg-gray-100 transition-all duration-300 ease-in-out
          pt-14 mt-8 md:pt-0  safe-area-inset-bottom
          ${isSidebarOpen ? 'ml-[240px]' : 'ml-0'}
          ${isScrolled ? 'pt-14' : 'pt-[3.5rem]'} md:pt-0
        `}
      >
        <div className="p-3 md:p-4 safe-area-inset-bottom">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
