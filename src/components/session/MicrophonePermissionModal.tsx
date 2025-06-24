import React from 'react';
import { Mic, AlertCircle, RefreshCw } from 'lucide-react';

interface MicrophonePermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  error?: string;
}

const MicrophonePermissionModal: React.FC<MicrophonePermissionModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 animate-slide-up">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-error-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Microphone Access Required</h2>
          
          <p className="text-slate-600 mb-6">
            {error || 'UhmDetector.ai needs access to your microphone to analyze your speech. Please allow microphone access when prompted.'}
          </p>
          
          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-slate-900 mb-2">How to enable microphone access:</h3>
            <ol className="text-sm text-slate-600 space-y-1">
              <li>1. Click the microphone icon in your browser's address bar</li>
              <li>2. Select "Allow" when prompted</li>
              <li>3. If blocked, click the lock icon and change permissions</li>
              <li>4. Refresh the page if needed</li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRetry}
              className="btn btn-primary flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={onClose}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicrophonePermissionModal;