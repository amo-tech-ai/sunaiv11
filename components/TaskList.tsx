
import React, { useState, useMemo } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onStatusChange }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                            task.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'dueDate') {
          return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
        }
        const priorityMap = { [TaskPriority.HIGH]: 3, [TaskPriority.MEDIUM]: 2, [TaskPriority.LOW]: 1 };
        return priorityMap[b.priority] - priorityMap[a.priority];
      });
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH: return 'text-red-600 bg-red-50 border-red-100';
      case TaskPriority.MEDIUM: return 'text-amber-600 bg-amber-50 border-amber-100';
      case TaskPriority.LOW: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE: return 'text-green-600 bg-green-50 border-green-200';
      case TaskStatus.REVIEW: return 'text-purple-600 bg-purple-50 border-purple-200';
      case TaskStatus.IN_PROGRESS: return 'text-blue-600 bg-blue-50 border-blue-200';
      case TaskStatus.TODO: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
          >
            <option value="All">All Statuses</option>
            {Object.values(TaskStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
          >
            <option value="All">All Priorities</option>
            {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
          >
            <option value="dueDate">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {filteredTasks.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <tr 
                  key={task.id} 
                  onClick={() => onTaskClick?.(task)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{task.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{task.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={task.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => onStatusChange?.(task.id, e.target.value as TaskStatus)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border outline-none cursor-pointer ${getStatusColor(task.status)}`}
                    >
                      {Object.values(TaskStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                        {task.assignedTo?.split(' ').map(n => n[0]).join('') || '?'}
                      </div>
                      <span className="text-xs text-slate-600">{task.assignedTo || 'Unassigned'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <svg className="w-12 h-12 mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">No tasks match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
