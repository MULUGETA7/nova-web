import React from 'react';
import { motion } from 'framer-motion';

const NewsCard = ({ title, date, category, image, onDoubleClick }) => {
  return (
    <motion.div 
      onDoubleClick={onDoubleClick}
      className="flex-shrink-0 w-[250px] bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-blue-600 transition-all duration-300 group m-0.5 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="aspect-video bg-gray-800 relative overflow-hidden rounded-lg mx-2 mt-2">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-110 transition-transform duration-300 rounded-lg"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-blue-400 uppercase tracking-wider font-bold">{category}</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-xs line-clamp-2 mr-4">
            Double-click to read full article
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
