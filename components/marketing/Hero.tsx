
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS, ROUTES } from '../../constants';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 skew-x-[-12deg] translate-x-24" />
      
      <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-slate-100 rounded-full">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Production-Ready AI Systems</span>
          </div>
          
          <h1 className="text-7xl lg:text-8xl font-editorial text-slate-900 leading-[1.05] tracking-tight">
            Build <span className="text-emerald-600">Intelligent</span> Products.
          </h1>
          
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
            Sun AI designs, architects, and launches high-fidelity AI operations for the world's most ambitious agencies.
          </p>

          <div className="flex items-center space-x-6 pt-4">
            <button 
              onClick={() => navigate(ROUTES.PROJECTS)}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
            >
              Launch App
            </button>
            <button className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-900 transition-colors">
                <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">Watch Demo</span>
            </button>
          </div>
        </div>

        <div className="relative h-[600px] flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="w-64 h-64 bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center relative z-10 group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
             <ICONS.Zap className="w-24 h-24 text-white group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-emerald-400">Sun AI Core</div>
          </div>

          <div className="absolute w-[450px] h-[450px] border border-slate-100 rounded-full" />
          <div className="absolute w-[300px] h-[300px] border border-slate-100 rounded-full" />

          {[
            { icon: ICONS.Layout, delay: '0s', label: 'UI' },
            { icon: ICONS.Zap, delay: '-5s', label: 'LLM' },
            { icon: ICONS.Users, delay: '-10s', label: 'CRM' },
            { icon: ICONS.Settings, delay: '-15s', label: 'OPS' }
          ].map((node, i) => (
            <div 
              key={i} 
              className="orbit-icon absolute"
              style={{ animationDelay: node.delay }}
            >
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-xl flex flex-col items-center justify-center group hover:border-emerald-500 transition-colors cursor-pointer">
                <node.icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                <span className="text-[8px] font-black text-slate-300 group-hover:text-emerald-400 mt-1 uppercase tracking-tighter">{node.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
