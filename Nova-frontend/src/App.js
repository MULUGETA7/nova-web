import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ImageComponent from './components/ImageComponent';
import NovaLabsIntro from './components/NovaLabsIntro';
import WhyChooseUs from './components/WhyChooseUs';
import Navbar from './components/navbar/Navbar';

// Lazy load heavy components for better performance
const Portfolio = lazy(() => import('./components/Portfolio'));
const OurPartners = lazy(() => import('./components/OurPartners'));
const OurClient = lazy(() => import('./components/OurClient'));
const HackatonShow = lazy(() => import('./components/HackatonShow'));
const TechStack = lazy(() => import('./components/TechStack'));
const Ai = lazy(() => import('./components/Ai'));
const LatestNews = lazy(() => import('./components/LatestNews'));
const WorldMap = lazy(() => import('./components/WorldMap'));
const FooterLinks = lazy(() => import('./components/FooterLinks'));

// Lazy load pages
const Services = lazy(() => import('./pages/Services'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Works = lazy(() => import('./pages/Works'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full py-8 flex items-center justify-center">
    <div className="animate-pulse text-cyan-400">Loading...</div>
  </div>
);

const App = () => {
  return (
    <Router>
      {/* Components displayed everywhere */}
      <Navbar />

      {/* Main content */}
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={
              <div>
                {/* Load immediately - Critical content */}
                <ImageComponent />
                <div className="relative mt-0">
                  <NovaLabsIntro />
                  <WhyChooseUs />
                  
                  {/* Lazy loaded components - Load on demand */}
                  <Suspense fallback={<LoadingFallback />}>
                    <Portfolio />
                  </Suspense>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <OurPartners />
                  </Suspense>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <OurClient />
                  </Suspense>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <HackatonShow />
                  </Suspense>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <TechStack />
                  </Suspense>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <Ai />
                  </Suspense>
                  
                  {/* Latest News - Hidden for now, can be activated later */}
                  {/* <div className="hidden md:block">
                    <Suspense fallback={<LoadingFallback />}>
                      <LatestNews />
                    </Suspense>
                  </div> */}
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <WorldMap />
                  </Suspense>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <FooterLinks />
                  </Suspense>
                </div>
              </div>
            }
          />
          {/* Other Pages - All lazy loaded */}
          {/* Nova Creative - Redirects to home page */}
          <Route path="/nova-creative" element={<Navigate to="/" replace />} />
          {/* Nova Flow - Redirects to home page */}
          <Route path="/nova-flow" element={<Navigate to="/" replace />} />
          {/* Agent 7 - Redirects to home page */}
          <Route path="/agent-7" element={<Navigate to="/" replace />} />
          <Route path="/service" element={<Suspense fallback={<LoadingFallback />}><Services /></Suspense>} />
          <Route path="/about-us" element={<Suspense fallback={<LoadingFallback />}><AboutUs /></Suspense>} />
          <Route path="/works" element={<Suspense fallback={<LoadingFallback />}><Works /></Suspense>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;