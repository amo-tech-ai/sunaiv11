
import React from 'react';
import { WizardBlueprint } from '../../types';

interface Step3ConstraintsProps {
  blueprint: WizardBlueprint;
  updateSection: (section: keyof WizardBlueprint, updates: any) => void;
}

const Step3Constraints: React.FC<Step3ConstraintsProps> = ({ blueprint, updateSection }) => {
  const isHighRisk = blueprint.constraints.budget < 10000 && blueprint.constraints.urgency === 'High';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
      <header>
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded">Step 03</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resource Allocation</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Execution Boundaries</h2>
        <p className="text-slate-500 mt-2">Define the timeline and fiscal constraints for this project.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Budget</label>
              <span className="text-3xl font-black text-blue-600 font-mono tracking-tighter">{blueprint.constraints.currency} {blueprint.constraints.budget.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="150000" 
              step="1000"
              value={blueprint.constraints.budget}
              onChange={e => updateSection('constraints', { budget: parseInt(e.target.value) })}
              className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600 border border-slate-200 shadow-inner"
            />
            <div className="flex justify-between text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest">
              <span>Low (Lean)</span>
              <span>Mid (Standard)</span>
              <span>Enterprise Scale</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Target Deadline</label>
              <input 
                type="date" 
                value={blueprint.constraints.deadline}
                onChange={e => updateSection('constraints', { deadline: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Urgency Tier</label>
              <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                {['Low', 'Medium', 'High'].map(u => (
                  <button
                    key={u}
                    onClick={() => updateSection('constraints', { urgency: u as any })}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                      blueprint.constraints.urgency === u ? 'bg-white shadow-lg text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Feasibility Advisor */}
        <div className="space-y-6">
           <div className={`p-8 rounded-3xl border-2 transition-all ${isHighRisk ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              <div className="flex items-center space-x-3 mb-4">
                 <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs ${isHighRisk ? 'bg-red-600' : 'bg-green-600'}`}>AI</div>
                 <span className={`text-[10px] font-black uppercase tracking-widest ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>The Analyst Agent Advisory</span>
              </div>
              <p className={`text-sm font-bold leading-relaxed ${isHighRisk ? 'text-red-900' : 'text-green-900'}`}>
                {isHighRisk 
                  ? "Warning: Budget is insufficient for a 'High Urgency' timeline. Hallucination risk in planning is elevated. Recommend increasing budget to 25k or shifting urgency to Medium."
                  : "Feasibility is optimal. The budget range aligns well with current urgency. Gemini can confidently architect a resilient WBS for this scope."
                }
              </p>
              <div className="mt-6 pt-6 border-t border-current/10 opacity-60">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Structural Integrity</span>
                    <span>{isHighRisk ? '45%' : '92%'}</span>
                 </div>
                 <div className="mt-2 h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${isHighRisk ? 'bg-red-600' : 'bg-green-600'}`} style={{ width: isHighRisk ? '45%' : '92%' }} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Constraints;
