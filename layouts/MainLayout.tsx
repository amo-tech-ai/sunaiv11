
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useParams, Link } from 'react-router-dom';
import { ICONS, ROUTES } from '../constants';
import { Project } from '../types';

const PROJECTS_STORAGE_KEY = 'sunai_projects_db';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Sync current projectId from URL to local state and storage for persistence
  useEffect(() => {
    const urlId = params.projectId;
    
    if (urlId) {
      setActiveProjectId(urlId);
      localStorage.setItem('sunai_last_project_id', urlId);
    } else {
      // 1. Try last active from session
      const savedId = localStorage.getItem('sunai_last_project_id');
      
      if (savedId) {
        setActiveProjectId(savedId);
      } else {
        // 2. Fallback: Find the most recently updated project from the DB to "unlock" the context
        const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
        if (savedProjects) {
          try {
            const projects = JSON.parse(savedProjects) as Project[];
            if (projects.length > 0) {
              // Sort by date descending
              const latest = [...projects].sort((a, b) => 
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
              )[0];
              setActiveProjectId(latest.id);
              localStorage.setItem('sunai_last_project_id', latest.id);
            }
          } catch (e) {
            console.error("Failed to find fallback project", e);
          }
        }
      }
    }
  }, [params.projectId]);

  // Helper for generating a fresh Wizard ID if none exists
  const getWizardPath = () => {
    if (activeProjectId) return ROUTES.PROJECT_WIZARD(activeProjectId);
    const newId = Math.random().toString(36).substr(2, 9);
    return ROUTES.PROJECT_WIZARD(newId);
  };

  // Helper for conditional link styling
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
      {/* LEFT PANEL: Global Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0 shadow-sm">
        <div className="p-8 border-b border-slate-100">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
              <ICONS.Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase">
              Sun AI
            </h1>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Section: Main Navigation */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2 block">Navigation</span>
            <NavLink 
              to="/app/projects" 
              className={({ isActive }) => getLinkClass(isActive && location.pathname === '/app/projects')}
            >
              <ICONS.Layout className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Projects</span>
            </NavLink>

            <NavLink 
              to="/app/crm" 
              className={({ isActive }) => getLinkClass(isActive && location.pathname === '/app/crm')}
            >
              <ICONS.Users className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">CRM</span>
            </NavLink>
          </div>

          {/* Section: Active Project Context */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Active Stream
              </span>
              {!activeProjectId && (
                <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Locked</span>
              )}
            </div>

            <NavLink 
              to={getWizardPath()} 
              className={({ isActive }) => getLinkClass(isActive && location.pathname.includes('wizard'))}
            >
              <ICONS.Search className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Architect / Wizard</span>
            </NavLink>
            
            <NavLink 
              to={activeProjectId ? ROUTES.PROJECT_INTELLIGENCE(activeProjectId) : '#'} 
              className={({ isActive }) => getLinkClass(isActive && location.pathname.includes('intelligence'), !activeProjectId)}
              onClick={(e) => !activeProjectId && e.preventDefault()}
            >
              <ICONS.Zap className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Intelligence</span>
            </NavLink>

            <NavLink 
              to={activeProjectId ? ROUTES.PROJECT_EXECUTION(activeProjectId) : '#'} 
              className={({ isActive }) => getLinkClass(isActive && location.pathname.includes('execution'), !activeProjectId)}
              onClick={(e) => !activeProjectId && e.preventDefault()}
            >
              <ICONS.Clipboard className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Execution</span>
            </NavLink>
          </div>

          {/* Section: System */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2 block">Organization</span>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <ICONS.Settings className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tighter">John Doe</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Agency Principal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN PANEL: Scoped Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white md:bg-slate-50/30">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>App</span>
              <span>/</span>
              <span className="text-slate-900">
                {location.pathname.includes('intelligence') ? 'Intelligence' : 
                 location.pathname.includes('execution') ? 'Execution' : 
                 location.pathname.includes('crm') ? 'CRM' : 
                 location.pathname.includes('wizard') ? 'Wizard' : 'Projects'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center relative cursor-pointer hover:bg-white transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
            </div>
            <div 
              onClick={() => {
                const newId = Math.random().toString(36).substr(2, 9);
                window.location.hash = `#/app/projects/${newId}/wizard`;
              }}
              className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <ICONS.Plus className="w-5 h-5" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 min-h-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
