
import React, { useState } from 'react';
import { ICONS } from '../../constants';
import { Task, WizardBlueprint, TaskStatus } from '../../types';
import { runRiskAudit, AuditResult } from '../../services/analystService';

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
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const completedCount = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const result = await runRiskAudit(tasks, blueprint);
      setAuditResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right duration-500 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
        <button onClick={() => setActiveTab('activity')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'activity' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>Activity</button>
        <button onClick={() => setActiveTab('intelligence')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'intelligence' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>Ops Intel</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'activity' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
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

            <button 
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="w-full py-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-emerald-100 transition-all shadow-sm"
            >
              <div className={isAuditing ? 'animate-spin' : ''}>
                <ICONS.Zap className="w-3 h-3" />
              </div>
              <span>{isAuditing ? 'Calculating ROI...' : 'Run Precision Audit'}</span>
            </button>

            {auditResult && (
              <section className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <span className="text-[8px] font-black text-slate-400 uppercase mb-2 block">Python Project Logic</span>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <span className="text-[10px] font-black text-slate-900 block">{auditResult.velocityScore}%</span>
                         <span className="text-[8px] text-slate-400 uppercase">Velocity</span>
                      </div>
                      <div>
                         <span className="text-[10px] font-black text-slate-900 block">{auditResult.riskLevel}</span>
                         <span className="text-[8px] text-slate-400 uppercase">Risk</span>
                      </div>
                   </div>
                   <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-3 italic">"{auditResult.reasoning}"</p>
                </div>
              </section>
            )}
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
                   <h3 className="text-xl font-black text-slate-900 leading-tight">{selectedTask.title}</h3>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium">{selectedTask.description}</p>
                </section>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 grayscale py-20 px-4">
                <ICONS.Layout className="w-12 h-12 text-slate-400" />
                <p className="text-[10px] font-black uppercase tracking-widest max-w-[180px]">Select a task to view ops intelligence</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ExecutionRightPanel;
