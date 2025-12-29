
import React from 'react';
import { ICONS } from '../../constants';
import { WizardBlueprint } from '../../types';

interface WizardStepNavProps {
  currentStep: number;
  status: WizardBlueprint['meta']['status'];
  onStepClick: (step: number) => void;
}

const WizardStepNav: React.FC<WizardStepNavProps> = ({ currentStep, status, onStepClick }) => {
  const steps = [
    { id: 1, label: 'Basics', icon: ICONS.Users },
    { id: 2, label: 'Overview', icon: ICONS.Layout },
    { id: 3, label: 'Constraints', icon: ICONS.Clipboard },
    { id: 4, label: 'Review', icon: ICONS.Settings },
    { id: 5, label: 'Architecting', icon: ICONS.Zap },
    { id: 6, label: 'Proposal', icon: ICONS.Plus },
  ];

  return (
    <nav className="space-y-1">
      {steps.map(step => (
        <button
          key={step.id}
          disabled={step.id > currentStep && status !== 'ready'}
          onClick={() => onStepClick(step.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
            currentStep === step.id 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
              : currentStep > step.id ? 'text-blue-600 hover:bg-blue-50' : 'text-slate-400 hover:bg-slate-50 opacity-50'
          }`}
        >
          <step.icon className="w-5 h-5" />
          <span className="font-semibold text-sm">{step.label}</span>
          {currentStep > step.id && <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />}
        </button>
      ))}
    </nav>
  );
};

export default WizardStepNav;
