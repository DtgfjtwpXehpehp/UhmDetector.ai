import React from 'react';
import { Link } from 'react-router-dom';
import { Session } from '../../types';
import { formatDate, formatDuration } from '../../utils/formatters';
import { Mic, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const getClarityClass = (score: number) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Mic className="h-5 w-5 text-primary-600" />
            </div>
            <h3 className="ml-2 font-medium text-slate-800 line-clamp-1">{session.title}</h3>
          </div>
          <span className={`font-bold text-lg ${getClarityClass(session.clarityScore)}`}>
            {session.clarityScore}%
          </span>
        </div>
        
        <div className="text-sm text-slate-500 mb-1">
          <div className="flex justify-between">
            <span>{formatDate(new Date(session.date))}</span>
            <span>{formatDuration(session.duration)}</span>
          </div>
        </div>
        
        <div className="text-sm text-slate-700 mt-2">
          <span className="font-medium">Filler words: </span>
          <span className="text-warning-600 font-medium">{session.fillerWordCount.total}</span>
        </div>
        
        <div className="mt-auto pt-4">
          <Link to={`/session/${session.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            View details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;