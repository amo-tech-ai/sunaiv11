
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { performDeepResearch, ResearchReport } from '../services/researchService';

const DeepResearchLab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [activeTab, setActiveTab] = useState<'activity' | 'actions'>('activity');

  const handleStartResearch = async () => {
    if (!query) return;
    setIsResearching(true);
    try {
      const result = await performDeepResearch(query);
      setReport(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700">
      {/* PANEL A: QUEUES */}
      <aside className="w-64 flex flex-col space-y-8 flex-shrink-0">
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Research Lab</h2>
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl bg-slate-900 text-white shadow-2xl">
              <ICONS.Search className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">Active Scan</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-100 transition-all">
              <ICONS.Clipboard className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">Saved Reports</span>
            </button>
          </div>
        </div>
      </aside>

      {/* PANEL B: REPORT SURFACE */}
      <div className="flex-1 flex flex-col space-y-8 min-w-0">
        <header className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded tracking-widest">Grounded AI</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Researcher Agent Active</span>
          </div>
          <h1 className="text-5xl font-editorial text-slate-900 uppercase">Intelligence <span className="italic text-slate-400">Lab</span></h1>
          
          <div className="relative max-w-2xl">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Company name or Market topic..."
              className="w-full px-8 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium text-lg"
            />
            <button 
              onClick={handleStartResearch}
              disabled={isResearching}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
            >
              {isResearching ? 'Scanning...' : 'Start Scan'}
            </button>
          </div>
        </header>

        <div className="flex-1 bg-white border border-slate-200 rounded-[3rem] overflow-y-auto custom-scrollbar p-12 shadow-sm">
          {!report ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 grayscale py-20">
              <ICONS.Search className="w-16 h-16" />
              <p className="text-xl font-editorial">Initiate a scan to populate market intelligence.</p>
            </div>
          ) : (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {/* Report Header */}
              <section className="space-y-4 text-center pb-12 border-b border-slate-100">
                <h2 className="text-4xl font-editorial text-slate-900">{query} Analysis</h2>
                <div className="flex items-center justify-center space-x-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Industry: {report.industry}</span>
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                  <span>Sources: Google Search Grounded</span>
                </div>
              </section>

              {/* Competitor Map */}
              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Competitive Landscape</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {report.competitors.map((comp, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-emerald-200 transition-all group">
                       <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{comp.name}</h4>
                       <p className="text-xs font-bold text-slate-400 uppercase mt-1 mb-4">Focus: {comp.strength}</p>
                       <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{comp.strategy}"</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Live News Signals */}
              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Live News Signals</h3>
                <div className="space-y-4">
                  {report.newsSignals.map((news, i) => (
                    <a 
                      key={i} 
                      href={news.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-6 bg-white border border-slate-100 rounded-[1.5rem] hover:shadow-xl hover:shadow-slate-100 transition-all flex items-start space-x-6 group"
                    >
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ICONS.Zap className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-black text-slate-900">{news.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{news.snippet}</p>
                        <div className="flex items-center space-x-4 pt-2">
                           <span className="text-[9px] font-black text-slate-300 uppercase">{news.date}</span>
                           <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest group-hover:underline">View Source</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      {/* PANEL C: AGENT INTEL */}
      <aside className="w-80 flex flex-col space-y-6 flex-shrink-0 animate-in slide-in-from-right bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === 'activity' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Insights
          </button>
          <button 
            onClick={() => setActiveTab('actions')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === 'actions' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Strategy
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {activeTab === 'activity' ? (
            <div className="space-y-8 animate-in fade-in duration-300">
               <section className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 blur-2xl -translate-y-8 translate-x-8" />
                <header className="relative z-10 flex items-center space-x-2 text-emerald-400 mb-2">
                   <ICONS.Zap className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Analysis Engine</span>
                </header>
                <p className="relative z-10 text-xs text-slate-400 leading-relaxed italic">
                   "Researcher Agent successfully synthesized 15+ grounding signals into a unified market profile."
                </p>
              </section>

              {report?.strategicInsights && (
                <section className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Strategic Angles</h4>
                  <div className="space-y-4">
                    {report.strategicInsights.map((insight, i) => (
                      <div key={i} className="flex space-x-3 group border-l-2 border-slate-100 pl-4 py-1 hover:border-emerald-500 transition-colors">
                        <span className="text-xs font-bold text-slate-700 leading-relaxed">{insight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 grayscale">
              <ICONS.Layout className="w-12 h-12" />
              <p className="text-[10px] font-black uppercase tracking-widest">Proposed actions will populate based on report findings</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default DeepResearchLab;
