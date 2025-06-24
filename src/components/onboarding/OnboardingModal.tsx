import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, BarChart2, Dumbbell, Trophy, Keyboard, X } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  route?: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to UhmDetector.ai',
    description: 'Start improving your speaking clarity with real-time feedback and AI-powered suggestions.',
    icon: <Mic className="h-8 w-8 text-primary-600" />,
    action: 'Start Speech Session',
    route: '/session'
  },
  {
    title: 'Improve Your Typing',
    description: 'Practice typing with various modes and track your words per minute and accuracy.',
    icon: <Keyboard className="h-8 w-8 text-primary-600" />,
    action: 'Try Typing Test',
    route: '/typing'
  },
  {
    title: 'Practice Makes Perfect',
    description: 'Choose from different practice modes designed to help you improve specific aspects of your speech.',
    icon: <Dumbbell className="h-8 w-8 text-primary-600" />,
    action: 'Try Practice Modes',
    route: '/practice'
  },
  {
    title: 'Track Your Progress',
    description: 'View detailed analytics and insights about your speaking patterns and improvements over time.',
    icon: <BarChart2 className="h-8 w-8 text-primary-600" />,
    action: 'View Analytics',
    route: '/analytics'
  },
  {
    title: 'Compete and Achieve',
    description: 'Join the leaderboard, earn badges, and challenge yourself to become a better communicator.',
    icon: <Trophy className="h-8 w-8 text-primary-600" />,
    action: 'View Leaderboard',
    route: '/leaderboard'
  }
];

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onClose();
  };

  const handleAction = () => {
    const step = steps[currentStep];
    if (step.route) {
      navigate(step.route);
    }
    handleComplete();
  };

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 relative animate-slide-up">
        <button
          onClick={handleComplete}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          {steps[currentStep].icon}
          <h2 className="text-2xl font-bold text-slate-900 mt-4 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-slate-600">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentStep
                  ? 'bg-primary-600'
                  : index < currentStep
                  ? 'bg-primary-200'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {steps[currentStep].action && (
            <button
              onClick={handleAction}
              className="btn btn-primary flex-1"
            >
              {steps[currentStep].action}
            </button>
          )}
          <button
            onClick={handleNext}
            className="btn btn-outline flex-1"
          >
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;