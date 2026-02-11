import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  NewspaperIcon,
  PhotoIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';
const Sidebar = ({ onClose }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const isAdmin = currentUser?.role === 'Admin';
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'News Articles', href: '/news', icon: NewspaperIcon },
    { name: 'Hackathon Images', href: '/hackathon-images', icon: PhotoIcon },
    { name: 'User Inquiries', href: '/inquiries', icon: ChatBubbleLeftRightIcon, adminOnly: true },
    { name: 'User Management', href: '/users', icon: UsersIcon, adminOnly: true },
    { name: 'Admin Partners', href: '/admin/partners', icon: BriefcaseIcon, adminOnly: true },
    { name: 'Admin Portfolio', href: '/admin/portfolio', icon: GlobeAltIcon, adminOnly: true },
    { name: 'Admin Clients', href: '/admin/clients', icon: BuildingOfficeIcon, adminOnly: true },
    { name: 'Live Announcements', href: '/announcements', icon: MegaphoneIcon, adminOnly: true },
    { name: 'Profile Settings', href: '/profile', icon: UserCircleIcon },
  ].filter(item => !item.adminOnly || isAdmin);


  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-full glass-sidebar text-white overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-[#FF1CF7]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[30%] bg-[#00F0FF]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Logo Section */}
      <div className="relative p-6 border-b border-white/5">
        <h1 className="text-2xl font-black nova-gradient-text tracking-tighter">
          NOVA <span className="text-white/50 font-light">ADMIN</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 relative z-10">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">
          Main Menu
        </div>
        <ul className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block relative group"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 
                      ${active
                        ? 'bg-white/10 text-white nova-glow border border-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {/* Active Indicator */}
                    {active && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute left-0 w-1 h-6 nova-gradient-bg rounded-r-full"
                      />
                    )}

                    <Icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${active ? 'text-[#00F0FF]' : 'group-hover:text-[#B537F5]'}`} />
                    <span className="truncate">{item.name}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] relative z-10">
        <div className="flex items-center p-3 mb-2 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="flex-shrink-0 relative">
            <div className="w-10 h-10 rounded-xl nova-gradient-bg flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#050505] rounded-full" />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">
              {currentUser?.name || 'Admin User'}
            </p>
            <p className="text-[10px] text-gray-500 truncate uppercase tracking-wider">
              {currentUser?.role || 'Administrator'}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-xl
            hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;