import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  NewspaperIcon,
  PhotoIcon,
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  CursorArrowRaysIcon
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={item} className="relative overflow-hidden rounded-3xl p-8 glass-card border-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00F0FF]/20 to-[#B537F5]/20 blur-3xl rounded-full -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-[#00F0FF]" />
                <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest">System Overview</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="nova-gradient-text">{currentUser?.name?.split(' ')[0] || 'Admin'}</span>!
              </h1>
              <p className="text-gray-400 mt-2 max-w-xl font-medium">
                Your ecosystem is performing optimally. Here's a breakdown of the latest developments across Nova Labs.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-2xl nova-gradient-bg text-white font-bold text-sm shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                Generate Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'News Articles',
              value: stats.totalNews,
              increase: stats.newsIncrease,
              icon: NewspaperIcon,
              color: '#00F0FF',
              detail: 'new this month'
            },
            {
              label: 'Hackathon Images',
              value: stats.totalImages,
              increase: stats.imagesIncrease,
              icon: PhotoIcon,
              color: '#B537F5',
              detail: 'updated'
            },
            {
              label: 'Active Users',
              value: stats.totalUsers,
              increase: stats.usersIncrease,
              icon: UsersIcon,
              color: '#FF1CF7',
              detail: 'new registrations'
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-3xl relative overflow-hidden group"
            >
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-black text-white mt-1 tabular-nums">{stat.value}</h3>
                  <div className={`mt-4 flex items-center gap-1.5 p-1.5 px-3 rounded-xl inline-flex ${stat.increase >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {stat.increase >= 0 ? <ArrowUpIcon className="w-3 h-3 font-bold" /> : <ArrowDownIcon className="w-3 h-3 font-bold" />}
                    <span className="text-xs font-black uppercase tracking-tight">
                      {Math.abs(stat.increase)} {stat.detail}
                    </span>
                  </div>
                </div>
                <div
                  className="p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}20` }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>
              </div>

              {/* Decorative Glow */}
              <div
                className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20 rounded-full transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: stat.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div variants={item} className="lg:col-span-2 glass-card rounded-3xl overflow-hidden border-none relative">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CursorArrowRaysIcon className="w-5 h-5 text-[#B537F5]" />
                  Internal Activity
                </h2>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Real-time system updates</p>
              </div>
              <button className="text-xs font-bold text-[#00F0FF] hover:underline uppercase tracking-widest">View History</button>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {stats.recentActivity.map((activity, i) => (
                  <motion.li
                    key={activity.id}
                    whileHover={{ x: 8 }}
                    className="p-4 rounded-2xl hover:bg-white/[0.03] transition-all flex items-center justify-between group border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                        <ChartBarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-200">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Event</span>
                          <span className="w-1 h-1 bg-gray-700 rounded-full" />
                          <p className="text-[10px] text-gray-400 font-medium">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF]"
                    >
                      <ArrowUpIcon className="w-4 h-4 rotate-45" />
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Quick Actions / Integration Status */}
          <motion.div variants={item} className="glass-card rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative border-none">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-3 h-3 bg-emerald-500 rounded-full nova-glow" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Nova Core</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-black mb-6">Integration Status</p>

              <div className="space-y-6">
                {[
                  { name: 'Gemini 1.5 Pro', status: 'Online', progress: 100, color: '#00F0FF' },
                  { name: 'Vector DB', status: 'Syncing', progress: 85, color: '#B537F5' },
                  { name: 'WebSockets', status: 'Active', progress: 100, color: '#FF1CF7' }
                ].map((api, k) => (
                  <div key={k}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-300">{api.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: api.color }}>{api.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${api.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + (k * 0.2) }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: api.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Protocol v4.0.2</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
