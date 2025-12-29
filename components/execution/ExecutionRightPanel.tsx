import React from 'react';
import { ICONS } from '../../constants';
import { Task, WizardBlueprint, TaskStatus } from '../../types';

interface ExecutionRightPanelProps {
  activeTab: 'activity' | 'intelligence';
  setActiveTab: (tab: 'activity' | 'intelligence') => void;
  selectedTask: Task | null;
  blueprint: WizardBlueprint | null;
  tasks: Task[];
  onDeselect: () => void;
}

const ExecutionRightPanel: React.FC<ExecutionRightPanelProps> = ({
  activeTab,
  setActiveTab,
  selectedTask,
  blueprint,
  tasks,
  onDeselect
}) => {
  const completedCount = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const highPriorityLeft = tasks.filter(t => t.priority === 'High' && t.status !== TaskStatus.DONE).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right duration-500 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
        <button 
          onClick={() => setActiveTab('activity')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'activity' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Activity
        </button>
        <button 
          onClick={() => setActiveTab('intelligence')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'intelligence' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Ops Intel
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'activity' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Global Project Health */}
            <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl -translate-y-8 translate-x-8" />
              <div className="relative z-10 space-y-3">
                 <header className="flex items-center space-x-2 text-blue-400">
                    <ICONS.Zap className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Global Ops Velocity</span>
                 </header>
                 <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-black tracking-tighter">{progress}%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete</p>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                 </div>
              </div>
            </section>

            {/* Real-time Audit Trail */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Operational Log</h3>
              <div className="space-y-6 px-2">
                {[
                  { action: 'Technical SEO Audit moved to Done', user: 'Alice', time: '12m ago' },
                  { action: 'Assigned "Draft Landing Page" to Bob', user: 'System', time: '1h ago' },
                  { action: 'Budget checkpoint: High Feasibility', user: 'Analyst Agent', time: '3h ago' },
                ].map((log, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 bg-slate-200" />
                    <div>
                      <p className="text-xs text-slate-800 font-bold leading-relaxed">{log.action}</p>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{log.time} · {log.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Platform Strategy */}
            <section className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 mt-8">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-black italic">i</div>
                <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Ops Optimization</h4>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                The Principal Planner recommends completing the {highPriorityLeft} high-priority tasks first to clear architectural dependencies for Phase 02.
              </p>
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300 h-full">
            {selectedTask ? (
              <div className="space-y-6">
                <header className="flex justify-between items-center px-2">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Task Intelligence</h4>
                   <button onClick={onDeselect} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </header>

                <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                   <div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border ${
                        selectedTask.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}>
                        {selectedTask.priority} Priority
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-3 leading-tight">{selectedTask.title}</h3>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium">{selectedTask.description}</p>
                </section>

                <section className="bg-emerald-50 rounded-[2rem] border border-emerald-100 p-6">
                   <div className="flex items-center space-x-2 mb-4">
                      <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center text-[10px] text-white font-black">AI</div>
                      <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Optimizer Recommendation</h4>
                   </div>
                   <p className="text-xs font-bold text-emerald-800 leading-relaxed italic">
                     "To accelerate this task, utilize the grounding context from the {blueprint?.identity.website || 'Client Website'}. Focus on high-impact keywords detected during the Retrieval phase."
                   </p>
                </section>

                <div className="pt-4 px-2 space-y-3">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Proposed Actions</span>
                   <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                     Draft Implementation Guide
                   </button>
                   <button className="w-full py-4 border border-slate-200 text-slate-600 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                     Recalculate Estimate
                   </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 grayscale py-20 px-4">
                <ICONS.Layout className="w-12 h-12 text-slate-400" />
                <p className="text-xs font-black uppercase tracking-widest max-w-[180px]">Select a task in the work area to view ops intelligence</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ExecutionRightPanel;