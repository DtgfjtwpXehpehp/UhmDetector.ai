import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/useSessionStore';
import { useTypingStore } from '../store/useTypingStore';
import { BarChart2, TrendingUp, Clock, BarChart, Activity, Keyboard } from 'lucide-react';
import Card from '../components/ui/Card';
import BackButton from '../components/ui/BackButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';
import { formatDate, formatDuration } from '../utils/formatters';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { sessions } = useSessionStore();
  const { tests, getStats } = useTypingStore();
  const typingStats = getStats();

  // Calculate overall stats
  const totalSessions = sessions.length;
  const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
  const averageClarity = totalSessions > 0
    ? Math.round(sessions.reduce((sum, session) => sum + session.clarityScore, 0) / totalSessions)
    : 0;
  const totalFillerWords = sessions.reduce((sum, session) => sum + session.fillerWordCount.total, 0);

  // Prepare data for charts
  const clarityTrendData = sessions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(session => ({
      date: formatDate(new Date(session.date)),
      score: session.clarityScore
    }));

  const typingProgressData = tests
    .slice(-10)
    .map((test, index) => ({
      session: index + 1,
      wpm: test.wpm,
      accuracy: test.accuracy,
      date: formatDate(new Date(test.date))
    }));

  const fillerWordDistribution = [
    { name: 'Uhm/Um', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.uhm, 0) },
    { name: 'Like', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.like, 0) },
    { name: 'So', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.so, 0) },
    { name: 'You Know', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.youKnow, 0) }
  ].filter(item => item.value > 0);

  // Calculate improvement metrics
  const calculateSpeechImprovement = () => {
    if (sessions.length < 2) return null;
    
    const firstFive = sessions.slice(0, 5);
    const lastFive = sessions.slice(-5);
    
    const firstAvg = firstFive.reduce((sum, s) => sum + s.clarityScore, 0) / firstFive.length;
    const lastAvg = lastFive.reduce((sum, s) => sum + s.clarityScore, 0) / lastFive.length;
    
    return Math.round(((lastAvg - firstAvg) / firstAvg) * 100);
  };

  const speechImprovement = calculateSpeechImprovement();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/dashboard" />
        <div className="flex items-center">
          <BarChart2 className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-2xl font-bold text-slate-900">Comprehensive Analytics</h1>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Activity className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Speech Sessions</p>
              <p className="text-2xl font-bold text-slate-900">{totalSessions}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Average Clarity</p>
              <p className="text-2xl font-bold text-success-600">{averageClarity}%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-warning-100 rounded-lg">
              <BarChart className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Filler Words</p>
              <p className="text-2xl font-bold text-warning-600">{totalFillerWords}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Keyboard className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Typing WPM</p>
              <p className="text-2xl font-bold text-secondary-600">{typingStats.averageWpm}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Practice Time</p>
              <p className="text-2xl font-bold text-purple-600">{formatDuration(totalDuration + typingStats.totalTimeTyped)}</p>
            </div>
          </div>
        </Card>
      </div>

      {(sessions.length > 0 || tests.length > 0) ? (
        <>
          {/* Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Speech Clarity Trend */}
            {sessions.length > 0 && (
              <Card>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Speech Clarity Trend</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clarityTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          border: 'none'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#7c3aed" 
                        strokeWidth={2}
                        dot={{ stroke: '#7c3aed', strokeWidth: 2, r: 4, fill: 'white' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {speechImprovement !== null && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    speechImprovement > 0 ? 'bg-success-50 text-success-700' : 
                    speechImprovement < 0 ? 'bg-error-50 text-error-700' : 
                    'bg-slate-50 text-slate-700'
                  }`}>
                    <p className="text-sm font-medium">
                      {speechImprovement > 0 ? '📈 ' : speechImprovement < 0 ? '📉 ' : '📊 '}
                      Your clarity score has {speechImprovement > 0 ? 'improved' : speechImprovement < 0 ? 'decreased' : 'remained stable'} by {Math.abs(speechImprovement)}%
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Typing Progress */}
            {tests.length > 0 && (
              <Card>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Typing Progress</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={typingProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="session" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          border: 'none'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="wpm" 
                        stroke="#06b6d4" 
                        strokeWidth={2}
                        dot={{ stroke: '#06b6d4', strokeWidth: 2, r: 4, fill: 'white' }}
                        name="WPM"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: 'white' }}
                        name="Accuracy %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {typingStats.improvementRate !== 0 && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    typingStats.improvementRate > 0 ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
                  }`}>
                    <p className="text-sm font-medium">
                      {typingStats.improvementRate > 0 ? '📈 ' : '📉 '}
                      Your typing speed has {typingStats.improvementRate > 0 ? 'improved' : 'decreased'} by {Math.abs(typingStats.improvementRate)}%
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Filler Word Distribution */}
            {fillerWordDistribution.length > 0 && (
              <Card>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Filler Word Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={fillerWordDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          border: 'none'
                        }}
                      />
                      <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* Performance Insights */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Performance Insights</h2>
              <div className="space-y-6">
                {sessions.length > 0 && (
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <h3 className="font-medium text-primary-900 mb-2">Speech Performance</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-primary-700">Best Clarity:</span>
                        <span className="font-bold ml-2">{Math.max(...sessions.map(s => s.clarityScore))}%</span>
                      </div>
                      <div>
                        <span className="text-primary-700">Avg. Session:</span>
                        <span className="font-bold ml-2">{formatDuration(totalDuration / totalSessions)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {tests.length > 0 && (
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <h3 className="font-medium text-secondary-900 mb-2">Typing Performance</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-secondary-700">Best WPM:</span>
                        <span className="font-bold ml-2">{typingStats.bestWpm}</span>
                      </div>
                      <div>
                        <span className="text-secondary-700">Best Accuracy:</span>
                        <span className="font-bold ml-2">{typingStats.bestAccuracy}%</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-success-50 rounded-lg">
                  <h3 className="font-medium text-success-900 mb-2">Overall Progress</h3>
                  <p className="text-sm text-success-700">
                    You've completed {totalSessions + tests.length} total practice sessions and spent {formatDuration(totalDuration + typingStats.totalTimeTyped)} improving your communication skills.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-slate-50 rounded-lg p-8 max-w-lg mx-auto">
            <BarChart2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No data yet</h2>
            <p className="text-slate-600 mb-6">
              Complete your first session to see detailed analytics and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/session')}
                className="btn btn-primary"
              >
                Start Speech Session
              </button>
              <button
                onClick={() => navigate('/typing')}
                className="btn btn-outline"
              >
                Try Typing Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;