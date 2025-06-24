import React from 'react';

interface BadgeProps {
  icon: string;
  text: string;
  type?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  isNew?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ 
  icon, 
  text, 
  type = 'primary',
  size = 'md',
  isNew = false
}) => {
  const typeClasses = {
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    neutral: 'bg-slate-100 text-slate-800'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <div className={`inline-flex items-center rounded-full font-medium ${typeClasses[type]} ${sizeClasses[size]} relative`}>
      <span className="mr-1">{icon}</span>
      <span>{text}</span>
      
      {isNew && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full border border-white"></span>
      )}
    </div>
  );
};

export default Badge;