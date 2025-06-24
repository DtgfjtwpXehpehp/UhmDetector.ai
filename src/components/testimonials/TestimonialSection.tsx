import React from 'react';
import { useTestimonialStore } from '../../store/useTestimonialStore';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const { testimonials } = useTestimonialStore();
  
  // Only show verified testimonials, sorted by rating
  const verifiedTestimonials = testimonials
    .filter(t => t.verified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {verifiedTestimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center mb-4">
            <img 
              src={testimonial.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.userId}`} 
              alt={testimonial.userName} 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h4 className="text-lg font-medium text-slate-900">{testimonial.userName}</h4>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-slate-600 mb-4">
            {testimonial.text}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex text-warning-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500">
              {testimonial.sessionCount} sessions completed
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSection;