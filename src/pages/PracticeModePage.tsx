import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { practiceModes } from '../data/practiceModes';
import PracticeModeCard from '../components/practice/PracticeModeCard';
import BackButton from '../components/ui/BackButton';

const PracticeModePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/dashboard" />
        <div className="flex items-center">
          <Dumbbell className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-2xl font-bold text-slate-900">Practice Modes</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-primary-900 mb-2">
          Choose Your Challenge
        </h2>
        <p className="text-primary-800">
          Select a practice mode to improve specific aspects of your speaking skills.
          Each mode has unique goals and challenges to help you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceModes.map(mode => (
          <PracticeModeCard
            key={mode.id}
            mode={mode}
            onClick={() => navigate(`/session?mode=${mode.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default PracticeModePage;