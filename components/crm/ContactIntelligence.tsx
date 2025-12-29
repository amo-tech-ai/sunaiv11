
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants';
import { Contact } from '../../types';
import { enrichContactProfile, analyzeRelationshipStrength, draftFollowUpEmail, EnrichmentResult } from '../../services/crmService';

interface ContactIntelligenceProps {
  contact: Contact;
  onUpdate: (updated: Contact) => void;
  onDeselect: () => void;
  compact?: boolean;
}

const ContactIntelligence: React.FC<ContactIntelligenceProps> = ({ contact, onUpdate, onDeselect, compact }) => {
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
    <div className={`flex flex-col space-y-6 ${!compact ? 'w-80' : 'w-full'} animate-in fade-in duration-500`}>
      {/* Profile Header */}
      <section className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl -translate-y-8 translate-x-8" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-2xl font-editorial text-slate-900 mb-4 border border-slate-100">
            {contact.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3 className="text-xl font-black tracking-tight leading-none mb-1">{contact.name}</h3>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{contact.role}</p>
        </div>
      </section>

      {/* Scorer Agent */}
      <section className="bg-white border border-slate-100 rounded-[1.5rem] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">The Scorer Agent</h4>
          <button onClick={handleScoreUpdate} disabled={isScoring} className={`text-blue-600 ${isScoring ? 'animate-pulse' : 'hover:scale-110 transition-transform'}`}>
            <ICONS.Zap className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-900">Relationship Strength</span>
            <span className={`text-lg font-black tracking-tighter ${contact.status === 'risk' ? 'text-red-600' : 'text-emerald-600'}`}>{contact.sentimentScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-50 rounded-full border border-slate-50 overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${contact.status === 'risk' ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${contact.sentimentScore}%` }} />
          </div>
          <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">"{contact.aiSummary}"</p>
        </div>
      </section>

      {/* Researcher Agent */}
      <section className="bg-white border border-slate-100 rounded-[1.5rem] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">The Researcher Agent</h4>
          <button onClick={handleEnrich} disabled={isResearching} className={`text-emerald-600 ${isResearching ? 'animate-spin' : 'hover:scale-110 transition-transform'}`}>
            <ICONS.Search className="w-3 h-3" />
          </button>
        </div>

        {researchData ? (
          <div className="space-y-3 animate-in fade-in duration-500">
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-50">
               <span className="text-[8px] font-black text-emerald-600 uppercase mb-1 block tracking-widest">Industry Segment</span>
               <p className="text-[11px] font-bold text-slate-900">{researchData.industry}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Market Signals</span>
              {researchData.recentNews.map((news, i) => (
                <div key={i} className="text-[9px] font-medium text-slate-600 leading-tight border-l-2 border-emerald-100 pl-3 py-1">
                   {news}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button 
            onClick={handleEnrich}
            disabled={isResearching}
            className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:border-emerald-200 hover:text-emerald-600 transition-all"
          >
            {isResearching ? 'Agent Grounding...' : 'Research Profile'}
          </button>
        )}
      </section>

      {/* Comms Lead CTA */}
      <div className="pt-2">
        <button 
          onClick={handleDraftEmail}
          disabled={isDrafting}
          className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-[9px] uppercase tracking-widest shadow-lg shadow-slate-100 flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all active:scale-95"
        >
          {isDrafting ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <ICONS.MessageCircle className="w-3 h-3" />}
          <span>Proposed Follow-up</span>
        </button>
      </div>

      {/* DRAFT MODAL */}
      {showDraftModal && draft && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full flex flex-col shadow-3xl overflow-hidden animate-in zoom-in duration-500 h-[600px]">
             <header className="p-8 border-b border-slate-100 flex justify-between items-center">
                <div>
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">Comms Proposal</h3>
                   <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">Agent: The Comms Lead</p>
                </div>
                <button onClick={() => setShowDraftModal(false)} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </header>

             <div className="flex-1 flex overflow-hidden">
                <div className="w-56 bg-slate-50 border-r border-slate-100 p-8 space-y-6 hidden sm:block">
                   <div className="space-y-1">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Signal Source</span>
                      <p className="text-xs font-black text-slate-900">{contact.company}</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Context</span>
                      <div className="bg-white p-3 rounded-xl border border-slate-100 text-[9px] font-bold text-slate-500 leading-relaxed italic">
                        "{contact.aiSummary}"
                      </div>
                   </div>
                </div>

                <div className="flex-1 p-8 flex flex-col space-y-4">
                   <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 overflow-y-auto custom-scrollbar shadow-inner">
                      <pre className="text-sm font-medium text-slate-800 whitespace-pre-wrap font-sans leading-relaxed tracking-tight">
                         {draft}
                      </pre>
                   </div>
                   <div className="flex items-center space-x-3">
                      <button onClick={handleDraftEmail} className="px-5 py-3 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                         Regenerate
                      </button>
                      <button className="flex-1 py-4 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
                         Approve & Sync
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactIntelligence;
