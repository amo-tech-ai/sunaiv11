import React from 'react';
import { Contact } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface ContactTableProps {
  contacts: Contact[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({ contacts, selectedId, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto custom-scrollbar flex-1">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Company</th>
            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Role</th>
            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Linked Blueprint</th>
            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {contacts.map(contact => (
            <tr 
              key={contact.id} 
              onClick={() => onSelect(contact.id)}
              className={`group transition-all cursor-pointer border-l-4 ${
                selectedId === contact.id 
                  ? 'bg-blue-50/50 border-l-blue-600' 
                  : 'hover:bg-slate-50/50 border-l-transparent'
              }`}
            >
              <td className="px-10 py-8">
                <div className="flex items-center space-x-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-md uppercase">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{contact.name}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{contact.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-10 py-8">
                <span className="text-xs font-black text-slate-700">{contact.company}</span>
              </td>
              <td className="px-10 py-8 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{contact.role}</span>
              </td>
              <td className="px-10 py-8 text-center">
                {contact.blueprintId ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(ROUTES.PROJECT_EXECUTION(contact.blueprintId!));
                    }}
                    className="px-4 py-2 bg-white text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    Sync Plan
                  </button>
                ) : (
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Detached</span>
                )}
              </td>
              <td className="px-10 py-8 text-right">
                <div className="inline-flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    contact.status === 'active' ? 'bg-emerald-500' : contact.status === 'risk' ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${
                    contact.status === 'active' ? 'text-emerald-600' : contact.status === 'risk' ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;