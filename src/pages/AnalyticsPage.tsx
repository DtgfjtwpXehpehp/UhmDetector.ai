import React from 'react';
import { useSessionStore } from '../store/useSessionStore';
import { BarChart2, TrendingUp, Clock, BarChart, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import BackButton from '../components/ui/BackButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';
import { formatDate, formatDuration } from '../utils/formatters';

const AnalyticsPage = () => {
  const { sessions } = useSessionStore();

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

  const fillerWordDistribution = [
    { name: 'Uhm/Um', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.uhm, 0) },
    { name: 'Like', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.like, 0) },
    { name: 'So', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.so, 0) },
    { name: 'You Know', value: sessions.reduce((sum, s) => sum + s.fillerWordCount.youKnow, 0) }
  ].filter(item => item.value > 0);

  // Calculate improvement metrics
  const calculateImprovement = () => {
    if (sessions.length < 2) return null;
    
    const firstFive = sessions.slice(0, 5);
    const lastFive = sessions.slice(-5);
    
    const firstAvg = firstFive.reduce((sum, s) => sum + s.clarityScore, 0) / firstFive.length;
    const lastAvg = lastFive.reduce((sum, s) => sum + s.clarityScore, 0) / lastFive.length;
    
    return Math.round(((lastAvg - firstAvg) / firstAvg) * 100);
  };

  const improvement = calculateImprovement();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/dashboard" />
        <div className="flex items-center">
          <BarChart2 className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-2xl font-bold text-slate-900">Speech Analytics</h1>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Activity className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Total Sessions</p>
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
              <p className="text-sm font-medium text-slate-500">Total Filler Words</p>
              <p className="text-2xl font-bold text-warning-600">{totalFillerWords}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Total Practice Time</p>
              <p className="text-2xl font-bold text-secondary-600">{formatDuration(totalDuration)}</p>
            </div>
          </div>
        </Card>
      </div>

      {sessions.length > 0 ? (
        <>
          {/* Clarity Score Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Clarity Score Trend</h2>
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
              
              {improvement !== null && (
                <div className={`mt-4 p-3 rounded-lg ${
                  improvement > 0 ? 'bg-success-50 text-success-700' : 
                  improvement < 0 ? 'bg-error-50 text-error-700' : 
                  'bg-slate-50 text-slate-700'
                }`}>
                  <p className="text-sm font-medium">
                    {improvement > 0 ? '📈 ' : improvement < 0 ? '📉 ' : '📊 '}
                    Your clarity score has {improvement > 0 ? 'improved' : improvement < 0 ? 'decreased' : 'remained stable'} by {Math.abs(improvement)}% compared to your first sessions
                  </p>
                </div>
              )}
            </Card>

            {/* Filler Word Distribution */}
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
              
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Tip:</span> Focus on reducing your most frequent filler word first. Small improvements add up!
                </p>
              </div>
            </Card>
          </div>

          {/* Session Insights */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Session Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-900 mb-2">Best Performance</h3>
                <p className="text-sm text-primary-700">
                  Your highest clarity score was{' '}
                  <span className="font-bold">
                    {Math.max(...sessions.map(s => s.clarityScore))}%
                  </span>
                </p>
              </div>

              <div className="p-4 bg-success-50 rounded-lg">
                <h3 className="font-medium text-success-900 mb-2">Most Productive Day</h3>
                <p className="text-sm text-success-700">
                  Your longest session was{' '}
                  <span className="font-bold">
                    {formatDuration(Math.max(...sessions.map(s => s.duration)))}
                  </span>
                </p>
              </div>

              <div className="p-4 bg-warning-50 rounded-lg">
                <h3 className="font-medium text-warning-900 mb-2">Areas for Improvement</h3>
                <p className="text-sm text-warning-700">
                  Most common filler word:{' '}
                  <span className="font-bold">
                    {fillerWordDistribution.reduce((max, curr) => 
                      curr.value > max.value ? curr : max
                    ).name}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-slate-50 rounded-lg p-8 max-w-lg mx-auto">
            <BarChart2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No data yet</h2>
            <p className="text-slate-600 mb-6">
              Complete your first speaking session to see detailed analytics and insights.
            </p>
            <button
              onClick={() => navigate('/session')}
              className="btn btn-primary"
            >
              Start Your First Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;