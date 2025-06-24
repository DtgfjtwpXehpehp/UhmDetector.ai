import React, { useEffect, useRef } from 'react';
import { useTypingStore } from '../../store/useTypingStore';
import { Timer, RotateCcw, CheckCircle } from 'lucide-react';

const TypingTestInterface: React.FC = () => {
  const {
    currentTest,
    isTyping,
    currentText,
    typedText,
    currentPosition,
    wpm,
    accuracy,
    updateTypedText,
    finishTest,
    resetTest
  } = useTypingStore();
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);
  
  useEffect(() => {
    // Auto-finish test when text is completed
    if (typedText.length >= currentText.length && currentText.length > 0) {
      finishTest();
    }
  }, [typedText, currentText, finishTest]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Prevent typing beyond the text length
    if (value.length <= currentText.length) {
      updateTypedText(value);
    }
  };
  
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'text-lg ';
      
      if (index < typedText.length) {
        // Character has been typed
        if (typedText[index] === char) {
          className += 'text-success-600 bg-success-100';
        } else {
          className += 'text-error-600 bg-error-100';
        }
      } else if (index === currentPosition) {
        // Current character
        className += 'text-slate-900 bg-primary-200 animate-pulse';
      } else {
        // Untyped character
        className += 'text-slate-400';
      }
      
      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };
  
  if (!currentTest) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No active typing test. Start a new test to begin.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{wpm}</div>
            <div className="text-sm text-slate-500">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">{accuracy}%</div>
            <div className="text-sm text-slate-500">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">
              {Math.round((typedText.length / currentText.length) * 100)}%
            </div>
            <div className="text-sm text-slate-500">Progress</div>
          </div>
        </div>
        
        <button
          onClick={resetTest}
          className="btn btn-outline flex items-center"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(typedText.length / currentText.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Text Display */}
      <div className="bg-white rounded-lg p-6 border-2 border-slate-200 min-h-[200px]">
        <div className="font-mono leading-relaxed text-justify">
          {renderText()}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="relative">
        <textarea
          ref={inputRef}
          value={typedText}
          onChange={handleInputChange}
          className="w-full h-32 p-4 border-2 border-primary-300 rounded-lg font-mono text-lg resize-none focus:border-primary-500 focus:ring-primary-500"
          placeholder="Start typing here..."
          disabled={!isTyping}
        />
        
        {!isTyping && (
          <div className="absolute inset-0 bg-slate-100 bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-success-600 mx-auto mb-2" />
              <p className="text-lg font-medium text-slate-700">Test Completed!</p>
              <p className="text-sm text-slate-500">Final WPM: {wpm} | Accuracy: {accuracy}%</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="text-center text-sm text-slate-500">
        <p>Type the text above as accurately and quickly as possible.</p>
        <p>The test will automatically complete when you finish typing all the text.</p>
      </div>
    </div>
  );
};

export default TypingTestInterface;