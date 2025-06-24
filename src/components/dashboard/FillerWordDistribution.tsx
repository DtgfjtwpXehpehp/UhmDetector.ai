import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Session } from '../../types';
import Card from '../ui/Card';

interface FillerWordDistributionProps {
  sessions: Session[];
}

const FillerWordDistribution: React.FC<FillerWordDistributionProps> = ({ sessions }) => {
  // Aggregate filler word counts across all sessions
  const aggregateFillerWords = () => {
    const totalCounts = { uhm: 0, like: 0, so: 0, youKnow: 0 };
    
    sessions.forEach(session => {
      totalCounts.uhm += session.fillerWordCount.uhm;
      totalCounts.like += session.fillerWordCount.like;
      totalCounts.so += session.fillerWordCount.so;
      totalCounts.youKnow += session.fillerWordCount.youKnow;
    });
    
    return [
      { name: 'Uhm/Um', value: totalCounts.uhm, color: '#f59e0b' },
      { name: 'Like', value: totalCounts.like, color: '#7c3aed' },
      { name: 'So', value: totalCounts.so, color: '#06b6d4' },
      { name: 'You Know', value: totalCounts.youKnow, color: '#ef4444' }
    ].filter(item => item.value > 0); // Only include words that have been used
  };

  const data = aggregateFillerWords();
  const totalFillerWords = data.reduce((sum, item) => sum + item.value, 0);
  
  // Find the most frequent filler word
  const getMostFrequentWord = () => {
    if (data.length === 0) return null;
    return data.reduce((max, item) => item.value > max.value ? item : max, data[0]);
  };
  
  const mostFrequent = getMostFrequentWord();

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-slate-800">Filler Word Distribution</h3>
        <div className="text-sm text-slate-500">Total: {totalFillerWords}</div>
      </div>
      
      {data.length > 0 ? (
        <>
          <div className="h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} (${Math.round(value / totalFillerWords * 100)}%)`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    border: 'none'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {mostFrequent && (
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <span className="font-medium">Focus area: </span>
                Your most frequent filler word is <span className="font-bold" style={{ color: mostFrequent.color }}>{mostFrequent.name}</span>
                {mostFrequent.value > 10 ? " — try to reduce this in your next session!" : "."}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-48 md:h-56 bg-slate-50 rounded-lg">
          <p className="text-slate-500">Complete a session to see your distribution</p>
        </div>
      )}
    </Card>
  );
};

export default FillerWordDistribution;