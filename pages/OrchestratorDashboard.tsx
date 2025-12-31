
import React, { useState } from 'react';
import { ICONS } from '../constants';

const OrchestratorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'thoughts' | 'audit'>('thoughts');

  const agents = [
    { id: '1', name: 'Planning AI', status: 'Thinking', load: 45, version: 'G3-PRO-24Q4', latency: '1.2s' },
    { id: '2', name: 'Research AI', status: 'Grounding', load: 12, version: 'G3-FLASH', latency: '0.4s' },
    { id: '3', name: 'Analyst AI', status: 'Idle', load: 0, version: 'G3-PRO-PYTHON', latency: '--' },
  ];

  const logs = [
    { id: 'l1', time: '14:22:01', agent: 'Planning AI', text: 'Architecting Phase 3 dependencies for Project Zenith...' },
    { id: 'l2', time: '14:21:45', agent: 'Research AI', text: 'Fetching Google Search grounding for Nexus Corp...' },
    { id: 'l3', time: '14:21:12', agent: 'Analyst AI', text: 'Precision audit complete: Velocity signal optimized.' },
    { id: 'l4', time: '14:20:55', agent: 'Orchestrator', text: 'Routing Lead context to Research Lab cluster.' },
  ];

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700 overflow-hidden">
      {/* PANEL A: AGENT FOLDERS (AI Status) */}
      <aside className="w-64 flex flex-col space-y-4 flex-shrink-0">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">AI Status</h2>
        <div className="space-y-1">
          {agents.map(agent => (
            <button key={agent.id} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex items-center space-x-3">
                 <div className={`w-2 h-2 rounded-full ${agent.status === 'Thinking' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`} />
                 <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">{agent.name}</span>
              </div>
              <span className="text-[9px] font-black text-slate-300 group-hover:text-blue-500">{agent.load}%</span>
            </button>
          ))}
        </div>
        
        <div className="pt-8 px-4">
           <button className="w-full py-4 border-2 border-dashed border-red-100 rounded-2xl flex flex-col items-center justify-center space-y-2 group hover:bg-red-50 hover:border-red-200 transition-all">
              <ICONS.Zap className="w-4 h-4 text-red-300 group-hover:text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400 group-hover:text-red-600">Stop all AI actions</span>
           </button>
        </div>
      </aside>

      {/* PANEL B: THE TICKER (System Activity) */}
      <div className="flex-1 flex flex-col space-y-8 min-w-0">
        <header className="flex items-end justify-between">
           <div className="space-y-1">
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black uppercase rounded tracking-widest">Core Monitor</span>
              <h1 className="text-4xl font-black text-slate-900 uppercase">System <span className="italic text-slate-400">Activity</span></h1>
           </div>
           <div className="flex space-x-6">
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Pulse</p>
                 <p className="text-sm font-black text-emerald-600">Stable (24ms)</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Runs</p>
                 <p className="text-sm font-black text-blue-600">12 Parallel</p>
              </div>
           </div>
        </header>

        <div className="flex-1 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
           <div className="p-8 border-b border-white/5 bg-white/5 flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              <span className="text-[9px] text-white/40 ml-4 font-mono uppercase tracking-widest">gemini-3-orchestrator-shell-v2.2</span>
           </div>
           <div className="flex-1 overflow-y-auto p-10 font-mono text-[11px] space-y-4 custom-scrollbar">
              {logs.map(log => (
                <div key={log.id} className="flex space-x-6 animate-in slide-in-from-left duration-300 group">
                   <span className="text-slate-600 font-bold opacity-50 shrink-0">[{log.time}]</span>
                   <span className="text-blue-400 font-black shrink-0 w-24 uppercase">{log.agent}:</span>
                   <span className="text-slate-300 group-hover:text-white transition-colors">{log.text}</span>
                </div>
              ))}
              <div className="flex items-center space-x-2 animate-pulse pl-32 pt-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-sm" />
                <span className="text-blue-900 font-black tracking-tighter uppercase text-[9px]">Listening for incoming signals...</span>
              </div>
           </div>
        </div>
      </div>

      {/* PANEL C: LOGIC DETAIL */}
      <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('thoughts')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === 'thoughts' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Thoughts
          </button>
          <button 
            onClick={() => setActiveTab('audit')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === 'audit' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Audit
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {activeTab === 'thoughts' ? (
            <div className="space-y-8 animate-in fade-in duration-300">
               <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl -translate-y-8 translate-x-8" />
                <header className="relative z-10 flex items-center space-x-2 text-blue-400 mb-2">
                   <ICONS.Zap className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Internal Logic</span>
                </header>
                <p className="relative z-10 text-xs text-slate-400 leading-relaxed italic">
                   "Orchestrator currently managing 3 high-load Planning AI sessions. Priority shifted to Project Zenith due to deadline proximity."
                </p>
              </section>

              <section className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Decisions</h4>
                <div className="space-y-4">
                  {[
                    "Re-allocated resources for Nexus Corp",
                    "Validated API tokens for Stripe integration",
                    "Compressed research tokens by 20%"
                  ].map((d, i) => (
                    <div key={i} className="flex space-x-3 group border-l-2 border-slate-100 pl-4 py-1 hover:border-blue-500 transition-colors">
                      <span className="text-xs font-bold text-slate-700 leading-relaxed">{d}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 grayscale">
              <ICONS.Settings className="w-12 h-12" />
              <p className="text-[10px] font-black uppercase tracking-widest">Security audit logs will populate here</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default OrchestratorDashboard;
