
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ICONS, ROUTES } from '../../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Architecture', href: '#/architecture' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 py-6 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-4' : 'bg-transparent'}`}>
      <div className="container mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <ICONS.Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Sun AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <Link to={ROUTES.LOGIN} className="text-[11px] font-black uppercase tracking-widest text-slate-900">Login</Link>
          <Link 
            to={ROUTES.PROJECTS} 
            className="px-6 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 active:scale-95"
          >
            Start Project
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
