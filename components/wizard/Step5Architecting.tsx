
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants';

interface Step5ArchitectingProps {
  thoughtLogs: string[];
}

const Step5Architecting: React.FC<Step5ArchitectingProps> = ({ thoughtLogs }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 99));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Analyzing Context", active: thoughtLogs.some(l => l.startsWith("Analyzing")) },
    { label: "Structuring Phases", active: thoughtLogs.some(l => l.startsWith("Structuring")) },
    { label: "Optimizing Resources", active: thoughtLogs.some(l => l.startsWith("Optimizing")) },
    { label: "Finalizing Proposal", active: thoughtLogs.some(l => l.startsWith("Finalizing")) }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-6 space-y-10 animate-in zoom-in duration-700">
      {/* Progress Stepper */}
      <div className="flex items-center space-x-4 w-full max-w-2xl px-12">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center space-y-2 relative flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                step.active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-slate-200 text-slate-300'
              }`}>
                {step.active ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : <span className="text-xs font-black">{i + 1}</span>}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest text-center whitespace-nowrap ${step.active ? 'text-blue-600' : 'text-slate-300'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 transition-all duration-700 ${steps[i+1].active ? 'bg-blue-600' : 'bg-slate-100'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative">
        <div className="w-48 h-48 border-8 border-blue-600/5 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-40 h-40 border-8 border-blue-600/10 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation-delay:0.5s]" />
        
        <div className="w-40 h-40 border-4 border-blue-600 rounded-full flex items-center justify-center relative z-10 bg-white shadow-2xl">
          <ICONS.Zap className="w-16 h-16 text-blue-600 animate-pulse" />
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="78"
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 78}
              strokeDashoffset={2 * Math.PI * 78 * (1 - progress / 100)}
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-2 max-w-sm">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Architecting Plan</h3>
        <p className="text-slate-500 text-xs font-medium leading-relaxed">
          The Planner Agent is synthesizing your requirements into a modular WBS using Gemini 3 Pro reasoning.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 rounded-[2rem] p-8 font-mono text-[11px] text-blue-400 shadow-2xl overflow-hidden border border-slate-800 relative">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-4 relative z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[9px] text-slate-500 ml-3 uppercase font-black tracking-[0.2em] font-sans">Gemini Thoughts</span>
          <span className="ml-auto text-blue-500/50 font-bold text-[9px] uppercase tracking-widest">{progress}%</span>
        </div>

        <div className="space-y-2.5 h-40 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth pr-4">
          {thoughtLogs.map((log, i) => (
            <div key={i} className="animate-in slide-in-from-left duration-300 flex items-start space-x-3 group">
              <span className="text-slate-700 font-bold opacity-30 select-none">[{i + 1}]</span>
              <span className="leading-relaxed group-hover:text-blue-300 transition-colors">{log}</span>
            </div>
          ))}
          <div className="flex items-center space-x-2 animate-pulse pl-10 pt-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm" />
            <span className="text-blue-800 font-black tracking-tighter uppercase text-[9px]">Analyzing Blueprint Signals...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Architecting;
