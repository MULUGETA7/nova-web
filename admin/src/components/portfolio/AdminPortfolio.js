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
  InformationCircleIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminPortfolio = () => {
  // Tabs State
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'logos'

  // Projects State
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Logo Wall State
  const [clients, setClients] = useState([]);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [savingLogo, setSavingLogo] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    url: '',
    image: null
  });

  const [logoFormData, setLogoFormData] = useState({
    name: '',
    logo: null,
    type: 'client'
  });

  const categories = ['AI Development', 'Blockchain', 'Web3', 'Web Design', 'System Architecture'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPortfolios(), fetchClients()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/portfolio`);
      setPortfolios(response.data || []);
    } catch (err) {
      setError('Failed to fetch portfolio items');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/clients`);
      setClients(response.data || []);
    } catch (err) {
      setError('Failed to fetch client logos');
    }
  };

  // Portfolio Handlers
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

  const handleDeletePortfolio = async (id) => {
    if (window.confirm('Remove this project from portfolio?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/portfolio/${id}`);
        fetchPortfolios();
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  // Client Logo Handlers
  const handleOpenLogoModal = () => {
    setLogoFormData({ name: '', logo: null, type: 'client' });
    setLogoModalOpen(true);
  };

  const handleLogoSubmit = async (e) => {
    e.preventDefault();
    setSavingLogo(true);
    setError('');

    const data = new FormData();
    data.append('name', logoFormData.name);
    data.append('type', logoFormData.type);
    if (!logoFormData.logo) {
      setError('Logo asset is required');
      setSavingLogo(false);
      return;
    }
    data.append('logo', logoFormData.logo);

    try {
      await axios.post(`${API_BASE_URL}/api/clients`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setLogoModalOpen(false);
      fetchClients();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSavingLogo(false);
    }
  };

  const handleDeleteClient = async (id) => {
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
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">
              CLIENT <span className="nova-gradient-text uppercase">Showcase</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Client Results & Success Management</p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${activeTab === 'projects' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <Squares2X2Icon className="w-4 h-4" />
              Project Cards
            </button>
            <button
              onClick={() => setActiveTab('logos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${activeTab === 'logos' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <BuildingOfficeIcon className="w-4 h-4" />
              Logo Wall
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest flex items-center gap-3">
            <InformationCircleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Tab Content: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">Active Portfolio Items</h2>
              <button
                onClick={() => handleOpenModal()}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden"
              >
                <PlusIcon className="w-4 h-4" />
                New project
              </button>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {portfolios.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemAnim}
                  className="glass-card rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-white/10 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${project.images?.[0]}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button onClick={() => handleOpenModal(project)} className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeletePortfolio(project._id)} className="p-2 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2 block">{project.category}</span>
                    <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:nova-gradient-text transition-all flex items-center gap-2">
                      {project.title}
                      {project.url && <GlobeAltIcon className="w-4 h-4 text-cyan-500" />}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 font-medium leading-relaxed">{project.description}</p>
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
        )}

        {/* Tab Content: Logos */}
        {activeTab === 'logos' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">Network Logo Wall</h2>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Collaborations</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleOpenLogoModal}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden"
              >
                <PlusIcon className="w-4 h-4" />
                Add Logo Asset
              </button>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {clients.map((client) => (
                <motion.div
                  key={client._id}
                  variants={itemAnim}
                  className={`group relative aspect-square glass-card rounded-3xl overflow-hidden border-white/5 hover:border-white/20 transition-all p-6 flex items-center justify-center bg-white/[0.02] 
                    ${client.type === 'partner' ? 'border-purple-500/20' : ''}`}
                >
                  {client.type === 'partner' && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[6px] font-black uppercase">PARTNER</div>
                  )}
                  <img
                    src={`${API_BASE_URL}${client.logo}`}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale invert group-hover:grayscale-0 group-hover:invert-0 transition-all duration-500"
                  />
                  <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleDeleteClient(client._id)}
                      className="w-full py-2 rounded-xl bg-red-500 text-white text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                    >
                      <TrashIcon className="w-3 h-3" />
                      Delete
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
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl glass-card rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"><XMarkIcon className="w-6 h-6" /></button>
              </div>
              <h2 className="text-3xl font-black text-white mb-8 tracking-tighter italic">
                {editingItem ? 'REFINE' : 'INITIALIZE'} <span className="text-gray-500 font-light uppercase">Project</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Project Identifier</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-medium" placeholder="Project Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Domain Classification</label>
                  <select required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white appearance-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Brief Abstract</label>
                  <textarea rows="3" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white resize-none" placeholder="Describe the project..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Live Interface Link (URL)</label>
                  <input type="url" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" placeholder="https://example.com" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Visual Proof (Cover)</label>
                  <div className="relative group">
                    <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full bg-white/[0.03] border border-white/5 border-dashed rounded-2xl py-8 flex flex-col items-center justify-center transition-all">
                      <CloudArrowUpIcon className="w-8 h-8 text-gray-600" />
                      <span className="text-xs font-bold text-gray-500">{formData.image ? formData.image.name : 'Upload visual media'}</span>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={uploading} className="w-full py-5 mt-4 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs">
                  {uploading ? 'Synching Matrix...' : (editingItem ? 'Update Instance' : 'Finalize Broadcast')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logo Modal */}
      <AnimatePresence>
        {logoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLogoModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg glass-card rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <button onClick={() => setLogoModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"><XMarkIcon className="w-6 h-6" /></button>
              </div>
              <h2 className="text-3xl font-black text-white mb-8 tracking-tighter italic">
                INDEX <span className="text-gray-500 font-light uppercase">Client</span>
              </h2>
              <form onSubmit={handleLogoSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Entity Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" placeholder="e.g. Tele Corp" value={logoFormData.name} onChange={(e) => setLogoFormData({ ...logoFormData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Classification</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white appearance-none"
                      value={logoFormData.type}
                      onChange={(e) => setLogoFormData({ ...logoFormData, type: e.target.value })}
                    >
                      <option value="client">Our Global Network (Client)</option>
                      <option value="partner">Our Collaboration (Partner)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Logo Asset</label>
                  <div className="relative group">
                    <input type="file" onChange={(e) => setLogoFormData({ ...logoFormData, logo: e.target.files[0] })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full bg-white/[0.03] border border-white/5 border-dashed rounded-2xl py-8 flex flex-col items-center justify-center transition-all">
                      <CloudArrowUpIcon className="w-8 h-8 text-gray-600 mb-2" />
                      <span className="text-xs font-bold text-gray-500">{logoFormData.logo ? logoFormData.logo.name : 'Upload PNG/SVG logo'}</span>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={savingLogo} className="w-full py-5 mt-4 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs">
                  {savingLogo ? 'Syncing...' : 'Add to Wall'}
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