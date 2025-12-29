
import React from 'react';

const TechStack: React.FC = () => {
  const stack = [
    { label: 'Frontend', items: ['React', 'Next.js', 'Framer'] },
    { label: 'AI Models', items: ['Gemini 3 Pro', 'Claude 3.5', 'GPT-4o'] },
    { label: 'Backend', items: ['Supabase', 'PostgreSQL', 'Vercel'] },
    { label: 'Infrastructure', items: ['Deno', 'Docker', 'Google Cloud'] }
  ];

  return (
    <section id="tech-stack" className="bg-[#050508] py-32 text-white">
      <div className="container mx-auto px-8">
         <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-8">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Tech Stack</span>
              <h2 className="text-6xl font-editorial leading-tight">Powered by the best in class.</h2>
              <p className="text-slate-400 font-light text-lg max-w-md">
                We don't just build with anything. We use a curated set of battle-tested tools that guarantee 99.9% uptime and zero resource drift.
              </p>
              <div className="flex items-center space-x-12 pt-4">
                 <div>
                    <div className="text-3xl font-black text-white">20+</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Core Techs</div>
                 </div>
                 <div>
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">AI Grounding</div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stack.map((col, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-emerald-500/50 transition-colors">
                  <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">{col.label}</h4>
                  <ul className="space-y-3">
                    {col.items.map(item => (
                      <li key={item} className="text-sm font-bold text-slate-300 flex items-center">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
         </div>
      </div>
    </section>
  );
};

export default TechStack;
