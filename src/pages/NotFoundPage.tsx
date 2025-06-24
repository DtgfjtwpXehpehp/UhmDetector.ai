import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-200">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-slate-900">Page Not Found</h2>
        <p className="mt-2 text-lg text-slate-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn btn-primary inline-flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;