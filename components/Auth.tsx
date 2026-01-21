
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
  initialMode?: 'signin' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ onLogin, initialMode = 'signin' }) => {
  const [isSignIn, setIsSignIn] = useState(initialMode === 'signin');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {isSignIn ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          {isSignIn 
            ? 'Sign in to continue your career journey' 
            : 'Join us to discover your personalized career path'}
        </p>
      </div>

      <div className="glass p-8 rounded-3xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium mb-1.5 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1.5 flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              required
              type="email"
              placeholder="name@example.com"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                {isSignIn ? 'Sign In' : 'Sign Up'} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
          >
            {isSignIn 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};
