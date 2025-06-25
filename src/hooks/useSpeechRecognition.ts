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
  const isStartingRef = useRef<boolean>(false);
  const finalTranscriptRef = useRef<string>('');

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

    // Prevent multiple simultaneous starts
    if (isStartingRef.current || isListening) {
      return;
    }

    // Check permissions first
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    try {
      isStartingRef.current = true;
      setError(null);
      intentionalStopRef.current = false;
      
      // Stop any existing recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      // Clear any pending restart
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
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
        console.log('Speech recognition started');
        setIsListening(true);
        setError(null);
        isStartingRef.current = false;
        // Reset transcript accumulation
        finalTranscriptRef.current = '';
      };
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = finalTranscriptRef.current;
        
        // Process all results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const resultTranscript = result[0].transcript;
          
          if (result.isFinal) {
            finalTranscript += resultTranscript;
          } else {
            interimTranscript += resultTranscript;
          }
        }
        
        // Update the final transcript reference
        finalTranscriptRef.current = finalTranscript;
        
        // Combine final and interim transcripts
        const fullTranscript = finalTranscript + interimTranscript;
        
        // Detect filler words in the full transcript
        const fillerWords = detectFillerWords(fullTranscript);
        
        // Update state
        setTranscript(fullTranscript);
        
        // Create result object
        const speechResult: SpeechRecognitionResult = {
          transcript: fullTranscript,
          isFinal: event.results[event.results.length - 1]?.isFinal || false,
          fillerWords
        };
        
        setResults(prev => {
          // Replace the last result if it's interim, or add new result if final
          const newResults = [...prev];
          if (newResults.length > 0 && !newResults[newResults.length - 1].isFinal) {
            newResults[newResults.length - 1] = speechResult;
          } else {
            newResults.push(speechResult);
          }
          return newResults;
        });
      };
      
      recognitionRef.current.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        isStartingRef.current = false;
        
        switch (event.error) {
          case 'aborted':
            // Normal when stopping - don't show error
            break;
          case 'no-speech':
            // Common and will auto-restart - don't show error
            break;
          case 'audio-capture':
            setError('Microphone not accessible. Please check your microphone connection.');
            setIsListening(false);
            break;
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access and try again.');
            setPermissionStatus('denied');
            setIsListening(false);
            break;
          case 'network':
            setError('Network error. Please check your internet connection.');
            break;
          case 'service-not-allowed':
            setError('Speech recognition service not available. Please try again later.');
            setIsListening(false);
            break;
          default:
            console.error(`Speech recognition error: ${event.error}`);
        }
      };
      
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        isStartingRef.current = false;
        
        // Only attempt to restart if we should still be listening and it wasn't intentionally stopped
        if (!intentionalStopRef.current && isListening) {
          // Add a small delay before restarting to prevent rapid cycling
          restartTimeoutRef.current = setTimeout(() => {
            if (!intentionalStopRef.current && recognitionRef.current) {
              try {
                console.log('Restarting speech recognition...');
                recognitionRef.current.start();
              } catch (err) {
                console.warn('Could not restart recognition:', err);
                setIsListening(false);
              }
            }
          }, 500);
        } else {
          setIsListening(false);
        }
      };
      
      // Start recognition
      console.log('Starting speech recognition...');
      recognitionRef.current.start();
      
    } catch (err) {
      isStartingRef.current = false;
      setError('Error initializing speech recognition. Please try again.');
      console.error('Speech recognition initialization error:', err);
      setIsListening(false);
    }
  }, [detectFillerWords, checkMicrophonePermission, isListening]);

  // Stop listening
  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition...');
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