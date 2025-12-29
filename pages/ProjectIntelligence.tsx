
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
// Fixed: IntelligenceTab is now imported from the central types file
import { Project, WizardBlueprint, ProjectIntelligence, IntelligenceTab } from '../types';
import { generateProjectIntelligence } from '../services/intelligenceService';

import IntelligenceLeftPanel from '../components/intelligence/IntelligenceLeftPanel';
import IntelligenceMainPanel from '../components/intelligence/IntelligenceMainPanel';
import IntelligenceRightPanel from '../components/intelligence/IntelligenceRightPanel';

const PROJECTS_STORAGE_KEY = 'sunai_projects_db';

const ProjectIntelligenceScreen: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [activeSegment, setActiveSegment] = useState<IntelligenceTab>('Agents');
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [intelligence, setIntelligence] = useState<ProjectIntelligence | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [rightPanelTab, setRightPanelTab] = useState<'activity' | 'summary'>('activity');

  useEffect(() => {
    if (!projectId) return;

    const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (saved) {
      const projects = JSON.parse(saved) as Project[];
      const p = projects.find(item => item.id === projectId);
      if (p) {
        setProject(p);
        
        if (p.intelligence) {
          setIntelligence(p.intelligence);
          setSelectedIds(new Set(p.intelligence.selectedItems));
          setLoading(false);
          return;
        }

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
    setRightPanelTab('summary');
  };

  const handleConfirmPlan = () => {
    if (!project || !intelligence) return;

    const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (saved) {
      const projects = JSON.parse(saved) as Project[];
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            updated_at: new Date().toISOString(),
            intelligence: {
              ...intelligence,
              selectedItems: Array.from(selectedIds)
            }
          };
        }
        return p;
      });
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      navigate(ROUTES.PROJECT_EXECUTION(projectId));
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center relative shadow-2xl shadow-blue-200">
           <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           <div className="absolute inset-0 border-4 border-blue-100 rounded-[2rem] animate-ping" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Synthesizing Intelligence</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Principal Architect Logic Active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700">
      <IntelligenceLeftPanel 
        activeSegment={activeSegment} 
        onSegmentChange={setActiveSegment} 
      />

      <IntelligenceMainPanel 
        activeSegment={activeSegment} 
        project={project} 
        intelligence={intelligence} 
        selectedIds={selectedIds} 
        onToggle={toggleSelection} 
      />

      <IntelligenceRightPanel 
        activeTab={rightPanelTab} 
        setActiveTab={setRightPanelTab} 
        intelligence={intelligence} 
        selectedIds={selectedIds} 
        onToggle={toggleSelection} 
        onConfirm={handleConfirmPlan} 
      />
    </div>
  );
};

export default ProjectIntelligenceScreen;