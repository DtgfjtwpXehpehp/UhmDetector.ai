import { create } from 'zustand';
import { TypingTest, TypingMistake, TypingStats, TypingMode } from '../types';

interface TypingState {
  tests: TypingTest[];
  currentTest: TypingTest | null;
  isTyping: boolean;
  startTime: number | null;
  currentText: string;
  typedText: string;
  currentPosition: number;
  mistakes: TypingMistake[];
  wpm: number;
  accuracy: number;
  
  // Actions
  startTest: (text: string, mode: TypingMode, difficulty: 'beginner' | 'intermediate' | 'advanced') => void;
  updateTypedText: (text: string) => void;
  finishTest: () => void;
  resetTest: () => void;
  getStats: () => TypingStats;
  calculateWPM: () => number;
  calculateAccuracy: () => number;
  loadUserTests: () => void;
  saveUserTests: () => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  tests: [],
  currentTest: null,
  isTyping: false,
  startTime: null,
  currentText: '',
  typedText: '',
  currentPosition: 0,
  mistakes: [],
  wpm: 0,
  accuracy: 100,
  
  loadUserTests: () => {
    const tests = JSON.parse(localStorage.getItem('typingTests') || '[]');
    set({ tests });
  },
  
  saveUserTests: () => {
    const { tests } = get();
    localStorage.setItem('typingTests', JSON.stringify(tests));
  },
  
  startTest: (text, mode, difficulty) => {
    const newTest: TypingTest = {
      id: Date.now().toString(),
      userId: '1', // Would come from auth in real app
      text,
      mode,
      difficulty,
      duration: 0,
      wpm: 0,
      accuracy: 100,
      errors: 0,
      date: new Date(),
      completedText: '',
      mistakes: []
    };
    
    set({
      currentTest: newTest,
      isTyping: true,
      startTime: Date.now(),
      currentText: text,
      typedText: '',
      currentPosition: 0,
      mistakes: [],
      wpm: 0,
      accuracy: 100
    });
  },
  
  updateTypedText: (text) => {
    const { currentText, startTime, mistakes } = get();
    
    if (!startTime) return;
    
    const newMistakes = [...mistakes];
    const currentChar = currentText[text.length - 1];
    const typedChar = text[text.length - 1];
    
    // Check for mistakes
    if (text.length <= currentText.length && currentChar !== typedChar && typedChar) {
      newMistakes.push({
        position: text.length - 1,
        expected: currentChar,
        typed: typedChar,
        timestamp: Date.now() - startTime
      });
    }
    
    const wpm = get().calculateWPM();
    const accuracy = get().calculateAccuracy();
    
    set({
      typedText: text,
      currentPosition: text.length,
      mistakes: newMistakes,
      wpm,
      accuracy
    });
  },
  
  finishTest: () => {
    const { currentTest, typedText, mistakes, startTime, tests } = get();
    
    if (!currentTest || !startTime) return;
    
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const wpm = get().calculateWPM();
    const accuracy = get().calculateAccuracy();
    
    const completedTest: TypingTest = {
      ...currentTest,
      duration,
      wpm,
      accuracy,
      errors: mistakes.length,
      completedText: typedText,
      mistakes
    };
    
    const updatedTests = [...tests, completedTest];
    localStorage.setItem('typingTests', JSON.stringify(updatedTests));
    
    set({
      tests: updatedTests,
      currentTest: null,
      isTyping: false,
      startTime: null
    });
  },
  
  resetTest: () => {
    set({
      currentTest: null,
      isTyping: false,
      startTime: null,
      currentText: '',
      typedText: '',
      currentPosition: 0,
      mistakes: [],
      wpm: 0,
      accuracy: 100
    });
  },
  
  calculateWPM: () => {
    const { typedText, startTime } = get();
    
    if (!startTime || !typedText) return 0;
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = typedText.length / 5; // Standard: 5 characters = 1 word
    
    return Math.round(wordsTyped / timeElapsed) || 0;
  },
  
  calculateAccuracy: () => {
    const { typedText, mistakes } = get();
    
    if (!typedText.length) return 100;
    
    const correctChars = typedText.length - mistakes.length;
    return Math.round((correctChars / typedText.length) * 100);
  },
  
  getStats: () => {
    const { tests } = get();
    
    if (tests.length === 0) {
      return {
        totalTests: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        bestWpm: 0,
        bestAccuracy: 0,
        totalTimeTyped: 0,
        improvementRate: 0,
        commonMistakes: {}
      };
    }
    
    const totalTests = tests.length;
    const averageWpm = Math.round(tests.reduce((sum, test) => sum + test.wpm, 0) / totalTests);
    const averageAccuracy = Math.round(tests.reduce((sum, test) => sum + test.accuracy, 0) / totalTests);
    const bestWpm = Math.max(...tests.map(test => test.wpm));
    const bestAccuracy = Math.max(...tests.map(test => test.accuracy));
    const totalTimeTyped = tests.reduce((sum, test) => sum + test.duration, 0);
    
    // Calculate improvement rate (comparing first 5 tests to last 5 tests)
    let improvementRate = 0;
    if (tests.length >= 10) {
      const firstFive = tests.slice(0, 5);
      const lastFive = tests.slice(-5);
      const firstAvg = firstFive.reduce((sum, test) => sum + test.wpm, 0) / 5;
      const lastAvg = lastFive.reduce((sum, test) => sum + test.wpm, 0) / 5;
      improvementRate = Math.round(((lastAvg - firstAvg) / firstAvg) * 100);
    }
    
    // Calculate common mistakes
    const commonMistakes: { [key: string]: number } = {};
    tests.forEach(test => {
      test.mistakes.forEach(mistake => {
        const key = `${mistake.expected} → ${mistake.typed}`;
        commonMistakes[key] = (commonMistakes[key] || 0) + 1;
      });
    });
    
    return {
      totalTests,
      averageWpm,
      averageAccuracy,
      bestWpm,
      bestAccuracy,
      totalTimeTyped,
      improvementRate,
      commonMistakes
    };
  }
}));