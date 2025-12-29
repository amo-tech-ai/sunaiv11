import React, { useState, useEffect } from 'react';
import { Contact } from '../../types';
import { ICONS } from '../../constants';
import { enrichContactProfile, draftFollowUpEmail, EnrichmentResult } from '../../services/crmService';

interface ContactIntelligencePanelProps {
  contact: Contact | null;
  onUpdate: (updated: Contact) => void;
  isLoading?: boolean;
  // Added onDeselect to fix type error in CRMRightPanel.tsx
  onDeselect?: () => void;
}

const ContactIntelligencePanel: React.FC<ContactIntelligencePanelProps> = ({ contact, onUpdate, isLoading, onDeselect }) => {
  const [researchData, setResearchData] = useState<EnrichmentResult | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  // Reset local state when contact changes
  useEffect(() => {
    setResearchData(null);
  }, [contact?.id]);

  if (!contact) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-30 grayscale py-20">
        <ICONS.Users className="w-12 h-12 text-slate-400" />
        <p className="text-[10px] font-black uppercase tracking-widest max-w-[180px]">Select a contact to view intelligence</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 space-y-4 animate-pulse">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-4" />
        <div className="h-4 w-32 bg-slate-100 rounded" />
        <div className="h-3 w-48 bg-slate-100 rounded" />
      </div>
    );
  }

  const handleEnrich = async () => {
    setIsResearching(true);
    try {
      const result = await enrichContactProfile(contact.company);
      setResearchData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Entity Profile Card */}
      <section className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl -translate-y-8 translate-x-8" />
        
        {/* Close Button to trigger deselect */}
        {onDeselect && (
          <button 
            onClick={onDeselect}
            className="absolute top-4 left-4 z-20 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-2xl font-editorial text-slate-900 mb-4 border border-slate-100">
            {contact.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3 className="text-xl font-black tracking-tight leading-none mb-1">{contact.name}</h3>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{contact.role}</p>
        </div>
      </section>

      {/* Relationship Strength */}
      <section className="bg-white border border-slate-100 rounded-[1.5rem] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Relationship Strength</h4>
          <span className={`text-xl font-black tracking-tighter ${
            contact.sentimentScore >= 80 ? 'text-emerald-600' : contact.sentimentScore < 40 ? 'text-red-600' : 'text-amber-600'
          }`}>
            {contact.sentimentScore}%
          </span>
        </div>
        <div className="h-2 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              contact.sentimentScore >= 80 ? 'bg-emerald-500' : contact.sentimentScore < 40 ? 'bg-red-500' : 'bg-amber-500'
            }`} 
            style={{ width: `${contact.sentimentScore}%` }} 
          />
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic">
            "{contact.aiSummary}"
          </p>
        </div>
      </section>

      {/* Suggested Follow-up */}
      <section className="bg-white border border-slate-100 rounded-[1.5rem] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Suggested Action</h4>
          <ICONS.MessageCircle className="w-3 h-3 text-blue-500" />
        </div>
        <p className="text-xs font-bold text-slate-900 leading-relaxed">
          {contact.status === 'risk' 
            ? "Immediate outreach recommended to mitigate budget concerns." 
            : "Relationship is high-fidelity. Propose an expansion session."}
        </p>
        <button 
          onClick={() => {}} 
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          <ICONS.Zap className="w-3 h-3 text-blue-400" />
          <span>Draft follow-up</span>
        </button>
      </section>

      {/* Auto-Enrich Profile */}
      <section className="bg-emerald-50 border border-emerald-100 rounded-[1.5rem] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Auto-Enrich Profile</h4>
          <button onClick={handleEnrich} disabled={isResearching}>
            <ICONS.Search className={`w-3 h-3 text-emerald-600 ${isResearching ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {researchData ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-slate-400 uppercase">Industry</span>
              <span className="text-[10px] font-bold text-slate-900">{researchData.industry}</span>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Latest News</span>
              {researchData.recentNews.map((news, i) => (
                <div key={i} className="text-[9px] font-medium text-slate-600 leading-tight border-l-2 border-emerald-200 pl-3 py-1">
                  {news}
                </div>
              ))}
            </div>
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center mt-2">AI Sources: Google Search</p>
          </div>
        ) : (
          <button 
            onClick={handleEnrich}
            disabled={isResearching}
            className="w-full py-3 border-2 border-dashed border-emerald-200 rounded-xl text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-100 transition-all"
          >
            {isResearching ? 'Researching...' : 'Gather Context'}
          </button>
        )}
      </section>
    </div>
  );
};

export default ContactIntelligencePanel;