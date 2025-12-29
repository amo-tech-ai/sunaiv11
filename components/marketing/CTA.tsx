
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-32 border-t border-slate-100 text-center">
      <div className="container mx-auto px-8 max-w-4xl space-y-12">
        <h2 className="text-6xl font-editorial text-slate-900 tracking-tight">Ready to Build Something <span className="text-orange-500 italic">Extraordinary?</span></h2>
        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
          Join the elite circle of agencies using automated intelligence to scale their delivery without scaling their headcount.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <button 
            onClick={() => navigate(ROUTES.PROJECTS)}
            className="w-full sm:w-auto px-12 py-6 bg-[#FF6B2C] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95"
          >
            Start Your Project
          </button>
          <button className="w-full sm:w-auto px-12 py-6 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all active:scale-95">
            Talk to a Strategist
          </button>
        </div>
        
        <div className="pt-20">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-10">Trusted By Global Leaders</p>
           <div className="flex flex-wrap items-center justify-center gap-16 grayscale opacity-20 hover:opacity-100 transition-opacity duration-1000">
              <span className="text-2xl font-serif font-bold italic">VOGUE</span>
              <span className="text-2xl font-black tracking-tighter">LVMH</span>
              <span className="text-2xl font-editorial">Apple</span>
              <span className="text-2xl font-bold">NIKE</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
