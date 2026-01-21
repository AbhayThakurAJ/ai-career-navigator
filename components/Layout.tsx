
import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Info, LogOut, X, Mail, Linkedin } from 'lucide-react';
import { AppStep } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onReset: () => void;
  onNavigate: (step: AppStep) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

interface ModalContent {
  title: string;
  content: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  darkMode, 
  setDarkMode, 
  onReset, 
  onNavigate,
  isLoggedIn,
  onLogout
}) => {
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  const showPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal({
      title: '🔒 Privacy Policy',
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <p className="font-bold text-slate-800 dark:text-white">Your privacy matters to us.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>We collect only the information you provide, such as name, education, experience, and preferences.</li>
            <li>We do not sell or trade your personal data.</li>
            <li>Data may be processed using AI services to generate career insights.</li>
            <li>Basic security measures are used to protect your information.</li>
          </ul>
          <p className="pt-4 border-t border-slate-100 dark:border-slate-800 font-medium italic">
            By using this platform, you consent to this privacy policy.
          </p>
        </div>
      )
    });
  };

  const showTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal({
      title: '📄 Terms of Service',
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          <p className="font-bold text-slate-800 dark:text-white">By using this website, you agree to the following terms:</p>
          <p>This platform provides career guidance and recommendations for informational purposes only.</p>
          <p>Career suggestions are generated using user-provided information and AI models. Results may vary and should not be treated as professional, legal, or medical advice.</p>
          <p>Users are responsible for the accuracy of the information they provide.</p>
          <p>We do not guarantee job placement, admissions, or specific career outcomes.</p>
          <p>You agree not to misuse the platform, upload harmful content, or attempt unauthorized access.</p>
          <p>We reserve the right to update or modify these terms at any time.</p>
          <p className="pt-4 border-t border-slate-100 dark:border-slate-800 font-bold text-indigo-600">
            If you do not agree with these terms, please do not use the website.
          </p>
        </div>
      )
    });
  };

  const showContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal({
      title: '📬 Contact Us',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-300 font-medium">Have questions or feedback? We’d love to hear from you.</p>
          <div className="space-y-4">
            <a href="mailto:itzabhaythakur@gmail.com" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-slate-100 dark:border-transparent group">
              <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-indigo-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-black uppercase tracking-widest text-slate-400">Email</span>
                <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600">itzabhaythakur@gmail.com</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/ai-engineer-abhayjeetsingh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-slate-100 dark:border-transparent group">
              <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-blue-600">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-black uppercase tracking-widest text-slate-400">LinkedIn</span>
                <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600">Abhayjeet Singh</span>
              </div>
            </a>
          </div>
          <p className="text-xs text-slate-400 text-center pt-2">We aim to respond within 24–48 hours.</p>
        </div>
      )
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${darkMode ? 'glass border-b border-slate-800' : 'bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onReset}
          >
            <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:bg-indigo-500 transition-all group-hover:rotate-6 shadow-lg shadow-indigo-600/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tight hidden sm:inline-block">
              AI Career <span className="text-indigo-600">Navigator</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate(AppStep.ABOUT)}
                className={`px-4 py-2 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100 text-slate-700'}`}
              >
                <Info className="w-4 h-4" /> About
              </button>
            </nav>
            
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <button
                  onClick={() => onNavigate(AppStep.AUTH)}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
                </button>
              )}

              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-2xl transition-all shadow-sm border ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </main>
      
      <footer className="py-16 border-t border-slate-200/60 dark:border-slate-800 text-center space-y-6">
        <div className="flex justify-center gap-8 text-sm font-black text-slate-400">
           <a 
             href="#" 
             onClick={showPrivacy}
             className="hover:text-indigo-600 transition-colors"
           >
             Privacy Policy
           </a>
           <a 
             href="#" 
             onClick={showTerms}
             className="hover:text-indigo-600 transition-colors"
           >
             Terms of Service
           </a>
           <a 
             href="#" 
             onClick={showContact}
             className="hover:text-indigo-600 transition-colors"
           >
             Contact Us
           </a>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black text-slate-700 dark:text-slate-300">
            Engineered with Precision by <a href="https://www.linkedin.com/in/ai-engineer-abhayjeetsingh/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Abhayjeet Singh</a>
          </p>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            © {new Date().getFullYear()} AI Career Navigator. Driven by Google Gemini Technology.
          </p>
        </div>
      </footer>

      {/* Modern Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-slideInRight">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{activeModal.title}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {activeModal.content}
            </div>
            <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 text-center">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
