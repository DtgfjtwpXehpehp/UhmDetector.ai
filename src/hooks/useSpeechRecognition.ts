import { useState, useEffect, useCallback, useRef } from 'react';
import { SpeechRecognitionResult } from '../types';

// List of filler words to detect
const FILLER_WORDS = ['uhm', 'um', 'uh', 'like', 'so', 'you know', 'actually', 'basically'];

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [results, setResults] = useState<SpeechRecognitionResult[]>([]);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intentionalStopRef = useRef<boolean>(false);
  const lastErrorRef = useRef<string | null>(null);

  // Check if browser supports Speech Recognition
  const browserSupportsSpeechRecognition = () => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  };

  // Check microphone permissions
  const checkMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      return true;
    } catch (err) {
      setPermissionStatus('denied');
      setError('Microphone access denied. Please allow microphone access to use speech recognition.');
      return false;
    }
  }, []);

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

  // Start listening with better error handling
  const startListening = useCallback(async () => {
    if (!browserSupportsSpeechRecognition()) {
      setError('Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Check permissions first
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    try {
      setError(null);
      intentionalStopRef.current = false;
      lastErrorRef.current = null;
      
      // Create SpeechRecognition instance
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure with better settings
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;
      
      // Event handlers with improved error handling
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setResults([]);
        setError(null);
      };
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        let finalTranscript = '';
        
        // Process all results
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            currentTranscript += result[0].transcript;
          }
        }
        
        const fullTranscript = finalTranscript + currentTranscript;
        
        // Detect filler words
        const fillerWords = detectFillerWords(fullTranscript);
        
        // Update state
        setTranscript(fullTranscript);
        setResults(prev => [
          ...prev, 
          {
            transcript: fullTranscript,
            isFinal: event.results[event.results.length - 1].isFinal,
            fillerWords
          }
        ]);
      };
      
      recognitionRef.current.onerror = (event) => {
        // Store the last error type
        lastErrorRef.current = event.error;
        
        // Only log errors that are not expected/normal behavior
        if (event.error !== 'aborted' && event.error !== 'no-speech') {
          console.error('Speech recognition error:', event.error);
        }
        
        switch (event.error) {
          case 'aborted':
            // Don't show error for aborted recognition - this is normal when stopping
            setError(null);
            break;
          case 'no-speech':
            // Don't show error for no-speech - this is common and will auto-restart
            setError(null);
            break;
          case 'audio-capture':
            setError('Microphone not accessible. Please check your microphone connection.');
            break;
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access and try again.');
            setPermissionStatus('denied');
            break;
          case 'network':
            setError('Network error. Please check your internet connection.');
            break;
          case 'service-not-allowed':
            setError('Speech recognition service not available. Please try again later.');
            break;
          default:
            setError(`Speech recognition error: ${event.error}`);
        }
        
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        
        // Only attempt to restart if we should still be listening and it wasn't intentionally stopped
        if (!intentionalStopRef.current) {
          // Determine restart delay based on the last error
          let restartDelay = 100; // Default delay
          
          // Check if we should prevent automatic restart for critical errors
          const criticalErrors = ['audio-capture', 'not-allowed', 'service-not-allowed'];
          if (lastErrorRef.current && criticalErrors.includes(lastErrorRef.current)) {
            // Don't auto-restart for critical errors that require user intervention
            return;
          }
          
          // Use longer delay for no-speech errors to prevent rapid cycling
          if (lastErrorRef.current === 'no-speech') {
            restartDelay = 1000; // 1 second delay for no-speech errors
          } else if (lastErrorRef.current === 'network') {
            restartDelay = 2000; // 2 second delay for network errors
          }
          
          restartTimeoutRef.current = setTimeout(() => {
            // Check if we still have a recognition instance and it's in the right state
            if (recognitionRef.current && !intentionalStopRef.current) {
              try {
                // Clear the last error before restarting
                lastErrorRef.current = null;
                // Only start if the recognition is not already running
                recognitionRef.current.start();
              } catch (err) {
                // If start fails (likely because it's already running), just ignore it
                console.warn('Could not restart recognition:', err);
              }
            }
          }, restartDelay);
        }
      };
      
      // Start recognition
      recognitionRef.current.start();
      
    } catch (err) {
      setError('Error initializing speech recognition. Please try again.');
      console.error('Speech recognition initialization error:', err);
      setIsListening(false);
    }
  }, [detectFillerWords, checkMicrophonePermission]);

  // Stop listening
  const stopListening = useCallback(() => {
    intentionalStopRef.current = true;
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Check permissions on mount
  useEffect(() => {
    if (browserSupportsSpeechRecognition()) {
      checkMicrophonePermission();
    } else {
      setPermissionStatus('denied');
      setError('Speech recognition not supported in this browser.');
    }
  }, [checkMicrophonePermission]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      intentionalStopRef.current = true;
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
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
    permissionStatus,
    startListening,
    stopListening,
    isSupported: browserSupportsSpeechRecognition(),
    checkPermission: checkMicrophonePermission
  };
}