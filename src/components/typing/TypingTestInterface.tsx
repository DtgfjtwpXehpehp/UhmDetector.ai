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
  const textDisplayRef = useRef<HTMLDivElement>(null);
  
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

  // Scroll to current position in text display
  useEffect(() => {
    if (textDisplayRef.current && currentPosition > 0) {
      const textDisplay = textDisplayRef.current;
      const currentChar = textDisplay.children[currentPosition] as HTMLElement;
      
      if (currentChar) {
        const containerRect = textDisplay.getBoundingClientRect();
        const charRect = currentChar.getBoundingClientRect();
        
        // Check if current character is outside the visible area
        if (charRect.bottom > containerRect.bottom - 20 || charRect.top < containerRect.top + 20) {
          currentChar.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }
    }
  }, [currentPosition]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Prevent typing beyond the text length
    if (value.length <= currentText.length) {
      updateTypedText(value);
    }
  };
  
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'inline-block ';
      
      if (index < typedText.length) {
        // Character has been typed
        if (typedText[index] === char) {
          className += 'text-success-600 bg-success-100 rounded-sm';
        } else {
          className += 'text-error-600 bg-error-100 rounded-sm';
        }
      } else if (index === currentPosition) {
        // Current character
        className += 'text-slate-900 bg-primary-200 animate-pulse rounded-sm border-l-2 border-primary-500';
      } else {
        // Untyped character
        className += 'text-slate-600';
      }
      
      // Handle line breaks and spacing
      if (char === ' ') {
        return (
          <span key={index} className={className} style={{ minWidth: '0.5rem' }}>
            {'\u00A0'}
          </span>
        );
      }
      
      return (
        <span key={index} className={className}>
          {char}
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
      <div className="bg-white rounded-lg p-6 border-2 border-slate-200 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-slate-800 mb-2">Text to Type</h3>
          <div className="text-sm text-slate-500 mb-4">
            {currentTest.mode.name} - {currentTest.difficulty.charAt(0).toUpperCase() + currentTest.difficulty.slice(1)}
          </div>
        </div>
        
        <div 
          ref={textDisplayRef}
          className="font-mono text-lg leading-relaxed p-4 bg-slate-50 rounded-lg border border-slate-200 max-h-64 overflow-y-auto"
          style={{ 
            lineHeight: '1.8',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap'
          }}
        >
          {renderText()}
        </div>
        
        {/* Character count and position indicator */}
        <div className="mt-3 text-sm text-slate-500 flex justify-between">
          <span>Position: {currentPosition + 1} / {currentText.length}</span>
          <span>Characters remaining: {currentText.length - typedText.length}</span>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="relative">
        <label htmlFor="typing-input" className="block text-sm font-medium text-slate-700 mb-2">
          Type here:
        </label>
        <textarea
          id="typing-input"
          ref={inputRef}
          value={typedText}
          onChange={handleInputChange}
          className="w-full h-32 p-4 border-2 border-primary-300 rounded-lg font-mono text-lg resize-none focus:border-primary-500 focus:ring-primary-500 focus:outline-none"
          placeholder={isTyping ? "Start typing the text above..." : "Test completed"}
          disabled={!isTyping}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
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
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-medium text-primary-900 mb-2">Instructions:</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Type the text exactly as shown above, including punctuation and spacing</li>
          <li>• Green highlighting shows correct characters, red shows errors</li>
          <li>• The test will automatically complete when you finish typing all text</li>
          <li>• Focus on accuracy first, then gradually increase your speed</li>
        </ul>
      </div>
    </div>
  );
};

export default TypingTestInterface;