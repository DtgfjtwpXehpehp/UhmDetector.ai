import React, { useState, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useSessionStore } from '../store/useSessionStore';
import { User, Settings, Award, Save, Camera, Link as LinkIcon, MapPin, Twitter, Github } from 'lucide-react';
import Card from '../components/ui/Card';
import BackButton from '../components/ui/BackButton';

const ProfilePage = () => {
  const { user, updateProfile, uploadProfilePicture, logout } = useAuthStore();
  const { sessions } = useSessionStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
    github: user?.github || ''
  });
  
  // Calculate user stats
  const totalSessions = sessions.length;
  const averageClarity = totalSessions > 0
    ? Math.round(sessions.reduce((sum, session) => sum + session.clarityScore, 0) / totalSessions)
    : 0;
  const totalDuration = totalSessions > 0
    ? sessions.reduce((sum, session) => sum + session.duration, 0)
    : 0;
  const totalMinutes = Math.floor(totalDuration / 60);
  
  // Calculate achievements
  const hasCompletedFirstSession = totalSessions > 0;
  const hasCompletedFiveSessions = totalSessions >= 5;
  const hasReachedHighClarity = sessions.some(session => session.clarityScore >= 90);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    if (formData.name.trim() === '') {
      setMessage('Name cannot be empty');
      return;
    }
    
    updateProfile(formData);
    setIsEditing(false);
    setMessage('Profile updated successfully');
    
    setTimeout(() => setMessage(''), 3000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await uploadProfilePicture(file);
      setMessage('Profile picture updated successfully');
    } catch (error) {
      setMessage('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/dashboard" />
        <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile info */}
        <div className="md:col-span-2">
          <Card>
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-slate-900">Profile Information</h2>
            </div>
            
            {message && (
              <div className={`mb-4 p-3 rounded-lg ${message.includes('error') ? 'bg-error-50 text-error-700' : 'bg-success-50 text-success-700'}`}>
                {message}
              </div>
            )}
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <img 
                      src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
                      alt={user?.name} 
                      className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                      disabled={isUploading}
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-slate-700 mb-1">
                    Twitter
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="@username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-slate-700 mb-1">
                    GitHub
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="btn btn-primary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        bio: user?.bio || '',
                        location: user?.location || '',
                        website: user?.website || '',
                        twitter: user?.twitter || '',
                        github: user?.github || ''
                      });
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} 
                    alt={user?.name} 
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-medium text-slate-900">{user?.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium text-slate-900">{user?.email}</p>
                  </div>
                  
                  {user?.bio && (
                    <div>
                      <p className="text-sm text-slate-500">Bio</p>
                      <p className="font-medium text-slate-900">{user.bio}</p>
                    </div>
                  )}
                  
                  {user?.location && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-slate-400 mr-2" />
                      <p className="font-medium text-slate-900">{user.location}</p>
                    </div>
                  )}
                  
                  {user?.website && (
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-slate-400 mr-2" />
                      <a 
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                  
                  {user?.twitter && (
                    <div className="flex items-center">
                      <Twitter className="h-5 w-5 text-slate-400 mr-2" />
                      <a 
                        href={`https://twitter.com/${user.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        @{user.twitter}
                      </a>
                    </div>
                  )}
                  
                  {user?.github && (
                    <div className="flex items-center">
                      <Github className="h-5 w-5 text-slate-400 mr-2" />
                      <a 
                        href={`https://github.com/${user.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {user.github}
                      </a>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-slate-500">Member since</p>
                    <p className="font-medium text-slate-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => logout()}
                    className="btn btn-outline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </Card>
          
          <div className="mt-8">
            <Card>
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-warning-500 mr-2" />
                <h2 className="text-xl font-semibold text-slate-900">Your Achievements</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${hasCompletedFirstSession ? 'bg-primary-50 border-primary-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <h3 className="font-medium text-slate-900">First Steps</h3>
                      <p className="text-sm text-slate-600">Complete your first speaking session</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${hasCompletedFiveSessions ? 'bg-primary-50 border-primary-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🔥</span>
                    <div>
                      <h3 className="font-medium text-slate-900">Getting Serious</h3>
                      <p className="text-sm text-slate-600">Complete 5 speaking sessions</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${hasReachedHighClarity ? 'bg-primary-50 border-primary-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏆</span>
                    <div>
                      <h3 className="font-medium text-slate-900">Clarity Master</h3>
                      <p className="text-sm text-slate-600">Achieve a clarity score of 90+</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Stats sidebar */}
        <div>
          <Card>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Your Stats</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500">Total Sessions</p>
                <p className="text-3xl font-bold text-primary-600">{totalSessions}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-500">Average Clarity Score</p>
                <p className="text-3xl font-bold text-primary-600">{averageClarity}%</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-500">Total Practice Time</p>
                <p className="text-3xl font-bold text-primary-600">{totalMinutes} min</p>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-700">Usage Plan</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="badge badge-success">Free Plan</span>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;