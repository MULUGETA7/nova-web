import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KeyIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment variable with fallback

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Hook to handle navigation

  const handleLogin = async (email, password) => {
    try {
      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('Sending Login Request to:', `${API_BASE_URL}/api/auth/login`);
      console.log('Login data:', { email, password });

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Login Response:', response.data);

      const { token, role } = response.data;

      // Store the token and user info in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', token);

      // Redirect to admin dashboard if role is admin, else to user dashboard
      if (role === 'admin') {
        navigate('/admin-dashboard');  // Admin dashboard route
      } else {
        navigate('/dashboard');  // Regular user dashboard route
      }

    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      setError('Invalid email or password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await handleLogin(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FF1CF7]/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#00F0FF]/10 blur-[120px] rounded-full pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Brand Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF1CF7]/20 to-[#00F0FF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <ShieldCheckIcon className="w-12 h-12 text-[#00F0FF] relative z-10" />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">
            NOVA <span className="text-[#B537F5]">LABS</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Administrative Protocol</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-[2.5rem] p-10 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <SparklesIcon className="w-5 h-5 text-[#B537F5]/50" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">System Access</h2>
            <p className="text-sm text-gray-500 mt-1">Identify yourself to proceed</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 focus:border-[#00F0FF]/50 transition-all font-medium"
                  placeholder="name@nova-labs.ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-500 group-focus-within:text-[#B537F5] transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#B537F5]/20 focus:border-[#B537F5]/50 transition-all font-medium"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-2xl py-4 font-black uppercase tracking-[0.2em] text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 nova-gradient-bg transition-transform group-hover:scale-110" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Bypassing...
                  </>
                ) : (
                  <>
                    Initialize Session
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Secure Encrypted Tunnel • <span className="text-[#00F0FF]">RSA-4096</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default Login;
