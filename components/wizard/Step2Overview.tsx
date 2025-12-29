
import React from 'react';
import { ICONS } from '../../constants';
import { WizardBlueprint } from '../../types';

interface Step2OverviewProps {
  blueprint: WizardBlueprint;
  updateSection: (section: keyof WizardBlueprint, updates: any) => void;
  addItem: (field: 'goals' | 'integrations', value: string) => void;
  removeItem: (field: 'goals' | 'integrations', index: number) => void;
  tempGoal: string;
  setTempGoal: (val: string) => void;
}

const Step2Overview: React.FC<Step2OverviewProps> = ({ 
  blueprint, 
  updateSection, 
  addItem, 
  removeItem, 
  tempGoal, 
  setTempGoal 
}) => {
  const suggestedGoals = ['Increase Conversion', 'Optimize Performance', 'Scale Infrastructure'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
      <header>
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded">Step 02</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DNA Mapping</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Overview</h2>
        <p className="text-slate-500 mt-2">Define the functional requirements and core objectives.</p>
      </header>

      <div className="space-y-10">
        <section>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Engagement Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'Web', icon: ICONS.Layout, desc: 'Responsive Apps' },
              { id: 'Mobile', icon: ICONS.Zap, desc: 'iOS & Android' },
              { id: 'Marketing', icon: ICONS.Users, desc: 'Growth & Ads' },
              { id: 'Integration', icon: ICONS.Settings, desc: 'APIs & Systems' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => updateSection('intent', { type: t.id })}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center space-y-3 group ${
                  blueprint.intent.type === t.id 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xl shadow-blue-100' 
                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <t.icon className={`w-8 h-8 transition-transform group-hover:scale-110 ${blueprint.intent.type === t.id ? 'text-blue-600' : 'opacity-40'}`} />
                <div>
                  <span className="text-xs font-black uppercase tracking-widest block">{t.id}</span>
                  <span className="text-[10px] font-medium opacity-60">{t.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Project Goals</label>
              <div className="flex space-x-2 mb-4">
                <input 
                  type="text" 
                  value={tempGoal}
                  onChange={e => setTempGoal(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && (addItem('goals', tempGoal), setTempGoal(''))}
                  placeholder="e.g. Reduce churn by 10%"
                  className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                />
                <button 
                  onClick={() => {addItem('goals', tempGoal); setTempGoal('');}} 
                  className="bg-slate-900 text-white px-6 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {blueprint.intent.goals.map((g, i) => (
                  <span key={i} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold flex items-center space-x-2 border border-indigo-100 shadow-sm animate-in zoom-in duration-200">
                    <span>{g}</span>
                    <button onClick={() => removeItem('goals', i)} className="hover:text-red-500 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Smart Suggestions from Retriever Context */}
            <div className="p-5 bg-blue-50/50 rounded-2xl border border-dashed border-blue-200">
               <div className="flex items-center space-x-2 mb-3">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-black">AI</div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Suggested for {blueprint.identity.clientName || 'this project'}</span>
               </div>
               <div className="flex flex-wrap gap-2">
                  {suggestedGoals.filter(g => !blueprint.intent.goals.includes(g)).map((g, i) => (
                    <button 
                      key={i} 
                      onClick={() => addItem('goals', g)}
                      className="text-[10px] font-bold text-blue-500 bg-white border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      + {g}
                    </button>
                  ))}
               </div>
            </div>
          </section>

          <section>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Integrations</label>
            <div className="grid grid-cols-2 gap-3">
              {['Stripe', 'Supabase', 'Salesforce', 'HubSpot', 'Shopify', 'Twilio', 'Firebase', 'Zendesk'].map(int => {
                const isSelected = blueprint.intent.integrations.includes(int);
                return (
                  <button
                    key={int}
                    onClick={() => {
                      if (isSelected) updateSection('intent', { integrations: blueprint.intent.integrations.filter(i => i !== int) });
                      else updateSection('intent', { integrations: [...blueprint.intent.integrations, int] });
                    }}
                    className={`px-5 py-3.5 rounded-2xl text-xs font-black border-2 transition-all text-left flex items-center justify-between ${
                      isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <span>{int}</span>
                    {isSelected ? <ICONS.Zap className="w-4 h-4 text-white" /> : <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Step2Overview;
