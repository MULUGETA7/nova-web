import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  ShieldCheckIcon,
  ArrowLeftIcon,
  UserCircleIcon,
  IdentificationIcon,
  SparklesIcon,
  PencilIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roles = [
    { value: 'user', label: 'User', icon: UserCircleIcon, color: 'text-gray-400' },
    { value: 'content', label: 'Content Creator', icon: IdentificationIcon, color: 'text-emerald-400' },
    { value: 'editor', label: 'Systems Editor', icon: PencilIcon, color: 'text-blue-400' },
    { value: 'admin', label: 'Administrator', icon: ShieldCheckIcon, color: 'text-[#00F0FF]' },
    { value: 'superadmin', label: 'Core Architect (SuperAdmin)', icon: SparklesIcon, color: 'text-purple-400' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/users/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setFormData(response.data);
      } catch (error) {
        setError('Failed to retrieve identity scan: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (id === currentUser?._id && formData.role !== currentUser.role) {
        throw new Error("Cannot modify your own administrative hierarchy tier");
      }

      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/users/${id}`,
        { ...formData, updatedAt: new Date().toISOString() },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      setSuccess('Identity protocols updated successfully');
      setTimeout(() => navigate('/users'), 1500);
    } catch (error) {
      setError('Protocol update failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header Block */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              IDENTITY <span className="nova-gradient-text uppercase">Adjustment</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Privilege Escalation & Hierarchy</p>
          </div>

          <button
            onClick={() => navigate('/users')}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Abort Changes
          </button>
        </div>

        <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <CommandLineIcon className="w-40 h-40 text-white" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Alias Scan (Read-Only)</label>
                <input
                  type="email"
                  disabled
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-gray-500 font-bold cursor-not-allowed italic"
                  value={formData.email}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity Display Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-2xl py-5 px-8 text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 focus:border-[#00F0FF]/40 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Tier Authorization</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      disabled={id === currentUser?._id}
                      onClick={() => setFormData({ ...formData, role: role.value })}
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left
                        ${formData.role === role.value
                          ? 'bg-white/10 border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                          : 'bg-white/5 border-white/5 opacity-40 hover:opacity-100 hover:border-white/10'}
                        ${id === currentUser?._id ? 'cursor-not-allowed opacity-20' : ''}`}
                    >
                      <div className={`p-2.5 rounded-xl bg-black/40 border border-white/10 ${role.color}`}>
                        <role.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-xs font-black uppercase tracking-widest ${formData.role === role.value ? 'text-white' : 'text-gray-500'}`}>
                          {role.label}
                        </div>
                        <div className="text-[9px] text-gray-600 font-medium mt-0.5">Authorize access level {role.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {id === currentUser?._id && (
                  <p className="text-[10px] text-orange-500/80 font-black uppercase tracking-widest text-center mt-4 italic">
                    Administrative override prevented: Cannot modify self-privilege
                  </p>
                )}
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3"
                >
                  <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-3"
                >
                  <CheckBadgeIcon className="w-5 h-5 flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                Last Identity Audit: {new Date(formData.updatedAt || formData.createdAt).toLocaleString()}
              </div>
              <button
                type="submit"
                disabled={saving || id === currentUser?._id}
                className="w-full md:w-auto px-12 py-5 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {saving ? 'Syncing Matrix...' : 'Commit Adjustments'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserEdit;
