
import React from 'react';
import { ICONS } from '../../constants';
// Fixed: Imported IntelligenceTab from central types to maintain consistency
import { IntelligenceTab } from '../../types';

interface IntelligenceLeftPanelProps {
  activeSegment: IntelligenceTab;
  onSegmentChange: (segment: IntelligenceTab) => void;
}

const IntelligenceLeftPanel: React.FC<IntelligenceLeftPanelProps> = ({ activeSegment, onSegmentChange }) => {
  const segments: { id: IntelligenceTab; label: string; icon: any }[] = [
    { id: 'Agents', label: 'Agents', icon: ICONS.Users },
    { id: 'Automations', label: 'Automations', icon: ICONS.Zap },
    { id: 'Workflows', label: 'Workflows', icon: ICONS.Layout },
    { id: 'Journeys', label: 'Journeys', icon: ICONS.Search },
    { id: 'Examples', label: 'Examples', icon: ICONS.Clipboard },
  ];

  return (
    <aside className="w-56 flex flex-col space-y-4 flex-shrink-0">
      <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Decision Matrix</h2>
      <div className="space-y-1">
        {segments.map(seg => (
          <button
            key={seg.id}
            onClick={() => onSegmentChange(seg.id)}
            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${
              activeSegment === seg.id ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <seg.icon className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">{seg.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default IntelligenceLeftPanel;