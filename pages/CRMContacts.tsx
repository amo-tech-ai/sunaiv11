
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../types';
import { ICONS, ROUTES } from '../constants';
import ContactIntelligence from '../components/crm/ContactIntelligence';
import AggregateIntelligence from '../components/crm/AggregateIntelligence';

const CONTACTS_STORAGE_KEY = 'sunai_crm_contacts';

const CRMContacts: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'vip' | 'risk'>('all');

  useEffect(() => {
    const saved = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (saved) {
      setContacts(JSON.parse(saved));
    } else {
      const initialContacts: Contact[] = [
        {
          id: 'c1',
          name: 'Jordan Lee',
          role: 'VP of Product',
          company: 'Stellar Tech',
          email: 'jordan@stellar.tech',
          blueprintId: '1',
          lastInteraction: new Date().toISOString(),
          sentimentScore: 88,
          status: 'active',
          aiSummary: 'Strategic partner. Extremely positive sentiment.'
        },
        {
          id: 'c2',
          name: 'Sarah Miller',
          role: 'CEO',
          company: 'Nexus Corp',
          email: 'sarah@nexus.corp',
          blueprintId: '2',
          lastInteraction: new Date(Date.now() - 86400000 * 3).toISOString(),
          sentimentScore: 28,
          status: 'risk',
          aiSummary: 'High risk. Budget concerns expressed in last meeting.'
        },
        {
          id: 'c3',
          name: 'Marcus Thorne',
          role: 'CTO',
          company: 'Aether Systems',
          email: 'm.thorne@aether.io',
          lastInteraction: new Date(Date.now() - 86400000 * 1).toISOString(),
          sentimentScore: 72,
          status: 'nurture',
          aiSummary: 'Stable relationship. Validating roadmap alignment.'
        }
      ];
      setContacts(initialContacts);
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(initialContacts));
    }
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      if (filter === 'all') return true;
      if (filter === 'vip') return c.sentimentScore >= 80;
      if (filter === 'risk') return c.status === 'risk';
      return true;
    });
  }, [contacts, filter]);

  const activeContact = useMemo(() => 
    contacts.find(c => c.id === selectedContactId) || null
  , [contacts, selectedContactId]);

  const updateContact = (updated: Contact) => {
    const next = contacts.map(c => c.id === updated.id ? updated : c);
    setContacts(next);
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700">
      {/* PANEL A: Focus Groups */}
      <aside className="w-56 flex flex-col space-y-4">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Focus Groups</h2>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'All Signal', icon: ICONS.Users },
            { id: 'vip', label: 'VIP Orbit', icon: ICONS.Zap },
            { id: 'risk', label: 'Risk Mitigation', icon: ICONS.Plus }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${
                filter === f.id ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <f.icon className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">{f.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* PANEL B: Relationship Database */}
      <div className="flex-1 flex flex-col space-y-8 overflow-hidden">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-5xl font-editorial text-slate-900 leading-tight tracking-tight">CRM</h1>
            <p className="text-slate-500 font-medium">Orchestrating {contacts.length} growth signals across the agency.</p>
          </div>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center space-x-3">
            <ICONS.Plus className="w-4 h-4" />
            <span>New Growth Signal</span>
          </button>
        </header>

        <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex-1 flex flex-col">
          <div className="overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact & Role</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Org</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Blueprint</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map(contact => (
                  <tr 
                    key={contact.id} 
                    onClick={() => setSelectedContactId(contact.id)}
                    className={`group transition-all cursor-pointer ${selectedContactId === contact.id ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{contact.name}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{contact.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="text-xs font-black text-slate-900">{contact.company}</span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      {contact.blueprintId ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(ROUTES.PROJECT_EXECUTION(contact.blueprintId!));
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          Blueprint Sync
                        </button>
                      ) : (
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No Blueprint</span>
                      )}
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${contact.status === 'active' ? 'bg-emerald-500' : contact.status === 'risk' ? 'bg-red-500' : 'bg-amber-500'}`} />
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{contact.sentimentScore}%</span>
                        </div>
                        <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${contact.status === 'active' ? 'bg-emerald-500' : contact.status === 'risk' ? 'bg-red-500' : 'bg-amber-500'}`} 
                            style={{ width: `${contact.sentimentScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PANEL C: Context & Intelligence */}
      {activeContact ? (
        <ContactIntelligence 
          contact={activeContact} 
          onUpdate={updateContact}
          onDeselect={() => setSelectedContactId(null)}
        />
      ) : (
        <AggregateIntelligence contacts={contacts} />
      )}
    </div>
  );
};

export default CRMContacts;
