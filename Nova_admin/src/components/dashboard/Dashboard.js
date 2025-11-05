import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../layout/Layout';
import {
  ChartBarIcon,
  NewspaperIcon,
  PhotoIcon,
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats] = useState({
    totalNews: 25,
    newsIncrease: 12,
    totalImages: 48,
    imagesIncrease: -5,
    totalUsers: 15,
    usersIncrease: 3,
    recentActivity: [
      { id: 1, action: 'New article published', time: '2 hours ago' },
      { id: 2, action: 'New user registered', time: '4 hours ago' },
      { id: 3, action: 'Images uploaded', time: '6 hours ago' },
    ]
  });

  return (
    <Layout >
      <div className="space-y-4 md:space-y-6  md:ml-[20%]">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Welcome back, {currentUser?.name || 'Admin'}!
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Here's what's happening with your admin panel today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* News Stats */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total News Articles</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.totalNews}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <NewspaperIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500 ml-1">
                +{stats.newsIncrease} new
              </span>
              <span className="text-xs md:text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          {/* Images Stats */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hackathon Images</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.totalImages}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <PhotoIcon className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowDownIcon className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-500 ml-1">
                {stats.imagesIncrease} removed
              </span>
              <span className="text-xs md:text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          {/* Users Stats */}
          <div className="bg-white rounded-lg p-4 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.totalUsers}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <UsersIcon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500 ml-1">
                +{stats.usersIncrease} new
              </span>
              <span className="text-xs md:text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {stats.recentActivity.map((activity) => (
                <li key={activity.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <ChartBarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <p className="ml-3 text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 ml-4">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
