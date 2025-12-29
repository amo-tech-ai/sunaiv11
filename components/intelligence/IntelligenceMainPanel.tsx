
import React from 'react';
// Fixed: IntelligenceTab is now successfully exported from '../../types'
import { Project, ProjectIntelligence, IntelligenceTab } from '../../types';
import AgentCard from './AgentCard';
import AutomationCard from './AutomationCard';
import WorkflowCard from './WorkflowCard';
import JourneyCard from './JourneyCard';
import ExampleCard from './ExampleCard';

interface IntelligenceMainPanelProps {
  // Refactored: Use explicit IntelligenceTab type instead of local union string
  activeSegment: IntelligenceTab;
  project: Project | null;
  intelligence: ProjectIntelligence | null;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

const IntelligenceMainPanel: React.FC<IntelligenceMainPanelProps> = ({ 
  activeSegment, 
  project, 
  intelligence, 
  selectedIds, 
  onToggle 
}) => {
  return (
    <div className="flex-1 flex flex-col space-y-8 min-w-0">
      <header className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
           <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded">Intelligence Stream</span>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project: {project?.name}</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Operational Components</h1>
      </header>

      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar min-h-0">
        {activeSegment === 'Agents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500 pb-10">
            {intelligence?.agents.map(agent => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                isSelected={selectedIds.has(agent.id)} 
                onToggle={onToggle} 
              />
            ))}
          </div>
        )}

        {activeSegment === 'Automations' && (
          <div className="space-y-4 animate-in slide-in-from-left-4 duration-500 pb-10">
            {intelligence?.automations.map(auto => (
              <AutomationCard 
                key={auto.id} 
                automation={auto} 
                isSelected={selectedIds.has(auto.id)} 
                onToggle={onToggle} 
              />
            ))}
          </div>
        )}

        {activeSegment === 'Workflows' && (
          <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-left-4 duration-500 pb-10">
             {intelligence?.workflows.map(wf => (
               <WorkflowCard 
                 key={wf.id} 
                 workflow={wf} 
                 isSelected={selectedIds.has(wf.id)} 
                 onToggle={onToggle} 
               />
             ))}
          </div>
        )}

        {activeSegment === 'Journeys' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500 pb-10">
            {intelligence?.journeys.map(journey => (
              <JourneyCard 
                key={journey.id} 
                journey={journey} 
                isSelected={selectedIds.has(journey.id)} 
                onToggle={onToggle} 
              />
            ))}
          </div>
        )}

        {activeSegment === 'Examples' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500 pb-10">
            {intelligence?.examples.map(example => (
              <ExampleCard 
                key={example.id} 
                example={example} 
                isSelected={selectedIds.has(example.id)} 
                onToggle={onToggle} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligenceMainPanel;