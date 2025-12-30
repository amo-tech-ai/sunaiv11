
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProjectsDashboard from './pages/ProjectsDashboard';
import ArchitectureOverview from './pages/ArchitectureOverview';
import ProjectWizard from './pages/ProjectWizard';
import ProjectExecutionPlan from './pages/ProjectExecutionPlan';
import ProjectIntelligenceScreen from './pages/ProjectIntelligence';
import CRMContacts from './pages/CRMContacts';
import HomePage from './pages/HomePage';
import ProposalFullView from './pages/ProposalFullView';
import DeepResearchLab from './pages/DeepResearchLab';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/architecture" element={<ArchitectureOverview />} />
        <Route path="/login" element={<div className="p-10 text-center font-editorial text-4xl">Login Screen</div>} />
        <Route path="/signup" element={<div className="p-10 text-center font-editorial text-4xl">Signup Screen</div>} />

        {/* Protected App Routes */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="/app/projects" replace />} />
          <Route path="projects" element={<ProjectsDashboard />} />
          <Route path="research" element={<DeepResearchLab />} />
          <Route path="projects/:projectId/wizard" element={<ProjectWizard />} />
          <Route path="projects/:projectId/intelligence" element={<ProjectIntelligenceScreen />} />
          <Route path="projects/:projectId/execution-plan" element={<ProjectExecutionPlan />} />
          <Route path="projects/:projectId/proposal" element={<ProposalFullView />} />
          
          {/* CRM Module */}
          <Route path="crm" element={<CRMContacts />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
