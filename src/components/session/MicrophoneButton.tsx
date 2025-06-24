import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface MicrophoneButtonProps {
  isRecording: boolean;
  isLoading?: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isRecording,
  isLoading = false,
  onClick,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12 text-2xl',
    md: 'h-16 w-16 text-3xl',
    lg: 'h-24 w-24 text-4xl'
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 48
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
        isRecording
          ? 'bg-error-100 text-error-600 hover:bg-error-200 animate-recording'
          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <Loader2 size={iconSizes[size]} className="animate-spin" />
      ) : isRecording ? (
        <MicOff size={iconSizes[size]} />
      ) : (
        <Mic size={iconSizes[size]} />
      )}
    </button>
  );
};

export default MicrophoneButton;