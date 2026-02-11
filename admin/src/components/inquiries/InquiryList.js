import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    EnvelopeIcon,
    EnvelopeOpenIcon,
    TrashIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ClockIcon,
    UserCircleIcon,
    FaceFrownIcon,
    InboxIcon
} from '@heroicons/react/24/outline';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const InquiryList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/messages`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
            await axios.put(`${API_URL}/api/messages/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessages(messages.map(m => m._id === id ? { ...m, status: newStatus } : m));
            if (selectedMessage?._id === id) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('De-index this inquiry permanently?')) return;
        try {
            await axios.delete(`${API_URL}/api/messages/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessages(messages.filter(m => m._id !== id));
            if (selectedMessage?._id === id) setSelectedMessage(null);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || msg.status === filter;
        return matchesSearch && matchesFilter;
    });

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
        <div className="min-h-screen bg-[#050505] p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">
                        Inquiry <span className="nova-gradient-text">Terminal</span>
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">Manage incoming intelligence data and user uplink requests.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search uplink signal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/30 transition-all w-64 shadow-2xl"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/30 transition-all appearance-none cursor-pointer"
                    >
                        <option value="all" className="bg-[#111]">All Signals</option>
                        <option value="unread" className="bg-[#111]">Unread</option>
                        <option value="read" className="bg-[#111]">Read</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Message List */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                    {loading ? (
                        <div className="text-center py-20 bg-white/[0.02] rounded-[2.5rem] border border-white/5">
                            <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Scanning Frequencies...</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-3 h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar"
                        >
                            {filteredMessages.map((msg) => (
                                <motion.div
                                    key={msg._id}
                                    variants={item}
                                    onClick={() => setSelectedMessage(msg)}
                                    className={`group cursor-pointer p-5 rounded-3xl border transition-all relative overflow-hidden
                                        ${selectedMessage?._id === msg._id
                                            ? 'bg-white/10 border-white/20'
                                            : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/5'
                                        }
                                        ${msg.status === 'unread' ? 'shadow-[L-4px_0_0_#B537F5]' : ''}
                                    `}
                                >
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl nova-gradient-bg flex items-center justify-center text-white font-bold text-xs ring-4 ring-white/5">
                                                {msg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className={`text-sm font-bold truncate max-w-[150px] ${msg.status === 'unread' ? 'text-white' : 'text-gray-400'}`}>
                                                    {msg.name}
                                                </h3>
                                                <p className="text-[10px] text-gray-600 font-medium">@{msg.email.split('@')[0]}</p>
                                            </div>
                                        </div>
                                        <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h4 className={`text-xs font-medium truncate ${msg.status === 'unread' ? 'text-cyan-400' : 'text-gray-500'}`}>
                                        {msg.subject}
                                    </h4>
                                </motion.div>
                            ))}

                            {filteredMessages.length === 0 && (
                                <div className="text-center py-20 bg-white/[0.02] rounded-[2.5rem] border border-white/5">
                                    <FaceFrownIcon className="text-gray-700 w-12 h-12 mx-auto mb-4" />
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">No Intelligence Found</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Message Detail View */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <AnimatePresence mode="wait">
                        {selectedMessage ? (
                            <motion.div
                                key={selectedMessage._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass-card rounded-[3rem] p-10 bg-white/[0.02] border border-white/5 min-h-[600px] flex flex-col relative"
                            >
                                {/* Background Watermark */}
                                <div className="absolute -bottom-20 -right-20 text-[200px] font-black text-white/[0.01] select-none pointer-events-none">UPLINK</div>

                                <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-3xl nova-gradient-bg flex items-center justify-center text-white text-2xl font-black shadow-2xl">
                                            {selectedMessage.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">{selectedMessage.name}</h2>
                                            <p className="text-cyan-400 font-mono text-xs">{selectedMessage.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleStatus(selectedMessage._id, selectedMessage.status)}
                                            className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:text-cyan-400 hover:bg-white/10 transition-all group"
                                            title={selectedMessage.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                                        >
                                            {selectedMessage.status === 'unread' ? <EnvelopeIcon className="w-5 h-5" /> : <EnvelopeOpenIcon className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => deleteMessage(selectedMessage._id)}
                                            className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/20 transition-all"
                                            title="Delete Inquiry"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">Subject</div>
                                        <h3 className="text-lg font-bold text-white uppercase italic tracking-tighter">{selectedMessage.subject}</h3>
                                    </div>

                                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-gray-300 text-base leading-relaxed whitespace-pre-wrap font-medium shadow-inner">
                                        {selectedMessage.content}
                                    </div>
                                </div>

                                <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="w-4 h-4 text-gray-600" />
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                {new Date(selectedMessage.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${selectedMessage.status === 'unread' ? 'bg-[#B537F5] animate-pulse' : 'bg-gray-700'}`} />
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                {selectedMessage.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[9px] rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                                        Initialize Neural Response <ChevronRightIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass-card rounded-[3rem] p-10 bg-white/[0.02] border border-white/5 min-h-[600px] flex flex-col items-center justify-center text-center opacity-50 grayscale">
                                <InboxIcon className="w-16 h-16 text-gray-800 mb-8" />
                                <h3 className="text-2xl font-black text-gray-700 uppercase italic tracking-tighter mb-2">No Signal Selected</h3>
                                <p className="text-gray-700 text-sm font-medium">Select an uplink signal from the frequency list to begin processing.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default InquiryList;
