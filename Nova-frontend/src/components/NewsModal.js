import React from 'react';
import { motion } from 'framer-motion';

const NewsModal = ({ news, onClose }) => {
  if (!news) return null;

  // Provide a default content if content is undefined
  const content = news.content || 'No additional details available.';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="relative">
          <img 
            src={news.image} // Ensure this is the correct image URL
            alt={news.title} 
            className="w-full h-[400px] object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-400 uppercase font-bold text-sm">{news.category}</span>
            <span className="text-gray-400 text-sm">{news.date}</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-6">{news.title}</h2>
          
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line leading-relaxed">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsModal;