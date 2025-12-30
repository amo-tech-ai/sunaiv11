
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useParams, Link } from 'react-router-dom';
import { ICONS, ROUTES } from '../constants';
import { Project } from '../types';
import GlobalAgentTicker from '../components/automation/GlobalAgentTicker';

const PROJECTS_STORAGE_KEY = 'sunai_projects_db';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    const urlId = params.projectId;
    if (urlId) {
      setActiveProjectId(urlId);
      localStorage.setItem('sunai_last_project_id', urlId);
    } else {
      const savedId = localStorage.getItem('sunai_last_project_id');
      if (savedId) setActiveProjectId(savedId);
    }
  }, [params.projectId]);

  const getWizardPath = () => {
    if (activeProjectId) return ROUTES.PROJECT_WIZARD(activeProjectId);
    const newId = Math.random().toString(36).substr(2, 9);
    return ROUTES.PROJECT_WIZARD(newId);
  };

  const getLinkClass = (isActive: boolean, isDisabled: boolean = false) => {
    if (isDisabled) return "flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 cursor-not-allowed opacity-50";
    return `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 font-bold' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0 shadow-sm">
        <div className="p-8 border-b border-slate-100">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
              <ICONS.Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase">Sun AI</h1>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2 block">Agency Suite</span>
            <NavLink to="/app/projects" className={({ isActive }) => getLinkClass(isActive && location.pathname === '/app/projects')}>
              <ICONS.Layout className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Projects</span>
            </NavLink>
            <NavLink to="/app/research" className={({ isActive }) => getLinkClass(isActive && location.pathname === '/app/research')}>
              <ICONS.Search className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Research Lab</span>
            </NavLink>
            <NavLink to="/app/crm" className={({ isActive }) => getLinkClass(isActive && location.pathname === '/app/crm')}>
              <ICONS.Users className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">CRM</span>
            </NavLink>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Context</span>
            </div>
            <NavLink to={getWizardPath()} className={({ isActive }) => getLinkClass(isActive && location.pathname.includes('wizard'))}>
              <ICONS.Zap className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Architect</span>
            </NavLink>
            <NavLink to={activeProjectId ? ROUTES.PROJECT_EXECUTION(activeProjectId) : '#'} className={({ isActive }) => getLinkClass(isActive && location.pathname.includes('execution'), !activeProjectId)} onClick={(e) => !activeProjectId && e.preventDefault()}>
              <ICONS.Clipboard className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Execution</span>
            </NavLink>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tighter">John Doe</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Principal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white md:bg-slate-50/30 pb-12">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>App</span>
            <span>/</span>
            <span className="text-slate-900">{location.pathname.split('/').pop()}</span>
          </div>
        </header>

        <div className="flex-1 p-10 min-h-0">
          <Outlet />
        </div>
      </main>

      <GlobalAgentTicker />
    </div>
  );
};

export default MainLayout;
