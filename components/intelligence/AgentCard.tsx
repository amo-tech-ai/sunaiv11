
import React from 'react';
import { ICONS } from '../../constants';
import { IntelligenceAgent } from '../../types';

interface AgentCardProps {
  agent: IntelligenceAgent;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(agent.id)}
      className={`group p-8 bg-white border-2 rounded-[2.5rem] transition-all cursor-pointer relative overflow-hidden ${
        isSelected ? 'border-blue-600 shadow-2xl shadow-blue-50' : 'border-slate-100 hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
         <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
            <ICONS.Users className="w-6 h-6" />
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-blue-600 uppercase">Confidence</span>
            <span className="text-xl font-black text-slate-900">{agent.confidence}%</span>
         </div>
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-1">{agent.name}</h3>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{agent.role}</p>
      
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <div>
          <span className="text-[9px] font-black text-slate-300 uppercase block mb-1">Architect Rationale</span>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">{agent.whyNeeded}</p>
        </div>
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
           <span className="text-[10px] font-black text-slate-400 uppercase">Artifact</span>
           <span className="text-xs font-bold text-slate-900">{agent.produces}</span>
        </div>
      </div>

      <div className={`absolute bottom-6 right-8 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 opacity-20'
      }`}>
        {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
    </div>
  );
};

export default AgentCard;
