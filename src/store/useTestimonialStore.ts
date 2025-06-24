import { create } from 'zustand';
import { Testimonial } from '../types';

interface TestimonialState {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date' | 'verified'>) => void;
  canLeaveTestimonial: (userId: string) => boolean;
}

// Pre-populate with some verified testimonials
const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    userId: 'demo-1',
    userName: 'Sarah Chen',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60',
    rating: 5,
    text: 'UhmDetector.ai completely transformed my presentation skills. I used to say "um" constantly, and now I speak with confidence and clarity!',
    role: 'Marketing Manager',
    date: new Date('2024-01-15'),
    verified: true,
    sessionCount: 25,
    averageClarity: 89
  },
  {
    id: '2',
    userId: 'demo-2',
    userName: 'Alex Johnson',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60',
    rating: 5,
    text: 'As a public speaker, this tool has been invaluable. The real-time feedback helped me eliminate filler words and improve my delivery significantly.',
    role: 'Public Speaker',
    date: new Date('2024-01-20'),
    verified: true,
    sessionCount: 42,
    averageClarity: 92
  },
  {
    id: '3',
    userId: 'demo-3',
    userName: 'David Martinez',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60',
    rating: 5,
    text: 'I used this to prepare for job interviews, and it made a huge difference. The typing practice also helped me become more efficient at work.',
    role: 'Software Developer',
    date: new Date('2024-02-01'),
    verified: true,
    sessionCount: 18,
    averageClarity: 85
  }
];

export const useTestimonialStore = create<TestimonialState>((set, get) => ({
  testimonials: initialTestimonials,
  
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