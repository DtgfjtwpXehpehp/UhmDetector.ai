import React from 'react';
import { FillerWordCount } from '../../types';

interface FillerWordCounterProps {
  fillerCount: FillerWordCount;
}

const FillerWordCounter: React.FC<FillerWordCounterProps> = ({ fillerCount }) => {
  const getEmoji = (count: number) => {
    if (count === 0) return '😎';
    if (count <= 3) return '🙂';
    if (count <= 8) return '😐';
    return '😬';
  };
  
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
        <div className="text-2xl mb-1">{getEmoji(fillerCount.uhm)}</div>
        <div className="text-xl font-bold text-primary-600">{fillerCount.uhm}</div>
        <div className="text-xs text-slate-500">Uhm/Um</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
        <div className="text-2xl mb-1">{getEmoji(fillerCount.like)}</div>
        <div className="text-xl font-bold text-primary-600">{fillerCount.like}</div>
        <div className="text-xs text-slate-500">Like</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
        <div className="text-2xl mb-1">{getEmoji(fillerCount.so)}</div>
        <div className="text-xl font-bold text-primary-600">{fillerCount.so}</div>
        <div className="text-xs text-slate-500">So</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
        <div className="text-2xl mb-1">{getEmoji(fillerCount.youKnow)}</div>
        <div className="text-xl font-bold text-primary-600">{fillerCount.youKnow}</div>
        <div className="text-xs text-slate-500">You Know</div>
      </div>
    </div>
  );
};

export default FillerWordCounter;