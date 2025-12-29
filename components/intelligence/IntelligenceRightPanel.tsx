
import React from 'react';
import { ICONS } from '../../constants';
import { ProjectIntelligence } from '../../types';

interface IntelligenceRightPanelProps {
  activeTab: 'activity' | 'summary';
  setActiveTab: (tab: 'activity' | 'summary') => void;
  intelligence: ProjectIntelligence | null;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onConfirm: () => void;
}

const IntelligenceRightPanel: React.FC<IntelligenceRightPanelProps> = ({ 
  activeTab, 
  setActiveTab, 
  intelligence, 
  selectedIds, 
  onToggle, 
  onConfirm 
}) => {
  const getSelectedItem = (id: string) => {
    return [...(intelligence?.agents || []), ...(intelligence?.automations || []), ...(intelligence?.workflows || []), ...(intelligence?.journeys || []), ...(intelligence?.examples || [])].find(i => i.id === id);
  };

  return (
    <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right duration-500 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Tabbed Header */}
      <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
        <button 
          onClick={() => setActiveTab('activity')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'activity' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Activity
        </button>
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'summary' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Summary
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'activity' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
             <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl -translate-y-8 translate-x-8" />
              <header className="relative z-10 flex items-center space-x-2 text-blue-400 mb-2">
                 <ICONS.Zap className="w-4 h-4" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Grounding Signals</span>
              </header>
              <p className="relative z-10 text-xs text-slate-400 leading-relaxed">
                Intelligence generated using Thinking Budget: 4000 tokens. Sourced from Project Blueprint v1.0.
              </p>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Recent Logic</h3>
              <div className="space-y-6 px-2">
                 {[
                   { action: 'Agents proposed', time: 'Just now' },
                   { action: 'Market benchmarks scanned', time: '2m ago' },
                   { action: 'WBS mapped to intent', time: '5m ago' }
                 ].map((log, i) => (
                   <div key={i} className="flex space-x-4">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500" />
                      <div>
                        <p className="text-xs text-slate-800 font-bold">{log.action}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{log.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header className="px-2">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Plan</h3>
               <p className="text-xs font-bold text-slate-900 mt-1">{selectedIds.size} Modules Selected</p>
            </header>

            <div className="space-y-3">
               {selectedIds.size === 0 ? (
                 <div className="py-20 flex flex-col items-center text-center space-y-4 opacity-30 grayscale px-4">
                    <ICONS.Clipboard className="w-12 h-12" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Select modules to build execution roadmap</p>
                 </div>
               ) : (
                 Array.from(selectedIds).map(id => {
                   const item = getSelectedItem(id);
                   return (
                     <div key={id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-in zoom-in duration-300">
                        <div className="flex-1 min-w-0 pr-2">
                           <p className="text-[11px] font-black text-slate-900 truncate">{(item as any)?.name || (item as any)?.trigger || (item as any)?.actor || (item as any)?.scenario || 'Module'}</p>
                           <p className="text-[9px] font-black text-slate-400 uppercase">Operational Unit</p>
                        </div>
                        <button onClick={() => onToggle(id)} className="text-slate-300 hover:text-red-500 transition-colors">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                     </div>
                   );
                 })
               )}
            </div>

            <section className="pt-6 border-t border-slate-100 space-y-4">
               <button 
                 onClick={onConfirm}
                 disabled={selectedIds.size === 0}
                 className="w-full py-5 bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center space-x-2"
               >
                 <span>Confirm & Deploy Ops</span>
               </button>
            </section>
          </div>
        )}
      </div>
    </aside>
  );
};

export default IntelligenceRightPanel;
