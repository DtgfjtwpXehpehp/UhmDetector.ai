import { create } from 'zustand';
import { Testimonial } from '../types';

interface TestimonialState {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date' | 'verified'>) => void;
  canLeaveTestimonial: (userId: string) => boolean;
}

export const useTestimonialStore = create<TestimonialState>((set, get) => ({
  testimonials: [],
  
  addTestimonial: (testimonialData) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: Date.now().toString(),
      date: new Date(),
      verified: false // Will be verified by admin in a real app
    };
    
    set(state => ({
      testimonials: [...state.testimonials, newTestimonial]
    }));
  },
  
  canLeaveTestimonial: (userId: string) => {
    const userTestimonials = get().testimonials.filter(t => t.userId === userId);
    const lastTestimonial = userTestimonials[userTestimonials.length - 1];
    
    if (!lastTestimonial) return true;
    
    // Can leave a new testimonial after 30 days
    const daysSinceLastTestimonial = Math.floor(
      (Date.now() - new Date(lastTestimonial.date).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return daysSinceLastTestimonial >= 30;
  }
}));