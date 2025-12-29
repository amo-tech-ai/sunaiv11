
import React from 'react';
import { ICONS } from '../../constants';
import { Contact } from '../../types';

interface AggregateIntelligenceProps {
  contacts: Contact[];
}

const AggregateIntelligence: React.FC<AggregateIntelligenceProps> = ({ contacts }) => {
  const atRiskCount = contacts.filter(c => c.status === 'risk').length;
  const vipCount = contacts.filter(c => c.sentimentScore > 80).length;
  const avgStrength = Math.round(contacts.reduce((acc, c) => acc + c.sentimentScore, 0) / (contacts.length || 1));

  return (
    <aside className="w-80 flex flex-col space-y-6 animate-in fade-in slide-in-from-right duration-700">
      <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -translate-y-12 translate-x-12" />
        <div className="relative z-10 space-y-4">
           <header className="flex items-center space-x-2 text-blue-400">
              <ICONS.Zap className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Pipeline Command</span>
           </header>
           <div className="space-y-1">
              <p className="text-3xl font-black tracking-tight">{avgStrength}%</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Health Index</p>
           </div>
        </div>
      </section>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Urgent Orchestration</h4>
        
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm space-y-6">
           <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                 <ICONS.Zap className="w-4 h-4" />
              </div>
              <div>
                 <p className="text-xs font-black text-slate-900">{atRiskCount} Contacts at Risk</p>
                 <p className="text-[10px] font-medium text-slate-400 mt-1 leading-relaxed">Sentiment patterns indicate potential churn. Intervention required.</p>
              </div>
           </div>

           <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                 <ICONS.Plus className="w-4 h-4" />
              </div>
              <div>
                 <p className="text-xs font-black text-slate-900">{vipCount} VIP Opportunities</p>
                 <p className="text-[10px] font-medium text-slate-400 mt-1 leading-relaxed">Relationship strength is high. Propose expansion blueprints.</p>
              </div>
           </div>
        </div>

        <section className="bg-blue-50/50 rounded-[2rem] border border-blue-100 p-6">
           <h5 className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-3">AI Recommendation</h5>
           <p className="text-xs font-bold text-blue-900 leading-relaxed">
             "Increase follow-up velocity with Nexus Corp. Their recent funding signal indicates expansion readiness."
           </p>
        </section>
      </div>
    </aside>
  );
};

export default AggregateIntelligence;
