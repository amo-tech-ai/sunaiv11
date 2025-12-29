
import React, { useState, useEffect, useRef } from 'react';

const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const methodologyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (methodologyRef.current) {
        const rect = methodologyRef.current.getBoundingClientRect();
        const scrollPercent = Math.abs(rect.top) / rect.height;
        if (scrollPercent < 0.33) setActiveStep(1);
        else if (scrollPercent < 0.66) setActiveStep(2);
        else setActiveStep(3);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { id: 1, title: 'Project Scoping', desc: 'Capture human intent through a high-fidelity wizard that prevents hallucination.' },
    { id: 2, title: 'AI Blueprinting', desc: 'The system generates a structured WBS using Gemini 3 Pro with deep thinking.' },
    { id: 3, title: 'Active Execution', desc: 'Monitor tasks and approvals in a dashboard designed for agency velocity.' }
  ];

  return (
    <section id="methodology" className="bg-white py-32" ref={methodologyRef}>
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit space-y-12">
            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">Methodology</span>
              <h2 className="text-5xl font-editorial text-slate-900 leading-tight">The smarter way to build AI.</h2>
            </div>
            
            <div className="space-y-10">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`transition-all duration-500 border-l-4 pl-8 py-2 ${activeStep === step.id ? 'border-emerald-500 opacity-100' : 'border-slate-100 opacity-30'}`}
                >
                  <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 space-y-40">
            <div className="h-[500px] bg-slate-50 rounded-[3rem] border border-slate-100 p-12 overflow-hidden shadow-inner group">
              <div className="w-full h-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 transform group-hover:-translate-y-4 transition-transform duration-700">
                 <div className="flex items-center space-x-2 mb-8 border-b border-slate-100 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="space-y-6">
                    <div className="w-1/3 h-4 bg-slate-100 rounded-full" />
                    <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-blue-50 border border-blue-100 rounded-2xl" />
                      <div className="h-24 bg-emerald-50 border border-emerald-100 rounded-2xl" />
                    </div>
                 </div>
              </div>
            </div>
            <div className="h-[500px] bg-slate-900 rounded-[3rem] p-12 overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
              <div className="relative z-10 w-full h-full bg-slate-800 rounded-3xl border border-white/10 p-8">
                 <div className="text-[10px] font-black text-blue-400 uppercase mb-4">Gemini 3 Pro Output</div>
                 <div className="space-y-3 font-mono text-[10px] text-slate-400">
                    <div>[SYSTEM] Grounding context extracted.</div>
                    <div>[ARCHITECT] Designing modular phases...</div>
                    <div className="text-white">Phase 1: API Integration Layer (Stripe/Supabase)</div>
                    <div className="text-white">Phase 2: Dynamic LLM Orchestration</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
