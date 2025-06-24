import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Session } from '../../types';
import { formatDate } from '../../utils/formatters';
import Card from '../ui/Card';

interface ClarityScoreChartProps {
  sessions: Session[];
}

const ClarityScoreChart: React.FC<ClarityScoreChartProps> = ({ sessions }) => {
  const chartData = sessions
    .slice() // Create a copy
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(session => ({
      date: formatDate(new Date(session.date)),
      score: session.clarityScore,
      fillerWords: session.fillerWordCount.total
    }));

  // Calculate the trend line (average improvement)
  const calculateTrend = () => {
    if (sessions.length <= 1) return "Not enough data";
    
    const firstSession = sessions[0].clarityScore;
    const lastSession = sessions[sessions.length - 1].clarityScore;
    const difference = lastSession - firstSession;
    
    if (difference > 5) return "Improving 📈";
    if (difference < -5) return "Declining 📉";
    return "Steady 📊";
  };

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-slate-800">Clarity Score Trend</h3>
        <div className="badge badge-primary">{calculateTrend()}</div>
      </div>
      
      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#7c3aed" 
                strokeWidth={2}
                dot={{ stroke: '#7c3aed', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ stroke: '#7c3aed', strokeWidth: 2, r: 6, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg">
          <p className="text-slate-500">Complete a session to see your progress</p>
        </div>
      )}
    </Card>
  );
};

export default ClarityScoreChart;