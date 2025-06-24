import { useState, useEffect } from 'react';
import { SpeechAnalytics } from '../types';

export function useSpeechAnalytics(transcript: string, isRecording: boolean) {
  const [analytics, setAnalytics] = useState<SpeechAnalytics>({
    wpm: 0,
    sentiment: 0,
    confidence: 100,
    tone: 'neutral',
    pace: 'normal'
  });

  useEffect(() => {
    if (!isRecording || !transcript) return;

    // Calculate words per minute
    const words = transcript.trim().split(/\s+/).length;
    const minutes = (Date.now() - new Date().getTime()) / 60000;
    const wpm = Math.round(words / minutes);

    // Simple sentiment analysis (mock)
    const positiveWords = ['great', 'good', 'excellent', 'amazing', 'wonderful'];
    const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'horrible'];
    
    const words_lower = transcript.toLowerCase();
    const positiveCount = positiveWords.filter(word => words_lower.includes(word)).length;
    const negativeCount = negativeWords.filter(word => words_lower.includes(word)).length;
    
    const sentiment = ((positiveCount - negativeCount) / words) * 100;

    // Calculate confidence based on filler word frequency
    const fillerWords = ['um', 'uh', 'like', 'you know'];
    const fillerCount = fillerWords.filter(word => words_lower.includes(word)).length;
    const confidence = Math.max(0, 100 - (fillerCount / words) * 100);

    // Determine pace
    let pace = 'normal';
    if (wpm > 160) pace = 'fast';
    else if (wpm < 120) pace = 'slow';

    // Determine tone (mock)
    let tone = 'neutral';
    if (sentiment > 20) tone = 'positive';
    else if (sentiment < -20) tone = 'negative';

    setAnalytics({
      wpm,
      sentiment,
      confidence,
      tone,
      pace
    });
  }, [transcript, isRecording]);

  return analytics;
}