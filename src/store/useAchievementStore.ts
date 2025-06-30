import { create } from 'zustand';
import { Badge } from '../types';

interface AchievementState {
  badges: Badge[];
  unlockedBadges: Badge[];
  checkForNewAchievements: (sessionCount: number, clarityScore: number, fillerReduction: number) => Badge[];
  loadUserAchievements: () => void;
  saveUserAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  badges: [
    {
      id: 'first-session',
      name: 'First Steps',
      description: 'Complete your first speaking session',
      icon: '🎯'
    },
    {
      id: 'fifth-session',
      name: 'Getting Serious',
      description: 'Complete 5 speaking sessions',
      icon: '🔥'
    },
    {
      id: 'clarity-master',
      name: 'Clarity Master',
      description: 'Achieve a clarity score of 90+',
      icon: '🏆'
    },
    {
      id: 'improvement',
      name: 'On the Rise',
      description: 'Reduce filler words by 30% compared to your first session',
      icon: '📈'
    },
    {
      id: 'consistency',
      name: 'Consistency is Key',
      description: 'Complete sessions on 3 consecutive days',
      icon: '📆'
    }
  ],
  
  unlockedBadges: [],
  
  loadUserAchievements: () => {
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    set({ unlockedBadges: achievements });
  },
  
  saveUserAchievements: () => {
    const { unlockedBadges } = get();
    localStorage.setItem('achievements', JSON.stringify(unlockedBadges));
  },
  
  checkForNewAchievements: (sessionCount, clarityScore, fillerReduction) => {
    const { badges, unlockedBadges } = get();
    const newUnlocks: Badge[] = [];
    
    // Check for first session badge
    if (sessionCount === 1) {
      const firstSessionBadge = badges.find(b => b.id === 'first-session');
      if (firstSessionBadge && !unlockedBadges.some(b => b.id === 'first-session')) {
        const badgeWithDate = { ...firstSessionBadge, unlockedAt: new Date() };
        newUnlocks.push(badgeWithDate);
      }
    }
    
    // Check for fifth session badge
    if (sessionCount === 5) {
      const fifthSessionBadge = badges.find(b => b.id === 'fifth-session');
      if (fifthSessionBadge && !unlockedBadges.some(b => b.id === 'fifth-session')) {
        const badgeWithDate = { ...fifthSessionBadge, unlockedAt: new Date() };
        newUnlocks.push(badgeWithDate);
      }
    }
    
    // Check for clarity master badge
    if (clarityScore >= 90) {
      const clarityBadge = badges.find(b => b.id === 'clarity-master');
      if (clarityBadge && !unlockedBadges.some(b => b.id === 'clarity-master')) {
        const badgeWithDate = { ...clarityBadge, unlockedAt: new Date() };
        newUnlocks.push(badgeWithDate);
      }
    }
    
    // Check for improvement badge
    if (fillerReduction >= 30) {
      const improvementBadge = badges.find(b => b.id === 'improvement');
      if (improvementBadge && !unlockedBadges.some(b => b.id === 'improvement')) {
        const badgeWithDate = { ...improvementBadge, unlockedAt: new Date() };
        newUnlocks.push(badgeWithDate);
      }
    }
    
    // Add newly unlocked badges to state
    if (newUnlocks.length > 0) {
      const updatedUnlocked = [...unlockedBadges, ...newUnlocks];
      set({ unlockedBadges: updatedUnlocked });
      
      // Save to localStorage
      localStorage.setItem('achievements', JSON.stringify(updatedUnlocked));
    }
    
    return newUnlocks;
  }
}));