
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, BookOpen, GraduationCap, ArrowRight, Save } from 'lucide-react';

interface OnboardingFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  onLoadSaved?: () => boolean;
  hasSavedProgress?: boolean;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ 
  onSubmit, 
  isLoading, 
  onLoadSaved, 
  hasSavedProgress 
}) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 18,
    gender: 'Other',
    education: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.education) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-tight">
          Unlock Your Future
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
          Our AI analyzes your unique background to architect your professional destiny.
        </p>
      </div>

      <div className="space-y-8">
        {hasSavedProgress && onLoadSaved && (
          <button
            onClick={onLoadSaved}
            className="w-full bg-white dark:bg-amber-900/10 border-2 border-dashed border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400 p-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all hover:bg-amber-50 dark:hover:bg-amber-900/20 group shadow-sm active:scale-[0.99]"
          >
            <Save className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-lg">Resume your last career journey?</span>
          </button>
        )}

        <form onSubmit={handleSubmit} className="glass p-10 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden bg-white/80 dark:bg-slate-900/40 border border-white dark:border-slate-800">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <User className="w-4 h-4 text-indigo-600" /> Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Alex Johnson"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 font-bold"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500 dark:text-slate-400">Age</label>
                <input
                  required
                  type="number"
                  min="10"
                  max="100"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500 dark:text-slate-400">Gender</label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold cursor-pointer"
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <GraduationCap className="w-4 h-4 text-indigo-600" /> Current Education
              </label>
              <textarea
                required
                placeholder="Tell us about your background, skills, and interests..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[140px] placeholder:text-slate-400 font-bold leading-relaxed"
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                Analyzing Potential...
              </>
            ) : (
              <>
                Generate Career Paths <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
