
import React from 'react';
import { ICONS } from '../../constants';
import { WizardBlueprint } from '../../types';

interface LiveBlueprintPanelProps {
  blueprint: WizardBlueprint;
  isSaving: boolean;
  feasibilityScore: number;
}

const LiveBlueprintPanel: React.FC<LiveBlueprintPanelProps> = ({ blueprint, isSaving, feasibilityScore }) => {
  return (
    <aside className="w-80 hidden xl:flex flex-col h-full bg-white border-l border-slate-200 p-8 overflow-y-auto space-y-8 animate-in slide-in-from-right duration-500">
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
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all cursor-default">
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

      <div className="mt-auto">
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
    </aside>
  );
};

export default LiveBlueprintPanel;
