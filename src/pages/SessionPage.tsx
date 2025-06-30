import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Save, XCircle, Zap, AlertTriangle } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSessionStore } from '../store/useSessionStore';
import { useAchievementStore } from '../store/useAchievementStore';
import { useSpeechAnalytics } from '../hooks/useSpeechAnalytics';
import { practiceModes } from '../data/practiceModes';
import MicrophoneButton from '../components/session/MicrophoneButton';
import TranscriptDisplay from '../components/session/TranscriptDisplay';
import FillerWordCounter from '../components/session/FillerWordCounter';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BackButton from '../components/ui/BackButton';
import AISuggestions from '../components/session/AISuggestions';
import AnalyticsPanel from '../components/session/AnalyticsPanel';
import MicrophonePermissionModal from '../components/session/MicrophonePermissionModal';
import SessionCompletedModal from '../components/session/SessionCompletedModal';
import TestimonialModal from '../components/testimonials/TestimonialModal';
import { generateSuggestions } from '../utils/aiSuggestions';
import { Suggestion } from '../types';

const SessionPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const practiceMode = searchParams.get('mode');
  const navigate = useNavigate();
  
  const [sessionTitle, setSessionTitle] = useState('');
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isGeneratingRemix, setIsGeneratingRemix] = useState(false);
  const [remixText, setRemixText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [practicePrompt, setPracticePrompt] = useState('');
  
  const { 
    sessions,
    currentSession, 
    isRecording, 
    transcription, 
    highlightedTranscription,
    fillerWordCount,
    startSession,
    stopSession,
    saveSession,
    updateTranscription,
    getSessionById,
    calculateClarityScore
  } = useSessionStore();
  
  const { 
    isListening, 
    transcript, 
    results, 
    error, 
    permissionStatus,
    startListening, 
    stopListening,
    isSupported,
    checkPermission
  } = useSpeechRecognition();
  
  const { checkForNewAchievements } = useAchievementStore();
  
  const analytics = useSpeechAnalytics(transcription, isRecording);
  
  // Check if we're viewing an existing session
  const isViewingSession = !!id;
  const sessionData = id ? getSessionById(id) : null;
  
  // Get practice mode data if applicable
  const selectedPracticeMode = practiceMode ? practiceModes.find(m => m.id === practiceMode) : null;
  
  // Check for browser support
  const browserNotSupported = !isSupported;
  
  // Calculate real-time clarity score
  const clarityScore = calculateClarityScore(fillerWordCount, transcription);
  
  // Handle permission modal
  useEffect(() => {
    if (permissionStatus === 'denied' && !isViewingSession) {
      setShowPermissionModal(true);
    } else {
      setShowPermissionModal(false);
    }
  }, [permissionStatus, isViewingSession]);
  
  // Set practice prompt if in practice mode
  useEffect(() => {
    if (selectedPracticeMode && !practicePrompt) {
      const randomPrompt = selectedPracticeMode.prompts[Math.floor(Math.random() * selectedPracticeMode.prompts.length)];
      setPracticePrompt(randomPrompt);
    }
  }, [selectedPracticeMode, practicePrompt]);
  
  // Start a new session
  const handleStartSession = async () => {
    if (permissionStatus !== 'granted') {
      const hasPermission = await checkPermission();
      if (!hasPermission) {
        setShowPermissionModal(true);
        return;
      }
    }
    
    console.log('Starting new session...');
    startSession();
    await startListening();
    setSessionTitle('');
  };
  
  // Stop the current session
  const handleStopSession = () => {
    console.log('Stopping session...');
    stopListening();
    stopSession();
  };
  
  // Save the session
  const handleSaveSession = () => {
    const finalTitle = sessionTitle || (selectedPracticeMode ? `${selectedPracticeMode.name} Practice` : undefined);
    saveSession(finalTitle);
    
    // Check for achievements
    const newBadges = checkForNewAchievements(
      sessions.length + 1,
      clarityScore,
      0
    );
    
    setShowCompletedModal(true);
  };
  
  // Generate a remix of just the filler words
  const generateFillerWordRemix = () => {
    setIsGeneratingRemix(true);
    
    const fillerWordsRegex = /\b(um|uhm|uh|like|so|you know|actually|basically)\b/gi;
    const fillerWordsMatches = transcription.match(fillerWordsRegex) || [];
    
    setTimeout(() => {
      if (fillerWordsMatches.length > 0) {
        const remix = fillerWordsMatches.join(' ');
        setRemixText(remix);
      } else {
        setRemixText("No filler words found! Great job!");
      }
      setIsGeneratingRemix(false);
    }, 1500);
  };
  
  // Update transcription when speech recognition results change
  useEffect(() => {
    if (transcript && isRecording) {
      console.log('Updating transcription with:', transcript);
      // Use the latest transcript directly from speech recognition
      const fillerWords = results.length > 0 ? results[results.length - 1].fillerWords : [];
      const currentFillerWordCount = updateTranscription(transcript, fillerWords);
      
      // Generate new suggestions using the current filler word count
      const newSuggestions = generateSuggestions(
        transcript,
        currentFillerWordCount,
        fillerWords
      );
      setSuggestions(newSuggestions);
    }
  }, [transcript, isRecording, updateTranscription, results]);
  
  // Initialize data if viewing an existing session
  useEffect(() => {
    if (isViewingSession && sessionData) {
      setSessionTitle(sessionData.title);
      updateTranscription(sessionData.transcription, []);
    }
  }, [isViewingSession, sessionData, updateTranscription]);
  
  if (browserNotSupported) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-error-50 border border-error-200 rounded-lg p-8">
          <XCircle className="h-12 w-12 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Browser Not Supported</h2>
          <p className="text-slate-600 mb-6">
            Your browser doesn't support the Speech Recognition API. Please try using a modern browser like Chrome, Edge, or Safari.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn bg-slate-800 text-white hover:bg-slate-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton to="/dashboard" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isRecording ? 'Recording in progress...' : 
               selectedPracticeMode ? `${selectedPracticeMode.name} Practice` : 
               'Start a new session'}
            </h1>
            {selectedPracticeMode && (
              <p className="text-slate-600 text-sm">{selectedPracticeMode.description}</p>
            )}
          </div>
        </div>
        
        {isRecording && (
          <div className="flex items-center">
            <div className="h-3 w-3 bg-error-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-error-500 font-medium">LIVE</span>
          </div>
        )}
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-error-500 mr-2" />
            <p className="text-error-700">{error}</p>
          </div>
        </div>
      )}
      
      {isViewingSession ? (
        // View mode for existing session
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{sessionData?.title}</h2>
                <p className="text-sm text-slate-500">
                  {new Date(sessionData?.date || '').toLocaleString()}
                </p>
                <p className="text-sm text-slate-500">
                  Duration: {sessionData ? Math.floor(sessionData.duration / 60) : 0} min {sessionData ? sessionData.duration % 60 : 0} sec
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Clarity Score</p>
                <p className={`text-2xl font-bold ${
                  (sessionData?.clarityScore || 0) >= 80 ? 'text-success-600' :
                  (sessionData?.clarityScore || 0) >= 60 ? 'text-warning-600' : 'text-error-600'
                }`}>
                  {sessionData?.clarityScore || 0}%
                </p>
              </div>
            </div>
            
            <FillerWordCounter fillerCount={sessionData?.fillerWordCount || { uhm: 0, like: 0, so: 0, youKnow: 0, total: 0 }} />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-800 mb-2">Transcript</h3>
              <div 
                className="border border-slate-200 rounded-lg p-4 bg-slate-50 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: sessionData?.transcription || '' }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        // Recording mode for new session
        <div className="space-y-6">
          {/* Practice Mode Prompt */}
          {selectedPracticeMode && practicePrompt && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-primary-900 mb-2">Practice Prompt</h3>
              <p className="text-primary-800 mb-4">"{practicePrompt}"</p>
              <div className="text-sm text-primary-700">
                <p><strong>Goals:</strong></p>
                <ul className="list-disc list-inside mt-1">
                  {selectedPracticeMode.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Microphone control and status */}
          <div className="flex flex-col items-center justify-center py-6">
            <MicrophoneButton 
              isRecording={isRecording}
              isLoading={permissionStatus === 'checking'}
              onClick={isRecording ? handleStopSession : handleStartSession}
              size="lg"
            />
            
            <p className="mt-4 text-slate-600">
              {permissionStatus === 'checking' ? 'Checking microphone permissions...' :
               permissionStatus === 'denied' ? 'Microphone access required' :
               isRecording ? 'Click to stop recording' : 'Click to start recording'}
            </p>
            
            {/* Status indicators */}
            {isRecording && (
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <div className={`flex items-center ${isListening ? 'text-success-600' : 'text-warning-600'}`}>
                  <div className={`h-2 w-2 rounded-full mr-1 ${isListening ? 'bg-success-500' : 'bg-warning-500'}`}></div>
                  {isListening ? 'Listening' : 'Not listening'}
                </div>
                <div className="text-slate-500">
                  Words: {transcript.split(' ').filter(w => w.length > 0).length}
                </div>
              </div>
            )}
          </div>
          
          {/* Live clarity score */}
          {isRecording && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-sm font-medium text-slate-500 mb-1">Live Clarity Score</p>
              <div className="flex items-center justify-center">
                <div 
                  className={`text-4xl font-bold ${
                    clarityScore >= 80 ? 'text-success-600' :
                    clarityScore >= 60 ? 'text-warning-600' : 'text-error-600'
                  }`}
                >
                  {clarityScore}%
                </div>
                <div className="ml-3">
                  {clarityScore >= 80 ? '😀' : 
                   clarityScore >= 60 ? '🙂' : 
                   clarityScore >= 40 ? '😐' : '😬'}
                </div>
              </div>
            </div>
          )}
          
          {/* Filler word counters */}
          {(isRecording || fillerWordCount.total > 0) && (
            <FillerWordCounter fillerCount={fillerWordCount} />
          )}
          
          {/* Transcript display */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Transcript</h3>
            <TranscriptDisplay 
              highlightedTranscript={highlightedTranscription}
              isRecording={isRecording}
            />
          </div>

          {/* Real-time Analytics */}
          {(isRecording || transcription) && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Real-time Analytics</h3>
              <AnalyticsPanel analytics={analytics} />
            </div>
          )}

          {/* AI Suggestions */}
          {(isRecording || suggestions.length > 0) && (
            <div className="mt-6">
              <AISuggestions suggestions={suggestions} />
            </div>
          )}
          
          {/* Session controls */}
          {!isRecording && transcription && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Save your session</h3>
              
              <div className="mb-4">
                <label htmlFor="session-title" className="block text-sm font-medium text-slate-700 mb-1">
                  Session Title
                </label>
                <input
                  type="text"
                  id="session-title"
                  className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder={selectedPracticeMode ? `${selectedPracticeMode.name} Practice` : "Enter a title for your session"}
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveSession}
                  className="btn btn-primary"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Session
                </button>
                
                <button
                  onClick={generateFillerWordRemix}
                  className="btn btn-outline"
                  disabled={isGeneratingRemix}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Filler Word Remix
                </button>
              </div>
              
              {/* Remix result */}
              {isGeneratingRemix && (
                <div className="mt-4 text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-sm text-slate-500 mt-2">Generating your remix...</p>
                </div>
              )}
              
              {remixText && !isGeneratingRemix && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-2">Your Filler Word Remix:</h4>
                  <p className="italic text-slate-700">"{remixText}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Microphone Permission Modal */}
      <MicrophonePermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onRetry={checkPermission}
        error={error || undefined}
      />
      
      {/* Session Completed Modal */}
      {showCompletedModal && (
        <SessionCompletedModal
          clarityScore={clarityScore}
          onClose={() => {
            setShowCompletedModal(false);
            navigate('/dashboard');
          }}
          onLeaveTestimonial={() => {
            setShowCompletedModal(false);
            setShowTestimonialModal(true);
          }}
        />
      )}
      
      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <TestimonialModal
          onClose={() => {
            setShowTestimonialModal(false);
            navigate('/dashboard');
          }}
        />
      )}
    </div>
  );
};

export default SessionPage;