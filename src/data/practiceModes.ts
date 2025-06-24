import { PracticeMode } from '../types';

export const practiceModes: PracticeMode[] = [
  {
    id: 'elevator-pitch',
    name: 'Elevator Pitch',
    description: 'Practice delivering a concise 30-second pitch about yourself or your ideas',
    icon: '🚀',
    duration: 30,
    difficulty: 'beginner',
    goals: [
      'Keep it under 30 seconds',
      'Include key achievements',
      'End with a clear call to action',
      'Maintain clarity score above 85%'
    ],
    prompts: [
      'Introduce yourself and your background',
      'Pitch your latest project or idea',
      'Describe your career goals',
      'Present your unique value proposition'
    ]
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    description: 'Practice engaging storytelling with proper structure and minimal filler words',
    icon: '📚',
    duration: 120,
    difficulty: 'intermediate',
    goals: [
      'Include beginning, middle, and end',
      'Use descriptive language',
      'Maintain audience engagement',
      'Keep filler words under 5'
    ],
    prompts: [
      'Share a challenging experience and how you overcame it',
      'Describe a moment that changed your perspective',
      'Tell a story about a successful project',
      'Narrate an interesting travel experience'
    ]
  },
  {
    id: 'impromptu',
    name: 'Impromptu Speaking',
    description: 'Practice thinking on your feet with random topics',
    icon: '💭',
    duration: 60,
    difficulty: 'advanced',
    goals: [
      'Respond within 5 seconds',
      'Speak for full duration',
      'Stay on topic',
      'Use clear transitions'
    ],
    prompts: [
      'Should social media be regulated?',
      'What defines success?',
      'The future of remote work',
      'Impact of artificial intelligence'
    ]
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    description: 'Practice common interview questions with structured responses',
    icon: '👔',
    duration: 90,
    difficulty: 'intermediate',
    goals: [
      'Use the STAR method',
      'Keep responses under 2 minutes',
      'Include specific examples',
      'Maintain professional tone'
    ],
    prompts: [
      'Tell me about yourself',
      'What\'s your greatest professional achievement?',
      'How do you handle challenges?',
      'Where do you see yourself in 5 years?'
    ]
  }
];