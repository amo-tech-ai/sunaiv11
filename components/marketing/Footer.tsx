
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS, ROUTES } from '../../constants';

const Footer: React.FC = () => {
  const getNewWizardRoute = () => {
    const tempId = Math.random().toString(36).substr(2, 9);
    return ROUTES.PROJECT_WIZARD(tempId);
  };

  const footerNavigation = [
    { 
      label: 'Navigation', 
      links: [
        { label: 'Home', path: '/' },
        { label: 'Expertise', path: '#expertise' },
        { label: 'Methodology', path: '#methodology' },
        { label: 'Tech Stack', path: '#tech-stack' }
      ] 
    },
    { 
      label: 'Platform', 
      links: [
        { label: 'Dashboard', path: ROUTES.PROJECTS },
        { label: 'New Wizard', path: getNewWizardRoute() },
        { label: 'Architecture', path: '/architecture' },
        { label: 'Intelligence', path: '#' }
      ] 
    },
    { 
      label: 'Global', 
      links: [
        { label: 'London Office', path: '#' },
        { label: 'Paris HQ', path: '#' },
        { label: 'NYC Signal', path: '#' },
        { label: 'San Francisco', path: '#' }
      ] 
    }
  ];

  return (
    <footer className="bg-[#0A1628] py-20 text-slate-400 border-t border-white/5">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-white">
            <ICONS.Zap className="w-6 h-6" />
            <span className="text-xl font-black tracking-tighter uppercase">Sun AI</span>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            Architecting the future of agency operations through structured AI logic and human-in-the-loop safety.
          </p>
        </div>

        {footerNavigation.map((col, i) => (
          <div key={i}>
            <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-8">{col.label}</h5>
            <ul className="space-y-4">
              {col.links.map(link => (
                <li key={link.label}>
                  {link.path.startsWith('#') || link.path === '#' ? (
                    <a href={link.path} className="text-xs font-bold hover:text-emerald-400 transition-colors">{link.label}</a>
                  ) : (
                    <Link to={link.path} className="text-xs font-bold hover:text-emerald-400 transition-colors">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-8 pt-20 flex flex-col md:flex-row items-center justify-between border-t border-white/5 mt-20">
        <p className="text-[10px] font-black uppercase tracking-widest">© 2024 Sun AI Agency Platform. All Signals Reserved.</p>
        <div className="flex items-center space-x-8 mt-6 md:mt-0 text-[10px] font-black uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Ops</a>
          <a href="#" className="hover:text-white transition-colors">Status: Online</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
