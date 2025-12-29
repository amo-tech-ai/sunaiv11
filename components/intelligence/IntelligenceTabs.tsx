
import React from 'react';

export type IntelligenceTab = 'Agents' | 'Automations' | 'Workflows' | 'Journeys' | 'Examples';

interface IntelligenceTabsProps {
  activeTab: IntelligenceTab;
  onTabChange: (tab: IntelligenceTab) => void;
}

const IntelligenceTabs: React.FC<IntelligenceTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: IntelligenceTab; label: string }[] = [
    { id: 'Agents', label: 'Agents' },
    { id: 'Automations', label: 'Automations' },
    { id: 'Workflows', label: 'Workflows' },
    { id: 'Journeys', label: 'User Journeys' },
    { id: 'Examples', label: 'Examples' },
  ];

  return (
    <div className="flex p-1.5 bg-white border border-slate-200 rounded-2xl w-fit overflow-x-auto custom-scrollbar no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
            activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default IntelligenceTabs;
