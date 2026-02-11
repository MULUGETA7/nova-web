import React from 'react';
import './FooterLinks.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  const footerSections = [
    {
      title: "Nova Ecosystem",
      icon: "ph:planet-bold",
      links: [
        { text: "Individuals", url: "/individuals", icon: "ph:user-bold" },
        { text: "Enterprises", url: "/enterprises", icon: "ph:buildings-bold" },
        { text: "Developers", url: "/developers", icon: "ph:code-bold" },
      ]
    },
    {
      title: "Nova Flow",
      icon: "ph:waves-bold",
      links: [
        { text: "AI Workspace", url: "/workspace", icon: "ph:cpu-bold" },
        { text: "Collaborative Tools", url: "/tools", icon: "ph:users-three-bold" },
        { text: "Integration SDK", url: "/sdk", icon: "ph:plug-connected-bold" },
      ]
    },
    {
      title: "Community",
      icon: "ph:users-bold",
      links: [
        { text: "Event Calendar", url: "/events", icon: "ph:calendar-blank-bold" },
        { text: "Forums", url: "/forums", icon: "ph:chat-centered-text-bold" },
        { text: "Hackathons", url: "/hackathons", icon: "ph:trophy-bold" },
      ]
    },
    {
      title: "About Us",
      icon: "ph:info-bold",
      links: [
        { text: "Our Team", url: "/about-us#team", icon: "ph:users-four-bold" },
        { text: "Our Services", url: "/service", icon: "ph:handshake-bold" },
        { text: "About the company", url: "/about-us", icon: "ph:briefcase-bold" },
      ]
    }
  ];

  return (
    <footer className="footer-container py-20 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
          {/* Logo & Social Section */}
          <div className="lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="group mb-8 block">
              <img
                src="/logo.png"
                alt="Nova Logo"
                className="h-10 w-auto filter drop-shadow-[0_0_10px_rgba(0,240,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300"
              />
            </Link>

            <p className="text-gray-500 text-sm mb-8 max-w-xs font-medium leading-relaxed">
              Advancing human intelligence through decentralized AI protocols and immersive neural interfaces.
            </p>

            <div className="flex gap-4 items-center mb-8">
              {[
                { icon: "line-md:twitter-x", url: "https://twitter.com/novalabs" },
                { icon: "line-md:telegram", url: "https://t.me/novalabs" },
                { icon: "ic:twotone-discord", url: "https://discord.gg/novalabs" },
                { icon: "mdi:linkedin", url: "https://linkedin.com/company/novalabs" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <Icon icon={social.icon} width="20" height="20" />
                </a>
              ))}
            </div>

            <a
              href="/channels"
              className="flex items-center gap-2 group text-xs font-black text-cyan-400 uppercase tracking-[0.2em] hover:text-white transition-colors"
            >
              Official Channels
              <Icon icon="ph:arrow-up-right-bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Links Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3">
                  <Icon icon={section.icon} className="text-purple-500 w-5 h-5" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        to={link.url}
                        className="group flex items-center gap-3 text-gray-500 hover:text-white transition-all duration-200"
                      >
                        <div className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-cyan-400 group-hover:scale-150 transition-all duration-300" />
                        <span className="text-sm font-medium">{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            © 2026 Nova Labs. All interfaces encrypted.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[10px] font-bold text-gray-700 hover:text-gray-400 uppercase tracking-widest transition-colors">Privacy Protocol</Link>
            <Link to="/terms" className="text-[10px] font-bold text-gray-700 hover:text-gray-400 uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLinks;
