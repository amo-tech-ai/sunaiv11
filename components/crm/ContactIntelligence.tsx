
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants';
import { Contact } from '../../types';
import { enrichContactProfile, analyzeRelationshipStrength, draftFollowUpEmail, EnrichmentResult } from '../../services/crmService';

interface ContactIntelligenceProps {
  contact: Contact;
  onUpdate: (updated: Contact) => void;
  onDeselect: () => void;
}

const ContactIntelligence: React.FC<ContactIntelligenceProps> = ({ contact, onUpdate, onDeselect }) => {
  const [isResearching, setIsResearching] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [researchData, setResearchData] = useState<EnrichmentResult | null>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [showDraftModal, setShowDraftModal] = useState(false);

  useEffect(() => {
    setResearchData(null);
    setDraft(null);
    setShowDraftModal(false);
  }, [contact.id]);

  const handleEnrich = async () => {
    setIsResearching(true);
    const result = await enrichContactProfile(contact.company);
    setResearchData(result);
    setIsResearching(false);
  };

  const handleScoreUpdate = async () => {
    setIsScoring(true);
    const history = `Sentiment: ${contact.sentimentScore}. Summary: ${contact.aiSummary}`;
    const result = await analyzeRelationshipStrength(contact, history);
    onUpdate({ ...contact, sentimentScore: result.score, aiSummary: result.reasoning });
    setIsScoring(false);
  };

  const handleDraftEmail = async () => {
    setIsDrafting(true);
    const context = contact.status === 'risk' ? "Draft a reassurance email addressing timeline concerns." : "Draft a growth-focused email proposing a Q4 roadmap expansion.";
    const text = await draftFollowUpEmail(contact, context);
    setDraft(text);
    setIsDrafting(false);
    setShowDraftModal(true);
  };

  return (
    <aside className="w-80 flex flex-col space-y-6 animate-in slide-in-from-right duration-500">
      <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <button onClick={onDeselect} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/20 blur-3xl -translate-y-12 -translate-x-12" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-3xl font-editorial text-slate-900 mb-6 border border-slate-100">
            {contact.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3 className="text-3xl font-black tracking-tight leading-none mb-2">{contact.name}</h3>
          <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">{contact.role}</p>
          <p className="text-xs font-bold text-slate-500 mt-2">{contact.company}</p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Scorer Agent</h4>
          <button onClick={handleScoreUpdate} disabled={isScoring} className={`text-blue-600 ${isScoring ? 'animate-pulse' : 'hover:scale-110'}`}>
            <ICONS.Zap className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900">Relationship Strength</span>
            <span className={`text-2xl font-black tracking-tighter ${contact.status === 'risk' ? 'text-red-600' : 'text-emerald-600'}`}>{contact.sentimentScore}%</span>
          </div>
          <div className="h-2 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${contact.status === 'risk' ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${contact.sentimentScore}%` }} />
          </div>
          <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">"{contact.aiSummary}"</p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Researcher Agent</h4>
          <button onClick={handleEnrich} disabled={isResearching} className={`text-emerald-600 ${isResearching ? 'animate-spin' : 'hover:scale-110'}`}>
            <ICONS.Search className="w-4 h-4" />
          </button>
        </div>

        {researchData ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
               <span className="text-[9px] font-black text-emerald-600 uppercase mb-1 block">Industry Grounding</span>
               <p className="text-xs font-bold text-slate-900">{researchData.industry}</p>
            </div>
            <div className="space-y-3">
              <span className="text-[9px] font-black text-slate-400 uppercase">Latest Signals (via Google)</span>
              {researchData.recentNews.map((news, i) => (
                <div key={i} className="text-[10px] font-medium text-slate-600 leading-tight border-l-2 border-emerald-100 pl-4 py-1">
                   {news}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button 
            onClick={handleEnrich}
            disabled={isResearching}
            className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-600 transition-all"
          >
            {isResearching ? 'Agent Grounding...' : 'Deep Research Profile'}
          </button>
        )}
      </section>

      <section className="mt-auto pt-4 flex flex-col space-y-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Next Best Actions</h4>
        <button 
          onClick={handleDraftEmail}
          disabled={isDrafting}
          className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center space-x-3 active:scale-95"
        >
          {isDrafting ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <ICONS.MessageCircle className="w-4 h-4" />}
          <span>Proposed Follow-up</span>
        </button>
      </section>

      {/* DRAFT MODAL */}
      {showDraftModal && draft && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-8 animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] max-w-4xl w-full flex flex-col shadow-3xl overflow-hidden animate-in zoom-in duration-500 h-[700px]">
             <header className="p-10 border-b border-slate-100 flex justify-between items-center">
                <div>
                   <h3 className="text-3xl font-black text-slate-900 tracking-tight">Comms Proposal</h3>
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-2">Agent: The Comms Lead (Flash-3-Preview)</p>
                </div>
                <button onClick={() => setShowDraftModal(false)} className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </header>

             <div className="flex-1 flex overflow-hidden">
                <div className="w-72 bg-slate-50 border-r border-slate-100 p-10 space-y-8">
                   <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signal Source</span>
                      <p className="text-sm font-black text-slate-900">{contact.company}</p>
                   </div>
                   <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grounding Context</span>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-[10px] font-bold text-slate-500 leading-relaxed italic">
                        "{contact.aiSummary}"
                      </div>
                   </div>
                </div>

                <div className="flex-1 p-10 flex flex-col space-y-6">
                   <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-10 overflow-y-auto custom-scrollbar shadow-inner">
                      <pre className="text-lg font-medium text-slate-800 whitespace-pre-wrap font-sans leading-relaxed tracking-tight">
                         {draft}
                      </pre>
                   </div>
                   <div className="flex items-center space-x-4">
                      <button onClick={handleDraftEmail} className="px-8 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                         Regenerate Draft
                      </button>
                      <button className="flex-1 py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
                         Approve & Push to Mailer
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ContactIntelligence;
