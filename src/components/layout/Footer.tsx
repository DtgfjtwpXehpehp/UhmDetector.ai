import { Link } from 'react-router-dom';
import { Mic, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Mic className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-bold text-primary-600">UhmDetector<span className="text-secondary-600">.ai</span></span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Improve your speech clarity and eliminate filler words with real-time feedback.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-500">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/session" className="text-sm text-slate-500 hover:text-primary-600">
                  New Session
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-slate-500 hover:text-primary-600">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-400 text-center">
            &copy; {new Date().getFullYear()} UhmDetector.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;