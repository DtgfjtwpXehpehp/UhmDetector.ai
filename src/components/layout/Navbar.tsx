import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, Menu, X, User, BarChart3, Trophy, LogOut, BarChart2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Mic className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-600">UhmDetector<span className="text-secondary-600">.ai</span></span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard\" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Dashboard
                </Link>
                <Link to="/session" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                  New Session
                </Link>
                <Link to="/practice" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Practice
                </Link>
                <Link to="/analytics" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Analytics
                </Link>
                <Link to="/leaderboard" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Leaderboard
                </Link>
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <button 
                      onClick={() => navigate('/profile')}
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-primary-600"
                    >
                      <img 
                        className="h-8 w-8 rounded-full border border-slate-200" 
                        src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} 
                        alt={user?.name} 
                      />
                      <span className="ml-2">{user?.name}</span>
                    </button>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary py-2">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary-600 hover:bg-slate-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="h-5 w-5 mr-2" /> Dashboard
                </Link>
                <Link
                  to="/session"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mic className="h-5 w-5 mr-2" /> New Session
                </Link>
                <Link
                  to="/analytics"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart2 className="h-5 w-5 mr-2" /> Analytics
                </Link>
                <Link
                  to="/leaderboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Trophy className="h-5 w-5 mr-2" /> Leaderboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" /> Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;