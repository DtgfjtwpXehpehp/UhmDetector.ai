import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import { LeaderboardEntry } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BackButton from '../components/ui/BackButton';

const LeaderboardPage = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  
  // Simulate fetching leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock leaderboard data
      const mockEntries: LeaderboardEntry[] = [
        {
          userId: '1',
          userName: user?.name || 'You',
          avatarUrl: user?.avatarUrl,
          clarityScore: 87,
          sessionsCompleted: 15,
          badges: 4
        },
        {
          userId: '2',
          userName: 'Sarah Chen',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          clarityScore: 92,
          sessionsCompleted: 32,
          badges: 7
        },
        {
          userId: '3',
          userName: 'Michael Johnson',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
          clarityScore: 88,
          sessionsCompleted: 24,
          badges: 5
        },
        {
          userId: '4',
          userName: 'Emma Wilson',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
          clarityScore: 85,
          sessionsCompleted: 18,
          badges: 3
        },
        {
          userId: '5',
          userName: 'James Smith',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
          clarityScore: 79,
          sessionsCompleted: 12,
          badges: 2
        },
        {
          userId: '6',
          userName: 'Olivia Brown',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olivia',
          clarityScore: 94,
          sessionsCompleted: 41,
          badges: 8
        },
        {
          userId: '7',
          userName: 'David Lee',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
          clarityScore: 83,
          sessionsCompleted: 19,
          badges: 4
        },
        {
          userId: '8',
          userName: 'Sofia Garcia',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
          clarityScore: 77,
          sessionsCompleted: 10,
          badges: 2
        },
        {
          userId: '9',
          userName: 'Ethan Taylor',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ethan',
          clarityScore: 81,
          sessionsCompleted: 15,
          badges: 3
        },
        {
          userId: '10',
          userName: 'Ava Martinez',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ava',
          clarityScore: 89,
          sessionsCompleted: 27,
          badges: 6
        }
      ];
      
      setEntries(mockEntries);
      setIsLoading(false);
    };
    
    fetchLeaderboard();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/dashboard" />
        <div className="flex items-center">
          <Trophy className="h-8 w-8 text-warning-500 mr-3" />
          <h1 className="text-2xl font-bold text-slate-900">Global Leaderboard</h1>
        </div>
      </div>
      
      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner />
          <p className="text-center text-slate-500 mt-4">Loading leaderboard data...</p>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary-900 mb-2">
              How the Leaderboard Works
            </h2>
            <p className="text-primary-800">
              Your position is based on your average clarity score across all sessions. 
              Complete more sessions and reduce your filler words to climb the ranks!
            </p>
          </div>
          
          <LeaderboardTable entries={entries} />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Monthly Challenges</h2>
            <div className="border border-warning-200 bg-warning-50 rounded-lg p-4">
              <h3 className="font-medium text-warning-800 flex items-center">
                <span className="text-xl mr-2">🏅</span> 
                April Challenge: 90% Clarity
              </h3>
              <p className="mt-2 text-warning-700">
                Achieve an average clarity score of 90% or higher across all your April sessions to earn a special badge and prize!
              </p>
              <div className="mt-4">
                <div className="w-full bg-white rounded-full h-2.5">
                  <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-warning-700 mt-1">Your current average: 85%</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;