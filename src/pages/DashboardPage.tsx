import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart3, TrendingUp, Award, BarChart2, Dumbbell, Keyboard } from 'lucide-react';
import { useSessionStore } from '../store/useSessionStore';
import { useTypingStore } from '../store/useTypingStore';
import { useAuthStore } from '../store/useAuthStore';
import { useAchievementStore } from '../store/useAchievementStore';
import SessionCard from '../components/dashboard/SessionCard';
import ClarityScoreChart from '../components/dashboard/ClarityScoreChart';
import FillerWordDistribution from '../components/dashboard/FillerWordDistribution';
import BadgeGrid from '../components/achievements/BadgeGrid';
import OnboardingModal from '../components/onboarding/OnboardingModal';
import Card from '../components/ui/Card';

const DashboardPage = () => {
  const { sessions } = useSessionStore();
  const { tests, getStats } = useTypingStore();
  const { user } = useAuthStore();
  const { badges, unlockedBadges } = useAchievementStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Analytics stats
  const totalSessions = sessions.length;
  const averageClarityScore = totalSessions > 0
    ? Math.round(sessions.reduce((sum, session) => sum + session.clarityScore, 0) / totalSessions)
    : 0;
  const totalFillerWords = totalSessions > 0
    ? sessions.reduce((sum, session) => sum + session.fillerWordCount.total, 0)
    : 0;
  
  // Typing stats
  const typingStats = getStats();
  
  // Check if user has sessions
  const hasSessions = sessions.length > 0;
  const hasTypingTests = tests.length > 0;
  
  // Sort sessions by date (newest first)
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  useEffect(() => {
    // Show onboarding for new users
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted && !hasSessions && !hasTypingTests) {
      setShowOnboarding(true);
    }
    
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [hasSessions, hasTypingTests]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
            <p className="text-slate-600">Track your speech progress and improve your typing skills.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/session" className="btn btn-primary">
              <Mic className="h-5 w-5 mr-2" />
              New Session
            </Link>
            <Link to="/typing" className="btn btn-outline">
              <Keyboard className="h-5 w-5 mr-2" />
              Typing Test
            </Link>
            <Link to="/practice" className="btn btn-outline">
              <Dumbbell className="h-5 w-5 mr-2" />
              Practice
            </Link>
          </div>
        </div>
        
        {!hasSessions && !hasTypingTests ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Mic className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Get started with UhmDetector.ai</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Improve your communication skills with speech clarity tracking and typing practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/session" className="btn btn-primary">
                Start Speech Session
              </Link>
              <Link to="/typing" className="btn btn-outline">
                Try Typing Test
              </Link>
              <Link to="/practice" className="btn btn-outline">
                Practice Modes
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card>
                <div className="flex items-center">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-500">Speech Sessions</p>
                    <p className="text-2xl font-bold text-slate-900">{totalSessions}</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="p-3 bg-secondary-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-500">Average Clarity</p>
                    <p className="text-2xl font-bold text-slate-900">{averageClarityScore}%</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="p-3 bg-warning-100 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-warning-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-500">Filler Words</p>
                    <p className="text-2xl font-bold text-slate-900">{totalFillerWords}</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="p-3 bg-success-100 rounded-lg">
                    <Keyboard className="h-6 w-6 text-success-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-500">Typing WPM</p>
                    <p className="text-2xl font-bold text-slate-900">{typingStats.averageWpm}</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-500">Badges Earned</p>
                    <p className="text-2xl font-bold text-slate-900">{unlockedBadges.length}</p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Charts section */}
            {hasSessions && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ClarityScoreChart sessions={sessions} />
                <FillerWordDistribution sessions={sessions} />
              </div>
            )}
            
            {/* Recent sessions */}
            {hasSessions && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Recent Sessions</h2>
                  <Link to="/analytics" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View all analytics
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentSessions.map(session => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Typing Progress */}
            {hasTypingTests && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Typing Progress</h2>
                  <Link to="/typing" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View typing stats
                  </Link>
                </div>
                
                <Card>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">{typingStats.totalTests}</div>
                      <div className="text-sm text-slate-500">Tests Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success-600">{typingStats.averageWpm}</div>
                      <div className="text-sm text-slate-500">Average WPM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning-600">{typingStats.bestWpm}</div>
                      <div className="text-sm text-slate-500">Best WPM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-600">{typingStats.averageAccuracy}%</div>
                      <div className="text-sm text-slate-500">Accuracy</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Achievements */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-warning-500 mr-2" />
                <h2 className="text-xl font-bold text-slate-900">Your Achievements</h2>
              </div>
              
              <BadgeGrid badges={badges} unlockedBadges={unlockedBadges} />
            </div>
          </>
        )}
      </div>

      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </>
  );
};

export default DashboardPage;