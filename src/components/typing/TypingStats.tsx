import React from 'react';
import { useTypingStore } from '../../store/useTypingStore';
import { TrendingUp, Target, Clock, Zap, Award, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TypingStats: React.FC = () => {
  const { tests, getStats } = useTypingStore();
  const stats = getStats();
  
  // Prepare chart data
  const progressData = tests.slice(-10).map((test, index) => ({
    session: index + 1,
    wpm: test.wpm,
    accuracy: test.accuracy,
    date: new Date(test.date).toLocaleDateString()
  }));
  
  // Get top 5 common mistakes
  const topMistakes = Object.entries(stats.commonMistakes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([mistake, count]) => ({ mistake, count }));
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Tests Completed</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalTests}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-success-100 rounded-lg">
              <Zap className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Average WPM</p>
              <p className="text-2xl font-bold text-success-600">{stats.averageWpm}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-warning-100 rounded-lg">
              <Award className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Best WPM</p>
              <p className="text-2xl font-bold text-warning-600">{stats.bestWpm}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Time Practiced</p>
              <p className="text-2xl font-bold text-secondary-600">{formatTime(stats.totalTimeTyped)}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {tests.length > 0 ? (
        <>
          {/* Progress Chart */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-slate-800">Progress Over Time</h3>
              {stats.improvementRate !== 0 && (
                <div className={`badge ${stats.improvementRate > 0 ? 'badge-success' : 'badge-error'}`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stats.improvementRate > 0 ? '+' : ''}{stats.improvementRate}% improvement
                </div>
              )}
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
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
                    stroke="#7c3aed" 
                    strokeWidth={2}
                    dot={{ stroke: '#7c3aed', strokeWidth: 2, r: 4, fill: 'white' }}
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
          </Card>
          
          {/* Accuracy and Performance Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-medium text-slate-800 mb-6">Performance Insights</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-medium text-primary-900 mb-2">Average Accuracy</h4>
                  <div className="flex items-center">
                    <div className="flex-1 bg-white rounded-full h-3">
                      <div
                        className="bg-primary-600 h-3 rounded-full"
                        style={{ width: `${stats.averageAccuracy}%` }}
                      ></div>
                    </div>
                    <span className="ml-3 font-bold text-primary-700">{stats.averageAccuracy}%</span>
                  </div>
                </div>
                
                <div className="p-4 bg-success-50 rounded-lg">
                  <h4 className="font-medium text-success-900 mb-2">Best Accuracy</h4>
                  <div className="flex items-center">
                    <div className="flex-1 bg-white rounded-full h-3">
                      <div
                        className="bg-success-600 h-3 rounded-full"
                        style={{ width: `${stats.bestAccuracy}%` }}
                      ></div>
                    </div>
                    <span className="ml-3 font-bold text-success-700">{stats.bestAccuracy}%</span>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2">Typing Consistency</h4>
                  <p className="text-sm text-slate-600">
                    {stats.averageAccuracy >= 95 ? 'Excellent! Your typing is very consistent.' :
                     stats.averageAccuracy >= 90 ? 'Good consistency. Focus on maintaining accuracy at higher speeds.' :
                     stats.averageAccuracy >= 80 ? 'Room for improvement. Practice accuracy over speed.' :
                     'Focus on accuracy first, then gradually increase speed.'}
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Common Mistakes */}
            {topMistakes.length > 0 && (
              <Card>
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-2" />
                  <h3 className="text-lg font-medium text-slate-800">Common Mistakes</h3>
                </div>
                
                <div className="space-y-3">
                  {topMistakes.map((mistake, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-mono text-sm">{mistake.mistake}</span>
                      <span className="badge badge-warning">{mistake.count}x</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-warning-50 rounded-lg">
                  <p className="text-sm text-warning-700">
                    <strong>Tip:</strong> Practice these character combinations slowly to build muscle memory.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-slate-50 rounded-lg p-8 max-w-lg mx-auto">
            <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No typing data yet</h2>
            <p className="text-slate-600 mb-6">
              Complete your first typing test to see detailed statistics and track your progress.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingStats;