import React from 'react';
import { Suggestion } from '../../types';
import { Lightbulb, Sparkles, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

interface AISuggestionsProps {
  suggestions: Suggestion[];
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions }) => {
  if (!suggestions.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-800 flex items-center">
        <Sparkles className="h-5 w-5 text-primary-600 mr-2" />
        AI Suggestions
      </h3>

      {suggestions.map((suggestion, index) => (
        <Card key={index} className="bg-gradient-to-r from-primary-50 to-white border border-primary-100">
          {suggestion.type === 'alternative' ? (
            <div>
              <div className="flex items-start mb-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Lightbulb className="h-4 w-4 text-primary-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-slate-600">
                    Instead of <span className="font-medium text-primary-700">"{suggestion.fillerWord}"</span>, try:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {suggestion.alternatives?.map((alt, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-white border border-primary-200 text-primary-700"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {suggestion.context && (
                <div className="mt-2 text-sm text-slate-500 bg-white p-2 rounded-lg">
                  <span className="font-medium">Context:</span> "...{suggestion.context}..."
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-start">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary-600" />
              </div>
              <p className="ml-3 text-sm text-slate-700">{suggestion.tip}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default AISuggestions;