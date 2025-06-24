import React, { useState } from 'react';
import { Keyboard, BarChart3, Trophy } from 'lucide-react';
import { useTypingStore } from '../store/useTypingStore';
import { getRandomText } from '../data/typingTexts';
import TypingModeSelector from '../components/typing/TypingModeSelector';
import TypingTestInterface from '../components/typing/TypingTestInterface';
import TypingStats from '../components/typing/TypingStats';
import BackButton from '../components/ui/BackButton';
import { TypingMode } from '../types';

const TypingPage = () => {
  const [activeTab, setActiveTab] = useState<'test' | 'stats'>('test');
  const { currentTest, startTest, resetTest } = useTypingStore();
  
  const handleModeSelect = (mode: TypingMode, difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    const text = getRandomText(mode.textType, difficulty);
    startTest(text, mode, difficulty);
  };
  
  const handleNewTest = () => {
    resetTest();
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/dashboard" />
        <div className="flex items-center">
          <Keyboard className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-2xl font-bold text-slate-900">Typing Improvement</h1>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('test')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'test'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Keyboard className="h-4 w-4 mr-2 inline" />
          Typing Test
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'stats'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="h-4 w-4 mr-2 inline" />
          Statistics
        </button>
      </div>
      
      {activeTab === 'test' && (
        <div className="space-y-8">
          {!currentTest ? (
            <>
              <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-primary-900 mb-2">
                  Improve Your Typing Skills
                </h2>
                <p className="text-primary-800">
                  Practice typing with various modes and difficulties. Track your words per minute (WPM) and accuracy to see your improvement over time.
                </p>
              </div>
              
              <TypingModeSelector onModeSelect={handleModeSelect} />
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {currentTest.mode.name} - {currentTest.difficulty.charAt(0).toUpperCase() + currentTest.difficulty.slice(1)}
                  </h2>
                  <p className="text-slate-600">{currentTest.mode.description}</p>
                </div>
                
                <button
                  onClick={handleNewTest}
                  className="btn btn-outline"
                >
                  New Test
                </button>
              </div>
              
              <TypingTestInterface />
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'stats' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your Typing Statistics</h2>
            <p className="text-slate-600">Track your progress and identify areas for improvement</p>
          </div>
          
          <TypingStats />
        </div>
      )}
    </div>
  );
};

export default TypingPage;