import React from 'react';
import { TypingMode } from '../../types';
import { Keyboard, Code, Hash, FileText, Type, Clock } from 'lucide-react';
import Card from '../ui/Card';

interface TypingModeSelectorProps {
  onModeSelect: (mode: TypingMode, difficulty: 'beginner' | 'intermediate' | 'advanced') => void;
}

const typingModes: TypingMode[] = [
  {
    id: 'words',
    name: 'Words',
    description: 'Practice typing common words and improve your vocabulary',
    icon: '📝',
    textType: 'words'
  },
  {
    id: 'sentences',
    name: 'Sentences',
    description: 'Type complete sentences with proper punctuation',
    icon: '📄',
    textType: 'sentences'
  },
  {
    id: 'paragraphs',
    name: 'Paragraphs',
    description: 'Practice with longer texts and maintain consistency',
    icon: '📚',
    textType: 'paragraphs'
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Improve programming typing with code snippets',
    icon: '💻',
    textType: 'code'
  },
  {
    id: 'numbers',
    name: 'Numbers',
    description: 'Practice typing numbers, dates, and special characters',
    icon: '🔢',
    textType: 'numbers'
  }
];

const TypingModeSelector: React.FC<TypingModeSelectorProps> = ({ onModeSelect }) => {
  const [selectedMode, setSelectedMode] = React.useState<TypingMode | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  const handleStartTest = () => {
    if (selectedMode) {
      onModeSelect(selectedMode, selectedDifficulty);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Typing Challenge</h2>
        <p className="text-slate-600">Select a mode and difficulty level to start improving your typing skills</p>
      </div>
      
      {/* Mode Selection */}
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Select Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {typingModes.map((mode) => (
            <Card
              key={mode.id}
              hover
              onClick={() => setSelectedMode(mode)}
              className={`transition-all duration-200 cursor-pointer ${
                selectedMode?.id === mode.id
                  ? 'ring-2 ring-primary-500 bg-primary-50'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{mode.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{mode.name}</h4>
                <p className="text-sm text-slate-600">{mode.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Difficulty Selection */}
      {selectedMode && selectedMode.textType !== 'code' && selectedMode.textType !== 'numbers' && (
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Select Difficulty</h3>
          <div className="flex gap-4">
            {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">
              {selectedDifficulty === 'beginner' && (
                <p><strong>Beginner:</strong> Simple words and short sentences, perfect for building foundation skills.</p>
              )}
              {selectedDifficulty === 'intermediate' && (
                <p><strong>Intermediate:</strong> Longer sentences with varied vocabulary and punctuation.</p>
              )}
              {selectedDifficulty === 'advanced' && (
                <p><strong>Advanced:</strong> Complex paragraphs with technical terms and challenging vocabulary.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Start Button */}
      {selectedMode && (
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="btn btn-primary text-lg px-8 py-4"
          >
            <Keyboard className="h-5 w-5 mr-2" />
            Start Typing Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingModeSelector;