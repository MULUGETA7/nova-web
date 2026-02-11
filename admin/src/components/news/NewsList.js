import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  CalendarDaysIcon,
  TagIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/news`);
      setNews(response.data);
    } catch (error) {
      setError('Intelligence retrieval failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to de-index this intelligence report?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE_URL}/api/news/${id}`);
      setNews(news.filter((item) => item._id !== id));
    } catch (error) {
      setError('Operation failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ['All', 'Technology', 'Company News', 'Events', 'Partnership'];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Technology': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'Company News': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Events': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Partnership': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              INTELLIGENCE <span className="nova-gradient-text uppercase">Archive</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Global News & Publication Management</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group flex-1 min-w-[300px]">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Scan intelligence stream..."
                className="w-full pl-11 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => navigate('/news/add')}
              className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              <PlusIcon className="w-4 h-4" />
              Initialize Article
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
                ${filterCategory === cat
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-8 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* News Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredNews.map((article) => (
            <motion.div
              key={article._id}
              variants={item}
              className="glass-card rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`${API_BASE_URL}${article.imageUrl}`}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => navigate(`/news/edit/${article._id}`)}
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="p-3 rounded-xl bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"
                  >
                    {deletingId === article._id ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <TrashIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 flex flex-col gap-3">
                  <div className={`w-fit px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDaysIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.15em]">
                    {new Date(article.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 line-clamp-2 min-h-[3.5rem] group-hover:text-cyan-400 transition-colors tracking-tight">
                  {article.title}
                </h3>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                    <TagIcon className="w-3 h-3" />
                    Archive ID: {article._id.slice(-6).toUpperCase()}
                  </span>

                  <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredNews.length === 0 && !loading && (
            <div className="col-span-full py-32 text-center">
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <NewspaperIcon className="w-12 h-12 text-gray-700" />
              </div>
              <h3 className="text-2xl font-black text-gray-400 tracking-tighter italic uppercase">Zero <span className="text-gray-600 font-light not-italic">Intelligence Found</span></h3>
              <p className="text-gray-600 text-[10px] mt-4 uppercase tracking-[0.3em] font-black">Adjust your filters or initiate a new article transmission</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsList;