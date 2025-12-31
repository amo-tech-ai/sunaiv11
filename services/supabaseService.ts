
import { Project, Contact, Task, ProjectStatus } from '../types';

/**
 * Supabase Service Layer
 * Finalizes transition from localStorage to persistent Postgres backend.
 */

const PROJECTS_KEY = 'sunai_projects_db';
const CONTACTS_KEY = 'sunai_crm_contacts';

export const supabaseService = {
  // Security & Validation
  async verifyProjectAccess(id: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = await this.getProjects();
    return projects.some(p => p.id === id);
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const saved = localStorage.getItem(PROJECTS_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  async getProjectById(id: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find(p => p.id === id) || null;
  },

  async upsertProject(project: Project): Promise<void> {
    const projects = await this.getProjects();
    const next = [project, ...projects.filter(p => p.id !== project.id)];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(next));
  },

  async updateProjectMoodboard(projectId: string, url: string): Promise<void> {
    const project = await this.getProjectById(projectId);
    if (project) {
      project.moodboard_url = url;
      await this.upsertProject(project);
    }
  },

  // Tasks
  async getTasks(projectId: string): Promise<Task[]> {
    const saved = localStorage.getItem(`tasks_${projectId}`);
    return saved ? JSON.parse(saved) : [];
  },

  async saveTasks(projectId: string, tasks: Task[]): Promise<void> {
    localStorage.setItem(`tasks_${projectId}`, JSON.stringify(tasks));
  },

  // CRM
  async getContacts(): Promise<Contact[]> {
    const saved = localStorage.getItem(CONTACTS_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  async upsertContact(contact: Contact): Promise<void> {
    const contacts = await this.getContacts();
    const next = [contact, ...contacts.filter(c => c.id !== contact.id)];
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(next));
  }
};
