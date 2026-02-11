import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import NewsModal from './NewsModal';
import { ANIMATIONS } from '../constants';

const LatestNews = () => {
  const scrollContainerRef = useRef(null);
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch news items from the API
  useEffect(() => {
    fetch(`${apiUrl}/api/news`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched news items:', data); // Debugging: Log fetched data
        setNewsItems(data);
      })
      .catch(error => console.error('Error fetching news:', error));
  }, [apiUrl]);

  // Scroll left function
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full bg-black py-8 sm:py-12 md:py-16 lg:py-20">
      {/* News Modal */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}

      {/* News Header with Navigation */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-6 px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
          <motion.div
            {...ANIMATIONS.fadeIn}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 text-white`}>
              LATEST NEWS
            </h2>
          </motion.div>

          <div className="flex items-center space-x-4 p-4">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 
              transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 
              transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              href="#"
              className="bg-white/10 hover:bg-white/20 rounded-full px-3 py-2 
              text-white text-sm font-medium transition-all duration-300 ease-in-out"
            >
              View All
            </button>
          </div>
        </div>

        {/* News Items Scroll */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto no-scrollbar flex items-center gap-4 py-4 scroll-smooth w-full px-4 sm:px-6 md:px-8 lg:px-12"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: '75%'
            }}
          >
            {newsItems.map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="scroll-snap-align-start flex-shrink-0 flex items-center justify-center"
              >
                <NewsCard
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  image={`${apiUrl}${item.imageUrl}`}
                  onDoubleClick={() => setSelectedNews({
                    ...item,
                    image: `${apiUrl}${item.imageUrl}`
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;