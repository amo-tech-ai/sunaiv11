
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { Project, WizardBlueprint, ProjectIntelligence } from '../types';
import { generateProjectIntelligence } from '../services/intelligenceService';

// Modular Components
import IntelligenceTabs, { IntelligenceTab } from '../components/intelligence/IntelligenceTabs';
import AgentCard from '../components/intelligence/AgentCard';
import AutomationCard from '../components/intelligence/AutomationCard';
import WorkflowCard from '../components/intelligence/WorkflowCard';
import JourneyCard from '../components/intelligence/JourneyCard';
import ExampleCard from '../components/intelligence/ExampleCard';
import IntelligenceAside from '../components/intelligence/IntelligenceAside';

const PROJECTS_STORAGE_KEY = 'sunai_projects_db';

const ProjectIntelligenceScreen: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<IntelligenceTab>('Agents');
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [intelligence, setIntelligence] = useState<ProjectIntelligence | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!projectId) return;

    const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (saved) {
      const projects = JSON.parse(saved) as Project[];
      const p = projects.find(item => item.id === projectId);
      if (p) {
        setProject(p);
        
        // Use existing intelligence if available
        if (p.intelligence) {
          setIntelligence(p.intelligence);
          setSelectedIds(new Set(p.intelligence.selectedItems));
          setLoading(false);
          return;
        }

        // Context-aware blueprint derivation for intelligence generation
        const blueprint: WizardBlueprint = {
          identity: { projectName: p.name, clientName: p.client_name },
          intent: { type: 'Web', industry: 'SaaS', goals: ['Scale', 'Efficiency'], integrations: ['Stripe'] },
          constraints: { budget: 50000, currency: 'USD', deadline: '2025-01-01', urgency: 'Medium' },
          meta: { step: 6, lastUpdated: p.updated_at, status: 'committed' }
        };

        generateProjectIntelligence(blueprint)
          .then(intel => {
            setIntelligence(intel);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Intelligence generation failed", err);
            setLoading(false);
          });
      } else {
        navigate(ROUTES.PROJECTS);
      }
    }
  }, [projectId, navigate]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center relative shadow-2xl shadow-blue-200">
           <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           <div className="absolute inset-0 border-4 border-blue-100 rounded-[2rem] animate-ping" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Synthesizing Intelligence</h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest animate-pulse">Consulting Principal Architect Agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 flex flex-col space-y-8 overflow-hidden">
        <header className="flex flex-col space-y-4">
           <div className="flex items-center space-x-2">
             <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded">Intelligence Stream</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Blueprint Version v1.0.2</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Decision Matrix</h1>
           <p className="text-slate-500 text-sm max-w-2xl font-medium">
             The AI Architect has analyzed your Project DNA and proposed these operational enhancements. Select modules to include in your execution pipeline.
           </p>
        </header>

        <IntelligenceTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          {activeTab === 'Agents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500">
              {intelligence?.agents.map(agent => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  isSelected={selectedIds.has(agent.id)} 
                  onToggle={toggleSelection} 
                />
              ))}
            </div>
          )}

          {activeTab === 'Automations' && (
            <div className="space-y-4 animate-in slide-in-from-left-4 duration-500">
              {intelligence?.automations.map(auto => (
                <AutomationCard 
                  key={auto.id} 
                  automation={auto} 
                  isSelected={selectedIds.has(auto.id)} 
                  onToggle={toggleSelection} 
                />
              ))}
            </div>
          )}

          {activeTab === 'Workflows' && (
            <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-left-4 duration-500">
               {intelligence?.workflows.map(wf => (
                 <WorkflowCard 
                   key={wf.id} 
                   workflow={wf} 
                   isSelected={selectedIds.has(wf.id)} 
                   onToggle={toggleSelection} 
                 />
               ))}
            </div>
          )}

          {activeTab === 'Journeys' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500">
              {intelligence?.journeys.map(journey => (
                <JourneyCard 
                  key={journey.id} 
                  journey={journey} 
                  isSelected={selectedIds.has(journey.id)} 
                  onToggle={toggleSelection} 
                />
              ))}
            </div>
          )}

          {activeTab === 'Examples' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500">
              {intelligence?.examples.map(example => (
                <ExampleCard 
                  key={example.id} 
                  example={example} 
                  isSelected={selectedIds.has(example.id)} 
                  onToggle={toggleSelection} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <IntelligenceAside 
        project={project} 
        intelligence={intelligence} 
        selectedIds={selectedIds} 
        onToggle={toggleSelection} 
        projectId={projectId || ''} 
      />
    </div>
  );
};

export default ProjectIntelligenceScreen;
