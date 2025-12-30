
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants';

interface AgentStatus {
  id: string;
  name: string;
  action: string;
  status: 'thinking' | 'grounding' | 'complete' | 'waiting';
}

const GlobalAgentTicker: React.FC = () => {
  const [activeRuns, setActiveRuns] = useState<AgentStatus[]>([]);

  useEffect(() => {
    // Mock simulation of agent pulses
    const mockInterval = setInterval(() => {
      const agents: AgentStatus[] = [
        { id: '1', name: 'Planner', action: 'Architecting Roadmap...', status: 'thinking' },
        { id: '2', name: 'Researcher', action: 'Grounding Market news...', status: 'grounding' },
        { id: '3', name: 'Analyst', action: 'Auditing burn rate...', status: 'thinking' },
      ];
      setActiveRuns(agents.slice(0, Math.floor(Math.random() * 3) + 1));
    }, 5000);

    return () => clearInterval(mockInterval);
  }, []);

  if (activeRuns.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-slate-900/95 backdrop-blur-md border-t border-white/5 z-[100] px-8 flex items-center justify-between overflow-hidden animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center space-x-3 text-white">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Agent Orchestrator Pulse</span>
      </div>

      <div className="flex items-center space-x-12 overflow-hidden">
        {activeRuns.map((run) => (
          <div key={run.id} className="flex items-center space-x-4 animate-in fade-in slide-in-from-right duration-500">
             <div className="flex items-center space-x-2">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{run.name}:</span>
                <span className="text-[10px] font-bold text-slate-300 italic whitespace-nowrap">{run.action}</span>
             </div>
             <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
               run.status === 'thinking' ? 'bg-blue-600/20 text-blue-400 animate-pulse' : 
               run.status === 'grounding' ? 'bg-emerald-600/20 text-emerald-400 animate-pulse' : 'bg-slate-700 text-white'
             }`}>
               {run.status}
             </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex items-center space-x-6">
         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Health: 100%</span>
         <div className="h-4 w-px bg-white/10" />
         <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">Open Monitor</button>
      </div>
    </div>
  );
};

export default GlobalAgentTicker;
