
import React from 'react';
import { IntelligenceWorkflow } from '../../types';

interface WorkflowCardProps {
  workflow: IntelligenceWorkflow;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(workflow.id)}
      className={`p-10 bg-white border-2 rounded-[2.5rem] transition-all cursor-pointer flex flex-col md:flex-row gap-12 ${
        isSelected ? 'border-blue-600 shadow-2xl' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
       <div className="md:w-1/3 space-y-4">
          <h4 className="text-2xl font-black text-slate-900 leading-tight">{workflow.name}</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Deliverable: {workflow.keyOutputs}</p>
          <div className={`px-6 py-2 rounded-full w-fit text-[10px] font-black uppercase tracking-widest border transition-all ${
            isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-900 text-white border-slate-900'
          }`}>
            {isSelected ? 'Workflow Selected' : 'Add to Stream'}
          </div>
       </div>
       <div className="flex-1 space-y-4">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Operational Sequence</span>
          <div className="space-y-3">
             {workflow.steps.map((step, idx) => (
               <div key={idx} className="flex items-center space-x-4">
                  <span className="text-[10px] font-black text-blue-600">0{idx + 1}</span>
                  <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs font-bold text-slate-700">
                     {step}
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default WorkflowCard;
