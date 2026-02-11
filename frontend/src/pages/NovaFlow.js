import React from 'react';
import './NovaFlow.css'; // Ensure this path is correct

const NovaFlow = () => {
  const features = [
    {
      icon: '🚀', // Replace with an icon or image
      title: 'Seamless Integration',
      description: 'Easily integrate Nova Flow with your existing systems for maximum efficiency.',
    },
    {
      icon: '📊', // Replace with an icon or image
      title: 'Real-Time Analytics',
      description: 'Get real-time insights and make data-driven decisions effortlessly.',
    },
    {
      icon: '🔒', // Replace with an icon or image
      title: 'Secure & Reliable',
      description: 'Our platform ensures top-notch security and reliability for your data.',
    },
  ];

  return (
    <div className="nova-flow-container">
      {/* Flow Banner Section */}
      <div className="flow-banner">
        <div className="flow-banner-content">
          <h1 className="flow-banner-title">Welcome to Nova Flow</h1>
          <p className="flow-banner-description">
            Revolutionize your workflow with our cutting-edge platform designed for efficiency and innovation.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">Why Choose Nova Flow?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovaFlow;