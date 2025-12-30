
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICONS, ROUTES } from '../constants';
import { Project, WizardBlueprint } from '../types';
import { generateProjectMoodboard } from '../services/creativeService';
import { supabaseService } from '../services/supabaseService';

const ProposalFullView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'logic' | 'visuals'>('logic');
  const [blueprint, setBlueprint] = useState<WizardBlueprint | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isGeneratingMoodboard, setIsGeneratingMoodboard] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    supabaseService.getProjectById(projectId).then(p => {
      if (p) {
        setProject(p);
        const savedWizard = localStorage.getItem('sunai_wizard_draft');
        if (savedWizard) setBlueprint(JSON.parse(savedWizard));
      }
    });
  }, [projectId]);

  const handleGenerateMoodboard = async () => {
    if (!project || !projectId) return;
    setIsGeneratingMoodboard(true);
    try {
      const imageUrl = await generateProjectMoodboard(
        project.name, 
        project.client_name, 
        blueprint?.intent.industry || 'Technology'
      );
      await supabaseService.updateProjectMoodboard(projectId, imageUrl);
      setProject(prev => prev ? ({ ...prev, moodboard_url: imageUrl }) : null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingMoodboard(false);
    }
  };

  const toc = [
    { id: 'summary', label: 'Executive Summary' },
    { id: 'grounding', label: 'Market Grounding' },
    { id: 'roadmap', label: 'Strategic Roadmap' },
    { id: 'investment', label: 'Investment Grid' },
    { id: 'terms', label: 'Standard Terms' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700 overflow-hidden">
      {/* PANEL A: TOC NAVIGATOR */}
      <aside className="w-64 flex flex-col space-y-6 flex-shrink-0">
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Navigation</h2>
          <div className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="w-full flex items-center space-x-3 px-5 py-3 rounded-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all text-left"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 bg-slate-900 rounded-[2.5rem] text-white">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Export Protocol</p>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-3 transition-all border border-white/5">
            <ICONS.Clipboard className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </aside>

      {/* PANEL B: THE EDITORIAL DOCUMENT */}
      <main className="flex-1 bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-y-auto custom-scrollbar scroll-smooth">
        {project?.moodboard_url && (
          <div className="w-full aspect-[21/9] overflow-hidden relative group">
            <img src={project.moodboard_url} alt="Project Moodboard" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <button 
              onClick={handleGenerateMoodboard}
              className="absolute bottom-8 right-8 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all"
            >
              Regenerate Visual
            </button>
          </div>
        )}

        <div className="max-w-3xl mx-auto py-24 px-12 space-y-24">
          <header className="space-y-8 text-center pb-12 border-b border-slate-100">
            {!project?.moodboard_url && (
              <div className="flex justify-center mb-6">
                 <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                    <ICONS.Zap className="w-6 h-6" />
                 </div>
              </div>
            )}
            <h1 className="text-7xl font-editorial text-slate-900 leading-[1.1] tracking-tight">
              Project <span className="italic text-slate-400">Blueprint</span> Proposal
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Stream: {projectId}</span>
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{project?.name || 'Active Ops'}</span>
            </div>
          </header>

          <section id="summary" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-editorial text-slate-900 italic">Executive Summary</h2>
            <div className="text-xl text-slate-500 font-light leading-relaxed space-y-6">
              <p>Our objective for <span className="font-black text-slate-900">{project?.client_name}</span> is to architect a high-fidelity operational stream that prioritizes velocity without compromising structural integrity.</p>
            </div>
          </section>

          <section id="roadmap" className="space-y-12 pt-12 border-t border-slate-100 animate-in fade-in">
            <header className="flex items-end justify-between">
              <h2 className="text-4xl font-editorial text-slate-900">Strategic Roadmap</h2>
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Architected for 8 Weeks</span>
            </header>
            <div className="space-y-12">
              {blueprint?.artifacts?.wbs.map((phase, idx) => (
                <div key={phase.id} className="group relative pl-16 space-y-6">
                  <div className="absolute left-0 top-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-editorial text-lg text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">{idx + 1}</div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{phase.title}</h3>
                    <p className="text-slate-500 font-medium mt-1">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* PANEL C: THE EDITOR'S DESK */}
      <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right duration-500 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
          <button onClick={() => setActiveTab('logic')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'logic' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>Logic</button>
          <button onClick={() => setActiveTab('visuals')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'visuals' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>Visuals</button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {activeTab === 'logic' ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
                <header className="relative z-10 flex items-center space-x-2 text-blue-400 mb-2">
                   <ICONS.Zap className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Architect Reasoning</span>
                </header>
                <p className="text-xs font-bold text-slate-400 italic">"Proposal architected using Gemini 3 Pro reasoning."</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-300">
              <header>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Project Visuals</h3>
                <p className="text-xs text-slate-500 font-medium">AI-generated moodboards for project aesthetic.</p>
              </header>

              {project?.moodboard_url ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-xl">
                    <img src={project.moodboard_url} alt="Moodboard" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={handleGenerateMoodboard} disabled={isGeneratingMoodboard} className="w-full py-4 border-2 border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                    {isGeneratingMoodboard ? 'Regenerating...' : 'Regenerate Hero'}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleGenerateMoodboard}
                  disabled={isGeneratingMoodboard}
                  className="w-full aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-3 group cursor-pointer hover:border-blue-300 hover:bg-slate-50 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                    {isGeneratingMoodboard ? <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <ICONS.Plus className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {isGeneratingMoodboard ? 'Architecting Visual...' : 'Generate Moodboard'}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50/50">
           <button onClick={() => navigate(ROUTES.PROJECT_EXECUTION(projectId || ''))} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">Approve Proposal</button>
        </div>
      </aside>
    </div>
  );
};

export default ProposalFullView;
