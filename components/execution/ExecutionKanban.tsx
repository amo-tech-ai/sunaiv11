
import React from 'react';
import { Task, TaskStatus } from '../../types';

interface ExecutionKanbanProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onTaskSelect: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const ExecutionKanban: React.FC<ExecutionKanbanProps> = ({ 
  tasks, 
  selectedTaskId, 
  onTaskSelect,
  onStatusChange
}) => {
  const columns: { status: TaskStatus; label: string; color: string }[] = [
    { status: TaskStatus.TODO, label: 'Todo', color: 'bg-slate-100' },
    { status: TaskStatus.IN_PROGRESS, label: 'In Progress', color: 'bg-blue-50/50' },
    { status: TaskStatus.REVIEW, label: 'Review', color: 'bg-purple-50/50' },
    { status: TaskStatus.DONE, label: 'Done', color: 'bg-emerald-50/50' },
  ];

  return (
    <div className="flex h-full gap-6 overflow-x-auto custom-scrollbar pb-6">
      {columns.map((col) => (
        <div key={col.status} className={`flex-1 min-w-[300px] flex flex-col rounded-[2.5rem] ${col.color} border border-slate-100 p-6`}>
          <header className="flex items-center justify-between mb-8 px-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{col.label}</h4>
            <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-lg border border-slate-200">
              {tasks.filter(t => t.status === col.status).length}
            </span>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
            {tasks
              .filter(t => t.status === col.status)
              .map((task) => (
                <div 
                  key={task.id}
                  onClick={() => onTaskSelect(task)}
                  className={`p-6 bg-white rounded-3xl border-2 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-slate-100 ${
                    selectedTaskId === task.id ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                      task.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                    {task.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                    {task.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-black">
                        {task.assignedTo?.charAt(0) || '?'}
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '--'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExecutionKanban;
