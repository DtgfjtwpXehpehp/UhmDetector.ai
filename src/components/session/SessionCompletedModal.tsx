import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star } from 'lucide-react';
import { useTestimonialStore } from '../../store/useTestimonialStore';
import { useAuthStore } from '../../store/useAuthStore';

interface SessionCompletedModalProps {
  clarityScore: number;
  onClose: () => void;
  onLeaveTestimonial: () => void;
}

const SessionCompletedModal: React.FC<SessionCompletedModalProps> = ({
  clarityScore,
  onClose,
  onLeaveTestimonial
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { canLeaveTestimonial } = useTestimonialStore();
  
  const showTestimonialPrompt = user && canLeaveTestimonial(user.id);
  
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 relative animate-slide-up">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Session Completed!
          </h2>
          <p className="text-slate-600">
            Great job! You achieved a clarity score of{' '}
            <span className="font-bold text-primary-600">{clarityScore}%</span>
          </p>
        </div>

        <div className="space-y-4">
          {showTestimonialPrompt && (
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-warning-500 mr-2" />
                <h3 className="font-medium text-primary-900">Share Your Experience</h3>
              </div>
              <p className="text-sm text-primary-700 mb-3">
                Would you like to share your experience with UhmDetector.ai? Your feedback helps others improve their speaking skills!
              </p>
              <button
                onClick={onLeaveTestimonial}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Leave a Testimonial
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/analytics')}
              className="btn btn-primary flex-1"
            >
              View Analytics
            </button>
            <button
              onClick={onClose}
              className="btn btn-outline flex-1"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCompletedModal;