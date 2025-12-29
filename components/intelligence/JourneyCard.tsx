
import React from 'react';
import { IntelligenceJourney } from '../../types';

interface JourneyCardProps {
  journey: IntelligenceJourney;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ journey, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(journey.id)}
      className={`p-8 bg-white border-2 rounded-[2.5rem] transition-all cursor-pointer flex flex-col space-y-6 ${
        isSelected ? 'border-blue-600 shadow-xl' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Actor Path</span>
          <h3 className="text-xl font-black text-slate-900 leading-tight">{journey.actor} Journey</h3>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200'
        }`}>
          {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block">Journey Steps</span>
        <div className="space-y-2">
          {journey.steps.map((step, idx) => (
            <div key={idx} className="flex items-center space-x-3 text-xs font-medium text-slate-600">
              <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-50">
        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Value Proposition</span>
        <p className="text-xs font-bold text-slate-900">{journey.value}</p>
      </div>
    </div>
  );
};

export default JourneyCard;
