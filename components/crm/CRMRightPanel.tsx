import React from 'react';
import { Contact } from '../../types';
import { ICONS } from '../../constants';
import ContactIntelligencePanel from './ContactIntelligencePanel';

interface CRMRightPanelProps {
  activeTab: 'activity' | 'contact';
  setActiveTab: (tab: 'activity' | 'contact') => void;
  contact: Contact | null;
  allContacts: Contact[];
  onUpdate: (updated: Contact) => void;
  onDeselect: () => void;
}

const CRMRightPanel: React.FC<CRMRightPanelProps> = ({ 
  activeTab, 
  setActiveTab, 
  contact, 
  allContacts,
  onUpdate,
  onDeselect 
}) => {
  return (
    <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right duration-500 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Tabs Header */}
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
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'contact' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Contact
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'activity' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Global Aggregate Stats */}
            <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl mb-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl -translate-y-8 translate-x-8" />
              <div className="relative z-10 space-y-3">
                 <header className="flex items-center space-x-2 text-blue-400">
                    <ICONS.Zap className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Global Health Index</span>
                 </header>
                 <p className="text-3xl font-black tracking-tighter">
                    {Math.round(allContacts.reduce((acc, c) => acc + c.sentimentScore, 0) / (allContacts.length || 1))}%
                 </p>
              </div>
            </section>

            {/* Recent Activity Feed */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Recent Orchestrations</h3>
              <div className="space-y-6">
                {[
                  { user: 'Sarah Miller', action: 'added via LinkedIn scan', time: '2 hours ago', color: 'bg-blue-500' },
                  { user: 'Nexus Corp', action: 'status shifted to Risk', time: '4 hours ago', color: 'bg-red-500' },
                  { user: 'Jordan Lee', action: 'Draft approved & sent', time: 'Yesterday', color: 'bg-emerald-500' },
                ].map((act, i) => (
                  <div key={i} className="flex space-x-4 group">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${act.color} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                    <div className="space-y-1">
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        <span className="font-black">{act.user}</span> {act.action}.
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Platform Strategy Hint */}
            <section className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 mt-8">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-black italic">i</div>
                <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Strategy Prompt</h4>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                Relationship Intelligence identifies 'At Risk' clients by analyzing sentiment patterns across communications using Gemini 3 Pro.
              </p>
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300 h-full">
            <ContactIntelligencePanel 
              contact={contact} 
              onUpdate={onUpdate}
              onDeselect={onDeselect}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default CRMRightPanel;