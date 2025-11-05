import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  NewspaperIcon,
  PhotoIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
const Sidebar = ({ onClose }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const isAdmin = currentUser?.role === 'Admin';
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'News Articles', href: '/news', icon: NewspaperIcon },
    { name: 'Hackathon Images', href: '/hackathon-images', icon: PhotoIcon },
    ...(isAdmin ? [
      { name: 'User Management', href: '/users', icon: UsersIcon },
      { name: 'Admin Partners', href: '/admin/partners', icon: UsersIcon },
      { name: 'Admin Portfolio', href: '/admin/portfolio', icon: UsersIcon }
    ] : []), 
    { name: 'Profile Settings', href: '/profile', icon: UserCircleIcon },
  ];
  

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white overflow-hidden">
      {/* Logo Section - only visible on desktop */}
      <div className="hidden md:block p-5 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">Nova Admin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto overscroll-contain py-4 touch-pan-y">
        <ul className="space-y-0.5 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150 
                    hover:bg-gray-800 active:bg-gray-700 touch-manipulation
                    ${isActive(item.href)
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-800">
          <div className="flex-shrink-0">
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {currentUser?.name || 'User'}
            </p>
            <p className="text-xs text-gray-400 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 rounded-lg
            hover:bg-gray-800 hover:text-white active:bg-gray-700
            transition-colors duration-150 touch-manipulation"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;