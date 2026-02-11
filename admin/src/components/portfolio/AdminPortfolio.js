import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  GlobeAltIcon,
  PhotoIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  FolderIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminPortfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    url: '',
    image: null
  });

  const categories = ['AI Development', 'Blockchain', 'Web3', 'Web Design', 'System Architecture'];

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/portfolio`);
      setPortfolios(response.data || []);
    } catch (err) {
      setError('Failed to fetch portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        category: item.category || '',
        description: item.description || '',
        url: item.url || '',
        image: null
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        url: '',
        image: null
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('url', formData.url);
    if (formData.image) {
      data.append('images', formData.image);
    }

    try {
      if (editingItem) {
        await axios.put(`${API_BASE_URL}/api/portfolio/${editingItem._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        if (!formData.image) throw new Error('Cover image is required');
        await axios.post(`${API_BASE_URL}/api/portfolio`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setModalOpen(false);
      fetchPortfolios();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this project from portfolio?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/portfolio/${id}`);
        fetchPortfolios();
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
              PORTFOLIO <span className="nova-gradient-text uppercase">Curator</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Project Showcase Management</p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <PlusIcon className="w-4 h-4" />
            New Project
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest flex items-center gap-3">
            <InformationCircleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {portfolios.map((project) => (
            <motion.div
              key={project._id}
              variants={item}
              className="glass-card rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${API_BASE_URL}${project.images[0]}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:nova-gradient-text transition-all flex items-center gap-2">
                  {project.title}
                  {project.url && <GlobeAltIcon className="w-4 h-4 text-cyan-500" />}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 font-medium leading-relaxed">
                  {project.description || 'System core integration project within Nova Labs ecosystem.'}
                </p>
              </div>
            </motion.div>
          ))}

          {portfolios.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <PhotoIcon className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-400">Vault Empty</h3>
              <p className="text-gray-600 text-sm mt-2">Initialize your first portfolio project to begin.</p>
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
              className="relative w-full max-w-xl glass-card rounded-[3rem] p-10 shadow-2xl overflow-hidden"
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
                {editingItem ? 'REFINE' : 'INITIALIZE'} <span className="text-gray-500 font-light uppercase">Project</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Project Identifier</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-medium"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Domain Classification</label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all font-medium appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="" className="bg-[#0a0a0a] text-gray-500">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-[#0a0a0a] text-white py-2">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Brief Abstract</label>
                  <textarea
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-medium resize-none"
                    placeholder="Describe the integration..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Live Interface Link (URL)</label>
                  <input
                    type="url"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-medium"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  />
                </div>



                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Visual Proof (Cover)</label>
                  <div className="relative group">
                    <input
                      type="file"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-white/[0.03] border border-white/5 border-dashed group-hover:border-cyan-500/30 rounded-2xl py-8 flex flex-col items-center justify-center transition-all">
                      <CloudArrowUpIcon className="w-8 h-8 text-gray-600 group-hover:text-cyan-400 transition-colors mb-2" />
                      <span className="text-xs font-bold text-gray-500">
                        {formData.image ? formData.image.name : 'Drop visual media or click to scan'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-5 mt-4 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  {uploading ? 'Synching Matrix...' : (editingItem ? 'Update Instance' : 'Finalize Broadcast')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPortfolio;