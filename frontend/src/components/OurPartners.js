import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './OurPartners.css';

const OurPartners = () => {
  const [partners, setPartners] = useState([]); // State for partner data
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const visibleCards = 5; // Show 5 cards at a time

  // Fetch data from the backend API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/partner`);
        if (!response.data) {
          setPartners([])
        }
        setPartners(response.data); // Update state with fetched data
        setIsLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching partners:', error);
        setError(error.message); // Set error message
        setIsLoading(false); // Set loading to false
      }
    };

    fetchPartners(); // Fetch data on component mount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= partners.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? partners.length - visibleCards : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div className="partners-section">Loading partners...</div>;
  }

  if (error) {
    return <div className="partners-section">Error: {error}</div>;
  }

  return (
    <div className="partners-section">
      <div className="partners-header">
        <div className="partners-controls">
          <button
            onClick={prevSlide}
            className="control-button"
            aria-label="Previous partners"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="control-button"
            aria-label="Next partners"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="view-all-button">
            View All
          </button>
        </div>
      </div>
      <div className="partners-carousel">
        <div
          className="partners-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
          }}
        >
          {partners.map((partner) => {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const imageUrl = `${apiUrl}${partner.logo}`; // Construct the full URL
            return (
              <div key={partner._id} className="partner-card">
                <div className="partner-logo">
                  <img src={imageUrl} alt={partner.name} />
                </div>
                <div className="partner-info w-[97%] h-[80px] py-auto mb-1 text-clip-1 p-4 mx-1">
                  <h3 style={{ fontSize: '16px', lineHeight: '1.2' }} className="font-medium">{partner.name}</h3>
                  <p style={{ fontSize: '12px', lineHeight: '1.2' }} className="text-gray-500">{partner.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurPartners;