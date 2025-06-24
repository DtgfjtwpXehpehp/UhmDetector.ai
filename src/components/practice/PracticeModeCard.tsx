import React from 'react';
import { PracticeMode } from '../../types';
import { Timer, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

interface PracticeModeCardProps {
  mode: PracticeMode;
  onClick: () => void;
}

const PracticeModeCard: React.FC<PracticeModeCardProps> = ({ mode, onClick }) => {
  const difficultyColors = {
    beginner: 'bg-success-100 text-success-700',
    intermediate: 'bg-warning-100 text-warning-700',
    advanced: 'bg-error-100 text-error-700'
  };

  return (
    <Card 
      hover 
      onClick={onClick}
      className="transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">{mode.icon}</span>
            <h3 className="text-lg font-semibold text-slate-900">{mode.name}</h3>
          </div>
          
          <p className="text-sm text-slate-600 mb-4">{mode.description}</p>
          
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[mode.difficulty]}`}>
              {mode.difficulty.charAt(0).toUpperCase() + mode.difficulty.slice(1)}
            </span>
            
            <span className="flex items-center text-xs text-slate-500">
              <Timer className="h-3 w-3 mr-1" />
              {mode.duration}s
            </span>
          </div>
        </div>
        
        <ChevronRight className="h-5 w-5 text-slate-400" />
      </div>
    </Card>
  );
};

export default PracticeModeCard;