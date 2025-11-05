import React from 'react';
import './NovaCreative.css'; // Import the CSS file

const NovaCreative = () => {
  const creativeProcess = [
    {
      icon: '💡', // Replace with an icon or image
      title: 'Innovative Ideas',
      description: 'We brainstorm and craft unique solutions tailored to your needs.',
    },
    {
      icon: '🎨', // Replace with an icon or image
      title: 'User-Centric Designs',
      description: 'Our designs prioritize user experience and functionality.',
    },
    {
      icon: '🚀', // Replace with an icon or image
      title: 'Cutting-Edge Technology',
      description: 'We leverage the latest tools and technologies for exceptional results.',
    },
    {
      icon: '🤝', // Replace with an icon or image
      title: 'Collaborative Approach',
      description: 'We work closely with you to bring your vision to life.',
    },
  ];

  return (
    <div className="nova-creative-container">
      {/* Banner Section */}
      <div className="creative-banner">
        <div className="banner-content">
          <h1 className="banner-title">Unleashing Creative Excellence</h1>
          <p className="banner-description">
            At Nova Labs, we transform ideas into stunning realities with innovation and precision.
          </p>
        </div>
      </div>

      {/* Icon Cards Section */}
      <div className="creative-process">
        <h2 className="process-title">Our Creative Process</h2>
        <div className="process-grid">
          {creativeProcess.map((process, index) => (
            <div key={index} className="process-card">
              <div className="process-icon">{process.icon}</div>
              <h3 className="process-card-title">{process.title}</h3>
              <p className="process-card-description">{process.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovaCreative;