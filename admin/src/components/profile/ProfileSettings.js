import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  BellIcon,
  BoltIcon,
  CpuChipIcon,
  ChartBarIcon,
  ArrowPathIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment variable with fallback

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [sessionInfo] = useState({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`,
    lastLogin: 'Today, ' + new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token missing, please log in again.');
        }

        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = response.data;
        setFormData(prev => ({
          ...prev,
          email: userData.email,
          role: userData.role || 'Administrator'
        }));
      } catch (error) {
        setError('Error fetching profile: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const isValid = password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);
    return isValid;
  };

  const [preferences, setPreferences] = useState({
    systemAlerts: true,
    userRegistrations: false,
    securityReports: true,
    autoBackup: true
  });

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activityLog = [
    { title: 'Security Sync', time: '12m ago', icon: ShieldCheckIcon, color: 'text-[#00F0FF]' },
    { title: 'News Update', time: '1h ago', icon: NewspaperIcon, color: 'text-[#B537F5]' },
    { title: 'User Verified', time: '3h ago', icon: CheckBadgeIcon, color: 'text-emerald-400' },
    { title: 'System Patch', time: 'Yesterday', icon: BoltIcon, color: 'text-orange-400' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token missing, please log in again.');
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        if (!validatePassword(formData.newPassword)) {
          throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
        }

        await axios.put(`${API_BASE_URL}/api/profile/change-password`,
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

      setSuccess('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full"
        />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              ACCOUNT <span className="nova-gradient-text uppercase">Security</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Administrative Access Control</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            Terminal Return
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile & Session Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Account Overview */}
            <motion.div variants={item} className="glass-card rounded-[2.5rem] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 nova-gradient-bg opacity-20 blur-2xl" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto rounded-3xl nova-gradient-bg flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-purple-500/30 mb-6">
                  {formData.email?.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{formData.email?.split('@')[0]}</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheckIcon className="w-3 h-3" />
                  {formData.role}
                </div>
                <p className="text-gray-500 text-xs mt-4 font-medium">{formData.email}</p>
              </div>
            </motion.div>

            {/* Session Insights */}
            <motion.div variants={item} className="glass-card rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#B537F5]/10 border border-[#B537F5]/20 text-[#B537F5]">
                  <FingerPrintIcon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Digital Footprint</h4>
              </div>

              <div className="space-y-4">
                {[
                  { icon: GlobeAltIcon, label: 'Platform', value: sessionInfo.platform },
                  { icon: ClockIcon, label: 'Session ID', value: Math.random().toString(36).substr(2, 9).toUpperCase() },
                  { icon: CheckBadgeIcon, label: 'Last Login', value: sessionInfo.lastLogin },
                  { icon: FingerPrintIcon, label: 'Status', value: 'Verified RSA-4096' }
                ].map((info, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-none">
                    <div className="flex items-center gap-2">
                      <info.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{info.label}</span>
                    </div>
                    <span className="text-xs text-gray-200 font-medium">{info.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick System Health */}
            <motion.div variants={item} className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <BoltIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">System Health</h4>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Core Load</span>
                    <span className="text-xs font-bold text-white">24%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '24%' }}
                      className="h-full nova-gradient-bg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <CpuChipIcon className="w-4 h-4 text-gray-500 mb-2" />
                    <div className="text-sm font-bold text-white">99.9%</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Uptime</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <ChartBarIcon className="w-4 h-4 text-gray-500 mb-2" />
                    <div className="text-sm font-bold text-white">4.2ms</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Latency</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Edits & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preferences Card */}
              <motion.div variants={item} className="glass-card rounded-[2.5rem] p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <BellIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Subscriptions</h4>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'systemAlerts', label: 'System Alerts', icon: ExclamationTriangleIcon },
                    { key: 'userRegistrations', label: 'New Signups', icon: UserCircleIcon },
                    { key: 'securityReports', label: 'Security Logs', icon: ShieldCheckIcon },
                    { key: 'autoBackup', label: 'Cloud Sync', icon: ArrowPathIcon }
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-3">
                        <pref.icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold text-gray-300">{pref.label}</span>
                      </div>
                      <button
                        onClick={() => togglePreference(pref.key)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${preferences[pref.key] ? 'nova-gradient-bg' : 'bg-white/10'}`}
                      >
                        <motion.div
                          animate={{ x: preferences[pref.key] ? 20 : 2 }}
                          className="absolute top-1 left-0 w-3 h-3 rounded-full bg-white shadow-sm"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity Timeline */}
              <motion.div variants={item} className="glass-card rounded-[2.5rem] p-8 pb-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Admin Stream</h4>
                </div>

                <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                  {activityLog.map((log, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center relative z-10 ${log.color}`}>
                        <log.icon className="w-5 h-5" />
                      </div>
                      <div className="pt-1">
                        <div className="text-xs font-bold text-white">{log.title}</div>
                        <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-0.5">{log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div variants={item} className="glass-card rounded-[2.5rem] p-10 border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <ShieldCheckIcon className="w-6 h-6 text-[#00F0FF]/50" />
              </div>

              <h3 className="text-2xl font-black text-white mb-8 tracking-tight italic">Security <span className="text-gray-500 font-light">Verification</span></h3>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold flex items-center gap-3"
                  >
                    <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center gap-3"
                  >
                    <CheckBadgeIcon className="w-5 h-5 flex-shrink-0" />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    className="block w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-gray-500 font-medium cursor-not-allowed opacity-60 transition-all"
                    value={formData.email}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-black text-[#B537F5] uppercase tracking-[0.3em] mb-4">Credential Update Protocol</h4>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2">Current Key</label>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 focus:border-[#00F0FF]/50 transition-all font-medium"
                      placeholder="Enter active secret"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-11 p-1 text-gray-500 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2">New Security Sequence</label>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#B537F5]/20 focus:border-[#B537F5]/50 transition-all font-medium"
                      placeholder="Min 8 chars + Special"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-11 p-1 text-gray-500 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="relative group md:col-span-2">
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2">Sequence Confirmation</label>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium"
                      placeholder="Confirm new security sequence"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-11 p-1 text-gray-500 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Next Refresh in 90 Days</span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-10 py-4 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Sync Profile'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
