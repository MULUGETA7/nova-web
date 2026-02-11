import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
    CloudArrowUpIcon,
    BuildingOfficeIcon,
    InformationCircleIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        logo: null
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/clients`);
            setClients(response.data || []);
        } catch (err) {
            setError('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setFormData({
            name: '',
            logo: null
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const data = new FormData();
        data.append('name', formData.name);
        if (!formData.logo) {
            setError('Logo is required');
            setSaving(false);
            return;
        }
        data.append('logo', formData.logo);

        try {
            await axios.post(`${API_BASE_URL}/api/clients`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setModalOpen(false);
            fetchClients();
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this client logo?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/clients/${id}`);
                fetchClients();
            } catch (err) {
                setError('Failed to delete item');
            }
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight italic">
                            CLIENT <span className="nova-gradient-text uppercase">Vault</span>
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Logo Wall Management</p>
                    </div>

                    <button
                        onClick={handleOpenModal}
                        className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <PlusIcon className="w-4 h-4" />
                        Add New Client
                    </button>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest flex items-center gap-3">
                        <InformationCircleIcon className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {/* Clients Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                >
                    {clients.map((client) => (
                        <motion.div
                            key={client._id}
                            variants={item}
                            className="group relative aspect-square glass-card rounded-3xl overflow-hidden border-white/5 hover:border-white/20 transition-all p-6 flex items-center justify-center bg-white/[0.02]"
                        >
                            <img
                                src={`${API_BASE_URL}${client.logo}`}
                                alt={client.name}
                                className="max-w-full max-h-full object-contain filter grayscale invert group-hover:grayscale-0 group-hover:invert-0 transition-all duration-500"
                            />

                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest text-center truncate w-full">
                                    {client.name}
                                </p>
                                <button
                                    onClick={() => handleDelete(client._id)}
                                    className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all border border-red-500/20"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {clients.length === 0 && !loading && (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                <BuildingOfficeIcon className="w-10 h-10 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400">Wall Empty</h3>
                            <p className="text-gray-600 text-sm mt-2">Add your first client logo to seed the broadcast.</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg glass-card rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-8 tracking-tighter italic">
                                INDEX <span className="text-gray-500 font-light uppercase">Client</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Client Entity Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-medium"
                                        placeholder="e.g. Tele Corp"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Logo Asset</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full bg-white/[0.03] border border-white/5 border-dashed group-hover:border-cyan-500/30 rounded-2xl py-8 flex flex-col items-center justify-center transition-all">
                                            <CloudArrowUpIcon className="w-8 h-8 text-gray-600 group-hover:text-cyan-400 transition-colors mb-2" />
                                            <span className="text-xs font-bold text-gray-500">
                                                {formData.logo ? formData.logo.name : 'Upload PNG/SVG logo'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full py-5 mt-4 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
                                >
                                    {saving ? 'Syncing...' : 'Add to Wall'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminClients;
