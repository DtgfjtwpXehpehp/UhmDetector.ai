import React from 'react';

interface TranscriptDisplayProps {
  highlightedTranscript: string;
  isRecording: boolean;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  highlightedTranscript,
  isRecording
}) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm min-h-[250px] max-h-[50vh] overflow-y-auto">
      {highlightedTranscript ? (
        <p 
          dangerouslySetInnerHTML={{ __html: highlightedTranscript }}
          className="whitespace-pre-wrap"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-slate-400">
          {isRecording ? (
            <p className="animate-pulse">Speak now...</p>
          ) : (
            <p>Transcript will appear here once you start speaking</p>
          )}
        </div>
      )}
      {isRecording && highlightedTranscript && (
        <div className="inline-block w-1 h-5 bg-primary-500 ml-1 animate-pulse"></div>
      )}
    </div>
  );
};

export default TranscriptDisplay;