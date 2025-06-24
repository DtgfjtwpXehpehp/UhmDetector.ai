import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useTestimonialStore } from '../../store/useTestimonialStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useSessionStore } from '../../store/useSessionStore';

interface TestimonialModalProps {
  onClose: () => void;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ onClose }) => {
  const { user } = useAuthStore();
  const { sessions } = useSessionStore();
  const { addTestimonial } = useTestimonialStore();
  
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [role, setRole] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const averageClarity = sessions.length > 0
      ? Math.round(sessions.reduce((sum, s) => sum + s.clarityScore, 0) / sessions.length)
      : 0;
    
    addTestimonial({
      userId: user.id,
      userName: user.name,
      avatarUrl: user.avatarUrl,
      rating,
      text,
      role,
      sessionCount: sessions.length,
      averageClarity
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Share Your Experience</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              How would you rate UhmDetector.ai?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-2 rounded-lg transition-colors ${
                    rating >= value ? 'text-warning-500' : 'text-slate-300'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
              Your Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="e.g., Public Speaker, Student, Professional"
              required
            />
          </div>

          <div>
            <label htmlFor="testimonial" className="block text-sm font-medium text-slate-700 mb-2">
              Your Testimonial
            </label>
            <textarea
              id="testimonial"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Share your experience with UhmDetector.ai..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;