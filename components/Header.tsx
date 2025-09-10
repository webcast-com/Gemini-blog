// FIX: Implemented the Header component, which was previously missing. This resolves multiple 'Cannot find name' errors and provides the site's main navigation.
import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'news') => void;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, isAdmin, onLogin, onLogout }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.414-.586H6a2 2 0 00-1.414.586l-.707.707a2 2 0 000 2.828l.707.707a2 2 0 001.414.586h12a2 2 0 001.414-.586l.707-.707a2 2 0 000-2.828l-.707-.707zM12 4.586a2 2 0 00-1.414.586L6 9.757a2 2 0 000 2.828l.707.707a2 2 0 001.414.586h6a2 2 0 001.414-.586l.707-.707a2 2 0 000-2.828L13.414 5.172A2 2 0 0012 4.586z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-slate-800 dark:text-white">Gemini Blog</span>
          </div>
          <nav className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => onNavigate('news')} 
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              News
            </button>
            {isAdmin ? (
              <button onClick={onLogout} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                Logout
              </button>
            ) : (
              <button onClick={onLogin} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                Admin Login
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
