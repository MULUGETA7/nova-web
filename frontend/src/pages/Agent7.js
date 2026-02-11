import React from 'react';
import './Agent7.css'; // Import the CSS file

const Agent7 = () => {
  const aiFeatures = [
    {
      icon: '🤖', // Replace with an icon or image
      title: 'AI-Powered Automation',
      description: 'Streamline processes and reduce manual effort with intelligent automation.',
    },
    {
      icon: '🧠', // Replace with an icon or image
      title: 'Machine Learning Models',
      description: 'Leverage advanced ML models to make data-driven decisions.',
    },
    {
      icon: '📊', // Replace with an icon or image
      title: 'Data Analytics',
      description: 'Gain actionable insights from your data with AI-driven analytics.',
    },
    {
      icon: '💬', // Replace with an icon or image
      title: 'Natural Language Processing',
      description: 'Enhance customer interactions with NLP-powered chatbots.',
    },
    {
      icon: '🛡️', // Replace with an icon or image
      title: 'AI Security',
      description: 'Protect your systems with AI-based threat detection.',
    },
    {
      icon: '🌐', // Replace with an icon or image
      title: 'AI for Web Development',
      description: 'Build smarter websites with AI-driven features.',
    },
  ];

  return (
    <div className="agent7-container">
      {/* Agent7 Banner Section */}
      <div className="agent7-banner">
        <img
          src={require('../assets/images/photo_2025-03-22_16-28-15.jpg')} // Replace with your image path
          alt="AI Integration"
          className="agent7-banner-image"
        />
        <div className="agent7-banner-content">
          <h1 className="agent7-banner-title">AI Integration in Our Services</h1>
          <p className="agent7-banner-description">
            At Nova Labs, we harness the power of Artificial Intelligence to deliver innovative and efficient solutions for your business.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="ai-features-grid">
        {aiFeatures.map((feature, index) => (
          <div key={index} className="ai-feature-card">
            <div className="ai-feature-icon">{feature.icon}</div>
            <h2 className="ai-feature-title gradient-text">{feature.title}</h2>
            <p className="ai-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agent7;