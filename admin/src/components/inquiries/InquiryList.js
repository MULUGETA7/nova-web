import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    EnvelopeIcon,
    EnvelopeOpenIcon,
    TrashIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    FaceFrownIcon,
    InboxIcon,
    ChatBubbleLeftRightIcon,
    CommandLineIcon,
    PaperAirplaneIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const InquiryList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read, replied
    const [sourceTab, setSourceTab] = useState('all'); // all, dev_terminal, chat_widget
    const [replyText, setReplyText] = useState('');
    const [replying, setReplying] = useState(false);

    useEffect(() => {
        fetchMessages().catch(err => console.error("Unhandled fetchMessages error:", err));
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

    const handleReply = async () => {
        if (!replyText.trim() || !selectedMessage) return;
        try {
            setReplying(true);
            const response = await axios.put(
                `${API_URL}/api/messages/${selectedMessage._id}/reply`,
                { reply: replyText },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMessages(messages.map(m => m._id === selectedMessage._id ? response.data : m));
            setSelectedMessage(response.data);
            setReplyText('');
        } catch (error) {
            console.error('Error replying:', error);
        } finally {
            setReplying(false);
        }
    };

    const getSourceLabel = (source) => {
        switch (source) {
            case 'dev_terminal': return 'Dev Terminal';
            case 'chat_widget': return 'Chat Widget';
            default: return 'Unknown';
        }
    };

    const getSourceColor = (source) => {
        switch (source) {
            case 'dev_terminal': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
            case 'chat_widget': return 'text-green-400 bg-green-500/10 border-green-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getSourceIcon = (source) => {
        switch (source) {
            case 'dev_terminal': return <CommandLineIcon className="w-3.5 h-3.5" />;
            case 'chat_widget': return <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />;
            default: return <EnvelopeIcon className="w-3.5 h-3.5" />;
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || msg.status === filter;
        const matchesSource = sourceTab === 'all' || msg.source === sourceTab;
        return matchesSearch && matchesFilter && matchesSource;
    });

    // Count by source
    const devCount = messages.filter(m => m.source === 'dev_terminal').length;
    const chatCount = messages.filter(m => m.source === 'chat_widget').length;

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
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
                        <option value="all" className="bg-[#111]">All Status</option>
                        <option value="unread" className="bg-[#111]">Unread</option>
                        <option value="read" className="bg-[#111]">Read</option>
                        <option value="replied" className="bg-[#111]">Replied</option>
                    </select>
                </div>
            </div>

            {/* Source Tabs */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => setSourceTab('all')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${sourceTab === 'all'
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                >
                    All ({messages.length})
                </button>
                <button
                    onClick={() => setSourceTab('dev_terminal')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${sourceTab === 'dev_terminal'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                        : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/5'
                        }`}
                >
                    <CommandLineIcon className="w-4 h-4" />
                    Dev Terminal ({devCount})
                </button>
                <button
                    onClick={() => setSourceTab('chat_widget')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${sourceTab === 'chat_widget'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-green-400 hover:bg-green-500/5'
                        }`}
                >
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    Chat Widget ({chatCount})
                </button>
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
                            className="space-y-3 h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar"
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
                                                <h3 className={`text-sm font-bold truncate max-w-[120px] ${msg.status === 'unread' ? 'text-white' : 'text-gray-400'}`}>
                                                    {msg.name}
                                                </h3>
                                                <p className="text-[10px] text-gray-600 font-medium">@{msg.email.split('@')[0]}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </div>
                                            {/* Source Badge */}
                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-black uppercase tracking-wider ${getSourceColor(msg.source)}`}>
                                                {getSourceIcon(msg.source)}
                                                {getSourceLabel(msg.source)}
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className={`text-xs font-medium truncate ${msg.status === 'unread' ? 'text-cyan-400' : msg.status === 'replied' ? 'text-green-400' : 'text-gray-500'}`}>
                                        {msg.status === 'replied' && '✓ '}{msg.subject}
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
                <div className="lg:col-span-7 xl:col-span-8">
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

                                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-3xl nova-gradient-bg flex items-center justify-center text-white text-2xl font-black shadow-2xl">
                                            {selectedMessage.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">{selectedMessage.name}</h2>
                                            <p className="text-cyan-400 font-mono text-xs">{selectedMessage.email}</p>
                                            {/* Source Badge */}
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border mt-2 text-[10px] font-black uppercase tracking-wider ${getSourceColor(selectedMessage.source)}`}>
                                                {getSourceIcon(selectedMessage.source)}
                                                {getSourceLabel(selectedMessage.source)}
                                            </div>
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

                                    {/* Message Content */}
                                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-gray-300 text-base leading-relaxed whitespace-pre-wrap font-medium shadow-inner mb-6">
                                        {selectedMessage.content}
                                    </div>

                                    {/* Existing Reply */}
                                    {selectedMessage.reply && (
                                        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 mb-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Admin Reply</span>
                                                {selectedMessage.repliedAt && (
                                                    <span className="text-[9px] text-gray-600 ml-auto">
                                                        {new Date(selectedMessage.repliedAt).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-green-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.reply}</p>
                                        </div>
                                    )}

                                    {/* Reply Box */}
                                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <PaperAirplaneIcon className="w-4 h-4 text-cyan-400" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                {selectedMessage.reply ? 'Update Reply' : 'Send Reply'}
                                            </span>
                                        </div>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your response here..."
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-400/30 transition-all resize-none placeholder-gray-600"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <button
                                                onClick={handleReply}
                                                disabled={!replyText.trim() || replying}
                                                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {replying ? (
                                                    <>
                                                        <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Transmit Reply <PaperAirplaneIcon className="w-3 h-3" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="w-4 h-4 text-gray-600" />
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                {new Date(selectedMessage.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${selectedMessage.status === 'unread' ? 'bg-[#B537F5] animate-pulse' :
                                                selectedMessage.status === 'replied' ? 'bg-green-500' :
                                                    'bg-gray-700'
                                                }`} />
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                {selectedMessage.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
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
