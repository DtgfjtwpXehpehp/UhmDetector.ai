import { useState, useEffect, useCallback, useRef } from 'react';
import { SpeechRecognitionResult } from '../types';

// List of filler words to detect
const FILLER_WORDS = ['uhm', 'um', 'uh', 'like', 'so', 'you know', 'actually', 'basically'];

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [results, setResults] = useState<SpeechRecognitionResult[]>([]);

  // Check if browser supports Speech Recognition
  const browserSupportsSpeechRecognition = () => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  };

  // Detect filler words in a given text
  const detectFillerWords = useCallback((text: string) => {
    const fillerWords: { word: string; index: number }[] = [];
    
    FILLER_WORDS.forEach(fillerWord => {
      const regex = new RegExp(`\\b${fillerWord}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        fillerWords.push({
          word: match[0],
          index: match.index
        });
      }
    });
    
    return fillerWords;
  }, []);

  // Start listening
  const startListening = useCallback(() => {
    if (!browserSupportsSpeechRecognition()) {
      setError('Your browser does not support speech recognition');
      return;
    }

    try {
      setError(null);
      
      // Create SpeechRecognition instance
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      // Event handlers
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setResults([]);
      };
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        
        // Get latest results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        
        // Detect filler words
        const fillerWords = detectFillerWords(currentTranscript);
        
        // Update state
        setTranscript(currentTranscript);
        setResults(prev => [
          ...prev, 
          {
            transcript: currentTranscript,
            isFinal: event.results[event.resultIndex].isFinal,
            fillerWords
          }
        ]);
      };
      
      recognitionRef.current.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // If we're still supposed to be listening, restart
          recognitionRef.current?.start();
        } else {
          setIsListening(false);
        }
      };
      
      // Start recognition
      recognitionRef.current.start();
      
    } catch (err) {
      setError('Error initializing speech recognition');
      console.error(err);
    }
  }, [detectFillerWords, isListening]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    results,
    error,
    startListening,
    stopListening,
    isSupported: browserSupportsSpeechRecognition()
  };
}