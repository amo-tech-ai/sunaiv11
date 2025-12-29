
import React from 'react';
import { IntelligenceExample } from '../../types';

interface ExampleCardProps {
  example: IntelligenceExample;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ example, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(example.id)}
      className={`p-8 bg-white border-2 rounded-[2.5rem] transition-all cursor-pointer space-y-6 ${
        isSelected ? 'border-blue-600 shadow-xl' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Benchmark</span>
          <h3 className="text-lg font-black text-slate-900 leading-tight">{example.scenario}</h3>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200'
        }`}>
          {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Implementation</span>
        <p className="text-xs font-medium text-slate-700 leading-relaxed">{example.whatWasBuilt}</p>
      </div>

      <div className="pt-4 border-t border-emerald-50">
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Business Outcome</span>
        <p className="text-xs font-black text-slate-900">{example.outcome}</p>
      </div>
    </div>
  );
};

export default ExampleCard;
