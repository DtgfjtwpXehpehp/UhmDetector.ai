import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, XCircle, Zap } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSessionStore } from '../store/useSessionStore';
import { useAchievementStore } from '../store/useAchievementStore';
import { useSpeechAnalytics } from '../hooks/useSpeechAnalytics';
import MicrophoneButton from '../components/session/MicrophoneButton';
import TranscriptDisplay from '../components/session/TranscriptDisplay';
import FillerWordCounter from '../components/session/FillerWordCounter';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BackButton from '../components/ui/BackButton';
import Badge from '../components/ui/Badge';
import AISuggestions from '../components/session/AISuggestions';
import AnalyticsPanel from '../components/session/AnalyticsPanel';
import { generateSuggestions } from '../utils/aiSuggestions';

const SessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionTitle, setSessionTitle] = useState('');
  const [showBadges, setShowBadges] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<any[]>([]);
  const [isGeneratingRemix, setIsGeneratingRemix] = useState(false);
  const [remixText, setRemixText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  
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
    startListening, 
    stopListening,
    isSupported
  } = useSpeechRecognition();
  
  const { checkForNewAchievements } = useAchievementStore();
  
  const analytics = useSpeechAnalytics(transcription, isRecording);
  
  // Check if we're viewing an existing session
  const isViewingSession = !!id;
  const sessionData = id ? getSessionById(id) : null;
  
  // Check for browser support
  const browserNotSupported = !isSupported;
  
  // Calculate real-time clarity score
  const clarityScore = calculateClarityScore(fillerWordCount, transcription.length);
  
  // Start a new session
  const handleStartSession = () => {
    startSession();
    startListening();
    setSessionTitle('');
  };
  
  // Stop the current session
  const handleStopSession = () => {
    stopSession();
    stopListening();
  };
  
  // Save the session
  const handleSaveSession = () => {
    saveSession(sessionTitle || undefined);
    
    // Check for achievements
    const newBadges = checkForNewAchievements(
      sessions.length + 1, // Include current session
      clarityScore,
      0 // Placeholder for filler reduction percentage
    );
    
    if (newBadges.length > 0) {
      setEarnedBadges(newBadges);
      setShowBadges(true);
    } else {
      navigate('/dashboard');
    }
  };
  
  // Generate a remix of just the filler words
  const generateFillerWordRemix = () => {
    setIsGeneratingRemix(true);
    
    // Extract all the filler words from the transcript
    const fillerWordsRegex = /\b(um|uhm|uh|like|so|you know|actually|basically)\b/gi;
    const fillerWordsMatches = transcription.match(fillerWordsRegex) || [];
    
    // Create a "remix" by joining the filler words
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
    if (results.length > 0 && isRecording) {
      const lastResult = results[results.length - 1];
      updateTranscription(lastResult.transcript, lastResult.fillerWords);
      
      // Generate new suggestions
      const newSuggestions = generateSuggestions(
        lastResult.transcript,
        fillerWordCount,
        lastResult.fillerWords
      );
      setSuggestions(newSuggestions);
    }
  }, [results, isRecording, updateTranscription]);
  
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
          <h1 className="text-2xl font-bold text-slate-900">
            {isRecording ? 'Recording in progress...' : 'Start a new session'}
          </h1>
        </div>
        
        {isRecording && (
          <div className="flex items-center">
            <div className="h-3 w-3 bg-error-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-error-500 font-medium">LIVE</span>
          </div>
        )}
      </div>
      
      {isViewingSession ? (
        // View mode for existing session
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <div>
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
          {/* Microphone control and status */}
          <div className="flex flex-col items-center justify-center py-6">
            <MicrophoneButton 
              isRecording={isRecording}
              onClick={isRecording ? handleStopSession : handleStartSession}
              size="lg"
            />
            
            <p className="mt-4 text-slate-600">
              {isRecording 
                ? 'Click to stop recording' 
                : 'Click to start recording'}
            </p>
            
            {error && (
              <p className="mt-2 text-error-600 text-sm">{error}</p>
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
                  placeholder="Enter a title for your session"
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
      
      {/* Achievement popup */}
      {showBadges && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 animate-slide-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Achievements Unlocked!</h2>
              <p className="text-slate-600">Congratulations! You've earned new badges:</p>
            </div>
            
            <div className="space-y-4 mb-6">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="flex items-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-4xl mr-4">{badge.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900">{badge.name}</h3>
                    <p className="text-sm text-slate-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => {
                setShowBadges(false);
                navigate('/dashboard');
              }}
              className="btn btn-primary w-full"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionPage;