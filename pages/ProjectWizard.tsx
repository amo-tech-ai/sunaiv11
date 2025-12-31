
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICONS, ROUTES } from '../constants';
import { WizardBlueprint, ProjectStatus, TaskStatus, TaskPriority, Project } from '../types';
import { generateProjectPlan } from '../services/projectGenerator';
import { scanWebsite } from '../services/retrieverService';

// Sub-components
import WizardStepNav from '../components/wizard/WizardStepNav';
import WizardRightPanel from '../components/wizard/WizardRightPanel';
import Step1Basics from '../components/wizard/Step1Basics';
import Step2Overview from '../components/wizard/Step2Overview';
import Step3Constraints from '../components/wizard/Step3Constraints';
import Step4Review from '../components/wizard/Step4Review';
import Step5Architecting from '../components/wizard/Step5Architecting';
import Step6Proposal from '../components/wizard/Step6Proposal';

const WIZARD_STORAGE_KEY = 'sunai_wizard_draft';
const PROJECTS_STORAGE_KEY = 'sunai_projects_db';

const ProjectWizard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isArchitecting, setIsArchitecting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [thoughtLogs, setThoughtLogs] = useState<string[]>([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  const [tempGoal, setTempGoal] = useState('');
  
  const [blueprint, setBlueprint] = useState<WizardBlueprint>(() => {
    const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, meta: { ...parsed.meta, status: 'draft' } };
      } catch (e) {
        console.error("Failed to parse wizard draft", e);
      }
    }
    return {
      identity: { projectName: '', clientName: '', website: '' },
      intent: { type: '', industry: '', goals: [], integrations: [] },
      constraints: { budget: 15000, currency: 'USD', deadline: '', urgency: 'Medium' },
      meta: { step: 1, lastUpdated: new Date().toISOString(), status: 'draft' }
    };
  });

  // 2. LOGIC HELPERS
  const feasibilityScore = useMemo(() => {
    let score = 50;
    if (blueprint.constraints.budget > 25000) score += 20;
    if (blueprint.constraints.budget < 5000) score -= 30;
    if (blueprint.constraints.urgency === 'Low') score += 15;
    if (blueprint.constraints.urgency === 'High') score -= 20;
    return Math.max(10, Math.min(100, score));
  }, [blueprint.constraints]);

  // 3. HANDLERS
  const nextStep = useCallback(() => setCurrentStep(prev => Math.min(6, prev + 1)), []);
  const prevStep = useCallback(() => setCurrentStep(prev => Math.max(1, prev - 1)), []);
  const goToStep = useCallback((step: number) => setCurrentStep(step), []);

  const updateSection = useCallback((section: keyof WizardBlueprint, updates: any) => {
    setBlueprint(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof WizardBlueprint], ...updates },
      meta: { ...prev.meta, lastUpdated: new Date().toISOString() }
    }));
  }, []);

  const handleWebsiteBlur = useCallback(async () => {
    if (blueprint.identity.website && blueprint.identity.website.length > 5) {
      setIsScanning(true);
      try {
        const context = await scanWebsite(blueprint.identity.website);
        setBlueprint(prev => ({
          ...prev,
          intent: {
            ...prev.intent,
            industry: context.industry,
            goals: [...new Set([...prev.intent.goals, ...context.suggestedGoals])],
            integrations: [...new Set([...prev.intent.integrations, ...context.detectedTech.slice(0, 1)])]
          }
        }));
      } catch (e) {
        console.error("Retriever Error", e);
      } finally {
        setIsScanning(false);
      }
    }
  }, [blueprint.identity.website]);

  const addItem = useCallback((field: 'goals' | 'integrations', value: string) => {
    if (!value.trim()) return;
    setBlueprint(prev => ({
      ...prev,
      intent: {
        ...prev.intent,
        [field]: [...new Set([...prev.intent[field], value.trim()])]
      },
      meta: { ...prev.meta, lastUpdated: new Date().toISOString() }
    }));
  }, []);

  const removeItem = useCallback((field: 'goals' | 'integrations', index: number) => {
    setBlueprint(prev => ({
      ...prev,
      intent: {
        ...prev.intent,
        [field]: prev.intent[field].filter((_, i) => i !== index)
      },
      meta: { ...prev.meta, lastUpdated: new Date().toISOString() }
    }));
  }, []);

  const toggleTaskSelection = useCallback((taskId: string) => {
    setSelectedTaskIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) newSet.delete(taskId);
      else newSet.add(taskId);
      return newSet;
    });
  }, []);

  const handleStartArchitecting = async () => {
    setIsArchitecting(true);
    setCurrentStep(5);
    setThoughtLogs([]);
    
    try {
      const result = await generateProjectPlan(blueprint);
      
      // Stream thinking logs slowly for UX
      for (const thought of result.thoughts) {
        await new Promise(r => setTimeout(r, 800));
        setThoughtLogs(prev => [...prev, thought]);
      }

      setBlueprint(prev => ({
        ...prev,
        artifacts: result,
        meta: { ...prev.meta, status: 'ready' }
      }));

      // Initialize selected tasks (default all checked)
      const allIds = new Set<string>();
      result.wbs.forEach(p => p.tasks.forEach(t => allIds.add(t.id)));
      setSelectedTaskIds(allIds);

      setTimeout(() => {
        setIsArchitecting(false);
        setCurrentStep(6);
      }, 1000);
    } catch (e) {
      console.error(e);
      setIsArchitecting(false);
    }
  };

  const handleFinalLaunch = useCallback(() => {
    const finalId = projectId || Math.random().toString(36).substr(2, 9);
    
    // 1. Persist to "DB"
    const newProject: Project = {
      id: finalId,
      name: blueprint.identity.projectName,
      client_name: blueprint.identity.clientName,
      status: ProjectStatus.ACTIVE,
      updated_at: new Date().toISOString(),
      has_blueprint: true,
      description: `Launched from AI Wizard with ${selectedTaskIds.size} tasks.`
    };

    const existingProjects = JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY) || '[]');
    const updatedProjects = [newProject, ...existingProjects.filter((p: any) => p.id !== finalId)];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));

    // 2. Clear wizard draft
    localStorage.removeItem(WIZARD_STORAGE_KEY);
    
    // 3. Navigate
    navigate(ROUTES.PROJECT_EXECUTION(finalId), { 
      state: { 
        launchBlueprint: blueprint,
        selectedIds: Array.from(selectedTaskIds)
      } 
    });
  }, [navigate, blueprint, selectedTaskIds, projectId]);

  // 4. AUTOSAVE
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(blueprint));
      setTimeout(() => setIsSaving(false), 400);
    }, 1000);
    return () => clearTimeout(timer);
  }, [blueprint]);

  // 5. RENDER LOGIC
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Basics 
            blueprint={blueprint} 
            updateSection={updateSection} 
            isScanning={isScanning} 
            onWebsiteBlur={handleWebsiteBlur} 
          />
        );
      case 2:
        return (
          <Step2Overview 
            blueprint={blueprint} 
            updateSection={updateSection} 
            addItem={addItem} 
            removeItem={removeItem} 
            tempGoal={tempGoal} 
            setTempGoal={setTempGoal} 
          />
        );
      case 3:
        return <Step3Constraints blueprint={blueprint} updateSection={updateSection} />;
      case 4:
        return <Step4Review blueprint={blueprint} goToStep={goToStep} />;
      case 5:
        return <Step5Architecting thoughtLogs={thoughtLogs} />;
      case 6:
        return (
          <Step6Proposal 
            blueprint={blueprint} 
            selectedTaskIds={selectedTaskIds} 
            toggleTaskSelection={toggleTaskSelection} 
            goToStep={goToStep} 
            onFinalLaunch={handleFinalLaunch} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-160px)] w-full gap-8">
      {/* LEFT PANEL: Wizard Navigation */}
      <aside className="w-64 flex flex-col flex-shrink-0">
        <div className="flex-1">
          <WizardStepNav 
            currentStep={currentStep} 
            status={blueprint.meta.status} 
            onStepClick={goToStep} 
          />
        </div>
        <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 mt-auto shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 blur-3xl rounded-full" />
          <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-widest mb-3 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
            AI Status
          </p>
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-bold">Research AI</span>
                <span className="text-[9px] text-slate-400 font-black px-1.5 py-0.5 bg-slate-800 rounded uppercase">(Ready)</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-bold">Planning AI</span>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${currentStep >= 4 ? 'text-green-400 bg-green-400/10' : 'text-slate-400 bg-slate-800'}`}>
                  ({currentStep >= 4 ? 'Active' : 'Idle'})
                </span>
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN PANEL: Wizard Step Content Area */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative min-w-0">
        <div className="flex-1 overflow-y-auto p-12">
          {renderCurrentStep()}
        </div>

        {/* Footer Navigation */}
        {currentStep !== 5 && (
          <footer className="h-28 border-t border-slate-100 px-12 flex items-center justify-between bg-white/95 backdrop-blur-xl sticky bottom-0 z-20 flex-shrink-0">
            <div className="flex flex-col">
               <button 
                onClick={currentStep === 1 ? () => navigate(ROUTES.PROJECTS) : prevStep}
                className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center group"
              >
                <svg className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                {currentStep === 1 ? 'Cancel Journey' : 'Step Back'}
              </button>
              {blueprint.meta.lastUpdated && (
                <span className="text-[9px] text-slate-300 font-bold mt-1">Last update: {new Date(blueprint.meta.lastUpdated).toLocaleTimeString()}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-10">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Architectural Readiness</span>
                <div className="flex space-x-1.5 mt-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === currentStep 
                          ? 'w-10 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' 
                          : i < currentStep ? 'w-4 bg-blue-200' : 'w-4 bg-slate-100'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              {currentStep === 4 ? (
                <button 
                  onClick={handleStartArchitecting}
                  className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-200 transition-all transform active:scale-95 flex items-center space-x-3 text-lg group"
                >
                  <ICONS.Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>Begin Planning</span>
                </button>
              ) : currentStep < 5 && (
                <button 
                  onClick={nextStep}
                  disabled={currentStep === 1 && !blueprint.identity.projectName}
                  className="px-12 py-5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center space-x-3 text-lg group"
                >
                  <span>Next Step</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </footer>
        )}
      </div>

      {/* RIGHT PANEL: Unified Tabbed Context/Blueprint DNA */}
      <WizardRightPanel 
        blueprint={blueprint} 
        isSaving={isSaving} 
        feasibilityScore={feasibilityScore} 
      />
    </div>
  );
};

export default ProjectWizard;
