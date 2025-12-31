
import React, { useMemo } from 'react';
import { Task, WizardBlueprint, ProjectPhase } from '../../types';

interface ExecutionTimelineProps {
  tasks: Task[];
  blueprint: WizardBlueprint | null;
  onTaskSelect: (task: Task) => void;
}

const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({ tasks, blueprint, onTaskSelect }) => {
  // Mock 8-week timeframe
  const weeks = Array.from({ length: 8 }, (_, i) => `Week ${i + 1}`);
  
  const phases: ProjectPhase[] = useMemo(() => {
    if (blueprint?.artifacts?.wbs) return blueprint.artifacts.wbs;
    return [{ id: 'p1', title: 'Phase 1: Foundation', description: '', tasks: tasks }];
  }, [blueprint, tasks]);

  return (
    <div className="h-full w-full bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
      <header className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
         <div className="flex items-center space-x-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Velocity Timeline</h3>
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Critical Path Active</span>
            </div>
         </div>
         <div className="flex space-x-2">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-tighter">8 Weeks Duration</span>
         </div>
      </header>

      <div className="flex-1 overflow-auto custom-scrollbar relative">
        {/* Timeline Header Row */}
        <div className="flex sticky top-0 z-20 bg-white border-b border-slate-100 min-w-max">
          <div className="w-64 flex-shrink-0 border-r border-slate-100 p-4 bg-slate-50/50" />
          {weeks.map((week, i) => (
            <div key={i} className="w-48 p-4 text-center border-r border-slate-100 last:border-r-0">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{week}</span>
            </div>
          ))}
        </div>

        {/* Content Rows */}
        <div className="min-w-max">
          {phases.map((phase, pIdx) => (
            <div key={phase.id} className="flex border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
              <div className="w-64 flex-shrink-0 border-r border-slate-100 p-6 space-y-1 bg-white sticky left-0 z-10 shadow-sm">
                <p className="text-[10px] font-black text-blue-600 uppercase">Phase 0{pIdx + 1}</p>
                <p className="text-xs font-black text-slate-900 leading-tight">{phase.title}</p>
              </div>
              
              <div className="flex-1 flex relative h-24 items-center">
                 {/* Grid Lines */}
                 <div className="absolute inset-0 flex pointer-events-none">
                    {weeks.map((_, i) => (
                      <div key={i} className="w-48 border-r border-slate-50 h-full" />
                    ))}
                 </div>

                 {/* Task Blocks (Mock positioned for visualization) */}
                 {phase.tasks.map((task, tIdx) => {
                    const width = 240 + (Math.random() * 120);
                    const left = (tIdx * 80) + (pIdx * 120);
                    return (
                      <div 
                        key={task.id}
                        onClick={() => onTaskSelect(task)}
                        style={{ width: `${width}px`, left: `${left}px` }}
                        className={`absolute h-12 rounded-2xl border-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] hover:z-30 p-3 flex items-center space-x-3 ${
                          task.priority === 'High' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                         <div className={`w-1.5 h-1.5 rounded-full ${task.priority === 'High' ? 'bg-red-500' : 'bg-blue-500'}`} />
                         <span className="text-[10px] font-black text-slate-900 truncate uppercase tracking-tighter">{task.title}</span>
                      </div>
                    );
                 })}
              </div>
            </div>
          ))}
        </div>

        {/* Today Marker */}
        <div className="absolute top-0 bottom-0 w-px bg-red-400 z-10 left-[400px]">
           <div className="bg-red-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full absolute -top-3 -left-4 shadow-lg uppercase tracking-tighter">Current Signal</div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionTimeline;
