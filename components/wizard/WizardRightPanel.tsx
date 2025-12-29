
import React, { useState } from 'react';
import { ICONS } from '../../constants';
import { WizardBlueprint } from '../../types';

interface WizardRightPanelProps {
  blueprint: WizardBlueprint;
  isSaving: boolean;
  feasibilityScore: number;
}

const WizardRightPanel: React.FC<WizardRightPanelProps> = ({ blueprint, isSaving, feasibilityScore }) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'blueprint'>('activity');

  return (
    <aside className="w-80 hidden xl:flex flex-col h-full bg-white border-l border-slate-200 overflow-hidden shadow-sm animate-in slide-in-from-right duration-500">
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
          onClick={() => setActiveTab('blueprint')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'blueprint' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Blueprint
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {activeTab === 'activity' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Context & Signals</h3>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Live Monitor</span>
              </div>
            </header>

            {/* Recent Activity Feed */}
            <section>
              <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-6">Recent Orchestrations</h4>
              <div className="space-y-6">
                {[
                  { action: 'Identity signal captured', time: 'Just now', color: 'bg-blue-500' },
                  { action: 'Retriever scanned URL context', time: '2m ago', color: 'bg-emerald-500' },
                  { action: 'Feasibility analysis complete', time: '5m ago', color: 'bg-indigo-500' },
                ].map((act, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${act.color} shadow-sm`} />
                    <div className="space-y-0.5">
                      <p className="text-xs text-slate-800 font-medium leading-tight">{act.action}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Platform Strategy Card */}
            <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl mt-8">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl -translate-y-8 translate-x-8" />
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-black italic">i</div>
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">System Hint</h4>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  The AI Architect performs best when specific integrations are selected. This grounds the Work Breakdown Structure in real-world API logic.
                </p>
              </div>
            </section>

            {/* Audit Trail Placeholder */}
            <section className="pt-8 border-t border-slate-100">
               <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-4">Integrity Log</span>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 italic text-[10px] text-slate-400 font-medium leading-relaxed">
                 Waiting for step confirmation to commit architectural changes to the vault.
               </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blueprint DNA</h3>
              {isSaving && (
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">Autosaving</span>
                </div>
              )}
            </header>

            <div className="space-y-8">
              <section className="space-y-3">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all cursor-default shadow-sm">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Root Identity</span>
                  <p className="text-sm font-black text-slate-900 leading-tight truncate">{blueprint.identity.projectName || '---'}</p>
                  <p className="text-xs font-bold text-slate-500 truncate">{blueprint.identity.clientName || 'Unnamed Entity'}</p>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <span className="text-[9px] font-black text-indigo-400 uppercase mb-1 block">Vector Type</span>
                  <span className="text-xs font-black text-indigo-700 uppercase">{blueprint.intent.type || 'Undefined'}</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Urgency</span>
                  <span className="text-xs font-black text-slate-900 uppercase">{blueprint.constraints.urgency}</span>
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Feasibility</span>
                    <span className={`text-[10px] font-black px-1.5 rounded ${feasibilityScore > 70 ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                      {feasibilityScore}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                    <div 
                      className={`h-full transition-all duration-1000 ${feasibilityScore > 70 ? 'bg-green-500' : feasibilityScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
                      style={{ width: `${feasibilityScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agent Confidence</span>
                    <span className="text-[10px] font-black text-blue-600">88%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                    <div className="h-full bg-blue-600 w-[88%] transition-all duration-1000" />
                  </div>
                </div>
              </section>

              {blueprint.intent.goals.length > 0 && (
                <section className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Goal Map</span>
                  <div className="space-y-2">
                    {blueprint.intent.goals.slice(0, 4).map((g, i) => (
                      <div key={i} className="flex items-center space-x-2 animate-in slide-in-from-left duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="text-[11px] font-bold text-slate-600 truncate">{g}</span>
                      </div>
                    ))}
                    {blueprint.intent.goals.length > 4 && (
                      <span className="text-[10px] font-black text-slate-400 uppercase pl-3">+{blueprint.intent.goals.length - 4} more</span>
                    )}
                  </div>
                </section>
              )}
            </div>

            <div className="pt-8">
              <div className="p-5 bg-slate-900 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 bg-blue-600/20 blur-2xl w-20 h-20 rounded-full group-hover:w-40 group-hover:h-40 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <ICONS.Zap className="w-4 h-4 text-blue-400" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">System Ready</p>
                  </div>
                  <p className="text-xs font-bold leading-relaxed opacity-80">
                    The AI Architect has sufficient context to build a high-fidelity execution plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default WizardRightPanel;
