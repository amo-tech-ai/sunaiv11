
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectStatus } from '../types';
import { ICONS, ROUTES } from '../constants';
import { supabaseService } from '../services/supabaseService';

const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'All'>('All');

  useEffect(() => {
    supabaseService.getProjects().then(data => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.client_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, filterStatus]);

  const handleCreateProject = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    navigate(ROUTES.PROJECT_WIZARD(newId));
  };

  const handleRowClick = (project: Project) => {
    if (project.status === ProjectStatus.WIZARD) navigate(ROUTES.PROJECT_WIZARD(project.id));
    else if (project.status === ProjectStatus.ACTIVE) navigate(ROUTES.PROJECT_EXECUTION(project.id));
    else navigate(ROUTES.PROJECT_DETAIL(project.id));
  };

  const getStatusConfig = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE: return { label: 'Active Ops', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', progress: 100, action: 'View Ops' };
      case ProjectStatus.BLUEPRINT_READY: return { label: 'Blueprint Ready', color: 'text-blue-600 bg-blue-50 border-blue-100', progress: 75, action: 'Finalize' };
      case ProjectStatus.WIZARD: return { label: 'Architecting', color: 'text-amber-600 bg-amber-50 border-amber-100', progress: 35, action: 'Resume' };
      default: return { label: status, color: 'text-slate-500 bg-slate-50 border-slate-100', progress: 0, action: 'View' };
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3 block">Operational Hub</span>
          <h1 className="text-5xl font-editorial text-slate-900 leading-tight tracking-tight">Project Streams</h1>
          <p className="text-slate-500 mt-2 font-medium">Monitoring {projects.length} active intelligence pipelines.</p>
        </div>
        <button onClick={handleCreateProject} className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center space-x-3">
          <ICONS.Plus className="w-5 h-5" />
          <span>New Stream</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><ICONS.Search className="w-5 h-5" /></div>
          <input type="text" placeholder="Search by project or client..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-900 shadow-sm" />
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center animate-pulse text-slate-300 font-black uppercase tracking-widest">Gathering Signals...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] text-center px-8">
          <h3 className="text-3xl font-editorial text-slate-900 mb-3">No streams detected.</h3>
          <button onClick={handleCreateProject} className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-100">Initialize First Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const config = getStatusConfig(project.status);
            return (
              <div key={project.id} onClick={() => handleRowClick(project)} className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full overflow-hidden">
                <header className="flex items-center justify-between mb-8 relative z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${config.color}`}>{config.label}</span>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: {project.id}</div>
                </header>
                <div className="space-y-2 mb-8 relative z-10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{project.client_name}</div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{project.name}</h3>
                </div>
                <div className="mt-auto space-y-6 relative z-10">
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-500 uppercase">{new Date(project.updated_at).toLocaleDateString()}</span>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] group-hover:bg-blue-600 transition-colors">{config.action}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
