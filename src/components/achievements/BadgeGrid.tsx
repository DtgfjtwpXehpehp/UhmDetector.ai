import React from 'react';
import { Badge as BadgeType } from '../../types';
import Card from '../ui/Card';

interface BadgeGridProps {
  badges: BadgeType[];
  unlockedBadges: BadgeType[];
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, unlockedBadges }) => {
  return (
    <Card>
      <h3 className="text-lg font-medium text-slate-800 mb-4">Your Achievements</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {badges.map((badge) => {
          const isUnlocked = unlockedBadges.some(b => b.id === badge.id);
          
          return (
            <div 
              key={badge.id} 
              className={`flex flex-col items-center justify-center p-4 rounded-lg text-center transition-all ${
                isUnlocked 
                  ? 'bg-primary-50 border border-primary-200' 
                  : 'bg-slate-100 border border-slate-200 opacity-60'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="font-medium text-sm">{badge.name}</div>
              <div className="text-xs text-slate-500 mt-1">{badge.description}</div>
              
              {isUnlocked ? (
                <div className="mt-2 text-xs text-primary-600">
                  Unlocked!
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-500">
                  Locked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BadgeGrid;