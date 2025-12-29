
import React, { useState } from 'react';
import { ICONS } from '../../constants';
import { WizardBlueprint, TaskPriority } from '../../types';

interface Step6ProposalProps {
  blueprint: WizardBlueprint;
  selectedTaskIds: Set<string>;
  toggleTaskSelection: (id: string) => void;
  goToStep: (step: number) => void;
  onFinalLaunch: () => void;
}

const Step6Proposal: React.FC<Step6ProposalProps> = ({ 
  blueprint, 
  selectedTaskIds, 
  toggleTaskSelection, 
  goToStep, 
  onFinalLaunch 
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const totalTasks = blueprint.artifacts?.wbs.reduce((acc, phase) => acc + phase.tasks.length, 0) || 0;
  const selectedCount = selectedTaskIds.size;

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 pb-20 relative">
      <header className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Proposal</h2>
          <p className="text-slate-500 mt-1">Review and filter the AI-generated work modules before execution.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => goToStep(2)} 
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all border border-slate-200 text-sm"
          >
            Regenerate Context
          </button>
          <button 
            onClick={() => setShowConfirm(true)} 
            className="px-10 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center space-x-2"
          >
            <span>Approve & Launch</span>
            <ICONS.Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {blueprint.artifacts?.wbs.map((phase, pIdx) => (
            <section key={phase.id} className="space-y-6 animate-in fade-in duration-500" style={{ animationDelay: `${pIdx * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {pIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">{phase.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{phase.description}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-full">Phase {pIdx + 1}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                {phase.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTaskSelection(task.id)}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer group relative ${
                      selectedTaskIds.has(task.id) 
                        ? 'border-blue-600 bg-white shadow-xl shadow-blue-50' 
                        : 'border-slate-100 bg-slate-50 opacity-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{task.title}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ml-2 ${
                        selectedTaskIds.has(task.id) ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-slate-300'
                      }`}>
                        {selectedTaskIds.has(task.id) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium mb-4">{task.description}</p>
                    <div className="flex items-center justify-between">
                       <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                         task.priority === TaskPriority.HIGH ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                       }`}>
                         {task.priority}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Plan Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sticky top-28 shadow-sm space-y-8">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Plan Integrity</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Selected Tasks</span>
                <span className="font-black text-slate-900">{selectedCount} / {totalTasks}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${(selectedCount / totalTasks) * 100}%` }} />
              </div>
            </div>

            <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100 space-y-3">
              <div className="flex items-center space-x-2">
                <ICONS.Settings className="w-4 h-4 text-amber-500" />
                <h5 className="text-[10px] font-black text-amber-900 uppercase">Risk Analysis</h5>
              </div>
              <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                Gemini detected potential bottlenecks in phase 2 due to the tight deadline. We've optimized the WBS to prioritize core structural integrity.
              </p>
            </section>

            <div className="pt-4 border-t border-slate-100 space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Architect</span>
                 <span className="text-[10px] font-black text-slate-900">GEMINI-3-PRO</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Est. Completion</span>
                 <span className="text-[10px] font-black text-slate-900">{blueprint.artifacts?.estimatedTimeline} Days</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl space-y-8 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-2">
              <ICONS.Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Launch Project?</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                This will commit the current blueprint and {selectedCount} tasks to the production execution stream for <span className="font-bold text-slate-900">{blueprint.identity.clientName}</span>.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={onFinalLaunch}
                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all text-sm"
              >
                Confirm & Start Ops
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-all text-sm"
              >
                Keep Refining
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step6Proposal;
