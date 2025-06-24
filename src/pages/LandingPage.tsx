import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart2, Award, Sparkles, ArrowRight, ChevronDown, Keyboard, Users, Shield, Zap } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import TestimonialSection from '../components/testimonials/TestimonialSection';

const LandingPage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Master Your <br />
                <span className="text-primary-600">Communication</span> Skills
              </h1>
              <p className="mt-4 text-xl text-slate-600 max-w-lg">
                Improve your speaking clarity and typing speed with AI-powered feedback. Track progress, eliminate filler words, and communicate with confidence.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary">
                      Start Free Trial
                    </Link>
                    <Link to="/login" className="btn btn-outline">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
              
              {/* Trust indicators */}
              <div className="mt-8 flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Privacy First
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  10,000+ Users
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  Real-time AI
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-primary-600 text-white flex items-center justify-between">
                  <h3 className="text-lg font-medium">Live Session</h3>
                  <span className="px-2 py-1 bg-red-500 rounded-full text-xs font-medium animate-pulse">RECORDING</span>
                </div>
                <div className="p-6">
                  <div className="bg-slate-100 rounded-lg p-4 mb-4">
                    <p className="text-slate-700">
                      Today I wanted to talk about <span className="highlighted-filler">um</span> the importance of clear communication. When we speak clearly, <span className="highlighted-filler">like</span> others understand us better.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="text-xl mb-1">😐</div>
                      <div className="text-xl font-bold text-primary-600">5</div>
                      <div className="text-xs text-slate-500">Filler Words</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="text-xl mb-1">📈</div>
                      <div className="text-xl font-bold text-success-600">78%</div>
                      <div className="text-xs text-slate-500">Clarity</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="text-xl mb-1">⚡</div>
                      <div className="text-xl font-bold text-warning-600">65</div>
                      <div className="text-xs text-slate-500">WPM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-warning-100 text-warning-800 rounded-full py-2 px-4 font-medium text-sm transform rotate-12 shadow-sm">
                <span className="mr-1">⚡</span> Live AI Feedback
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Everything You Need to Communicate Better
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive platform combines speech analysis and typing practice to improve all aspects of your communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-5">
                <Mic className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Speech Analysis</h3>
              <p className="text-slate-600">
                Real-time detection of filler words with instant feedback to improve your speaking clarity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-5">
                <Keyboard className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Typing Practice</h3>
              <p className="text-slate-600">
                Improve your typing speed and accuracy with various practice modes and difficulty levels.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center mb-5">
                <BarChart2 className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Progress Tracking</h3>
              <p className="text-slate-600">
                Comprehensive analytics showing your improvement over time with detailed insights.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center mb-5">
                <Award className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Achievements</h3>
              <p className="text-slate-600">
                Stay motivated with badges, leaderboards, and achievement systems that track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Why Choose UhmDetector.ai?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900">AI-Powered Insights</h3>
                    <p className="text-slate-600">Advanced algorithms provide personalized recommendations to improve your communication skills.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-success-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900">Privacy First</h3>
                    <p className="text-slate-600">Your data stays private. Speech processing happens locally, and we never store your audio.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-warning-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900">Instant Feedback</h3>
                    <p className="text-slate-600">Get real-time feedback as you speak or type, helping you improve immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Perfect for:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Public speakers and presenters</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Students preparing for interviews</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Professionals improving communication</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Anyone wanting to type faster</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Teams and organizations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Trusted by Thousands
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              See how UhmDetector.ai has helped people improve their communication skills.
            </p>
          </div>

          <TestimonialSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Communication?
          </h2>
          <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
            Join thousands of users who have improved their speaking and typing skills with UhmDetector.ai.
          </p>
          <div className="mt-8">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn bg-white text-primary-600 hover:bg-primary-50">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-primary-50">
                Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
          
          <div className="mt-8 text-primary-200 text-sm">
            ✓ No credit card required ✓ Free forever plan ✓ Setup in 2 minutes
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">How does UhmDetector.ai work?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                UhmDetector.ai uses your device's microphone to analyze your speech in real-time, identifying filler words and providing instant feedback. For typing, it tracks your speed and accuracy across various practice modes.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">Is my data private and secure?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Yes, your privacy is our priority. Speech processing happens locally on your device, and we don't store audio recordings. Only text transcripts and analytics are saved to track your progress.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">What devices and browsers are supported?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                UhmDetector.ai works on any modern device with Chrome, Edge, or Safari browsers. The typing features work on all devices, while speech recognition requires microphone access.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">How quickly will I see improvement?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Most users notice improvements within the first few sessions. The real-time feedback creates immediate awareness, which is the first step to changing habits. Consistent practice leads to significant results within weeks.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">Is there a free version?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Yes! UhmDetector.ai offers a comprehensive free plan that includes all core features. You can practice speech clarity and typing improvement without any cost or time limits.
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;