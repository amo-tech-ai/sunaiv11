
import React from 'react';
import { WizardBlueprint } from '../../types';

interface Step4ReviewProps {
  blueprint: WizardBlueprint;
  goToStep: (step: number) => void;
}

const Step4Review: React.FC<Step4ReviewProps> = ({ blueprint, goToStep }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Review Blueprint</h2>
        <p className="text-slate-500 mt-2">Validate the captured intent before triggering the AI Architect.</p>
      </header>
      <div className="space-y-6">
        <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Project Identity</span>
                <button onClick={() => goToStep(1)} className="text-blue-600 hover:underline">Edit</button>
              </h4>
              <div className="space-y-1">
                <p className="text-xl font-black text-slate-900 leading-tight">{blueprint.identity.projectName || 'Untitled'}</p>
                <p className="text-sm font-semibold text-slate-500">{blueprint.identity.clientName || 'No Client'}</p>
                {blueprint.identity.website && <p className="text-xs text-blue-500 font-mono mt-2 underline">{blueprint.identity.website}</p>}
              </div>
            </section>
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Intent DNA</span>
                <button onClick={() => goToStep(2)} className="text-blue-600 hover:underline">Edit</button>
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest">{blueprint.intent.type}</span>
                {blueprint.intent.goals.map((g, i) => <span key={i} className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full">{g}</span>)}
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Constraints</span>
                <button onClick={() => goToStep(3)} className="text-blue-600 hover:underline">Edit</button>
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Budget</span>
                  <span className="text-sm font-black text-slate-900">{blueprint.constraints.currency} {blueprint.constraints.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Urgency</span>
                  <span className="text-sm font-black text-slate-900">{blueprint.constraints.urgency}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Deadline</span>
                  <span className="text-sm font-black text-slate-900">{blueprint.constraints.deadline || 'Flexible'}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Review;
