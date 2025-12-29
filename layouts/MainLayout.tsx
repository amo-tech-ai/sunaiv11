
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { ICONS, ROUTES } from '../constants';

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* LEFT PANEL: Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SunAI Agency
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            to="/app/projects" 
            className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <ICONS.Layout className="w-5 h-5" />
            <span>Projects</span>
          </NavLink>
          <div className="pt-4 pb-2 px-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Intelligence</span>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-400 cursor-not-allowed italic">
            <ICONS.Zap className="w-5 h-5" />
            <span>AI Insights</span>
          </button>
          <div className="pt-4 pb-2 px-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Organization</span>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ICONS.Users className="w-5 h-5" />
            <span>Clients</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ICONS.Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">Agency Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER PANEL: Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>App</span>
            <span>/</span>
            <span className="font-medium text-slate-900">Projects</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>

      {/* RIGHT PANEL: Context / Activity Feed */}
      <aside className="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Activity & Context</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-slate-800">Project <span className="font-medium">Acme SEO Plan</span> was updated to <span className="font-medium italic">Active</span>.</p>
                      <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Platform Hint</h3>
              <p className="text-xs text-blue-700 leading-relaxed">
                Create a new project to start the Wizard. The Blueprint generated will serve as the single source of truth for AI intelligence.
              </p>
            </section>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MainLayout;
