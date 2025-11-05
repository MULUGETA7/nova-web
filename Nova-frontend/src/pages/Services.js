import React from 'react';
import './Services.css'; // Ensure this CSS file is imported
import servicesImage from '../assets/images/services.jpg'; // Import the image

const Services = () => {
  const services = [
    {
      title: '3D Software Development',
      description: 'We create immersive 3D software solutions tailored to your needs.',
      icon: '🧊', // Replace with an icon or image
    },
    {
      title: 'Designing',
      description: 'Our designs are modern, user-friendly, and visually stunning.',
      icon: '🎨', // Replace with an icon or image
    },
    {
      title: 'AI-Based Websites',
      description: 'Build intelligent websites powered by cutting-edge AI technology.',
      icon: '🤖', // Replace with an icon or image
    },
  ];

  return (
    <div className="services-container">
      {/* Hero Banner Section */}
      <div className="service-banner">
        <img 
          src={servicesImage} 
          alt="Services Banner" 
          className="service-banner-image"
        />
        <div className="service-banner-overlay">
          <h1 className="service-header">Our Services</h1>
          <p className="service-description">
            Empowering your business with innovative solutions and cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">
              <span className="gradient-text">{service.title}</span>
            </h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;