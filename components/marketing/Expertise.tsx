
import React from 'react';
import { ICONS } from '../../constants';

const Expertise: React.FC = () => {
  const cards = [
    { icon: ICONS.Layout, title: 'AI-Native Platforms', desc: 'Custom enterprise SaaS designed for high-throughput AI workloads.' },
    { icon: ICONS.Zap, title: 'Prompt Architecture', desc: 'Engineered prompts for RAG systems with deterministic reliability.' },
    { icon: ICONS.Users, title: 'Operational Workflows', desc: 'Bridging internal agency ops with automated intelligence streams.' },
    { icon: ICONS.Settings, title: 'Integrations Layer', desc: 'Securely connecting your legacy data to modern LLM foundations.' },
    { icon: ICONS.Clipboard, title: 'Blueprint Systems', desc: 'Turning ambiguous project briefs into structured execution DNA.' },
    { icon: ICONS.Plus, title: 'Velocity Scaling', desc: 'Deploying high-quality software at the speed of thought.' },
    { icon: ICONS.Layout, title: 'Multimodal Interfaces', desc: 'Voice, Vision, and Text interfaces unified in single platforms.' },
    { icon: ICONS.Zap, title: 'Infrastructure Design', desc: 'Serverless backend systems optimized for latency and cost.' }
  ];

  return (
    <section id="expertise" className="bg-slate-50 py-32">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20 space-y-4">
           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Our Expertise</span>
           <h2 className="text-5xl font-editorial text-slate-900">Capabilities for the Next Era.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <card.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3">{card.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
