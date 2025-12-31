
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../types';
import { ICONS, ROUTES } from '../constants';
import CRMRightPanel from '../components/crm/CRMRightPanel';
import ContactTable from '../components/crm/ContactTable';

const CONTACTS_STORAGE_KEY = 'sunai_crm_contacts';

const CRMContacts: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'vip' | 'risk'>('all');
  const [activeTab, setActiveTab] = useState<'activity' | 'contact'>('activity');

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

  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
    setActiveTab('contact'); // Rule: Switch to contact tab on selection
  };

  return (
    <div className="flex h-full w-full gap-8 animate-in fade-in duration-700">
      {/* PANEL A: Segments & Navigation */}
      <aside className="w-64 flex flex-col space-y-8 flex-shrink-0">
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Directory</h2>
          <div className="space-y-1">
            <button
              onClick={() => setFilter('all')}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${
                filter === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <ICONS.Users className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">All Contacts</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-slate-400 hover:bg-slate-100 transition-all opacity-50 cursor-not-allowed"
            >
              <ICONS.Layout className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">Companies</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Filters</h2>
          <div className="space-y-2 px-2">
            <button 
              onClick={() => setFilter('vip')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                filter === 'vip' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
              }`}
            >
              <span className="text-[10px] font-black uppercase">Status: VIP</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </button>
            <button 
              onClick={() => setFilter('risk')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                filter === 'risk' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
              }`}
            >
              <span className="text-[10px] font-black uppercase">Status: At Risk</span>
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100 bg-white text-slate-300 opacity-50 cursor-not-allowed">
              <span className="text-[10px] font-black uppercase">Type: Enterprise</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            </button>
          </div>
        </div>
      </aside>

      {/* PANEL B: Main Panel (Contact Table) */}
      <div className="flex-1 flex flex-col space-y-8 min-w-0">
        <header className="flex justify-between items-end flex-shrink-0">
          <div className="space-y-1">
            <h1 className="text-5xl font-editorial text-slate-900 leading-tight tracking-tight uppercase">Insights</h1>
            <p className="text-slate-500 font-medium">Monitoring relationship integrity across the agency vault.</p>
          </div>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center space-x-3">
            <ICONS.Plus className="w-4 h-4" />
            <span>Add Signal</span>
          </button>
        </header>

        <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex-1 flex flex-col min-h-0">
          <ContactTable 
            contacts={filteredContacts} 
            selectedId={selectedContactId} 
            onSelect={handleSelectContact} 
          />
        </div>
      </div>

      {/* PANEL C: Right Panel (Intelligence & Activity) */}
      <CRMRightPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        contact={activeContact}
        allContacts={contacts}
        onUpdate={updateContact}
        onDeselect={() => {
          setSelectedContactId(null);
          setActiveTab('activity');
        }}
      />
    </div>
  );
};

export default CRMContacts;
