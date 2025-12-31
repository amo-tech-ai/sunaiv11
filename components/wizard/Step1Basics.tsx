
import React from 'react';
import { WizardBlueprint } from '../../types';

interface Step1BasicsProps {
  blueprint: WizardBlueprint;
  updateSection: (section: keyof WizardBlueprint, updates: any) => void;
  isScanning: boolean;
  onWebsiteBlur: () => void;
}

const Step1Basics: React.FC<Step1BasicsProps> = ({ blueprint, updateSection, isScanning, onWebsiteBlur }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <header>
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded">Step 01</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intake Phase</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Project Basics</h2>
        <p className="text-slate-500 mt-2 text-lg">Define the core signal for the AI Architect to analyze.</p>
      </header>

      <div className="space-y-8 max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What is this project called?</label>
            <input 
              type="text" 
              value={blueprint.identity.projectName}
              onChange={e => updateSection('identity', { projectName: e.target.value })}
              placeholder="e.g. Q4 Growth Acceleration"
              className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-xl font-bold text-slate-900 placeholder:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Client / Company name</label>
              <input 
                type="text" 
                value={blueprint.identity.clientName}
                onChange={e => updateSection('identity', { clientName: e.target.value })}
                placeholder="Organization Name"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white transition-colors font-semibold"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Main website (optional)</label>
              <input 
                type="text" 
                value={blueprint.identity.website}
                onBlur={onWebsiteBlur}
                onChange={e => updateSection('identity', { website: e.target.value })}
                placeholder="https://..."
                className={`w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white transition-colors font-medium ${isScanning ? 'pr-20' : ''}`}
              />
              {isScanning && (
                <div className="absolute right-4 bottom-4 flex items-center space-x-1.5 bg-blue-600 px-3 py-1.5 rounded-xl shadow-lg animate-in fade-in scale-in">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">Research AI Scanning...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {blueprint.identity.website && !isScanning && (
          <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-start space-x-3 animate-in slide-in-from-top-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-green-800">Context Cached</p>
              <p className="text-[10px] text-green-600 font-medium">The Research AI successfully mapped ${blueprint.identity.website} to industry patterns.</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center space-x-4 max-w-2xl">
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 font-bold italic">i</div>
        <p className="text-xs text-blue-800 font-medium leading-relaxed">
          This step sets the grounding for our AI models. Ensuring names match official records helps identify competitors correctly.
        </p>
      </div>
    </div>
  );
};

export default Step1Basics;
