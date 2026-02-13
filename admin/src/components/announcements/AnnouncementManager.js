import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MegaphoneIcon,
    LinkIcon,
    InformationCircleIcon,
    CheckBadgeIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AnnouncementManager = () => {
    const [formData, setFormData] = useState({
        text: '',
        link: '',
        isActive: true
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAnnouncement().catch(err => console.error("Unhandled fetchAnnouncement error:", err));
    }, []);

    const fetchAnnouncement = async () => {
        setFetching(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/announcements`);
            setFormData({
                text: response.data.text || '',
                link: response.data.link || '',
                isActive: response.data.isActive !== undefined ? response.data.isActive : true
            });
        } catch (err) {
            console.error('Error fetching announcement:', err);
            // Don't show error if it's just a 404/not found as the controller creates one
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE_URL}/api/announcements`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccess('Live announcement updated successfully');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <ArrowPathIcon className="w-10 h-10 text-cyan-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-white tracking-tight italic text-left">
                        ANNOUNCEMENT <span className="nova-gradient-text uppercase">Control</span>
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px] text-left">Manage Live Frontend Alerts</p>
                </div>

                <div className="glass-card rounded-[3rem] p-10 md:p-16 relative overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-xl">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <MegaphoneIcon className="w-64 h-64 text-white" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Live Announcement Text</label>
                                <div className="relative">
                                    <MegaphoneIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-bold placeholder:text-gray-700"
                                        placeholder="Enter announcement text (e.g. Casting.io System Live on)"
                                        value={formData.text}
                                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Interaction URL (Link)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all font-bold placeholder:text-gray-700"
                                        placeholder="https://example.com"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 ml-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isActive ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <span
                                        className={`${formData.isActive ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </button>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Status: {formData.isActive ? 'Active (Visible)' : 'Inactive (Hidden)'}
                                </span>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3">
                                    <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-3">
                                    <CheckBadgeIcon className="w-5 h-5 flex-shrink-0" />
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full py-7 mt-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] disabled:opacity-50 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                            {loading ? 'Updating Control System...' : 'Synchronize and Update Live Feed'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AnnouncementManager;
