import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  SparklesIcon,
  IdentificationIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setError('System verification failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId) => {
    if (userId === currentUser?._id) {
      setError("Cannot terminate own administrative session");
      return;
    }

    if (window.confirm('Dissolve this user account permanently?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        setError('De-authorization failed: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          text: 'text-purple-400',
          icon: SparklesIcon,
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]'
        };
      case 'admin':
        return {
          bg: 'bg-[#00F0FF]/10',
          border: 'border-[#00F0FF]/20',
          text: 'text-[#00F0FF]',
          icon: ShieldCheckIcon,
          glow: 'shadow-[0_0_15px_rgba(0,240,255,0.3)]'
        };
      case 'editor':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          text: 'text-blue-400',
          icon: PencilIcon
        };
      case 'content':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-400',
          icon: IdentificationIcon
        };
      default:
        return {
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/20',
          text: 'text-gray-400',
          icon: UsersIcon
        };
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role?.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const roles = ['All', 'SuperAdmin', 'Admin', 'Editor', 'Content', 'User'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              IDENTITY <span className="nova-gradient-text uppercase">Vault</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Administrative Privilege Control</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-[#00F0FF] transition-colors" />
              <input
                type="text"
                placeholder="Scan for identities..."
                className="pl-11 pr-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 focus:border-[#00F0FF]/40 transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => navigate('/users/add')}
              className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              <UserPlusIcon className="w-4 h-4" />
              Initialize Identity
            </button>
          </div>
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                ${selectedRole === role
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white'}`}
            >
              {role}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest flex items-center gap-3">
            <CommandLineIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Identity Table */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Full Name</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Access Credentials</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Security Tier</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Initialized</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Directives</th>
                </tr>
              </thead>
              <motion.tbody
                variants={container}
                initial="hidden"
                animate="show"
                className="divide-y divide-white/5"
              >
                {filteredUsers.map((user) => {
                  const style = getRoleStyle(user.role);
                  return (
                    <motion.tr
                      key={user._id}
                      variants={item}
                      className="group hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-white font-black shadow-lg ${style.glow}`}>
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-bold text-white group-hover:text-[#00F0FF] transition-colors">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-tight">{user.email}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${style.bg} ${style.border} ${style.text} ${style.glow}`}>
                          <style.icon className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs text-gray-600 font-medium">
                        {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/users/edit/${user._id}`)}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            title="Edit Identity"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          {user._id !== currentUser?._id && (
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"
                              title="Dissolve Session"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && !loading && (
            <div className="py-20 text-center border-t border-white/5 bg-white/[0.01]">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <UsersIcon className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">No matching identities found in vault</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
