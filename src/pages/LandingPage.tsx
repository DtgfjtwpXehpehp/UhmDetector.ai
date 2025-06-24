import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart2, Award, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

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
                Speak Clearly. <br />
                <span className="text-primary-600">Eliminate</span> Filler Words.
              </h1>
              <p className="mt-4 text-xl text-slate-600 max-w-lg">
                UhmDetector.ai helps you improve your speaking clarity by tracking and reducing filler words in real-time.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/session\" className="btn btn-primary">
                    Start Speaking Session
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary">
                      Start Free Trial
                    </Link>
                    <Link to="/login" className="btn btn-outline">
                      Already have an account?
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-primary-600 text-white flex items-center justify-between">
                  <h3 className="text-lg font-medium">Speaking Session</h3>
                  <span className="px-2 py-1 bg-red-500 rounded-full text-xs font-medium animate-pulse">LIVE</span>
                </div>
                <div className="p-6">
                  <div className="bg-slate-100 rounded-lg p-4 mb-4">
                    <p className="text-slate-700">
                      Today I wanted to talk about <span className="highlighted-filler">um</span> the importance of clear communication. When we speak clearly, <span className="highlighted-filler">like</span> others understand us better.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="text-xl mb-1">😐</div>
                      <div className="text-xl font-bold text-primary-600">5</div>
                      <div className="text-xs text-slate-500">Filler Words</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="text-xl mb-1">📈</div>
                      <div className="text-xl font-bold text-success-600">78%</div>
                      <div className="text-xs text-slate-500">Clarity Score</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-warning-100 text-warning-800 rounded-full py-2 px-4 font-medium text-sm transform rotate-12 shadow-sm">
                <span className="mr-1">⚡</span> Live Feedback
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
              How UhmDetector.ai Works
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you eliminate those pesky filler words and speak with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-5">
                <Mic className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Speech Analysis</h3>
              <p className="text-slate-600">
                Our AI listens to your speech and instantly highlights filler words as you talk, providing immediate feedback.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-5">
                <BarChart2 className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Detailed Analytics</h3>
              <p className="text-slate-600">
                Track your progress over time with comprehensive analytics that show your improvement and speaking patterns.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center mb-5">
                <Award className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Achievement System</h3>
              <p className="text-slate-600">
                Stay motivated with fun badges and achievements as you improve your speaking clarity over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              UhmDetector.ai has helped thousands of people improve their speaking skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60" 
                  alt="User" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-slate-900">Alex Johnson</h4>
                  <p className="text-sm text-slate-500">Public Speaker</p>
                </div>
              </div>
              <p className="text-slate-600">
                "UhmDetector.ai transformed my presentations. I used to say 'um' every other sentence, and now I speak with confidence and clarity!"
              </p>
              <div className="mt-4 flex text-warning-500">
                ★★★★★
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60" 
                  alt="User" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-slate-900">Sarah Martinez</h4>
                  <p className="text-sm text-slate-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-slate-600">
                "As someone who gives presentations regularly, this tool has been invaluable. My team has noticed a huge improvement in my delivery."
              </p>
              <div className="mt-4 flex text-warning-500">
                ★★★★★
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60" 
                  alt="User" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-slate-900">David Chen</h4>
                  <p className="text-sm text-slate-500">College Student</p>
                </div>
              </div>
              <p className="text-slate-600">
                "I used this to prepare for job interviews, and it made a huge difference. The real-time feedback helped me sound more professional."
              </p>
              <div className="mt-4 flex text-warning-500">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to improve your speaking clarity?
          </h2>
          <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
            Join thousands of users who have eliminated filler words from their speech.
          </p>
          <div className="mt-8">
            {isAuthenticated ? (
              <Link to="/session\" className="btn bg-white text-primary-600 hover:bg-primary-50">
                Start a Session <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-primary-50">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
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
                UhmDetector.ai uses your device's microphone to capture your speech and convert it to text. Our algorithm then identifies common filler words like "uhm," "like," and "you know" in real-time, highlighting them as you speak. This immediate feedback helps you become more aware of your speech patterns.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">Is my speech data private?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Yes, your privacy is our priority. All speech processing happens on your device, and we don't store the audio of your sessions. Only the text transcripts and analytics are saved to your account to track your progress.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">Can I use UhmDetector.ai on mobile devices?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Yes! UhmDetector.ai works on any modern device with a microphone and browser support for speech recognition, including smartphones and tablets. Just visit our website and start a session.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-slate-900">How long does it take to see improvement?</h3>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Most users report noticeable improvements after just 5-10 sessions. The real-time feedback creates immediate awareness, which is the first step to changing speech habits. Regular practice of 2-3 sessions per week typically leads to significant results within a month.
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;