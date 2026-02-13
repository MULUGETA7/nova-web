import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    DocumentDuplicateIcon,
    GlobeAltIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PageList = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/pages`);
            setPages(response.data);
        } catch (error) {
            setError('Neural scan failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to de-materialize this page?')) return;

        setDeletingId(id);
        try {
            await axios.delete(`${API_BASE_URL}/api/pages/${id}`);
            setPages(pages.filter((item) => item._id !== id));
        } catch (error) {
            setError('Operation failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setDeletingId(null);
        }
    };

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Block */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">
                            Page <span className="nova-gradient-text uppercase">Management</span>
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Dynamic Content & Structure Control</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-white">
                        <div className="relative group flex-1 min-w-[300px]">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-[#00F0FF] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search page spectrum..."
                                className="w-full pl-11 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 focus:border-[#00F0FF]/40 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => navigate('/admin/pages/add')}
                            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden whitespace-nowrap"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Manifest Page
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-8 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3">
                        <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {/* Pages Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                    {filteredPages.map((page) => (
                        <motion.div
                            key={page._id}
                            variants={item}
                            className="glass-card rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[#00F0FF]/10 transition-colors">
                                        <GlobeAltIcon className="w-8 h-8 text-gray-400 group-hover:text-[#00F0FF]" />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/pages/edit/${page._id}`)}
                                            className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(page._id)}
                                            className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                        >
                                            {deletingId === page._id ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <TrashIcon className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#B537F5] transition-colors tracking-tighter italic uppercase">
                                    {page.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                        /{page.slug}
                                    </span>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                                            <DocumentDuplicateIcon className="w-3 h-3" />
                                            Sections: {Object.keys(page.content || {}).length}
                                        </span>
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">
                                            Images: {page.sectionImages?.length || 0}
                                        </span>
                                    </div>

                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest opacity-50">
                                        ID: {page._id.slice(-6).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredPages.length === 0 && !loading && (
                        <div className="col-span-full py-32 text-center">
                            <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                <GlobeAltIcon className="w-12 h-12 text-gray-700" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-400 tracking-tighter italic uppercase">Void <span className="text-gray-600 font-light not-italic">Detected</span></h3>
                            <p className="text-gray-600 text-[10px] mt-4 uppercase tracking-[0.3em] font-black">No pages match your search criteria</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PageList;
