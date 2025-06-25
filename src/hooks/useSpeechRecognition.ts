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
        console.error('Speech recognition error:', event.error);
        
        switch (event.error) {
          case 'aborted':
            // If this was an intentional stop, don't show an error
            if (intentionalStopRef.current) {
              setError(null);
              intentionalStopRef.current = false;
            } else {
              setError('Speech recognition was interrupted. Please try again.');
            }
            break;
          case 'no-speech':
            setError('No speech detected. Please try speaking louder or check your microphone.');
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
        if (isListening && !intentionalStopRef.current) {
          // Auto-restart if we're still supposed to be listening and it wasn't intentionally stopped
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening && !intentionalStopRef.current) {
              try {
                recognitionRef.current.start();
              } catch (err) {
                console.error('Failed to restart recognition:', err);
                setIsListening(false);
              }
            }
          }, 100);
        } else {
          setIsListening(false);
        }
      };
      
      // Start recognition
      recognitionRef.current.start();
      
    } catch (err) {
      setError('Error initializing speech recognition. Please try again.');
      console.error('Speech recognition initialization error:', err);
      setIsListening(false);
    }
  }, [detectFillerWords, isListening, checkMicrophonePermission]);

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