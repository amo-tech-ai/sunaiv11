
export enum ProjectStatus {
  DRAFT = 'Draft',
  WIZARD = 'In Wizard',
  BLUEPRINT_READY = 'Blueprint Ready',
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}

export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done'
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
}

export interface Project {
  id: string;
  name: string;
  client_name: string;
  status: ProjectStatus;
  updated_at: string;
  has_blueprint: boolean;
  description?: string;
}

export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface RiskFactor {
  impact: 'Low' | 'Medium' | 'High';
  description: string;
  mitigation: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  dueDate?: string;
}

export interface WizardBlueprint {
  identity: {
    projectName: string;
    clientName: string;
    website?: string;
  };
  intent: {
    type: 'Web' | 'Mobile' | 'Marketing' | 'Integration' | '';
    industry: string;
    goals: string[];
    integrations: string[];
  };
  constraints: {
    budget: number;
    currency: string;
    deadline: string;
    urgency: 'Low' | 'Medium' | 'High';
  };
  artifacts?: {
    wbs: ProjectPhase[];
    riskAnalysis: RiskFactor[];
    estimatedTimeline: number; // days
  };
  meta: {
    step: number;
    lastUpdated: string;
    status: 'draft' | 'processing' | 'ready' | 'committed';
  };
}

export interface AuditLog {
  id: string;
  projectId: string;
  action: string;
  timestamp: string;
  user: string;
}

export interface Blueprint {
  id: string;
  projectId: string;
  intent: string;
  goals: string[];
  constraints: string[];
  isConfirmed: boolean;
}
