import React from 'react';
import { LeaderboardEntry } from '../../types';
import { Trophy } from 'lucide-react';
import Card from '../ui/Card';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => {
  // Sort entries by clarity score (descending)
  const sortedEntries = [...entries].sort((a, b) => b.clarityScore - a.clarityScore);
  
  return (
    <Card>
      <div className="flex items-center mb-4">
        <Trophy className="h-6 w-6 text-warning-500 mr-2" />
        <h2 className="text-xl font-semibold text-slate-800">Global Leaderboard</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Clarity Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Sessions
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Badges
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedEntries.map((entry, index) => (
              <tr key={entry.userId} className={index < 3 ? 'bg-primary-50' : ''}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                    index === 0 ? 'bg-warning-100 text-warning-600' :
                    index === 1 ? 'bg-slate-100 text-slate-600' :
                    index === 2 ? 'bg-secondary-100 text-secondary-600' :
                    'bg-slate-50 text-slate-500'
                  } font-bold`}>
                    {index + 1}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={entry.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.userId}`} 
                      alt="" 
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">{entry.userName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary-600">{entry.clarityScore}%</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                  {entry.sessionsCompleted}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex items-center">
                    <span className="text-warning-500 mr-1">🏆</span>
                    {entry.badges}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LeaderboardTable;