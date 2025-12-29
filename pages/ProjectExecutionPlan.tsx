
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { Task, TaskStatus, TaskPriority, WizardBlueprint } from '../types';
import { ICONS } from '../constants';

const ProjectExecutionPlan: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  
  // Extract data from location state if we just launched from Wizard
  const launchData = location.state as { launchBlueprint: WizardBlueprint; selectedIds: string[] } | null;

  // Initialize tasks from Wizard data or mock
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (launchData && launchData.launchBlueprint.artifacts) {
      const allTasks: Task[] = [];
      launchData.launchBlueprint.artifacts.wbs.forEach(phase => {
        phase.tasks.forEach(task => {
          if (launchData.selectedIds.includes(task.id)) {
            allTasks.push({
              ...task,
              projectId: projectId || 'current'
            });
          }
        });
      });
      return allTasks;
    }
    
    // Default mock data if no wizard context
    return [
      {
        id: 't1',
        projectId: projectId || '1',
        title: 'Define target keywords',
        description: 'Research and shortlist primary and secondary keywords based on competitive analysis.',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        assignedTo: 'Alice Chen',
        dueDate: '2023-11-01',
      },
      {
        id: 't2',
        projectId: projectId || '1',
        title: 'Draft landing page copy',
        description: 'Create high-converting copy for the main project landing page including CTA sections.',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        assignedTo: 'Bob Wilson',
        dueDate: '2023-11-05',
      },
      {
        id: 't3',
        projectId: projectId || '1',
        title: 'Technical SEO Audit',
        description: 'Run site crawl to identify broken links, missing meta tags, and slow response times.',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        assignedTo: 'Charlie Day',
        dueDate: '2023-11-03',
      },
      {
        id: 't4',
        projectId: projectId || '1',
        title: 'Competitor backlink analysis',
        description: 'Evaluate backlink profiles of top 5 competitors to identify outreach opportunities.',
        status: TaskStatus.REVIEW,
        priority: TaskPriority.LOW,
        assignedTo: 'Alice Chen',
        dueDate: '2023-11-10',
      }
    ];
  });

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === TaskStatus.DONE).length;
    const highPriority = tasks.filter(t => t.priority === TaskPriority.HIGH && t.status !== TaskStatus.DONE).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, highPriority, percent };
  }, [tasks]);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded">Execution Phase</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Ops</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {launchData?.launchBlueprint.identity.projectName || `Project Stream #${projectId}`}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Implementation monitoring for <span className="font-bold text-slate-700">{launchData?.launchBlueprint.identity.clientName || 'Nexus Corp'}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            Export WBS
          </button>
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center space-x-2">
            <ICONS.Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <ICONS.Layout className="w-24 h-24" />
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ops Velocity</div>
          <div className="flex items-end space-x-2 mb-4">
            <span className="text-4xl font-black text-slate-900 tracking-tighter">{stats.percent}%</span>
            <span className="text-xs font-bold text-slate-400 mb-1.5">{stats.completed} / {stats.total} Tasks</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-50">
            <div 
              className="bg-blue-600 h-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.3)]" 
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Critical Blocks</div>
          <div className="flex items-center space-x-4">
             <span className="text-4xl font-black text-red-600 tracking-tighter">{stats.highPriority}</span>
             <div className="bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                <span className="text-[10px] font-black text-red-600 uppercase">Action Required</span>
             </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-medium">Unresolved high-priority items currently delaying Phase 02 completion.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Architectural Signal</div>
          <div className="flex items-center space-x-3 mb-3">
             <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs">AI</div>
             <span className="text-xs font-bold text-slate-900 uppercase">Operational Health</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Project alignment is <span className="text-green-600 font-bold uppercase">Optimal</span>. No resource drift detected by the Optimizer Agent in the last 24h.
          </p>
        </div>
      </div>

      <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Task Roadmap</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sourced from Blueprint Artifacts</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-2xl">
            <ICONS.Zap className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">AI Managed Workflow</span>
          </div>
        </div>
        
        <TaskList 
          tasks={tasks} 
          onStatusChange={handleStatusChange}
          onTaskClick={(task) => console.log('Viewing properties for:', task.title)}
        />
      </section>

      {launchData && (
        <section className="p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full" />
           <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                 <h3 className="text-2xl font-black tracking-tight leading-tight">Gemini Architect Review</h3>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                   "Based on the budget constraints of {launchData.launchBlueprint.constraints.currency} {launchData.launchBlueprint.constraints.budget}, I have prioritized lean execution modules. The risk mitigation strategy has been applied to the Roadmap below."
                 </p>
                 <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black">AI</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Principal Planner Agent</span>
                 </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Analysis</div>
                 {launchData.launchBlueprint.artifacts?.riskAnalysis.slice(0, 2).map((risk, i) => (
                    <div key={i} className="flex items-start space-x-3">
                       <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${risk.impact === 'High' ? 'bg-red-500' : 'bg-amber-500'}`} />
                       <div>
                          <p className="text-xs font-bold text-slate-200">{risk.description}</p>
                          <p className="text-[10px] text-slate-500 mt-1">Mitigation: {risk.mitigation}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      )}
    </div>
  );
};

export default ProjectExecutionPlan;
