import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProjectsDashboard from './pages/ProjectsDashboard';
import ArchitectureOverview from './pages/ArchitectureOverview';
import ProjectWizard from './pages/ProjectWizard';
import ProjectExecutionPlan from './pages/ProjectExecutionPlan';
import HomePage from './pages/HomePage';

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
          <Route path="projects/:projectId" element={<div className="p-10">Project Details (Placeholder)</div>} />
          <Route path="projects/:projectId/wizard" element={<ProjectWizard />} />
          <Route path="projects/:projectId/intelligence" element={<div className="p-10 text-center">Intelligence (Placeholder)</div>} />
          <Route path="projects/:projectId/execution-plan" element={<ProjectExecutionPlan />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;