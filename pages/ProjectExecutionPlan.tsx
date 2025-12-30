
import React, { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TaskList from '../components/TaskList';
import ExecutionKanban from '../components/execution/ExecutionKanban';
import { Task, TaskStatus, TaskPriority, WizardBlueprint } from '../types';
import { ICONS } from '../constants';
import ExecutionRightPanel from '../components/execution/ExecutionRightPanel';

type ViewMode = 'table' | 'kanban' | 'timeline';

const ProjectExecutionPlan: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const launchData = location.state as { launchBlueprint: WizardBlueprint; selectedIds: string[] } | null;

  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (launchData && launchData.launchBlueprint.artifacts) {
      const allTasks: Task[] = [];
      launchData.launchBlueprint.artifacts.wbs.forEach(phase => {
        phase.tasks.forEach(task => {
          if (launchData.selectedIds.includes(task.id)) {
            allTasks.push({ ...task, projectId: projectId || 'current' });
          }
        });
      });
      return allTasks;
    }
    return [
      { id: 't1', projectId: projectId || '1', title: 'Define target keywords', description: 'Research and shortlist primary keywords.', status: TaskStatus.DONE, priority: TaskPriority.HIGH, assignedTo: 'Alice Chen', dueDate: '2023-11-01' },
      { id: 't2', projectId: projectId || '1', title: 'Draft landing page copy', description: 'Create high-converting copy.', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM, assignedTo: 'Bob Wilson', dueDate: '2023-11-05' },
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
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700 overflow-hidden">
      {/* PANEL A: NAVIGATION */}
      <aside className="w-56 flex flex-col space-y-4 flex-shrink-0">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Work Segments</h2>
        <div className="space-y-1">
          <button onClick={() => setActivePhase('all')} className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${activePhase === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100'}`}>
            <ICONS.Layout className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">All Tasks</span>
          </button>
        </div>

        <div className="pt-8 space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Work View</h2>
          <div className="grid grid-cols-1 gap-1">
            {(['table', 'kanban', 'timeline'] as ViewMode[]).map((mode) => (
              <button 
                key={mode} 
                onClick={() => setViewMode(mode)}
                className={`flex items-center space-x-3 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === mode ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${viewMode === mode ? 'bg-blue-600 animate-pulse' : 'bg-slate-200'}`} />
                <span>{mode} View</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* PANEL B: MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col space-y-8 min-w-0">
        <header className="flex justify-between items-end flex-shrink-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded">Execution Stream</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {projectId}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              {launchData?.launchBlueprint.identity.projectName || `Project Stream`}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-slate-100 hover:bg-slate-800 transition-all flex items-center space-x-3">
              <ICONS.Plus className="w-4 h-4" />
              <span>Add Step</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden min-h-0">
          {viewMode === 'table' ? (
            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm h-full flex flex-col">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center space-x-12">
                   <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Velocity</span>
                      <span className="text-xl font-black text-slate-900">{stats.percent}%</span>
                   </div>
                   <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Critical Path</span>
                      <span className="text-xl font-black text-red-600">{stats.highPriority} Risky</span>
                   </div>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <TaskList tasks={tasks} onStatusChange={handleStatusChange} onTaskClick={handleTaskSelection} />
              </div>
            </div>
          ) : viewMode === 'kanban' ? (
            <ExecutionKanban tasks={tasks} selectedTaskId={selectedTaskId} onTaskSelect={handleTaskSelection} onStatusChange={handleStatusChange} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 grayscale border-2 border-dashed border-slate-200 rounded-[3rem]">
              <ICONS.Layout className="w-16 h-16" />
              <p className="text-xl font-editorial">Timeline View is architecting...</p>
            </div>
          )}
        </div>
      </div>

      {/* PANEL C: INTELLIGENCE */}
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
