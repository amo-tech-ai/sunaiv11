
import React from 'react';
import { ICONS } from '../../constants';
import { IntelligenceAutomation } from '../../types';

interface AutomationCardProps {
  automation: IntelligenceAutomation;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const AutomationCard: React.FC<AutomationCardProps> = ({ automation, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(automation.id)}
      className={`p-6 bg-white border-2 rounded-[2rem] transition-all cursor-pointer flex items-center space-x-6 ${
        isSelected ? 'border-blue-600 shadow-xl' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
       <div className="flex-1 grid grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Trigger Event</span>
            <p className="text-sm font-bold text-slate-900">{automation.trigger}</p>
          </div>
          <div className="flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <ICONS.Zap className="w-4 h-4 text-slate-400" />
             </div>
             <div className="h-px w-8 bg-slate-200 mx-2" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Outcome</span>
            <p className="text-sm font-bold text-emerald-600">{automation.outcome}</p>
          </div>
       </div>
       <div className="flex items-center space-x-4 pr-4">
          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
            automation.riskLevel === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'
          }`}>
            Risk: {automation.riskLevel}
          </span>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200'
          }`}>
            {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
          </div>
       </div>
    </div>
  );
};

export default AutomationCard;
