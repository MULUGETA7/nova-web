import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Profile = () => {
    // const navigate = useNavigate();
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        content: ''
    });

    const [sessionData] = useState({
        sessionID: Math.random().toString(36).substring(2, 10).toUpperCase(),
        platform: navigator.platform,
        encryption: 'RSA-4096'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await axios.post(`${API_URL}/api/messages`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', content: '' });
        } catch (error) {
            console.error('Submission failed:', error);
            setStatus('error');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <div className="min-h-screen pt-32 pb-12 px-6 bg-[#020202] relative overflow-hidden">
            {/* Holographic Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FF1CF7]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00F0FF]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10"
            >
                {/* Left Column: Form Section */}
                <motion.div variants={itemVariants} className="lg:col-span-12 mb-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 nova-glow" />
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Intelligence Uplink Protocol</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-[0.9]">
                        How can we <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF]">Optimize</span> you?
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="lg:col-span-8">
                    <div className="glass-card rounded-[3rem] p-10 border border-white/5 relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-20 text-center"
                                >
                                    <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                                        <Icon icon="ph:check-circle-bold" className="text-green-500 text-5xl" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Transmission Received</h2>
                                    <p className="text-gray-400 max-w-md mx-auto mb-10">Your intelligence data has been successfully indexed. Our agents will process the uplink shortly.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform"
                                    >
                                        Send New Uplink
                                    </button>
                                </motion.div>
                            ) : (
                                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Identity Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter full name..."
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-cyan-400/30 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Neural Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="Enter email address..."
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-cyan-400/30 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Transmission Subject</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="What is the nature of your inquiry?"
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-cyan-400/30 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Deep Content</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Provide detailed intelligence parameters..."
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-6 py-6 text-white text-sm outline-none focus:border-cyan-400/30 transition-all font-medium resize-none shadow-inner"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full group relative py-5 bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-2xl overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                                    >
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                                        <span className="relative z-10 text-black font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3">
                                            {status === 'sending' ? (
                                                <>Processing Uplink <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /></>
                                            ) : (
                                                <>Initialize Transmission <Icon icon="ph:arrow-right-bold" className="text-lg" /></>
                                            )}
                                        </span>
                                    </button>

                                    {status === 'error' && (
                                        <p className="text-center text-red-500 text-[10px] font-bold uppercase tracking-widest animate-shake">Uplink Failed (Error 500) • Please retry.</p>
                                    )}
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Right Column: Meta Info */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
                    {/* Connection Stats */}
                    <div className="glass-card rounded-[2.5rem] p-8 bg-white/[0.02] border border-white/5 relative group">
                        <div className="absolute -top-12 -right-12 text-[120px] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.03] transition-colors">OS</div>
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Icon icon="ph:fingerprint-bold" className="text-cyan-400" />
                            Session Metadata
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Node Cluster', value: 'Main-7' },
                                { label: 'Session ID', value: sessionData.sessionID },
                                { label: 'Protocol', value: sessionData.encryption },
                                { label: 'Platform', value: sessionData.platform }
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-none">
                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</span>
                                    <span className="text-[10px] text-white font-bold tracking-tighter">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direct Contacts */}
                    <div className="glass-card rounded-[2.5rem] p-8 bg-gradient-to-br from-cyan-400/5 to-transparent border border-cyan-400/10">
                        <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Icon icon="ph:broadcast-bold" />
                            Alternative Uplinks
                        </h3>
                        <div className="space-y-4">
                            {[
                                { icon: 'ph:envelope-bold', label: 'Inquiries', value: 'intel@nova-matrix.ai' },
                                { icon: 'ph:chat-circle-bold', label: 'Discord', value: 'Nova-Matrix-HQ' }
                            ].map((channel, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition-all">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-cyan-400/30">
                                        <Icon icon={channel.icon} className="text-white text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{channel.label}</p>
                                        <p className="text-xs text-white font-medium">{channel.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-[8px] text-center text-gray-700 font-bold uppercase tracking-[0.3em] px-10">
                        Authorization required for deep cluster access. All transmissions are scanned by Matrix Firewall.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Profile;
