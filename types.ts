
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

export type IntelligenceTab = 'Agents' | 'Automations' | 'Workflows' | 'Journeys' | 'Examples';

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

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  avatar?: string;
  blueprintId?: string;
  lastInteraction: string;
  sentimentScore: number;
  status: 'active' | 'nurture' | 'risk';
  aiSummary?: string;
}

export interface Project {
  id: string;
  name: string;
  client_name: string;
  status: ProjectStatus;
  updated_at: string;
  has_blueprint: boolean;
  description?: string;
  moodboard_url?: string;
  intelligence?: ProjectIntelligence;
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

export interface IntelligenceAgent {
  id: string;
  name: string;
  role: string;
  whyNeeded: string;
  produces: string;
  confidence: number;
}

export interface IntelligenceAutomation {
  id: string;
  trigger: string;
  action: string;
  outcome: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface IntelligenceWorkflow {
  id: string;
  name: string;
  steps: string[];
  keyOutputs: string;
}

export interface IntelligenceJourney {
  id: string;
  actor: string;
  steps: string[];
  value: string;
}

export interface IntelligenceExample {
  id: string;
  scenario: string;
  whatWasBuilt: string;
  outcome: string;
}

export interface ProjectIntelligence {
  agents: IntelligenceAgent[];
  automations: IntelligenceAutomation[];
  workflows: IntelligenceWorkflow[];
  journeys: IntelligenceJourney[];
  examples: IntelligenceExample[];
  selectedItems: string[]; 
  generatedAt: string;
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
    estimatedTimeline: number; 
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
