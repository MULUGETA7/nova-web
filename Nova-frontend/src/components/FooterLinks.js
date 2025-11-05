import React from 'react';
import './FooterLinks.css';
import { Icon } from '@iconify/react';

const FooterLinks = () => {
  return (
    <footer className="footer py-20">
      <div className='flex flex-col md:flex-row'>
      <div className="w-full md:w-[20%] mr-6 flex flex-col items-center md:items-start gap-4 md:gap-4">
        {/* Logo */}
        <img 
          src="/logo.svg" 
          alt="Nova Logo" 
          className="h-[40px] w-auto "
        />
        
        {/* Social Icons */}
        <div className="flex gap-4 items-center">
          <a href="https://twitter.com/novalabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Icon icon="line-md:twitter-x" width="30" height="30" />
          </a>
          <a href="https://t.me/novalabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Icon icon="line-md:telegram" width="30" height="30" />
          </a>
          <a href="https://discord.gg/novalabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Icon icon="ic:twotone-discord" width="30" height="30" />
          </a>
          <a href="https://facebook.com/novalabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Icon icon="mdi:facebook" width="30" height="30" />
          </a>  
          <a href="https://linkedin.com/company/novalabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Icon icon="mdi:linkedin" width="30" height="30" />
          </a>
        </div>

        {/* Official Channels Link - Hidden on mobile */}
        <a 
          href="#" 
          className="hidden md:flex text-gray-400 hover:text-white transition-colors items-center mt-2 text-sm"
        >
          Official Channels
          <Icon icon="mdi:arrow-top-right" width="16" height="16" />
        </a>
      </div>

      {/* Footer Links - Hidden on mobile, visible on desktop */}
      <div className="footer-grid hidden md:block">
        <div className="footer-section">
          <h3>Nova Ecosystem</h3>
          <ul>
            <li><a href="/individuals">Individuals</a></li>
            <li><a href="/enterprises">Enterprises</a></li>
            <li><a href="/developers">Developers</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Nova Flow</h3>
          <ul>
            <li><a href="/workspace">AI Workspace</a></li>
            <li><a href="/tools">Collaborative Tools</a></li>
            <li><a href="/sdk">Integration SDK</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li><a href="/events">Event Calendar</a></li>
            <li><a href="/forums">Forums</a></li>
            <li><a href="/hackathons">Hackathons</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="https://twitter.com/novacodeium" target="_blank" rel="noopener noreferrer">Our Team</a></li>
            <li><a href="https://www.linkedin.com/company/novacodeium" target="_blank" rel="noopener noreferrer">Our Services</a></li>
            <li><a href="https://discord.gg/novacodeium" target="_blank" rel="noopener noreferrer">About the company</a></li>
          </ul>
        </div>
      </div>
      </div>

    </footer>
  );
}

export default FooterLinks;
