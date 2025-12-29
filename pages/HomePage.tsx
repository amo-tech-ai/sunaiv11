
import React from 'react';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import Hero from '../components/marketing/Hero';
import Methodology from '../components/marketing/Methodology';
import Expertise from '../components/marketing/Expertise';
import TechStack from '../components/marketing/TechStack';
import Metrics from '../components/marketing/Metrics';
import CTA from '../components/marketing/CTA';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <Hero />
      <Methodology />
      <Expertise />
      <TechStack />
      <Metrics />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
