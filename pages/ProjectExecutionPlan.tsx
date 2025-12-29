import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { Task, TaskStatus, TaskPriority, WizardBlueprint } from '../types';
import { ICONS } from '../constants';
import ExecutionRightPanel from '../components/execution/ExecutionRightPanel';

const ProjectExecutionPlan: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  
  const launchData = location.state as { launchBlueprint: WizardBlueprint; selectedIds: string[] } | null;

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

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<'activity' | 'intelligence'>('activity');
  const [activePhase, setActivePhase] = useState<'all' | string>('all');

  const selectedTask = useMemo(() => tasks.find(t => t.id === selectedTaskId) || null, [tasks, selectedTaskId]);

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

  const handleTaskSelection = (task: Task) => {
    setSelectedTaskId(task.id);
    setActiveRightTab('intelligence');
  };

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700">
      {/* PANEL A: LEFT (PHASE NAVIGATION) */}
      <aside className="w-56 flex flex-col space-y-4 flex-shrink-0">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Work Segments</h2>
        <div className="space-y-1">
          <button
            onClick={() => setActivePhase('all')}
            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${
              activePhase === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <ICONS.Layout className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">All Tasks</span>
          </button>
          
          {launchData?.launchBlueprint.artifacts?.wbs.map((phase, i) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${
                activePhase === phase.id ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center font-black text-[10px]">0{i+1}</div>
              <span className="text-[11px] font-black uppercase tracking-widest truncate">{phase.title}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
           <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2 block">Agent Monitor</span>
           <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase">Operational Health: Optimal</span>
           </div>
        </div>
      </aside>

      {/* PANEL B: MAIN (TASK WORKSPACE) */}
      <div className="flex-1 flex flex-col space-y-8 min-w-0">
        <header className="flex justify-between items-end flex-shrink-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded">Execution Stream</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {projectId}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {launchData?.launchBlueprint.identity.projectName || `Project Stream #${projectId}`}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center space-x-3">
              <ICONS.Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
          </div>
        </header>

        <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex-1 flex flex-col min-h-0">
           <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-6">
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Velocity</span>
                    <span className="text-xl font-black text-slate-900">{stats.percent}%</span>
                 </div>
                 <div className="h-10 w-px bg-slate-200" />
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Critical</span>
                    <span className="text-xl font-black text-red-600">{stats.highPriority} High</span>
                 </div>
              </div>
              <div className="flex space-x-2">
                 {/* Secondary Context Filters could go here */}
              </div>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-4">
              <TaskList 
                tasks={tasks} 
                onStatusChange={handleStatusChange}
                onTaskClick={handleTaskSelection}
              />
           </div>
        </div>
      </div>

      {/* PANEL C: RIGHT (INTELLIGENCE & ACTIVITY) */}
      <ExecutionRightPanel 
        activeTab={activeRightTab}
        setActiveTab={setActiveRightTab}
        selectedTask={selectedTask}
        blueprint={launchData?.launchBlueprint || null}
        tasks={tasks}
        onDeselect={() => {
          setSelectedTaskId(null);
          setActiveRightTab('activity');
        }}
      />
    </div>
  );
};

export default ProjectExecutionPlan;