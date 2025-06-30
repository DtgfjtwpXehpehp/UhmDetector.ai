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
  calculateClarityScore: (fillerCount: FillerWordCount, transcriptLength: string) => number;
  loadUserSessions: () => void;
  saveUserSessions: () => void;
}

const FILLER_WORDS = ['uhm', 'um', 'uh', 'like', 'so', 'you know'];

// Create store with initial state and actions
export const useSessionStore = create<SessionState>((set, get) => ({
  sessions: [],
  currentSession: null,
  isRecording: false,
  transcription: '',
  highlightedTranscription: '',
  fillerWordCount: { uhm: 0, like: 0, so: 0, youKnow: 0, total: 0 },
  
  loadUserSessions: () => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    set({ sessions });
  },
  
  saveUserSessions: () => {
    const { sessions } = get();
    localStorage.setItem('sessions', JSON.stringify(sessions));
  },
  
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
    const { currentSession, transcription, fillerWordCount, sessions } = get();
    
    if (!currentSession) return;
    
    const clarityScore = get().calculateClarityScore(fillerWordCount, transcription);
    
    const finalSession: Session = {
      ...currentSession,
      title: title || currentSession.title,
      transcription,
      fillerWordCount,
      clarityScore,
      duration: Math.floor((Date.now() - new Date(currentSession.date).getTime()) / 1000)
    };
    
    const updatedSessions = [...sessions, finalSession];
    localStorage.setItem('sessions', JSON.stringify(updatedSessions));
    
    set({ 
      sessions: updatedSessions,
      currentSession: null,
      isRecording: false,
      transcription: '',
      highlightedTranscription: '',
      fillerWordCount: { uhm: 0, like: 0, so: 0, youKnow: 0, total: 0 }
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
      const lowerWord = word.toLowerCase();
      if (lowerWord.includes('uhm') || lowerWord.includes('um') || lowerWord === 'uh') {
        fillerWordCount.uhm++;
      } else if (lowerWord === 'like') {
        fillerWordCount.like++;
      } else if (lowerWord === 'so') {
        fillerWordCount.so++;
      } else if (lowerWord === 'you know') {
        fillerWordCount.youKnow++;
      }
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
  
  calculateClarityScore: (fillerCount, transcriptText) => {
    if (!transcriptText || transcriptText.length === 0) return 100;
    
    // Calculate ratio of filler words to total words
    const totalWords = Math.max(1, transcriptText.split(' ').filter(word => word.trim().length > 0).length);
    const fillerRatio = fillerCount.total / totalWords;
    
    // Convert to score (100 = perfect, 0 = terrible)
    let score = 100 - (fillerRatio * 100 * 2); // Multiply by 2 to make it more sensitive
    
    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    
    return Math.round(score);
  }
}));