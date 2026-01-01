
import React, { useEffect, useState, useCallback } from 'react';
import { Outlet, NavLink, useLocation, useParams, Link } from 'react-router-dom';
import { ICONS, ROUTES } from '../constants';
import { supabaseService } from '../services/supabaseService';

const ID_REGEX = /^[A-Za-z0-9_-]{4,32}$/;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { projectId: urlProjectId } = useParams<{ projectId: string }>();
  
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  /**
   * RESOLVER: Logic to determine which ID is the source of truth
   * Hierarchy: URL > Storage > Null
   */
  const resolveContext = useCallback(async (id: string | null, isFromUrl: boolean) => {
    if (!id || !ID_REGEX.test(id)) {
      setActiveProjectId(null);
      setIsUnauthorized(false);
      return;
    }

    setIsValidating(true);
    // AUTHORIZATION GUARD: Confirm project exists in user's tenant
    const hasAccess = await supabaseService.verifyProjectAccess(id);
    
    if (hasAccess) {
      setActiveProjectId(id);
      setIsUnauthorized(false);
      localStorage.setItem('sunai_last_project_id', id);
    } else {
      if (isFromUrl) {
        setActiveProjectId(id);
        setIsUnauthorized(true);
      } else {
        setActiveProjectId(null);
        setIsUnauthorized(false);
        localStorage.removeItem('sunai_last_project_id');
      }
    }
    setIsValidating(false);
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem('sunai_last_project_id');
    
    if (urlProjectId) {
      resolveContext(urlProjectId, true);
    } else if (storedId && !activeProjectId) {
      resolveContext(storedId, false);
    }
  }, [urlProjectId, resolveContext, activeProjectId]);

  const handleCopyId = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!activeProjectId) return;
    navigator.clipboard.writeText(activeProjectId);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const getPageName = () => {
    const segments = location.pathname.split('/');
    const last = segments[segments.length - 1];
    if (last === 'projects') return 'Projects';
    if (last === 'crm') return 'Insights';
    if (last === 'research') return 'Research';
    if (last === 'orchestra') return 'AI Agents';
    if (location.pathname.includes('wizard')) return 'Plan';
    if (location.pathname.includes('execution-plan')) return 'Run';
    return last;
  };

  const safePath = (routeFn: (id: string) => string) => {
    return activeProjectId && !isUnauthorized ? routeFn(activeProjectId) : ROUTES.PROJECTS;
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0 shadow-sm">
        <div className="p-8 border-b border-slate-100">
          <Link to="/" className="flex flex-col space-y-1 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <ICONS.Zap className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase leading-none">Sun AI</h1>
            </div>
            
            {(activeProjectId || isValidating) && (
              <div className="mt-2.5 flex items-center justify-between group/id">
                <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-top-1 duration-500">
                  <div 
                    role="status"
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isValidating ? 'bg-slate-300 animate-pulse' : 
                      isUnauthorized ? 'bg-red-50' : 'bg-blue-500 animate-pulse motion-reduce:animate-none'
                    }`} 
                  />
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest leading-none ${
                    isUnauthorized ? 'text-red-500' : 'text-slate-400'
                  }`}>
                    {isValidating ? 'Verifying...' : isUnauthorized ? 'No Access' : `Project: ${activeProjectId}`}
                  </span>
                </div>
                
                {activeProjectId && !isValidating && !isUnauthorized && (
                  <button 
                    onClick={handleCopyId}
                    title="Copy Project ID"
                    className="opacity-0 group-hover/id:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded-md"
                  >
                    {copyFeedback ? (
                      <ICONS.Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <ICONS.Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                )}
              </div>
            )}
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2 block">Agency Suite</span>
            <NavLink to="/app/projects" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ICONS.Layout className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Projects</span>
            </NavLink>
            <NavLink to="/app/crm" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ICONS.Users className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Insights</span>
            </NavLink>
            <NavLink to="/app/research" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ICONS.Search className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Research</span>
            </NavLink>
            <NavLink to="/app/orchestra" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ICONS.Zap className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">AI Agents</span>
            </NavLink>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2 block">Project Context</span>
            <NavLink 
              to={safePath(ROUTES.PROJECT_WIZARD)} 
              className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive && location.pathname.includes('wizard') ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ICONS.Settings className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Plan</span>
            </NavLink>
            <NavLink 
              to={activeProjectId && !isUnauthorized ? ROUTES.PROJECT_EXECUTION(activeProjectId) : '#'} 
              className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${(!activeProjectId || isUnauthorized) ? 'opacity-30 cursor-not-allowed text-slate-300' : isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              onClick={(e) => (!activeProjectId || isUnauthorized) && e.preventDefault()}
            >
              <ICONS.Clipboard className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Run</span>
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
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white md:bg-slate-50/30">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Link to="/app/projects" className="hover:text-slate-900 transition-colors">App</Link>
            <span>/</span>
            <span className="text-slate-500">{getPageName()}</span>
            {activeProjectId && (
              <>
                <span>/</span>
                <div 
                  className={`flex items-center space-x-2 px-2.5 py-1 rounded-md border font-mono font-bold transition-all ${
                    isUnauthorized ? 'bg-red-50 border-red-100 text-red-600' : 'bg-blue-50 border-blue-100 text-blue-600'
                  }`}
                >
                  <span>{isUnauthorized ? '!' : '#'}{activeProjectId}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
             <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <ICONS.MessageCircle className="w-5 h-5" />
             </button>
             <div className="w-px h-6 bg-slate-200" />
             <button className="text-[10px] font-black uppercase tracking-widest text-slate-900 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                System: {isValidating ? 'Syncing...' : 'Online'}
             </button>
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
