import React from 'react';
import { SpeechAnalytics } from '../../types';
import { Activity, Gauge, Smile, Clock, Volume2 } from 'lucide-react';

interface AnalyticsPanelProps {
  analytics: SpeechAnalytics;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ analytics }) => {
  const { wpm, sentiment, confidence, tone, pace } = analytics;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <Activity className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">WPM</h3>
        </div>
        <div className="text-2xl font-bold text-slate-900">{wpm}</div>
        <div className="text-xs text-slate-500 mt-1">Words per minute</div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <Smile className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">Sentiment</h3>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          {sentiment >= 0 ? '+' : ''}{Math.round(sentiment)}%
        </div>
        <div className="text-xs text-slate-500 mt-1">Emotional tone</div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <Gauge className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">Confidence</h3>
        </div>
        <div className="text-2xl font-bold text-slate-900">{Math.round(confidence)}%</div>
        <div className="text-xs text-slate-500 mt-1">Speaking confidence</div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <Volume2 className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">Tone</h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 capitalize">{tone}</div>
        <div className="text-xs text-slate-500 mt-1">Voice tone</div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <Clock className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">Pace</h3>
        </div>
        <div className="text-2xl font-bold text-slate-900 capitalize">{pace}</div>
        <div className="text-xs text-slate-500 mt-1">Speaking pace</div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;