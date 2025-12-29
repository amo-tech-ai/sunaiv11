
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS, ROUTES } from '../../constants';
import { Project, ProjectIntelligence, ProjectStatus } from '../../types';

interface IntelligenceAsideProps {
  project: Project | null;
  intelligence: ProjectIntelligence | null;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  projectId: string;
}

const PROJECTS_STORAGE_KEY = 'sunai_projects_db';

const IntelligenceAside: React.FC<IntelligenceAsideProps> = ({ 
  project, 
  intelligence, 
  selectedIds, 
  onToggle, 
  projectId 
}) => {
  const navigate = useNavigate();

  const getSelectedItem = (id: string) => {
    return (
      intelligence?.agents.find(a => a.id === id) || 
      intelligence?.automations.find(a => a.id === id) || 
      intelligence?.workflows.find(a => a.id === id) ||
      intelligence?.journeys.find(j => j.id === id) ||
      intelligence?.examples.find(e => e.id === id)
    );
  };

  const handleConfirmPlan = () => {
    if (!project || !intelligence) return;

    const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (saved) {
      const projects = JSON.parse(saved) as Project[];
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            status: ProjectStatus.ACTIVE,
            updated_at: new Date().toISOString(),
            intelligence: {
              ...intelligence,
              selectedItems: Array.from(selectedIds)
            }
          };
        }
        return p;
      });
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      navigate(ROUTES.PROJECT_EXECUTION(projectId));
    }
  };

  return (
    <aside className="w-96 flex flex-col space-y-8 animate-in slide-in-from-right-4 duration-700">
      <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -translate-y-12 translate-x-12" />
        <div className="relative z-10 space-y-6">
           <header className="flex items-center space-x-2 text-blue-400">
              <ICONS.Layout className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Confirmed Blueprint DNA</span>
           </header>
           <div className="space-y-1">
              <p className="text-2xl font-black tracking-tight truncate">{project?.name}</p>
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Client: {project?.client_name}</p>
           </div>
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                 <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Complexity</span>
                 <span className="text-xs font-black uppercase">Medium-High</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                 <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Urgency</span>
                 <span className="text-xs font-black uppercase tracking-widest">Active</span>
              </div>
           </div>
           <button 
            onClick={() => navigate(ROUTES.PROJECT_WIZARD(projectId))}
            className="w-full py-4 border border-white/10 hover:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
           >
             View Full Blueprint
           </button>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex-1 flex flex-col shadow-sm">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Pending Intelligence Plan</h4>
        
        <div className="flex-1 space-y-4">
           {selectedIds.size === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4 opacity-30 grayscale">
                <ICONS.Clipboard className="w-12 h-12" />
                <p className="text-xs font-bold leading-relaxed">AI Proposes. Human Confirms. Select modules to start building the execution plan.</p>
             </div>
           ) : (
             <div className="space-y-3">
                {Array.from(selectedIds).map(id => {
                  const item = getSelectedItem(id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-in fade-in zoom-in duration-300">
                       <div className="flex flex-col flex-1 min-w-0 pr-4">
                          <span className="text-[11px] font-black text-slate-900 truncate">
                            {(item as any).name || (item as any).trigger || (item as any).actor || (item as any).scenario || 'Operational Module'}
                          </span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ready for integration</span>
                       </div>
                       <button onClick={() => onToggle(id)} className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                       </button>
                    </div>
                  );
                })}
             </div>
           )}
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase">Selected Modules</span>
              <span className="text-[10px] font-black text-slate-900">{selectedIds.size} Items</span>
           </div>
           <button 
             onClick={handleConfirmPlan}
             disabled={selectedIds.size === 0}
             className="w-full py-5 bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
           >
             Confirm Operational Plan
           </button>
        </div>
      </section>
    </aside>
  );
};

export default IntelligenceAside;
