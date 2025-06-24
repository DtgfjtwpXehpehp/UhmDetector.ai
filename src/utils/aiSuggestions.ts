import { FillerWordCount, Suggestion } from '../types';

const alternativeWords: Record<string, string[]> = {
  'uhm': ['specifically', 'actually', 'well', 'now', 'let me think'],
  'like': ['such as', 'for example', 'approximately', 'similar to', 'comparable to'],
  'so': ['therefore', 'consequently', 'as a result', 'thus', 'accordingly'],
  'you know': ['understand', 'to clarify', 'to put it simply', 'in other words', 'specifically']
};

const contextualTips: string[] = [
  'Try pausing instead of using filler words - it makes you sound more confident',
  'Focus on speaking in complete thoughts rather than stream of consciousness',
  'Practice deep breathing to reduce anxiety and filler word usage',
  'Prepare key points in advance to reduce reliance on filler words',
  'Record yourself speaking and review to identify patterns'
];

export function generateSuggestions(
  transcript: string,
  fillerCount: FillerWordCount,
  recentFillerWords: { word: string, index: number }[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Generate alternative word suggestions
  recentFillerWords.forEach(({ word }) => {
    const alternatives = alternativeWords[word];
    if (alternatives) {
      suggestions.push({
        type: 'alternative',
        fillerWord: word,
        alternatives: shuffleArray(alternatives).slice(0, 3),
        context: getWordContext(transcript, word)
      });
    }
  });

  // Generate contextual tips based on filler word patterns
  if (fillerCount.total > 0) {
    const mostUsedFiller = getMostUsedFiller(fillerCount);
    if (mostUsedFiller) {
      suggestions.push({
        type: 'tip',
        tip: getContextualTip(mostUsedFiller, fillerCount[mostUsedFiller]),
      });
    }
  }

  // Add general tips if needed
  if (suggestions.length < 2) {
    suggestions.push({
      type: 'tip',
      tip: contextualTips[Math.floor(Math.random() * contextualTips.length)]
    });
  }

  return suggestions;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getMostUsedFiller(fillerCount: FillerWordCount): keyof FillerWordCount | null {
  const counts = [
    { key: 'uhm', count: fillerCount.uhm },
    { key: 'like', count: fillerCount.like },
    { key: 'so', count: fillerCount.so },
    { key: 'youKnow', count: fillerCount.youKnow }
  ];
  
  const maxCount = Math.max(...counts.map(c => c.count));
  if (maxCount === 0) return null;
  
  return counts.find(c => c.count === maxCount)?.key as keyof FillerWordCount;
}

function getWordContext(transcript: string, word: string): string {
  const wordIndex = transcript.toLowerCase().lastIndexOf(word.toLowerCase());
  if (wordIndex === -1) return '';
  
  const start = Math.max(0, wordIndex - 30);
  const end = Math.min(transcript.length, wordIndex + word.length + 30);
  
  return transcript.slice(start, end).trim();
}

function getContextualTip(fillerWord: string, count: number): string {
  const tips: Record<string, string[]> = {
    uhm: [
      'Try taking a brief pause instead of saying "uhm"',
      'When you feel an "uhm" coming, take a deep breath instead',
      'Practice replacing "uhm" with a confident pause'
    ],
    like: [
      'Be more precise with your comparisons instead of using "like"',
      'Try using specific examples rather than "like"',
      'Replace "like" with more professional alternatives'
    ],
    so: [
      'Start sentences with your main point instead of "so"',
      'Use transition words that better convey your meaning',
      'Think about whether "so" adds value to your sentence'
    ],
    youKnow: [
      'Trust that your audience understands without saying "you know"',
      'Be more direct and confident in your statements',
      'Focus on clear explanations rather than seeking confirmation'
    ]
  };

  const key = fillerWord === 'youKnow' ? 'youKnow' : fillerWord;
  const tipList = tips[key] || contextualTips;
  return tipList[Math.floor(Math.random() * tipList.length)];
}