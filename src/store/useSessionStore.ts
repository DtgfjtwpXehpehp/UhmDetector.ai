import { create } from 'zustand';
import { Session, FillerWordCount } from '../types';

interface SessionState {
  sessions: Session[];
  currentSession: Session | null;
  isRecording: boolean;
  transcription: string;
  highlightedTranscription: string;
  fillerWordCount: FillerWordCount;
  
  // Actions
  startSession: () => void;
  stopSession: () => void;
  saveSession: (title?: string) => void;
  updateTranscription: (text: string, fillerWords: { word: string, index: number }[]) => FillerWordCount;
  getSessionById: (id: string) => Session | undefined;
  calculateClarityScore: (fillerCount: FillerWordCount, transcriptLength: number) => number;
}

const FILLER_WORDS = ['uhm', 'like', 'so', 'you know'];

// Create store with initial state and actions
export const useSessionStore = create<SessionState>((set, get) => ({
  sessions: JSON.parse(localStorage.getItem('sessions') || '[]'),
  currentSession: null,
  isRecording: false,
  transcription: '',
  highlightedTranscription: '',
  fillerWordCount: { uhm: 0, like: 0, so: 0, youKnow: 0, total: 0 },
  
  startSession: () => {
    const newSession: Session = {
      id: Date.now().toString(),
      userId: '1', // Would come from auth in real app
      title: `Session ${new Date().toLocaleString()}`,
      date: new Date(),
      duration: 0,
      transcription: '',
      fillerWordCount: { uhm: 0, like: 0, so: 0, youKnow: 0, total: 0 },
      clarityScore: 100
    };
    
    set({ 
      currentSession: newSession,
      isRecording: true,
      transcription: '',
      highlightedTranscription: '',
      fillerWordCount: { uhm: 0, like: 0, so: 0, youKnow: 0, total: 0 }
    });
  },
  
  stopSession: () => {
    set({ isRecording: false });
  },
  
  saveSession: (title) => {
    const { currentSession, transcription, fillerWordCount } = get();
    
    if (!currentSession) return;
    
    const clarityScore = get().calculateClarityScore(fillerWordCount, transcription.length);
    
    const finalSession: Session = {
      ...currentSession,
      title: title || currentSession.title,
      transcription,
      fillerWordCount,
      clarityScore,
      duration: Math.floor((Date.now() - new Date(currentSession.date).getTime()) / 1000)
    };
    
    const updatedSessions = [...get().sessions, finalSession];
    localStorage.setItem('sessions', JSON.stringify(updatedSessions));
    
    set({ 
      sessions: updatedSessions,
      currentSession: null,
      isRecording: false
    });
  },
  
  updateTranscription: (text, fillerWords) => {
    // Count filler words
    const fillerWordCount = { 
      uhm: 0, 
      like: 0, 
      so: 0, 
      youKnow: 0, 
      total: fillerWords.length 
    };
    
    fillerWords.forEach(({ word }) => {
      if (word.includes('uhm') || word.includes('um')) fillerWordCount.uhm++;
      else if (word === 'like') fillerWordCount.like++;
      else if (word === 'so') fillerWordCount.so++;
      else if (word === 'you know') fillerWordCount.youKnow++;
    });
    
    // Create highlighted text
    let highlightedText = text;
    FILLER_WORDS.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="highlighted-filler">${word}</span>`);
    });
    
    set({ 
      transcription: text,
      highlightedTranscription: highlightedText,
      fillerWordCount
    });
    
    // Return the newly calculated fillerWordCount
    return fillerWordCount;
  },
  
  getSessionById: (id) => {
    return get().sessions.find(session => session.id === id);
  },
  
  calculateClarityScore: (fillerCount, transcriptLength) => {
    if (transcriptLength === 0) return 100;
    
    // Calculate ratio of filler words to total words
    const totalWords = transcriptLength / 5; // Rough approximation of word count
    const fillerRatio = fillerCount.total / totalWords;
    
    // Convert to score (100 = perfect, 0 = terrible)
    let score = 100 - (fillerRatio * 100 * 2); // Multiply by 2 to make it more sensitive
    
    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    
    return Math.round(score);
  }
}));