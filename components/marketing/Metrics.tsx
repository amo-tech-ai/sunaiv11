
import React from 'react';

const Metrics: React.FC = () => {
  const stats = [
    { val: '6x', label: 'Faster Deployment', desc: 'Compared to traditional offshore agency models.' },
    { val: '35%', label: 'Budget Efficiency', desc: 'Reduction in wasted resource cycles through AI scoping.' },
    { val: '340%', label: 'Ops Productivity', desc: 'Increase in parallel project bandwidth per manager.' }
  ];

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-100/50 blur-3xl rounded-full" />
             <div className="relative grid grid-cols-1 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100 group hover:scale-105 transition-transform">
                    <div className="text-5xl font-black text-emerald-600 tracking-tighter mb-2">{stat.val}</div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2">{stat.label}</div>
                    <p className="text-xs text-slate-400 font-medium">{stat.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-5xl font-editorial text-slate-900 leading-tight">Traditional Agencies are obsolete.</h2>
            <p className="text-lg text-slate-500 font-medium">The gap between idea and execution used to be months of documentation and meetings. Sun AI closes that gap to 8 weeks.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Traditional Agency Cycle</span>
                    <span>8 Months</span>
                 </div>
                 <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 w-full" />
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    <span>Sun AI Operations</span>
                    <span>8 Weeks</span>
                 </div>
                 <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-1/4 animate-pulse" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
